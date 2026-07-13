import cytoscape from "cytoscape";
import graph from "./data/graph.json";

// ===================================================================
// COLLABORATION LAYER
// The canonical model (graph.json) is READ-ONLY. Every edit is an "op" appended to a dated
// session held in localStorage; the effective model = base graph + the applied sessions' ops.
// Sessions export/import as JSON change-files so a team can share customizations.
// ===================================================================
const LS_KEY = "sdg_collab_v1";
const collab = { author: "mv@constructor.tech", sessions: [], activeId: null, viewIds: new Set() };
const uid = (p) => p + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);

function loadCollab() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS_KEY) || "null");
    if (raw && Array.isArray(raw.sessions)) {
      collab.author = raw.author || collab.author;
      collab.sessions = raw.sessions;
      collab.activeId = raw.activeId && raw.sessions.some((s) => s.id === raw.activeId) ? raw.activeId : null;
      collab.viewIds = new Set((raw.viewIds || []).filter((id) => raw.sessions.some((s) => s.id === id)));
    }
  } catch { /* ignore corrupt store */ }
  if (!collab.sessions.length) newSession("My changes", false);
  if (!collab.activeId) collab.activeId = collab.sessions[0].id;
  collab.viewIds.add(collab.activeId);
}
function saveCollab() {
  localStorage.setItem(LS_KEY, JSON.stringify({ author: collab.author, activeId: collab.activeId, viewIds: [...collab.viewIds], sessions: collab.sessions }));
}
function newSession(title, activate = true) {
  const s = { id: uid("s"), author: collab.author, title: title || "Untitled", createdAt: Date.now(), updatedAt: Date.now(), ops: [] };
  collab.sessions.push(s);
  if (activate) { collab.activeId = s.id; collab.viewIds.add(s.id); }
  return s;
}
function activeSession() { return collab.sessions.find((s) => s.id === collab.activeId) || null; }
function pushOp(op) {
  const s = activeSession();
  if (!s) return;
  op.id = op.id || uid("op");
  op.at = Date.now();
  op.author = collab.author;
  s.ops.push(op);
  s.updatedAt = Date.now();
  collab.viewIds.add(s.id);
  saveCollab();
  rebuildModel();
  renderSessionBar();
  render();
}
// undo the last change in the active session; reset = discard all of them (canonical model untouched)
function undoLast() {
  const s = activeSession();
  if (!s || !s.ops.length) return;
  s.ops.pop();
  s.updatedAt = Date.now();
  saveCollab(); rebuildModel(); renderSessionBar(); render();
}
function resetActive() {
  const s = activeSession();
  if (!s || !s.ops.length) return;
  const n = s.ops.length;
  if (!confirm(`Discard all ${n} change${n === 1 ? "" : "s"} in “${s.title}”?\nThe canonical model is not affected — only your session is cleared.`)) return;
  s.ops = [];
  s.updatedAt = Date.now();
  saveCollab(); rebuildModel(); renderSessionBar(); render();
  if (!sessionsModal.classList.contains("hidden")) openSessionsModal();
}
// ops from every session currently applied (viewIds), oldest session first
function activeOps() {
  const applied = collab.sessions.filter((s) => collab.viewIds.has(s.id)).sort((a, b) => a.createdAt - b.createdAt);
  const out = [];
  for (const s of applied) for (const op of s.ops) out.push({ ...op, _session: s.id });
  return out;
}

// ---------- effective model (base + overlay) ----------
let domainsById, blocksById, termsById, metaById, nodeById, M;
function rebuildModel() {
  const domains = graph.domains.map((d) => ({ ...d }));
  const blocks = graph.blocks.map((b) => ({ ...b }));
  const terms = graph.terms.map((t) => ({ ...t }));
  const metaNodes = graph.metaNodes.map((m) => ({ ...m }));
  const relationships = graph.relationships.map((r) => ({ ...r }));
  const comments = new Map();
  const dId = new Map(domains.map((d) => [d.id, d]));
  const bId = new Map(blocks.map((b) => [b.id, b]));
  const tId = new Map(terms.map((t) => [t.id, t]));

  for (const op of activeOps()) {
    if (op.t === "addBlock") { const b = { id: op.id, label: op.label, domain: op.domain, tier: op.tier || "managed", meaning: op.note || "", added: true }; blocks.push(b); bId.set(b.id, b); }
    else if (op.t === "addTerm") { const t = { id: op.id, label: op.label, domain: op.domain, block: op.block || null, tier: op.tier || "managed", meaning: op.note || "", added: true }; terms.push(t); tId.set(t.id, t); }
    else if (op.t === "rename") { const n = tId.get(op.target) || bId.get(op.target) || dId.get(op.target); if (n) { n.label = op.label; if (op.meaning !== undefined) { n.meaning = op.meaning; n.description = op.meaning; } } }
    else if (op.t === "reparent") {
      const t = tId.get(op.target), b = bId.get(op.target);
      if (t) { if (op.parentKind === "block") { t.block = op.parent; t.domain = bId.get(op.parent)?.domain || t.domain; } else { t.block = null; t.domain = op.parent; } t.moved = true; }
      else if (b) { b.domain = op.parent; b.moved = true; }
    }
    else if (op.t === "setTier") { const n = tId.get(op.target) || bId.get(op.target); if (n) { n.tier = op.tier; n.tierSet = true; } }
    else if (op.t === "proposeRel") { relationships.push({ source: op.source, target: op.target, predicate: op.predicate || "relates_to", card: op.card || "", note: op.note || "", proposed: true, opId: op.id }); }
    else if (op.t === "comment") { if (!comments.has(op.target)) comments.set(op.target, []); comments.get(op.target).push({ text: op.text, author: op.author, at: op.at }); }
  }

  for (const d of domains) {
    const dbs = blocks.filter((b) => b.domain === d.id), dts = terms.filter((t) => t.domain === d.id);
    const cov = { blocks: dbs.length, terms: dts.length, managed: 0, secondary: 0, mentioned: 0 };
    for (const b of dbs) if (cov[b.tier] !== undefined) cov[b.tier]++;
    d.coverage = cov;
  }
  metaById = new Map(metaNodes.map((m) => [m.id, m]));
  domainsById = dId; blocksById = bId; termsById = tId;
  nodeById = new Map([...dId, ...bId, ...tId, ...metaById]);
  M = { domains, blocks, terms, metaNodes, relationships, comments, domainAdjacency: graph.domainAdjacency, generatedFrom: graph.generatedFrom,
    counts: { domains: domains.filter((d) => d.kind === "domain").length, layers: domains.filter((d) => d.kind === "layer").length, blocks: blocks.length, terms: terms.length, relationships: relationships.length } };
}
loadCollab();
rebuildModel();

const kindOf = (id) =>
  termsById.has(id) ? "term" : blocksById.has(id) ? "block" : domainsById.has(id) ? (domainsById.get(id).kind) : metaById.has(id) ? "meta" : null;
const domainOf = (id) => {
  if (termsById.has(id)) return termsById.get(id).domain;
  if (blocksById.has(id)) return blocksById.get(id).domain;
  if (domainsById.has(id)) return id;
  return null; // meta
};
const tierOf = (id) => {
  if (termsById.has(id)) return termsById.get(id).tier;
  if (blocksById.has(id)) return blocksById.get(id).tier;
  if (metaById.has(id)) return "meta";
  return "managed";
};
const meaningOf = (id) => nodeById.get(id)?.meaning || nodeById.get(id)?.description || "";
const truncate = (s, n) => (s && s.length > n ? s.slice(0, n - 1) + "…" : s || "");

function atDepth(id, depth) {
  const k = kindOf(id);
  if (k === "meta") return id;
  if (depth === "term") return id;
  if (depth === "block") return k === "term" ? termsById.get(id).block || domainOf(id) : id;
  return domainOf(id); // domain depth
}

// ---------- state ----------
const state = {
  view: "overview", // overview | single | drilled
  focusDomain: null,
  depth: "block", // most legible default for "Explore all" (36 nodes vs 116 at term)
  tiers: new Set(["managed"]),
  domains: new Set(graph.domains.map((d) => d.id)), // which domain baskets to show in the drilled view
  showAllLabels: false,
  crossOnly: false,
  selectedId: null,
};

// ---------- cytoscape ----------
const cy = cytoscape({
  container: document.getElementById("cy"),
  wheelSensitivity: 0.2,
  minZoom: 0.12,
  maxZoom: 3,
  style: [
    {
      selector: "node",
      style: {
        label: "data(label)", color: "#1a1a2e", "font-size": 11,
        "text-valign": "center", "text-halign": "center", "text-wrap": "wrap",
        "text-max-width": 120, "border-width": 1.5,
        shape: "round-rectangle", "corner-radius": 6,
      },
    },
    // leaf nodes hug their label (MUST precede per-type rules for tie-break)
    { selector: "node:childless", style: { width: "label", height: "label" } },
    { selector: 'node[tier="managed"]', style: { "background-color": "#002b49", color: "#fff", "border-color": "#001a2e" } },
    { selector: 'node[tier="secondary"]', style: { "background-color": "#0088ce", color: "#fff", "border-color": "#0069a3" } },
    { selector: 'node[tier="mentioned"]', style: { "background-color": "#dfe3e9", color: "#33404f", "border-color": "#b6bcc6" } },
    { selector: 'node[ntype="term"]', style: { "font-size": 11, padding: 8, "text-max-width": 120 } },
    { selector: 'node[ntype="block"]', style: { "font-size": 12, "font-weight": 600, padding: 10, "text-max-width": 150 } },
    { selector: 'node[ntype="domain"]', style: { "font-size": 13, "font-weight": 700, padding: 12, "text-max-width": 170, "corner-radius": 10 } },
    // a domain has NO tier (it spans all three) — at Domains depth draw it as a neutral outlined
    // container (faint navy tint), NOT a solid navy fill that would read as the Managed tier
    { selector: 'node[ntype="domain"]:childless', style: { "background-color": "#002b49", "background-opacity": 0.06, color: "#002b49", "border-color": "#002b49", "border-width": 2 } },
    { selector: 'node[kind="meta"]', style: { shape: "round-rectangle", "background-color": "#6b4fbb", color: "#fff", "border-style": "dashed", "border-color": "#4a338c", "font-style": "italic", padding: 8, "text-max-width": 130 } },
    { selector: "node[?nonEntity]", style: { "background-opacity": 0.5, "border-style": "dashed", "border-width": 2, color: "#33404f", "text-outline-color": "#fff", "text-outline-width": 2 } },
    {
      // neighbour-domain basket in the single-domain view (holds the external stubs it links to)
      // padding MUST equal STUB_PAD in layoutSingle
      selector: 'node[ntype="stubgroup"]',
      style: {
        "background-opacity": 0.05, "background-color": "#5a6572", "border-width": 1, "border-style": "dashed",
        "border-color": "#c4ccd6", shape: "round-rectangle", "corner-radius": 8,
        "text-valign": "top", "text-halign": "center", "text-margin-y": 5, "font-size": 11, "font-weight": 700,
        color: "#5a6572", "text-max-width": 200, padding: 24,
        "text-background-color": "#ffffff", "text-background-opacity": 0.92, "text-background-padding": 3, "text-background-shape": "round-rectangle",
      },
    },
    { selector: 'node[kind="stub"]', style: { "background-opacity": 0.25, "border-style": "dashed", "border-width": 1.5, "font-size": 10, padding: 6, "text-max-width": 140 } },
    { selector: 'node.stub-out[tier="managed"], node.stub-both[tier="managed"]', style: { "background-color": "#002b49" } },
    {
      // padding MUST equal DOMAIN_PAD in the drilled packer (holds the top label; footprint math depends on it)
      selector: 'node[ntype="domain"]:parent',
      style: {
        "background-opacity": 0.04, "background-color": "#002b49", "border-width": 1.5,
        "border-style": "solid", "border-color": "#c9d2dc", shape: "round-rectangle", "corner-radius": 10,
        "text-valign": "top", "text-halign": "center", "text-margin-y": 6, "font-size": 13, "font-weight": 700,
        color: "#002b49", "text-max-width": 220, padding: 40,
        // backing plate so the title doesn't sit on top of the container border
        "text-background-color": "#ffffff", "text-background-opacity": 0.92, "text-background-padding": 4, "text-background-shape": "round-rectangle",
      },
    },
    {
      // padding MUST equal BLOCK_PAD in the drilled packer
      selector: 'node[ntype="block"]:parent',
      style: {
        "background-opacity": 0.08, "background-color": "#002b49", "border-width": 1,
        "border-style": "dashed", "border-color": "#c9d2dc", shape: "round-rectangle", "corner-radius": 6,
        "text-valign": "top", "text-halign": "center", "text-margin-y": 5, "font-size": 12, "font-weight": 700,
        color: "#002b49", "text-max-width": 200, padding: 34,
        "text-background-color": "#ffffff", "text-background-opacity": 0.92, "text-background-padding": 4, "text-background-shape": "round-rectangle",
      },
    },
    {
      selector: "edge",
      style: {
        width: 1.4, "line-color": "#c4ccd6", "line-opacity": 0.55,
        "target-arrow-color": "#c4ccd6", "target-arrow-shape": "triangle", "arrow-scale": 0.9, "curve-style": "bezier",
        label: "data(elabel)", "font-size": 9, color: "#5a6572", "text-opacity": 0,
        "text-background-color": "#fff", "text-background-opacity": 0.9,
        "text-background-padding": 2, "text-rotation": "autorotate",
      },
    },
    { selector: 'edge[nm="1"]', style: { "line-style": "dashed" } },
    { selector: "edge[?loop]", style: { "curve-style": "bezier", "loop-direction": "-45deg", "loop-sweep": "-30deg", "control-point-step-size": 60, "text-margin-y": -8, "line-color": "#6b4fbb", "target-arrow-color": "#6b4fbb", width: 2 } },
    { selector: "edge.tostub", style: { "line-style": "dotted", "line-color": "#c4ccd6", "target-arrow-color": "#c4ccd6" } },
    { selector: "edge.emph", style: { "line-opacity": 1, width: 2.2, "line-color": "#e63329", "target-arrow-color": "#e63329", "text-opacity": 1, "z-index": 30 } },
    { selector: "edge.showlabel", style: { "text-opacity": 1 } },
    // ---- collaboration overlay markers ----
    { selector: "edge[?proposed]", style: { "line-style": "dashed", "line-color": "#1a8a4a", "target-arrow-color": "#1a8a4a", width: 2, "line-opacity": 0.95, "text-opacity": 1, color: "#14663a" } },
    { selector: "node[?added]", style: { "border-color": "#1a8a4a", "border-width": 3, "border-style": "solid" } },
    { selector: "node[?moved]", style: { "border-color": "#c67700", "border-width": 2.5, "border-style": "dashed" } },
    { selector: "node.hascomment", style: { "border-color": "#c67700", "border-width": 2.5, "border-style": "double" } },
    { selector: ".faded", style: { opacity: 0.35 } },
    // neighbours of a selection stay full-opacity in their own TIER colour (per the legend) and just
    // sit on top — no coloured ring, since a blue/navy ring would masquerade as a coverage tier
    { selector: "node.neighbor", style: { "z-index": 20 } },
    { selector: "node.sel", style: { "border-color": "#e63329", "border-width": 4 } },
    { selector: "node.searchhit", style: { "border-color": "#c67700", "border-width": 4 } },
  ],
});

// ---------- element builders ----------
const commentClass = (id) => (M.comments.has(id) ? " hascomment" : "");
function domainNode(id, role) {
  const d = domainsById.get(id);
  return { data: { id, label: d.label, ntype: "domain", kind: d.kind, role, meaning: d.description || "" }, classes: commentClass(id).trim() };
}
function blockNode(id, role) {
  const b = blocksById.get(id);
  return { data: { id, label: b.label, ntype: "block", kind: "block", tier: b.tier, meaning: b.meaning, parent: b.domain, role, added: b.added || undefined, moved: b.moved || undefined }, classes: commentClass(id).trim() };
}
function termNode(id) {
  const t = termsById.get(id);
  return { data: { id, label: t.label, ntype: "term", kind: "term", tier: t.tier, meaning: t.meaning, nonEntity: t.nonEntity || undefined, parent: t.block || t.domain, added: t.added || undefined, moved: t.moved || undefined }, classes: commentClass(id).trim() };
}
function metaNode(id) {
  const m = metaById.get(id);
  return { data: { id, label: m.label, ntype: "meta", kind: "meta", tier: "meta", meaning: m.meaning } };
}
function edgeEl(source, target, r, extra = {}) {
  return {
    data: {
      id: "e_" + source + "→" + target + "_" + (r.predicate || ""),
      source, target,
      elabel: [r.predicate, r.card].filter(Boolean).join(" "),
      nm: r.card === "N:M" ? "1" : "0",
      loop: source === target || undefined,
      preds: r.predicate, cards: r.card, note: r.note || "", proposed: r.proposed || undefined,
      ...extra,
    },
  };
}

// ---------- drilled view ----------
function buildDrilled() {
  const { depth, tiers, crossOnly, domains } = state;
  const visBlocks = new Set(), visTerms = new Set(), visDomains = new Set(), visMeta = new Set();
  const domOn = (id) => domains.has(id); // domain multiselect

  if (depth === "term") {
    for (const t of M.terms) if (tiers.has(t.tier) && domOn(t.domain)) visTerms.add(t.id);
    for (const b of M.blocks) if (domOn(b.domain) && (tiers.has(b.tier) || [...visTerms].some((tid) => termsById.get(tid).block === b.id))) visBlocks.add(b.id);
  } else if (depth === "block") {
    for (const b of M.blocks) if (tiers.has(b.tier) && domOn(b.domain)) visBlocks.add(b.id);
  }
  for (const b of visBlocks) visDomains.add(blocksById.get(b).domain);
  for (const t of visTerms) visDomains.add(termsById.get(t).domain);
  if (depth === "domain") for (const b of M.blocks) if (tiers.has(b.tier) && domOn(b.domain)) visDomains.add(b.domain);

  const isVis = (id) => {
    const k = kindOf(id);
    if (k === "term") return visTerms.has(id);
    if (k === "block") return visBlocks.has(id);
    if (k === "meta") return visMeta.has(id);
    return visDomains.has(id);
  };

  // decide meta visibility: show a meta node if it has a visible incident endpoint
  for (const r of M.relationships) {
    const s = atDepth(r.source, depth), t = atDepth(r.target, depth);
    if (kindOf(s) === "meta" && (visTerms.has(atDepth(r.target, depth)) || visBlocks.has(atDepth(r.target, depth)) || visDomains.has(atDepth(r.target, depth)))) visMeta.add(s);
    if (kindOf(t) === "meta" && (visTerms.has(atDepth(r.source, depth)) || visBlocks.has(atDepth(r.source, depth)) || visDomains.has(atDepth(r.source, depth)))) visMeta.add(t);
  }

  const nodes = [];
  for (const id of visDomains) nodes.push(domainNode(id, "compound"));
  if (depth !== "domain") for (const id of visBlocks) {
    const hasKids = depth === "term" && [...visTerms].some((tid) => termsById.get(tid).block === id);
    nodes.push(blockNode(id, hasKids ? "compound" : "leaf"));
  }
  if (depth === "term") for (const id of visTerms) nodes.push(termNode(id));
  for (const id of visMeta) nodes.push(metaNode(id));

  const agg = new Map();
  for (const r of M.relationships) {
    const s = atDepth(r.source, depth), t = atDepth(r.target, depth);
    if (!s || !t) continue;
    if (s === t && kindOf(s) !== "term") continue; // keep term self-loops, drop aggregated ones
    if (!isVis(s) || !isVis(t)) continue;
    if (crossOnly && domainOf(s) && domainOf(s) === domainOf(t)) continue;
    const key = s + "→" + t;
    let e = agg.get(key);
    if (!e) { e = { source: s, target: t, cards: new Set(), preds: new Set(), notes: new Set(), count: 0, proposed: false }; agg.set(key, e); }
    if (r.card) e.cards.add(r.card);
    if (r.predicate) e.preds.add(r.predicate);
    if (r.note) e.notes.add(r.note);
    if (r.proposed) e.proposed = true;
    e.count++;
  }
  const edges = [];
  for (const [, e] of agg) {
    const cards = [...e.cards];
    const elabel = depth === "term" ? ([...e.preds][0] || "") + (cards[0] ? " " + cards[0] : "") : (e.count > 1 ? `${e.count}×` : [...e.preds][0] || "");
    edges.push({ data: {
      id: "e_" + e.source + "→" + e.target, source: e.source, target: e.target, elabel,
      nm: cards.includes("N:M") ? "1" : "0", loop: e.source === e.target || undefined,
      preds: [...e.preds].join(", "), cards: cards.join(", "), note: [...e.notes].filter(Boolean).join(" · "), count: e.count, proposed: e.proposed || undefined,
    } });
  }
  return [...nodes, ...edges];
}

// ---------- single-domain view ----------
function buildSingle(domId) {
  const iTerms = M.terms.filter((t) => t.domain === domId);
  const iBlocks = M.blocks.filter((b) => b.domain === domId);
  const inside = new Set([domId, ...iBlocks.map((b) => b.id), ...iTerms.map((t) => t.id)]);

  const nodes = [domainNode(domId, "compound")];
  for (const b of iBlocks) {
    const hasKids = iTerms.some((t) => t.block === b.id);
    nodes.push(blockNode(b.id, hasKids ? "compound" : "leaf"));
  }
  for (const t of iTerms) nodes.push(termNode(t.id));

  // cross-domain endpoints stay VISIBLE as individual stubs, but each lives inside a small basket
  // (compound) for its home domain — so you see the actual external terms, clustered by domain.
  const edges = [];
  const groups = new Map(); // extDomain key ("__meta" for meta-scopes) → basket
  const extStubs = new Map(); // external endpoint id → its stub node info
  const ensureGroup = (key) => {
    const gid = "dgrp_" + key;
    if (!groups.has(gid)) {
      const isMeta = key === "__meta";
      groups.set(gid, { id: gid, key, isMeta, label: isMeta ? "Meta-scope" : (domainsById.get(key)?.label || key) });
    }
    return gid;
  };
  const ensureStub = (extId, dir) => {
    const sid = "stub_" + extId;
    let s = extStubs.get(sid);
    if (!s) {
      const key = domainOf(extId) || "__meta";
      s = { id: sid, extId, parent: ensureGroup(key), dir, label: nodeById.get(extId)?.label || extId, tier: tierOf(extId), extDomain: key === "__meta" ? null : key };
      extStubs.set(sid, s);
    } else if (s.dir !== dir) s.dir = "both";
    return sid;
  };
  const edgeAgg = new Map(); // (insideId, stubId, dir) → aggregated edge to a stub
  const addStubEdge = (insideId, stubId, dir, r) => {
    const k = insideId + "|" + stubId + "|" + dir;
    let e = edgeAgg.get(k);
    if (!e) { e = { insideId, stubId, dir, preds: new Set(), cards: new Set(), count: 0 }; edgeAgg.set(k, e); }
    if (r.predicate) e.preds.add(r.predicate);
    if (r.card) e.cards.add(r.card);
    e.count++;
  };
  for (const r of M.relationships) {
    const sIn = inside.has(r.source), tIn = inside.has(r.target);
    if (sIn && tIn) { edges.push(edgeEl(r.source, r.target, r)); continue; }
    if (sIn) { addStubEdge(r.source, ensureStub(r.target, "out"), "out", r); }
    else if (tIn) { addStubEdge(r.target, ensureStub(r.source, "in"), "in", r); }
  }
  // basket direction = aggregate of its stubs' directions (drives left/right column placement)
  const groupDir = new Map();
  for (const s of extStubs.values()) {
    const cur = groupDir.get(s.parent);
    groupDir.set(s.parent, cur === undefined ? s.dir : cur === s.dir ? cur : "both");
  }
  for (const g of groups.values()) {
    nodes.push({ data: { id: g.id, label: g.label, ntype: "stubgroup", kind: "stubgroup", dir: groupDir.get(g.id) || "out", extDomain: g.isMeta ? null : g.key } });
  }
  for (const s of extStubs.values()) {
    nodes.push({ data: { id: s.id, label: s.label, kind: "stub", ntype: "stub", parent: s.parent, dir: s.dir, tier: s.tier, extId: s.extId, extDomain: s.extDomain, meaning: meaningOf(s.extId) }, classes: `stub stub-${s.dir}` });
  }
  for (const e of edgeAgg.values()) {
    const src = e.dir === "in" ? e.stubId : e.insideId;
    const tgt = e.dir === "in" ? e.insideId : e.stubId;
    const cards = [...e.cards];
    edges.push({ data: { id: "es_" + e.insideId + "_" + e.stubId + "_" + e.dir, source: src, target: tgt,
      elabel: ([...e.preds][0] || "") + (e.count > 1 ? ` ·${e.count}` : ""),
      preds: [...e.preds].join(", "), cards: cards.join(", "), nm: cards.includes("N:M") ? "1" : "0", count: e.count },
      classes: "tostub" });
  }
  return [...nodes, ...edges];
}

// ---------- layouts ----------
// No force layout anywhere: both views use the same deterministic basket packer. The drilled view
// packs all domains into a grid (layoutDrilled); the single-domain view packs the focused domain's
// interior tightly and lines its cross-domain stubs up in columns beside it (layoutSingle).

// ---------- deterministic drilled layout: baskets in a grid ----------
// Position ONLY leaf (:childless) nodes; Cytoscape auto-sizes each compound parent to
// bound its children + its style padding. Footprints are computed analytically so packing
// never needs to read a parent's boundingBox (which isn't reliable mid-layout).
const DOMAIN_PAD = 40; // MUST match node[ntype="domain"]:parent padding in the cytoscape style block
const BLOCK_PAD = 34; //  MUST match node[ntype="block"]:parent padding in the cytoscape style block
// Cytoscape draws compound labels ABOVE the box (text-valign:top), so reserve an empty band on top
// of each basket's footprint for its (possibly 2-line) title — else a lower basket's title collides
// with the basket above it.
const DOMAIN_BAND = 28;
const BLOCK_BAND = 24;
const STUB_PAD = 24; // single-view neighbour baskets (MUST match node[ntype="stubgroup"] padding)
const STUB_BAND = 22;
const CELL_GAP = 22; //   gap between children inside a basket
const OUTER_GUTTER = 52; // gap between baskets

// measure a (possibly wrapping) label's rendered max-line width, so a basket's footprint can
// reserve room for a title wider than its child content (else wide titles overlap neighbours)
let _measureCtx;
function measureLabelW(text, fontPx, weight, maxW) {
  if (!text) return 0;
  if (!_measureCtx) _measureCtx = document.createElement("canvas").getContext("2d");
  _measureCtx.font = `${weight || 400} ${fontPx}px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;
  const full = _measureCtx.measureText(text).width;
  if (full <= maxW) return Math.ceil(full);
  const words = text.split(/\s+/);
  let line = "", max = 0;
  for (const w of words) {
    const t = line ? line + " " + w : w;
    if (_measureCtx.measureText(t).width > maxW && line) { max = Math.max(max, _measureCtx.measureText(line).width); line = w; }
    else line = t;
  }
  return Math.ceil(Math.min(Math.max(max, _measureCtx.measureText(line).width), maxW));
}

// shelf-aligned grid pack: per-column max width, per-row max height; boxes centered in their cell
function packBoxes(boxes, cols, gap) {
  const n = boxes.length;
  cols = Math.max(1, Math.min(cols, n || 1));
  const rows = Math.ceil(n / cols);
  const colW = new Array(cols).fill(0), rowH = new Array(rows).fill(0);
  boxes.forEach((b, i) => { const c = i % cols, r = (i / cols) | 0; colW[c] = Math.max(colW[c], b.w); rowH[r] = Math.max(rowH[r], b.h); });
  const colX = [], rowY = [];
  let ax = 0; for (let c = 0; c < cols; c++) { colX[c] = ax; ax += colW[c] + gap; }
  let ay = 0; for (let r = 0; r < rows; r++) { rowY[r] = ay; ay += rowH[r] + gap; }
  const placements = boxes.map((b, i) => { const c = i % cols, r = (i / cols) | 0; return { x: colX[c] + (colW[c] - b.w) / 2, y: rowY[r] + (rowH[r] - b.h) / 2 }; });
  return { placements, w: Math.max(0, ax - gap), h: Math.max(0, ay - gap) };
}

// lay out a compound's interior; returns leaf CENTER positions in a local frame whose (0,0)
// is the top-left of the packed content area, plus the content w/h (padding-excluded)
function intraLayout(parentNode) {
  const kids = parentNode.children();
  const items = [];
  kids.forEach((ch) => {
    if (ch.isParent()) {
      const inner = intraLayout(ch);
      // reserve room for a block title wider than its child content (text-max-width 200, bold 12)
      const lblW = measureLabelW(ch.data("label"), 12, 700, 200) + 10;
      items.push({ node: ch, inner, w: Math.max(inner.w + 2 * BLOCK_PAD, lblW), h: inner.h + 2 * BLOCK_PAD + BLOCK_BAND });
    } else {
      items.push({ node: ch, w: ch.outerWidth(), h: ch.outerHeight() });
    }
  });
  const cols = Math.max(1, Math.ceil(Math.sqrt(items.length)));
  const { placements, w, h } = packBoxes(items, cols, CELL_GAP);
  const leafPositions = [];
  placements.forEach((pl, i) => {
    const it = items[i];
    if (it.inner) { // compound block: center content horizontally; drop below the top label band
      const ox = pl.x + (it.w - it.inner.w) / 2, oy = pl.y + BLOCK_PAD + BLOCK_BAND;
      it.inner.leafPositions.forEach((lp) => leafPositions.push({ node: lp.node, x: ox + lp.x, y: oy + lp.y }));
    } else {
      leafPositions.push({ node: it.node, x: pl.x + it.w / 2, y: pl.y + it.h / 2 });
    }
  });
  return { leafPositions, w, h };
}

function layoutDrilled() {
  const depth = state.depth;
  const outerCols = depth === "term" ? 3 : 4;
  const positions = [];

  // footprint + deferred placement for one top-level item (domain / layer / meta node)
  const footprintFor = (node) => {
    if (depth === "domain" || node.isChildless()) {
      const w = node.outerWidth(), h = node.outerHeight();
      return { w, h, place: (px, py) => positions.push({ node, x: px + w / 2, y: py + h / 2 }) };
    }
    const inner = intraLayout(node);
    const lblW = measureLabelW(node.data("label"), 13, 700, 220) + 12;
    const w = Math.max(inner.w + 2 * DOMAIN_PAD, lblW), h = inner.h + 2 * DOMAIN_PAD + DOMAIN_BAND;
    return { w, h, place: (px, py) => {
      const ox = px + (w - inner.w) / 2, oy = py + DOMAIN_PAD + DOMAIN_BAND;
      inner.leafPositions.forEach((lp) => positions.push({ node: lp.node, x: ox + lp.x, y: oy + lp.y }));
    } };
  };

  const domNodes = cy.nodes('[ntype="domain"]');
  const layerDomains = domNodes.filter((n) => domainsById.get(n.id())?.kind === "layer");
  const realDomains = domNodes.not(layerDomains); // any non-layer domain node → main grid (never dropped)
  const metaNodes = cy.nodes('[kind="meta"]');

  // main grid = real domains
  const mainBoxes = realDomains.map(footprintFor);
  const packedMain = packBoxes(mainBoxes, outerCols, OUTER_GUTTER);
  packedMain.placements.forEach((pl, i) => mainBoxes[i].place(pl.x, pl.y));

  // cross-cutting lane below: layers + meta nodes in one shelf row
  const laneNodes = layerDomains.union(metaNodes);
  if (laneNodes.nonempty()) {
    const laneBoxes = laneNodes.map(footprintFor);
    const packedLane = packBoxes(laneBoxes, laneBoxes.length, OUTER_GUTTER);
    const laneY = packedMain.h + OUTER_GUTTER;
    packedLane.placements.forEach((pl, i) => laneBoxes[i].place(pl.x, pl.y + laneY));
  }

  cy.batch(() => positions.forEach((p) => p.node.position({ x: p.x, y: p.y })));
}

// single-domain view: focused domain packed at the centre; each neighbour domain a small basket of
// its actual external stubs, stacked in a left column (incoming) and right column (outgoing/both).
function layoutSingle() {
  const positions = [];
  const dom = cy.getElementById(state.focusDomain);
  let fw = 0, fh = 0;
  if (dom.nonempty() && dom.isParent()) {
    const inner = intraLayout(dom);
    fw = inner.w + 2 * DOMAIN_PAD; fh = inner.h + 2 * DOMAIN_PAD + DOMAIN_BAND;
    const ox = DOMAIN_PAD, oy = DOMAIN_PAD + DOMAIN_BAND;
    inner.leafPositions.forEach((lp) => positions.push({ node: lp.node, x: ox + lp.x, y: oy + lp.y }));
  }

  const fpFor = (g) => {
    const inner = intraLayout(g);
    const w = Math.max(inner.w + 2 * STUB_PAD, measureLabelW(g.data("label"), 11, 700, 200) + 10);
    return { inner, w, h: inner.h + 2 * STUB_PAD + STUB_BAND };
  };
  const left = [], right = [];
  cy.nodes('[ntype="stubgroup"]').forEach((g) => { const fp = fpFor(g); (g.data("dir") === "in" ? left : right).push(fp); });

  const COL_GAP = 26, SIDE_GAP = 80;
  const placeCol = (col, xInner, toLeft) => {
    const totalH = col.reduce((a, f) => a + f.h, 0) + COL_GAP * Math.max(0, col.length - 1);
    let y = fh / 2 - totalH / 2;
    for (const f of col) {
      const x = toLeft ? xInner - f.w : xInner; // left baskets end at xInner; right baskets start at xInner
      const ox = x + (f.w - f.inner.w) / 2, oy = y + STUB_PAD + STUB_BAND;
      f.inner.leafPositions.forEach((lp) => positions.push({ node: lp.node, x: ox + lp.x, y: oy + lp.y }));
      y += f.h + COL_GAP;
    }
  };
  placeCol(left, -SIDE_GAP, true);
  placeCol(right, fw + SIDE_GAP, false);

  cy.batch(() => positions.forEach((p) => p.node.position({ x: p.x, y: p.y })));
}

// ---------- render dispatch ----------
const cyEl = document.getElementById("cy");
const overviewEl = document.getElementById("overview");
const focusHeader = document.getElementById("focus-header");

function render() {
  document.getElementById("drilled-controls").classList.toggle("hidden", state.view !== "drilled");
  document.getElementById("btn-fit").classList.toggle("hidden", state.view === "overview");
  document.getElementById("btn-png").classList.toggle("hidden", state.view === "overview");
  state.selectedId = null;
  document.getElementById("detail").classList.add("hidden");
  cy.elements().remove();

  if (state.view === "overview") {
    overviewEl.classList.remove("hidden");
    cyEl.style.visibility = "hidden";
    focusHeader.classList.add("hidden");
    document.getElementById("detail").classList.add("hidden");
    renderOverview();
    updateStats();
    return;
  }
  overviewEl.classList.add("hidden");
  cyEl.style.visibility = "visible";

  const els = state.view === "single" ? buildSingle(state.focusDomain) : buildDrilled();
  cy.add(els);
  applyLabelVisibility();
  if (state.view === "drilled") layoutDrilled(); // deterministic — positions leaves; parents auto-size
  else layoutSingle();
  if (cy.nodes().nonempty()) cy.fit(undefined, 50);

  if (state.view === "single") renderFocusHeader(); else focusHeader.classList.add("hidden");
  updateStats();
  updateTierCounts();
}

// count per tier at the CURRENT depth, within the selected domains (shown next to the tier boxes):
// term depth → terms; block depth → blocks; domain depth → domains that own a block of that tier
function updateTierCounts() {
  const c = { managed: 0, secondary: 0, mentioned: 0 };
  if (state.depth === "term") {
    for (const t of M.terms) if (state.domains.has(t.domain) && c[t.tier] !== undefined) c[t.tier]++;
  } else if (state.depth === "domain") {
    const seen = { managed: new Set(), secondary: new Set(), mentioned: new Set() };
    for (const b of M.blocks) if (state.domains.has(b.domain) && seen[b.tier]) seen[b.tier].add(b.domain);
    for (const k of ["managed", "secondary", "mentioned"]) c[k] = seen[k].size;
  } else {
    for (const b of M.blocks) if (state.domains.has(b.domain) && c[b.tier] !== undefined) c[b.tier]++;
  }
  for (const t of ["managed", "secondary", "mentioned"]) {
    const el = document.getElementById("cnt-" + t);
    if (el) el.textContent = `(${c[t]})`;
  }
}

function applyLabelVisibility() {
  cy.batch(() => cy.edges().toggleClass("showlabel", state.showAllLabels));
}

// ---------- overview ----------
function renderOverview() {
  const doms = M.domains.filter((d) => d.kind === "domain");
  const layers = M.domains.filter((d) => d.kind === "layer");
  const adjByDom = new Map();
  for (const a of M.domainAdjacency) {
    if (!adjByDom.has(a.source)) adjByDom.set(a.source, []);
    adjByDom.get(a.source).push(a);
  }
  const card = (d) => {
    const cov = d.coverage;
    const total = cov.blocks || 1;
    const seg = (cls, n) => (n ? `<span class="${cls}" style="width:${(n / total) * 100}%"></span>` : "");
    const links = (adjByDom.get(d.id) || []).sort((a, b) => b.count - a.count).slice(0, 4)
      .map((a) => `<span class="chip">${domainsById.get(a.target)?.label.split(" ")[0] || a.target} ·${a.count}</span>`).join("");
    return `<div class="dcard ${d.kind}" data-id="${d.id}">
      <h3>${d.label}</h3>
      <div class="desc">${d.description || ""}</div>
      <div class="covbar">${seg("c-managed", cov.managed)}${seg("c-secondary", cov.secondary)}${seg("c-mentioned", cov.mentioned)}</div>
      <div class="counts"><span>${cov.blocks} blocks · ${cov.terms} terms</span><span>${cov.managed} managed · ${cov.secondary} sec · ${cov.mentioned} ment</span></div>
      ${links ? `<div class="chips">${links}</div>` : ""}
      <div class="focus-cta">Open domain →</div>
    </div>`;
  };
  overviewEl.innerHTML =
    `<div class="ov-head"><h2>Software Organization Domain Model</h2>
       <p>${M.counts.domains} domains, ${M.counts.blocks} blocks, ${M.counts.terms} terms. Open a domain to see its structure, or “Explore all” for the full graph.</p></div>
     <div class="card-grid">${doms.map(card).join("")}</div>
     <div class="ov-section-label">Cross-cutting layers</div>
     <div class="card-grid">${layers.map(card).join("")}</div>`;
  overviewEl.querySelectorAll(".dcard").forEach((el) => {
    el.onclick = () => openDomain(el.dataset.id);
  });
}

function openDomain(id) {
  state.view = "single";
  state.focusDomain = id;
  document.querySelectorAll("#view button").forEach((b) => b.classList.remove("active"));
  render();
}

function renderFocusHeader() {
  const d = domainsById.get(state.focusDomain);
  if (!d) return;
  focusHeader.classList.remove("hidden");
  focusHeader.innerHTML =
    `<a id="crumb-all" class="fh-back">‹ All domains</a>` +
    `<span class="fh-sep">/</span>` +
    `<span class="fh-title">${d.label}</span>` +
    `<span class="fh-meta">${d.coverage.blocks} blocks · ${d.coverage.terms} terms</span>` +
    `<span class="fh-hint">double-click a stub → its domain</span>`;
  focusHeader.querySelector("#crumb-all").onclick = () => { state.view = "overview"; setViewButtons("overview"); render(); };
}

// ---------- detail panel ----------
const detail = document.getElementById("detail");
const detailBody = document.getElementById("detail-body");
document.getElementById("detail-close").onclick = () => { detail.classList.add("hidden"); state.selectedId = null; cy.elements().removeClass("faded neighbor sel emph"); };
document.getElementById("detail-min").onclick = () => {
  const collapsed = detail.classList.toggle("collapsed");
  document.getElementById("detail-min").textContent = collapsed ? "+" : "–";
};

function relsForNode(id) {
  const k = kindOf(id);
  const bump = (map, key, pred, other, card, incoming) => {
    let e = map.get(key);
    if (!e) { e = { pred, other, card, count: 0, incoming }; map.set(key, e); }
    e.count++;
  };
  if (k === "term" || k === "meta" || k === "layer") {
    const out = new Map(), inc = new Map();
    for (const r of M.relationships) {
      if (r.source === id) bump(out, r.predicate + "|" + r.target, r.predicate, r.target, r.card, false);
      if (r.target === id && !r.loop) bump(inc, r.predicate + "|" + r.source, r.predicate, r.source, r.card, true);
    }
    return { out: [...out.values()], inc: [...inc.values()] };
  }
  const members = new Set([id]);
  if (k === "domain") { M.blocks.filter((b) => b.domain === id).forEach((b) => members.add(b.id)); M.terms.filter((t) => t.domain === id).forEach((t) => members.add(t.id)); }
  else members.add(id), M.terms.filter((t) => t.block === id).forEach((t) => members.add(t.id));
  const out = new Map(), inc = new Map();
  for (const r of M.relationships) {
    const sIn = members.has(r.source), tIn = members.has(r.target);
    if (sIn && !tIn) bump(out, r.predicate + "|" + r.target, r.predicate, r.target, r.card, false);
    if (tIn && !sIn) bump(inc, r.predicate + "|" + r.source, r.predicate, r.source, r.card, true);
  }
  return { out: [...out.values()], inc: [...inc.values()] };
}

function setDetailTitle(text) { document.getElementById("detail-title").textContent = text; }
function showDetail(id) {
  let canvasId = id; // the node actually on canvas (a stub / basket keeps its own highlight)
  detail.classList.remove("collapsed"); // expand fresh on each new selection
  if (String(id).startsWith("stub_")) { id = cy.getElementById(id).data("extId"); } // stub → its external term
  else if (String(id).startsWith("dgrp_")) { // neighbour basket → that domain's detail
    const st = cy.getElementById(id);
    const ext = st.data("extDomain");
    if (ext && domainsById.has(ext)) { id = ext; }
    else { // meta bucket → minimal panel
      setDetailTitle(st.data("label"));
      detailBody.innerHTML = `<div class="meta">cross-domain group</div>` +
        `<div class="note">External endpoints in this group; double-click a member to open its domain.</div>`;
      detail.classList.remove("hidden");
      highlightNeighborhood(canvasId);
      return;
    }
  }
  const node = nodeById.get(id);
  if (!node) return;
  const k = kindOf(id);
  const dom = domainOf(id) ? domainsById.get(domainOf(id)) : null;
  const badge = k === "term" || k === "block" ? `<span class="badge ${tierOf(id)}">${tierOf(id)}</span>` : "";
  const out = [];
  setDetailTitle(node.label);
  out.push(`<div class="meta">${k}${dom ? " · " + dom.label : ""} ${badge}</div>`);
  const mean = meaningOf(id);
  if (mean) out.push(`<p class="meaning">${mean}</p>`);
  if (node.nonEntity) out.push(`<div class="nonentity">Not a separate entity — a scoped view; see its parent term.</div>`);

  const { out: og, inc } = relsForNode(id);
  if (k === "domain" || k === "block") out.push(`<div class="note">Relationships rolled up from this ${k}'s terms.</div>`);
  if (og.length) { out.push('<div class="rel-group"><h4>Relates to</h4>'); og.forEach((r) => out.push(relRow(r))); out.push("</div>"); }
  if (inc.length) { out.push('<div class="rel-group"><h4>Referenced by</h4>'); inc.forEach((r) => out.push(relRow(r))); out.push("</div>"); }
  if (!og.length && !inc.length) out.push('<div class="note">No catalogued relationships.</div>');

  const cmts = M.comments.get(id) || [];
  if (cmts.length) {
    out.push('<div class="rel-group"><h4>Comments</h4>');
    cmts.forEach((c) => out.push(`<div class="cmt"><div class="cmt-txt">${esc(c.text)}</div><div class="cmt-by">${esc(c.author)} · ${fmtDate(c.at)}</div></div>`));
    out.push("</div>");
  }
  // edit actions (only for real model nodes, not meta)
  if (k === "term" || k === "block" || k === "domain") {
    out.push('<div class="edit-actions">' +
      `<button data-ed="rename">Rename</button>` +
      (k !== "domain" ? `<button data-ed="reparent">Move</button>` : "") +
      (k !== "domain" ? `<button data-ed="tier">Set tier</button>` : "") +
      `<button data-ed="propose">Propose link</button>` +
      `<button data-ed="comment">Comment</button>` +
      "</div>");
  }

  detailBody.innerHTML = out.join("");
  detail.classList.remove("hidden");
  detailBody.querySelectorAll(".obj").forEach((el) => { el.onclick = () => focusNode(el.dataset.id); });
  detailBody.querySelectorAll("[data-ed]").forEach((btn) => { btn.onclick = () => openEditor(btn.dataset.ed, { id }); });
  highlightNeighborhood(canvasId);
}
function relRow(r) {
  const other = nodeById.get(r.other);
  const label = other ? other.label : r.other;
  const arrow = r.incoming ? "←" : "→";
  return `<div class="rel"><span class="pred">${arrow} ${r.pred}</span>` +
    `<span class="obj" data-id="${r.other}">${label}</span>` +
    (r.count > 1 ? `<span class="count">×${r.count}</span>` : "") +
    (r.card ? `<span class="card">${r.card}</span>` : "") + "</div>";
}
function highlightNeighborhood(id) {
  cy.elements().removeClass("faded neighbor sel emph");
  cy.nodes().not(cy.getElementById(id)).removeClass("searchhit");
  const n = cy.getElementById(id);
  if (n.empty()) return;
  state.selectedId = id;
  cy.startBatch();
  const nbrs = n.neighborhood();
  // keep visible: the node, its neighbours + edges, its own ancestors/children, AND the neighbours'
  // containing baskets — so the linked terms sit on a readable (un-faded) backdrop
  const hood = n.closedNeighborhood().union(n.ancestors()).union(n.descendants()).union(nbrs.ancestors());
  cy.elements().not(hood).addClass("faded");
  nbrs.nodes().addClass("neighbor");
  n.connectedEdges().addClass("emph");
  n.addClass("sel");
  cy.endBatch();
}

function showEdgeDetail(edge) {
  const d = edge.data(), src = edge.source(), tgt = edge.target();
  detail.classList.remove("collapsed");
  setDetailTitle(d.proposed ? "Proposed link" : "Relationship");
  const out = [
    `<div class="meta">${d.preds || d.elabel || ""}${d.cards ? " · " + d.cards : ""}</div>`,
    `<div class="rel"><span class="obj" data-id="${src.id()}">${src.data("label")}</span>` +
      `<span class="pred">→ ${d.preds || ""}</span>` +
      `<span class="obj" data-id="${tgt.id()}">${tgt.data("label")}</span></div>`,
  ];
  if (d.note) out.push(`<p class="meaning">${d.note}</p>`);
  if (d.count > 1) out.push(`<div class="note">${d.count} underlying relationships aggregated.</div>`);
  detailBody.innerHTML = out.join("");
  detail.classList.remove("hidden");
  detailBody.querySelectorAll(".obj").forEach((el) => { el.onclick = () => focusNode(el.dataset.id); });

  state.selectedId = edge.id();
  cy.elements().removeClass("faded neighbor sel emph");
  cy.startBatch();
  const ends = edge.connectedNodes();
  cy.elements().not(edge.union(ends).union(ends.ancestors())).addClass("faded");
  ends.addClass("neighbor");
  edge.addClass("emph");
  cy.endBatch();
}

cy.on("tap", (e) => { if (e.target === cy) { state.selectedId = null; cy.elements().removeClass("faded neighbor sel emph searchhit"); detail.classList.add("hidden"); } });
cy.on("tap", "node", (e) => showDetail(e.target.id()));
cy.on("tap", "edge", (e) => showEdgeDetail(e.target));
cy.on("dblclick", "node", (e) => {
  const n = e.target;
  if (n.data("kind") === "stub" || n.data("ntype") === "stubgroup") { const ed = n.data("extDomain"); if (ed) openDomain(ed); }
  else if (n.data("ntype") === "domain" && domainsById.get(n.id())?.kind === "domain") openDomain(n.id());
});

// ---------- tooltips ----------
const tooltip = document.getElementById("tooltip");
function moveTip(e) {
  const p = e.renderedPosition || e.position;
  const stage = document.getElementById("stage");
  const sw = stage.clientWidth, sh = stage.clientHeight;
  const tw = tooltip.offsetWidth, th = tooltip.offsetHeight;
  // default down-right of the cursor; flip to the other side if it would spill off the stage
  let x = p.x + 14 + tw > sw ? p.x - 14 - tw : p.x + 14;
  let y = p.y + 12 + th > sh ? p.y - 12 - th : p.y + 12;
  // final clamp so the tip can never leave the stage (→ no page scrollbars)
  x = Math.max(4, Math.min(x, sw - tw - 4));
  y = Math.max(4, Math.min(y, sh - th - 4));
  tooltip.style.left = x + "px";
  tooltip.style.top = y + "px";
}
cy.on("mouseover", "node", (e) => {
  const n = e.target, d = n.data();
  // no tooltip on the big compound containers (they blanket the canvas); click opens full detail
  const bigBox = d.ntype === "block" || d.ntype === "domain" || d.ntype === "stubgroup";
  if (bigBox) tooltip.classList.add("hidden");
  else {
    tooltip.innerHTML = `<b>${d.label}</b>` + (d.meaning ? `<br><span class="tc">${truncate(d.meaning, 150)}</span>` : "");
    tooltip.classList.remove("hidden");
    moveTip(e); // position (and clamp) immediately, don't wait for the first mousemove
  }
  if (!state.selectedId) cy.batch(() => { cy.edges().removeClass("emph"); n.connectedEdges().addClass("emph"); });
});
cy.on("mouseover", "edge", (e) => {
  const d = e.target.data();
  tooltip.innerHTML = `${nodeById.get(d.source)?.label ?? d.source} <span class="tc">${d.preds}</span> ${nodeById.get(d.target)?.label ?? d.target}` +
    (d.cards ? ` · <span class="tc">${d.cards}</span>` : "") + (d.note ? `<br><span class="tc">${truncate(d.note, 120)}</span>` : "");
  tooltip.classList.remove("hidden");
  moveTip(e);
  if (!state.selectedId) e.target.addClass("emph");
});
cy.on("mousemove", "node", moveTip);
cy.on("mousemove", "edge", moveTip);
cy.on("mouseout", "node, edge", () => { tooltip.classList.add("hidden"); if (!state.selectedId) cy.edges().removeClass("emph"); });

function focusNode(id) {
  // already on the current canvas → just focus it
  if (cy.getElementById(id).nonempty()) { afterFocus(id); return; }
  // off-canvas: route to where it lives
  const dm = domainOf(id);
  if (state.view === "drilled") {
    let changed = false;
    const tr = tierOf(id);
    if (tr !== "meta" && !state.tiers.has(tr)) { state.tiers.add(tr); const cb = document.getElementById("tier-" + tr); if (cb) cb.checked = true; changed = true; }
    // the target may be filtered out by DEPTH too — deepen so it can render
    const k = kindOf(id), order = { domain: 0, block: 1, term: 2 };
    const need = k === "term" ? "term" : k === "block" ? "block" : state.depth;
    if (order[need] > order[state.depth]) {
      state.depth = need;
      document.querySelectorAll("#depth button").forEach((b) => b.classList.toggle("active", b.dataset.depth === need));
      changed = true;
    }
    if (changed) render();
    setTimeout(() => afterFocus(id), 120);
    return;
  }
  if (dm) { openDomain(dm); setTimeout(() => afterFocus(id), 200); return; } // overview / single → open its domain
  afterFocus(id);
}
function afterFocus(id) {
  const n = cy.getElementById(id);
  if (n.empty()) return;
  showDetail(id);
  const cw = cyEl.clientWidth, ch = cyEl.clientHeight;
  const panelLeft = cw - 320 - 28; // detail panel = 320px + margins
  const bb = n.renderedBoundingBox();
  const offscreen = bb.x1 < 0 || bb.y1 < 0 || bb.x2 > cw || bb.y2 > ch;
  const behindPanel = bb.x2 > panelLeft;
  if (offscreen || behindPanel) cy.animate({ center: { eles: n } }, { duration: 350 }); // pan only, keep zoom
}

// ---------- controls ----------
function setViewButtons(v) { document.querySelectorAll("#view button").forEach((b) => b.classList.toggle("active", b.dataset.view === v)); }
document.querySelectorAll("#view button").forEach((btn) => {
  btn.onclick = () => { state.view = btn.dataset.view; if (state.view === "drilled") state.focusDomain = null; setViewButtons(state.view); render(); };
});
document.querySelectorAll("#depth button").forEach((btn) => {
  btn.onclick = () => { document.querySelectorAll("#depth button").forEach((b) => b.classList.remove("active")); btn.classList.add("active"); state.depth = btn.dataset.depth; render(); };
});
document.getElementById("btn-fit").onclick = () => cy.fit(undefined, 50);
document.getElementById("btn-png").onclick = () => {
  const png = cy.png({ full: true, scale: 2, bg: "#ffffff" });
  const name = state.view === "single" ? domainsById.get(state.focusDomain)?.label : "explore-" + state.depth;
  const a = document.createElement("a");
  a.href = png;
  a.download = "studio-domain-graph-" + String(name || "graph").replace(/[^a-z0-9]+/gi, "-").toLowerCase() + ".png";
  a.click();
};
for (const t of ["managed", "secondary", "mentioned"]) {
  document.getElementById("tier-" + t).onchange = (e) => {
    e.target.checked ? state.tiers.add(t) : state.tiers.delete(t);
    if (state.tiers.size === 0) { state.tiers.add(t); e.target.checked = true; }
    if (state.view === "drilled") render();
  };
}
document.getElementById("opt-alllabels").onchange = (e) => { state.showAllLabels = e.target.checked; applyLabelVisibility(); };
document.getElementById("opt-crossonly").onchange = (e) => { state.crossOnly = e.target.checked; if (state.view === "drilled") render(); };

// ---------- domain multiselect (drilled view) ----------
function buildDomainFilter() {
  const wrap = document.getElementById("domain-filter");
  const row = (d) => `<label class="chk dfilter"><input type="checkbox" data-dom="${d.id}" checked />` +
    `<span class="dot ${d.kind === "layer" ? "meta" : "managed"}"></span>${d.label}</label>`;
  wrap.innerHTML = graph.domains.map(row).join("");
  wrap.querySelectorAll("input[data-dom]").forEach((cb) => {
    cb.onchange = () => {
      cb.checked ? state.domains.add(cb.dataset.dom) : state.domains.delete(cb.dataset.dom);
      if (state.domains.size === 0) { state.domains.add(cb.dataset.dom); cb.checked = true; } // keep ≥1
      if (state.view === "drilled") render();
    };
  });
  document.querySelectorAll("#dfilter-actions a").forEach((a) => {
    a.onclick = () => {
      const on = a.dataset.all === "1";
      state.domains = on ? new Set(graph.domains.map((d) => d.id)) : new Set([graph.domains[0].id]);
      wrap.querySelectorAll("input[data-dom]").forEach((cb, i) => { cb.checked = on || i === 0; });
      if (state.view === "drilled") render();
    };
  });
}
buildDomainFilter();

// ===================================================================
// COLLABORATION UI — session bar, editor forms, sessions menu, export/import
// ===================================================================
const fmtDate = (ms) => new Date(ms).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

let sbOpen = false; // Customize panel collapsed by default
function renderSessionBar() {
  const s = activeSession();
  const n = s ? s.ops.length : 0;
  const bar = document.getElementById("session-bar");
  bar.innerHTML =
    `<button id="sb-toggle" class="${sbOpen ? "open" : ""}">` +
      `<span>⚙ Customize</span>` +
      `<span class="sb-badge">${n ? n + " change" + (n === 1 ? "" : "s") : "edit the graph"}</span>` +
      `<span class="sb-caret">${sbOpen ? "▾" : "▸"}</span></button>` +
    `<div class="sb-content ${sbOpen ? "" : "hidden"}">` +
      `<div class="sb-title" title="${esc(s?.author || "")}">${esc(s?.title || "—")}</div>` +
      `<div class="sb-sub">${esc(collab.author)} · ${n} change${n === 1 ? "" : "s"}</div>` +
      `<div class="sb-actions"><button id="sb-block">+ Block</button><button id="sb-term">+ Term</button><button id="sb-rel">+ Link</button></div>` +
      `<div class="sb-actions"><button id="sb-undo"${n ? "" : " disabled"} title="Undo the last change">↩ Undo</button><button id="sb-reset"${n ? "" : " disabled"} class="danger" title="Discard every change in this session — the canonical model is untouched">⟲ Reset all</button></div>` +
      `<div class="sb-actions"><button id="sb-sessions">☰ Sessions</button><button id="sb-export" title="Download this session as a change-file">↓ Changes</button></div>` +
      `<p class="sb-hint">Reset clears only your session; the canonical model stays intact. Delete a whole session in ☰ Sessions.</p>` +
    `</div>`;
  bar.querySelector("#sb-toggle").onclick = () => { sbOpen = !sbOpen; renderSessionBar(); };
  if (sbOpen) {
    bar.querySelector("#sb-sessions").onclick = openSessionsModal;
    bar.querySelector("#sb-block").onclick = () => openEditor("addBlock", {});
    bar.querySelector("#sb-term").onclick = () => openEditor("addTerm", {});
    bar.querySelector("#sb-rel").onclick = () => openEditor("propose", {});
    bar.querySelector("#sb-undo").onclick = undoLast;
    bar.querySelector("#sb-reset").onclick = resetActive;
    bar.querySelector("#sb-export").onclick = () => exportSession(activeSession());
  }
}

// options for a <select> of model nodes, grouped by kind
function nodeOptions(selectedId) {
  const grp = (label, arr) => arr.length ? `<optgroup label="${label}">` + arr.map((n) => `<option value="${n.id}" ${n.id === selectedId ? "selected" : ""}>${esc(n.label)}</option>`).join("") + "</optgroup>" : "";
  return grp("Domains", M.domains) + grp("Blocks", M.blocks) + grp("Terms", M.terms) + grp("Meta", M.metaNodes);
}
const blockOptions = (sel, domId) => M.blocks.filter((b) => !domId || b.domain === domId).map((b) => `<option value="${b.id}" ${b.id === sel ? "selected" : ""}>${esc(domainsById.get(b.domain)?.label)} › ${esc(b.label)}</option>`).join("");
const domainOptions = (sel) => M.domains.map((d) => `<option value="${d.id}" ${d.id === sel ? "selected" : ""}>${esc(d.label)}</option>`).join("");
const tierSelect = (sel) => `<select id="f-tier">` +
  `<option value="managed"${sel === "managed" ? " selected" : ""}>Managed — manage first</option>` +
  `<option value="secondary"${sel === "secondary" ? " selected" : ""}>Secondary — cover on demand</option>` +
  `<option value="mentioned"${sel === "mentioned" ? " selected" : ""}>Mentioned — known, not managed yet</option></select>`;

const editorEl = document.getElementById("editor");
function closeEditor() { editorEl.classList.add("hidden"); editorEl.innerHTML = ""; }
function openEditor(kind, ctx) {
  const node = ctx.id ? nodeById.get(ctx.id) : null;
  const k = ctx.id ? kindOf(ctx.id) : null;
  let title = "", body = "";
  if (kind === "addBlock") { title = "New block"; body =
    `<label>Name<input id="f-label" placeholder="Block name" /></label>` +
    `<label>Domain<select id="f-domain">${domainOptions(state.focusDomain)}</select></label>` +
    `<label>Studio coverage${tierSelect("managed")}</label>` +
    `<label>Note (optional)<input id="f-note" placeholder="meaning" /></label>`; }
  else if (kind === "addTerm") { title = "New term"; body =
    `<label>Name<input id="f-label" placeholder="Term name" /></label>` +
    `<label>Domain<select id="f-domain">${domainOptions(state.focusDomain)}</select></label>` +
    `<label>Block<select id="f-block"><option value="">— directly in domain —</option>${blockOptions("", state.focusDomain)}</select></label>` +
    `<label>Studio coverage${tierSelect("managed")}</label>` +
    `<label>Note (optional)<input id="f-note" placeholder="meaning" /></label>`; }
  else if (kind === "tier") { title = "Studio coverage — " + esc(node?.label || ""); body = `<label>Tier${tierSelect(tierOf(ctx.id))}</label>`; }
  else if (kind === "rename") { title = "Rename / edit description"; body =
    `<label>Name<input id="f-label" value="${esc(node?.label || "")}" /></label>` +
    `<label>Description<textarea id="f-desc" placeholder="definition / meaning">${esc(meaningOf(ctx.id))}</textarea></label>`; }
  else if (kind === "reparent") {
    title = "Move " + k;
    body = k === "block"
      ? `<label>Into domain<select id="f-parent">${domainOptions(domainOf(ctx.id))}</select></label>`
      : `<label>Domain<select id="f-domain">${domainOptions(domainOf(ctx.id))}</select></label>` +
        `<label>Block<select id="f-block"><option value="">— directly in domain —</option>${blockOptions(node?.block, domainOf(ctx.id))}</select></label>`;
  }
  else if (kind === "propose") {
    title = "Propose relationship";
    const preds = [...new Set(M.relationships.map((r) => r.predicate).filter(Boolean))].sort();
    const predOpts = preds.map((p) => `<option value="${esc(p)}"></option>`).join("");
    body =
    `<label>From<select id="f-source">${nodeOptions(ctx.id)}</select></label>` +
    `<label>Predicate <span class="lbl-hint">search ${preds.length} existing or type a new one</span>` +
      `<input id="f-pred" list="f-pred-list" placeholder="e.g. depends_on…" autocomplete="off" />` +
      `<datalist id="f-pred-list">${predOpts}</datalist></label>` +
    `<label>To<select id="f-target">${nodeOptions(null)}</select></label>` +
    `<label>Cardinality<select id="f-card"><option>1:1</option><option>1:N</option><option>N:1</option><option selected>N:M</option></select></label>` +
    `<label>Comment<textarea id="f-note" placeholder="why this link could exist"></textarea></label>`; }
  else if (kind === "comment") { title = "Comment on " + esc(node?.label || ""); body = `<label>Comment<textarea id="f-text" placeholder="note / question about relationships"></textarea></label>`; }

  editorEl.innerHTML = `<div class="ed-head">${title}<button id="ed-x">×</button></div><div class="ed-body">${body}</div>` +
    `<div class="ed-foot"><button id="ed-cancel">Cancel</button><button id="ed-save" class="primary">Save</button></div>`;
  editorEl.classList.remove("hidden");
  // reparent: repopulate block list when domain changes
  const domSel = editorEl.querySelector("#f-domain"), blkSel = editorEl.querySelector("#f-block");
  if (domSel && blkSel) domSel.onchange = () => { blkSel.innerHTML = `<option value="">— directly in domain —</option>${blockOptions("", domSel.value)}`; };
  editorEl.querySelector("#ed-x").onclick = closeEditor;
  editorEl.querySelector("#ed-cancel").onclick = closeEditor;
  const val = (id) => editorEl.querySelector(id)?.value.trim();
  editorEl.querySelector("#ed-save").onclick = () => {
    if (kind === "addBlock") { if (!val("#f-label")) return; pushOp({ t: "addBlock", id: uid("ub"), label: val("#f-label"), domain: val("#f-domain"), tier: val("#f-tier"), note: val("#f-note") }); }
    else if (kind === "addTerm") { if (!val("#f-label")) return; pushOp({ t: "addTerm", id: uid("ut"), label: val("#f-label"), domain: val("#f-domain"), block: val("#f-block") || null, tier: val("#f-tier"), note: val("#f-note") }); }
    else if (kind === "tier") { pushOp({ t: "setTier", target: ctx.id, tier: val("#f-tier") }); }
    else if (kind === "rename") { if (!val("#f-label")) return; pushOp({ t: "rename", target: ctx.id, prev: nodeById.get(ctx.id)?.label, label: val("#f-label"), prevMeaning: meaningOf(ctx.id), meaning: val("#f-desc") }); }
    else if (kind === "reparent") {
      if (k === "block") pushOp({ t: "reparent", target: ctx.id, parent: val("#f-parent"), parentKind: "domain" });
      else { const b = val("#f-block"); pushOp({ t: "reparent", target: ctx.id, parent: b || val("#f-domain"), parentKind: b ? "block" : "domain" }); }
    }
    else if (kind === "propose") { pushOp({ t: "proposeRel", id: uid("op"), source: val("#f-source"), target: val("#f-target"), predicate: val("#f-pred") || "relates_to", card: val("#f-card"), note: val("#f-note") }); }
    else if (kind === "comment") { if (!val("#f-text")) return; pushOp({ t: "comment", target: ctx.id, text: val("#f-text") }); }
    closeEditor();
  };
}

// ---------- change-file export / import ----------
function opSummary(op) {
  const nm = (id) => nodeById.get(id)?.label || id;
  switch (op.t) {
    case "addBlock": return `+ block “${op.label}” in ${nm(op.domain)}`;
    case "addTerm": return `+ term “${op.label}” in ${nm(op.block || op.domain)}`;
    case "rename": {
      const renamed = op.prev && op.label && op.prev !== op.label;
      const descEdited = op.meaning !== undefined && op.meaning !== (op.prevMeaning || "");
      if (renamed && descEdited) return `rename “${op.prev}” → “${op.label}” + edit description`;
      if (renamed) return `rename “${op.prev}” → “${op.label}”`;
      if (descEdited) return `edit description of ${nm(op.target)}`;
      return `edit ${nm(op.target)}`;
    }
    case "reparent": return `move ${nm(op.target)} → ${nm(op.parent)}`;
    case "setTier": return `set ${nm(op.target)} tier → ${op.tier}`;
    case "proposeRel": return `propose ${nm(op.source)} —${op.predicate} ${op.card || ""}→ ${nm(op.target)}${op.note ? ` (“${op.note}”)` : ""}`;
    case "comment": return `comment on ${nm(op.target)}: “${op.text}”`;
    default: return op.t;
  }
}
function download(name, text, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function exportSession(s) {
  if (!s) return;
  const slug = (s.title || "session").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const md = `# Change-file — ${s.title}\n\n- Author: ${s.author}\n- Created: ${new Date(s.createdAt).toISOString()}\n- Changes: ${s.ops.length}\n\n` +
    s.ops.map((op, i) => `${i + 1}. ${opSummary(op)}  _(${fmtDate(op.at)})_`).join("\n") + "\n";
  download(`changes-${slug}.json`, JSON.stringify({ app: "studio-domain-graph", version: 1, exportedAt: Date.now(), session: s, summary: md }, null, 2), "application/json");
  download(`changes-${slug}.md`, md, "text/markdown");
}
function importSessionFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      const s = data.session || data;
      if (!s || !Array.isArray(s.ops)) throw new Error("not a change-file");
      s.id = collab.sessions.some((x) => x.id === s.id) ? uid("s") : s.id; // avoid id clash
      s.imported = true;
      collab.sessions.push(s);
      collab.viewIds.add(s.id);
      saveCollab(); rebuildModel(); renderSessionBar(); render(); openSessionsModal();
    } catch (e) { alert("Could not import: " + e.message); }
  };
  reader.readAsText(file);
}

// ---------- sessions menu (who customized what, by date) ----------
const sessionsModal = document.getElementById("sessions-modal");
function openSessionsModal() {
  const rows = [...collab.sessions].sort((a, b) => b.updatedAt - a.updatedAt).map((s) => {
    const active = s.id === collab.activeId, viewed = collab.viewIds.has(s.id);
    const ops = s.ops.map((op) => `<li>${esc(opSummary(op))} <span class="op-when">${fmtDate(op.at)}</span></li>`).join("") || "<li class='muted'>no changes yet</li>";
    return `<div class="ses ${active ? "active" : ""}" data-id="${s.id}">
      <div class="ses-head">
        <label class="ses-view"><input type="checkbox" data-view ${viewed ? "checked" : ""}/> show</label>
        <div class="ses-meta"><b>${esc(s.title)}</b>${active ? ' <span class="tag">editing</span>' : ""}${s.imported ? ' <span class="tag imp">imported</span>' : ""}
          <div class="ses-sub">${esc(s.author)} · ${s.ops.length} changes · updated ${fmtDate(s.updatedAt)}</div></div>
        <div class="ses-btns">
          ${active ? "" : `<button data-act="activate">Edit this</button>`}
          <button data-act="export">Export</button>
          <button data-act="delete" class="danger">Delete</button>
        </div>
      </div>
      <details class="ses-ops"><summary>${s.ops.length} change${s.ops.length === 1 ? "" : "s"}</summary><ul>${ops}</ul></details>
    </div>`;
  }).join("");
  sessionsModal.innerHTML =
    `<div class="modal-card">
      <div class="modal-head"><h2>Sessions &amp; changes</h2><button id="ses-close">×</button></div>
      <p class="modal-hint">Each session is one person's set of dated changes as an overlay on the canonical model. Tick <b>show</b> to view a session on the graph; <b>Edit this</b> to add your changes to it. Share via <b>Export</b> → teammates <b>Import file</b>.</p>
      <div class="modal-actions">
        <input id="ses-name" placeholder="new session title…" />
        <button id="ses-new">+ New session</button>
        <label id="ses-import" class="btn">Import file…<input type="file" accept="application/json,.json" hidden /></label>
        <span class="spacer"></span>
        <label class="who">You: <input id="ses-author" value="${esc(collab.author)}" /></label>
      </div>
      <div class="ses-list">${rows}</div>
    </div>`;
  sessionsModal.classList.remove("hidden");
  sessionsModal.querySelector("#ses-close").onclick = () => sessionsModal.classList.add("hidden");
  sessionsModal.onclick = (e) => { if (e.target === sessionsModal) sessionsModal.classList.add("hidden"); };
  sessionsModal.querySelector("#ses-new").onclick = () => {
    const title = sessionsModal.querySelector("#ses-name").value.trim() || "Changes " + fmtDate(Date.now());
    newSession(title); saveCollab(); rebuildModel(); renderSessionBar(); render(); openSessionsModal();
  };
  sessionsModal.querySelector("#ses-author").onchange = (e) => { collab.author = e.target.value.trim() || collab.author; saveCollab(); renderSessionBar(); };
  sessionsModal.querySelector("#ses-import input").onchange = (e) => { if (e.target.files[0]) importSessionFile(e.target.files[0]); };
  sessionsModal.querySelectorAll(".ses").forEach((el) => {
    const id = el.dataset.id;
    el.querySelector("[data-view]").onchange = (e) => {
      e.target.checked ? collab.viewIds.add(id) : collab.viewIds.delete(id);
      if (collab.viewIds.size === 0) { collab.viewIds.add(id); e.target.checked = true; }
      saveCollab(); rebuildModel(); render();
    };
    el.querySelectorAll("[data-act]").forEach((btn) => {
      btn.onclick = () => {
        const act = btn.dataset.act;
        if (act === "activate") { collab.activeId = id; collab.viewIds.add(id); saveCollab(); renderSessionBar(); render(); openSessionsModal(); }
        else if (act === "export") { exportSession(collab.sessions.find((s) => s.id === id)); }
        else if (act === "delete") {
          if (!confirm("Delete this session and its changes?")) return;
          collab.sessions = collab.sessions.filter((s) => s.id !== id);
          collab.viewIds.delete(id);
          if (collab.activeId === id) collab.activeId = (collab.sessions[0] && collab.sessions[0].id) || null;
          if (!collab.activeId) { newSession("My changes"); }
          collab.viewIds.add(collab.activeId);
          saveCollab(); rebuildModel(); renderSessionBar(); render(); openSessionsModal();
        }
      };
    });
  });
}

// ---------- search ----------
const search = document.getElementById("search");
const results = document.getElementById("search-results");
search.oninput = () => {
  const q = search.value.trim().toLowerCase();
  cy.nodes().removeClass("searchhit");
  if (q.length < 2) { results.innerHTML = ""; return; }
  const hits = [...nodeById.values()].filter((n) => n.label.toLowerCase().includes(q)).slice(0, 12);
  results.innerHTML = hits.map((n) => `<div class="hit" data-id="${n.id}">${n.label} <small>${kindOf(n.id)}</small></div>`).join("");
  results.querySelectorAll(".hit").forEach((el) => {
    el.onclick = () => {
      const id = el.dataset.id;
      const dm = domainOf(id);
      if (state.view === "overview" && dm) { openDomain(dm); setTimeout(() => { const nn = cy.getElementById(id); if (nn.nonempty()) { nn.addClass("searchhit"); afterFocus(id); } }, 150); return; }
      if (state.view === "drilled") { const tr = tierOf(id); if (tr !== "meta" && !state.tiers.has(tr)) { state.tiers.add(tr); document.getElementById("tier-" + tr).checked = true; render(); } }
      setTimeout(() => { const nn = cy.getElementById(id); if (nn.nonempty()) { nn.addClass("searchhit"); afterFocus(id); } }, 80);
    };
  });
};

// ---------- stats ----------
function updateStats() {
  const c = M.counts;
  let shown = "";
  if (state.view !== "overview") shown = `<b>${cy.nodes(":childless").length}</b> nodes · <b>${cy.edges().length}</b> relationships shown<br>`;
  document.getElementById("stats").innerHTML = shown +
    `model: ${c.domains} domains · ${c.layers} layers · ${c.blocks} blocks · ${c.terms} terms · ${c.relationships} rels`;
}

// ---------- boot ----------
document.getElementById("source-note").textContent = `from ${M.generatedFrom}`;
renderSessionBar();
render();
if (typeof window !== "undefined") window.cy = cy; // debug/QA handle

#!/usr/bin/env node
// Parse the canonical Software Organization Domain Model (.md) into a graph JSON.
// Nodes: domains (L1) -> blocks (L2) -> terms (L3); + cross-cutting layers (§4/§5) and meta-scope nodes.
// Edges: relationships with cardinality. Robust to mid-edit states: the `↳` marker (not the level
// column) decides "term"; only §3.x are domains, §4/§5 are layers, §6+ is excluded.
//
// Usage: node scripts/parse-model.mjs [path-to-model.md]

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Prefer the model co-located in this repo (../../SOFTWARE_ORGANIZATION_DOMAIN_MODEL.md);
// fall back to the local Obsidian vault. Override with an argument or MODEL_PATH env var.
const REPO_MODEL = path.join(__dirname, "..", "..", "SOFTWARE_ORGANIZATION_DOMAIN_MODEL.md");
const OBSIDIAN_MODEL =
  "/Users/xim/Documents/obsidian/Presence/Projects/Studio/foundations/software-organization-domain-model.md";
const DEFAULT_MODEL = fs.existsSync(REPO_MODEL) ? REPO_MODEL : OBSIDIAN_MODEL;
const MODEL_PATH = process.argv[2] || process.env.MODEL_PATH || DEFAULT_MODEL;
const OUT = path.join(__dirname, "..", "src", "data", "graph.json");

const raw = fs.readFileSync(MODEL_PATH, "utf8");
const lines = raw.split("\n");

// ---------- helpers ----------
const TIERS = new Set(["managed", "secondary", "mentioned"]);
const stripMd = (s) =>
  s
    .replace(/\*\*/g, "")
    .replace(/[*`]/g, "")
    .replace(/↳/g, "")
    .replace(/⚠️/g, "")
    .replace(/\s*\([^)]*\)\s*$/, "")
    .replace(/\s*\*\([^)]*\)\*/g, "")
    .trim();
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const cells = (line) => line.split("|").slice(1, -1).map((c) => c.trim());
const isTableRow = (l) => /^\s*\|/.test(l) && l.includes("|");
const isSep = (l) => /^\s*\|[\s:|-]+\|\s*$/.test(l);

function blockquoteAfter(idx) {
  for (let j = idx + 1; j < lines.length; j++) {
    const l = lines[j].trim();
    if (!l) continue;
    const bq = l.match(/^>\s?(.+)$/);
    return bq ? bq[1].trim() : null;
  }
  return null;
}

// ---------- state ----------
const domains = [];
const blocks = [];
const terms = [];
const metaNodes = [];
const relationships = [];
const warnings = [];

let curDomain = null;
let curBlock = null;
let mode = null;

const termByLabel = new Map();
const blockByLabel = new Map();
const domainByLabel = new Map();
const metaByLabel = new Map();

function addDomain(section, label, isLayer) {
  const id = "d_" + slug(section || label);
  curDomain = { id, label, section: section || "", kind: isLayer ? "layer" : "domain", description: null };
  domains.push(curDomain);
  domainByLabel.set(label.toLowerCase(), id);
  const short = label.split(/\s*&\s*/)[0].trim().toLowerCase();
  if (short !== label.toLowerCase()) domainByLabel.set(short, id);
  curBlock = null;
  mode = "terms";
}
function addBlock(label, tier, meaning) {
  const id = "b_" + slug(curDomain.section + "-" + label);
  curBlock = { id, label, domain: curDomain.id, tier: tier || "managed", kind: "block", meaning: meaning || "" };
  blocks.push(curBlock);
  blockByLabel.set(label.toLowerCase(), id);
}
function addTerm(label, tier, meaning) {
  const key = label.toLowerCase();
  if (termByLabel.has(key)) {
    const existing = terms.find((t) => t.id === termByLabel.get(key));
    if (existing && !existing.meaning && meaning) {
      existing.meaning = meaning;
      existing.nonEntity = /not a separate entity/i.test(meaning);
    }
    return termByLabel.get(key);
  }
  const id = "t_" + slug(label);
  const t = {
    id, label,
    block: curBlock ? curBlock.id : null,
    domain: curDomain ? curDomain.id : null,
    tier: tier || (curBlock ? curBlock.tier : "managed"),
    kind: "term",
    meaning: meaning || "",
    nonEntity: /not a separate entity/i.test(meaning || ""),
  };
  terms.push(t);
  termByLabel.set(key, id);
  return id;
}
function addMeta(label, meaning) {
  const id = "m_" + slug(label);
  metaNodes.push({
    id, label, kind: "meta", tier: "meta", domain: null, block: null,
    meaning: meaning || "Cross-cutting meta-scope.",
  });
  metaByLabel.set(label.toLowerCase(), id);
  return id;
}

function resolve(label) {
  const key = stripMd(label).toLowerCase();
  if (termByLabel.has(key)) return { id: termByLabel.get(key), kind: "term" };
  if (blockByLabel.has(key)) return { id: blockByLabel.get(key), kind: "block" };
  if (domainByLabel.has(key)) return { id: domainByLabel.get(key), kind: "domain" };
  if (metaByLabel.has(key)) return { id: metaByLabel.get(key), kind: "meta" };
  return null;
}
function tierCell(rowCells) {
  const last = stripMd(rowCells[rowCells.length - 1] || "").toLowerCase();
  return TIERS.has(last) ? last : null;
}

// ---------- pass 1: nodes ----------
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let m;
  if ((m = line.match(/^###\s+(\d+\.\d+)\s+(.+?)\s*$/))) {
    if (m[1].startsWith("3.")) { addDomain(m[1], m[2].trim(), false); curDomain.description = blockquoteAfter(i); }
    else { curDomain = null; mode = null; } // §6.x etc. are not domains
    continue;
  }
  if ((m = line.match(/^##\s+(\d+)\.\s+(Work Management Layer|Function Overlay)\s*$/))) {
    addDomain(m[1], m[2].trim(), true);
    curDomain.description = blockquoteAfter(i);
    continue;
  }
  if (/^##\s+\d+\./.test(line)) { curDomain = null; mode = null; continue; } // any other ## section
  if (/^\*\*Terms\*\*/.test(line)) { mode = "terms"; continue; }
  if (/^\*\*Relationships\*\*/.test(line)) { mode = "rel"; continue; }

  if (mode !== "terms" || !curDomain || !isTableRow(line) || isSep(line)) continue;
  const c = cells(line);
  if (c.length < 2) continue;
  if (/^(level|term|function|entity)$/i.test(stripMd(c[0]))) continue; // header rows

  const isTerm = line.includes("↳");
  const tier = tierCell(c);

  if (curDomain.section === "4" || curDomain.section === "5") {
    const label = stripMd(c[0]);
    if (label) {
      if (!curBlock) addBlock(curDomain.label, curDomain.section === "5" ? "mentioned" : "managed", curDomain.description || `${curDomain.label} — a cross-cutting layer that applies across all domains.`);
      addTerm(label, tier || (curDomain.section === "5" ? "mentioned" : null), stripMd(c[1] || ""));
    }
    continue;
  }
  if (isTerm) {
    const label = stripMd(c[1]);
    if (label) addTerm(label, tier, stripMd(c[2] || ""));
  } else if (/l2/i.test(stripMd(c[0]))) {
    const label = stripMd(c[1]);
    if (label) addBlock(label, tier || "managed", stripMd(c[2] || ""));
  }
}

// meta-scope nodes: generic endpoints for relationships that target "any object" / "any function"
// rather than one specific term (so those edges have somewhere to land instead of being dropped).
addMeta("Domain Object", "Generic scope: any managed object in the model — the shared target of ownership, governance and dependency links (has_owner, applies_to, blocks). Carries the accountability spine.");
addMeta("Function", "Generic scope: any organizational function (Product Management, Engineering, QA, Sales, Security…) that staffs and takes part in work — the §5 Function Overlay (assigned_to, transfers_from/to).");

// ---------- pass 2: relationships ----------
curDomain = null;
mode = null;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let m;
  if ((m = line.match(/^###\s+(\d+\.\d+)\s+(.+?)\s*$/))) {
    if (m[1].startsWith("3.")) { curDomain = { section: m[1] }; mode = "terms"; } else { curDomain = null; mode = null; }
    continue;
  }
  if ((m = line.match(/^##\s+(\d+)\.\s+(Work Management Layer|Function Overlay)\s*$/))) { curDomain = { section: m[1] }; mode = "terms"; continue; }
  if (/^##\s+\d+\./.test(line)) { curDomain = null; mode = null; continue; }
  if (/^\*\*Relationships\*\*/.test(line)) { mode = "rel"; continue; }
  if (/^\*\*Terms\*\*/.test(line)) { mode = "terms"; continue; }
  if (mode !== "rel" || !curDomain || !isTableRow(line) || isSep(line)) continue;

  const c = cells(line);
  if (c.length < 4) continue;
  const subjRaw = stripMd(c[0]);
  const pred = stripMd(c[1]);
  const objRaw = c[2];
  const cardMatch = (c[3] || "").match(/(1:1|1:N|N:1|N:M|0\.\.1|0\.\.N)/);
  if (!subjRaw || /^subject$/i.test(subjRaw) || !pred) continue;
  const card = cardMatch ? cardMatch[1] : "";
  const note = stripMd(c[4] || "");

  const subjects = subjRaw.replace(/\([^)]*\)/g, "").split(" / ").map((s) => s.trim()).filter(Boolean);
  const objects = objRaw.replace(/\([^)]*\)/g, "").split(" / ").map((s) => stripMd(s)).filter(Boolean);

  for (const s of subjects) {
    const rs = resolve(s);
    if (!rs) { warnings.push(`unmatched subject: "${s}" (predicate ${pred})`); continue; }
    for (const o of objects) {
      const ro = resolve(o);
      if (!ro) { warnings.push(`unmatched object: "${o}" (${s} ${pred} …)`); continue; }
      relationships.push({
        source: rs.id, target: ro.id, predicate: pred, card, note,
        sourceKind: rs.kind, targetKind: ro.kind, loop: rs.id === ro.id,
      });
    }
  }
}

// ---------- precompute ----------
const idDomain = new Map();
for (const b of blocks) idDomain.set(b.id, b.domain);
for (const t of terms) idDomain.set(t.id, t.domain);
for (const d of domains) idDomain.set(d.id, d.id);
for (const mn of metaNodes) idDomain.set(mn.id, null);

// a layer's synthetic container block has no natural tier — derive it from the strongest coverage
// among its terms, so the container shows under a tier filter when it holds terms of that tier
const TIER_RANK = { managed: 3, secondary: 2, mentioned: 1 };
for (const d of domains) {
  if (d.kind !== "layer") continue;
  for (const b of blocks.filter((x) => x.domain === d.id)) {
    const ts = terms.filter((t) => t.block === b.id);
    if (ts.length) b.tier = ts.reduce((best, t) => (TIER_RANK[t.tier] > TIER_RANK[best] ? t.tier : best), "mentioned");
  }
}

for (const d of domains) {
  const bs = blocks.filter((b) => b.domain === d.id);
  d.coverage = {
    managed: bs.filter((b) => b.tier === "managed").length,
    secondary: bs.filter((b) => b.tier === "secondary").length,
    mentioned: bs.filter((b) => b.tier === "mentioned").length,
    blocks: bs.length,
    terms: terms.filter((t) => t.domain === d.id).length,
  };
}

const deg = new Map();
for (const r of relationships) {
  deg.set(r.source, (deg.get(r.source) || 0) + 1);
  if (!r.loop) deg.set(r.target, (deg.get(r.target) || 0) + 1);
}
for (const n of [...blocks, ...terms, ...metaNodes]) { n.degree = deg.get(n.id) || 0; n.orphan = n.degree === 0; }

const adj = new Map();
for (const r of relationships) {
  const sd = idDomain.get(r.source), td = idDomain.get(r.target);
  if (!sd || !td || sd === td) continue;
  const key = sd + "→" + td;
  let e = adj.get(key);
  if (!e) { e = { source: sd, target: td, count: 0, preds: new Set() }; adj.set(key, e); }
  e.count++; if (r.predicate) e.preds.add(r.predicate);
}
const domainAdjacency = [...adj.values()].map((e) => ({ source: e.source, target: e.target, count: e.count, preds: [...e.preds] }));

const selfLoops = relationships.filter((r) => r.loop).length;

// ---------- output ----------
const out = {
  generatedFrom: path.basename(MODEL_PATH),
  counts: {
    domains: domains.filter((d) => d.kind === "domain").length,
    layers: domains.filter((d) => d.kind === "layer").length,
    blocks: blocks.length,
    terms: terms.length,
    meta: metaNodes.length,
    relationships: relationships.length,
    selfLoops,
    unmatched: warnings.length,
  },
  domains, blocks, terms, metaNodes, relationships, domainAdjacency, warnings,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));

console.log(`Parsed ${path.basename(MODEL_PATH)}`);
console.log(`  ${out.counts.domains} domains + ${out.counts.layers} layers · ${blocks.length} blocks · ${terms.length} terms · ${metaNodes.length} meta`);
console.log(`  relationships=${relationships.length} (selfLoops=${selfLoops}) · unmatched=${warnings.length}`);
const noMeaning = [...blocks, ...terms].filter((n) => !n.meaning).length;
console.log(`  nodes without meaning: ${noMeaning} · non-entity terms: ${terms.filter((t) => t.nonEntity).map((t) => t.label).join(", ") || "none"}`);
if (warnings.length) [...new Set(warnings)].slice(0, 10).forEach((w) => console.log("    · " + w));
console.log(`→ ${OUT}`);

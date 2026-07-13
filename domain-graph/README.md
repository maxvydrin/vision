# Studio Domain Model — Interactive Graph

An interactive dependency graph of the **Software Organization Domain Model**
(`software-organization-domain-model.md`). It renders the model as **domains → blocks → terms**,
colours nodes by **Studio coverage tier** (Managed / Secondary / Mentioned), and draws typed
relationships with their **cardinality** (1:1 · 1:N · N:1 · N:M).

Built with **Cytoscape.js** (compound nodes for the domain→block→term nesting) and a deterministic
grid-of-baskets layout (domains packed as separated containers; no force layout).

## The idea

The graph is not hand-drawn — it is **parsed from the canonical Markdown model**. Edit the model,
run `npm run parse`, and the graph is regenerated. The visualization can never drift from the doc.

## Run

```bash
npm install
npm run parse     # regenerate src/data/graph.json from the model (.md)
npm run dev       # open http://localhost:5173
```

By default the parser reads the model co-located in this repo
(`../SOFTWARE_ORGANIZATION_DOMAIN_MODEL.md`), so `npm run parse` works out of the box.
Override with an argument or the `MODEL_PATH` env var:

```bash
node scripts/parse-model.mjs /path/to/software-organization-domain-model.md
```

`src/data/graph.json` is a committed snapshot, so the app runs without re-parsing.

## What you can do

Two entry points (the **View** toggle):

**Overview (default)** — the top-down landing. A card per domain (+ the cross-cutting layers) showing
its one-line **description**, a **coverage bar** (core/extended/background block counts), term/block
counts, and its strongest cross-domain links. Click a card to open that domain.

**A single domain** (click a card, or double-click a domain node) — that domain isolated: its blocks
and terms with internal relationships (cardinality + predicate labels, including self-loops like
`Position reports_to Position`), plus dashed **stub nodes** for every cross-domain link (what it
depends on / what references it). A breadcrumb + the domain's description sit on the canvas.
Double-click a stub to jump to that domain.

**Explore all** — the full graph, with:
- **Depth** — *Domains / Blocks / Terms*; edges **aggregate** to the chosen level.
- **Studio coverage** — show/hide `core` / `extended` / `background` (default Core).
- **Cardinality** labels (N:M dashed); **cross-domain edges only** declutter; **layouts** (organic / by-tier / hierarchy).

Everywhere:
- **Click a node** → side panel with its **meaning** (definition from the model) + every relationship
  both directions, with cardinality; domain/block panels **roll up** their terms' relationships. Click a related term to jump.
- **Hover** a node or edge → tooltip with the definition / the relationship note.
- **Find** — search terms / blocks / domains; opens the right view and focuses the hit.
- **Meta-scopes** — `Domain Object` / `Function` appear as hexagon nodes so the accountability spine
  (`responsible_for`, `applies_to`, …) is visible.

## Collaboration & editing

The canonical model (`graph.json`) is **read-only**. Every edit you make is an **op** recorded in a
dated **session** stored in your browser (localStorage) — an overlay on top of the canon, never a
change to the source doc. The **Session** bar (top of the panel) shows your active session; use it to:

- **+ Block / + Term** — add a new block or term to a domain (marked with a green border).
- **+ Link** — *propose a relationship*: pick two objects, a predicate + cardinality, and a note →
  drawn as a dashed green "proposed" edge.
- Select any node → the detail panel offers **Rename**, **Move** (change its domain/block),
  **Comment**, and **Propose link**. Comments show inline; commented nodes get a double amber border.
- **↓ Changes** — export the session as a change-file: a re-importable `changes-*.json` **and** a
  human-readable `changes-*.md` changelog.

**Sessions menu** (☰) lists every session by **author + date + change count**, with an expandable log
of exactly what changed and when. Tick **show** to view a session as an overlay on the graph;
**Edit this** to make it your active (editable) session; **Export** to share; **Import file…** to pull
in a teammate's change-file. There's no server — teammates share by exchanging exported change-files
(each browser keeps its own sessions).

## Layout of the code

```
scripts/parse-model.mjs   markdown model → src/data/graph.json (nodes + edges)
src/data/graph.json       generated graph (domains, blocks, terms, relationships)
src/main.js               Cytoscape app: build-per-depth, aggregation, filters, detail panel
src/style.css             Constructor Tech palette (navy / blue / red, light theme)
index.html                shell + control panel
```

## Notes

- The parser uses the `↳` marker (not the `L2`/`L3` column) to decide "term", so it stays correct
  even while the model is mid-edit.
- ~7 relationship endpoints are intentionally unmatched (meta-scopes like `Domain Object`); they are
  listed under `warnings` in `graph.json`.

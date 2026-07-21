---
type: information-architecture
artifact: studio-information-architecture
status: draft-v0.9.0
date: 2026-07-21
conforms-to: "studio-product-domain-model draft-v0.9.24"
tags: [studio, information-architecture, ux, foundations]
related: ["studio-product-domain-model", "software-organization-domain-model", "studio-mvp-scope", "studio-collaboration-comments-requirements"]
---

# Studio Information Architecture

Navigation architecture for Constructor Studio, projected from studio-product-domain-model (the canonical Studio domain model).

**Root reading:** `Workspaces` · **SUPPLY** (`Integrations · Kits · Ontology · Gears`) · **CONTROL** (`Members & Access · Governance · Account`) + per-member Personal settings.

**Scope model — Tenant root:** **Tenant → Workspace → Project.** A **Tenant** is one organization's Studio instance; a **Workspace** is the working context for one purpose (typically a product line) and **owns its Knowledge Graph**; a **Project** is the effort container (≈ what trackers call an epic / initiative — colloquial, not the org-model Strategic Initiative) inside a workspace.

**How to read this document.** The **tree** is the actual menu — each line says in a few words *what* that item is, not why it's there. The **Design rules** explain the *why*: they're the reasoning that lets you rebuild the tree from the model and defend it in review (an `Rn` in the tree points to the rule behind it). The **Layer mapping** shows which part of the model each area comes from. The **MVP overlay** marks what actually ships first. Each reason lives in exactly one of these places, never repeated — so there's only one thing to update when the model changes.

## Navigation tree

```
Studio Tenant                         one company's Studio
├─ Workspaces                         the top-level list; always visible to everyone (R1)
│   ├─ [Workspace]                    one purpose — usually a product line · owns its knowledge graph
│       ├─ Overview                   the workspace home page — command bar (the assistant, R11) · a rail of
│       │                             suggestions · status of gates and connectors (D-008)
│       ├─ Insights                   everything the system works out for you, read-only, in one place (R5)
│       │   ├─ Signals                what's wrong or missing — gaps · drift · stale items · contradictions ·
│       │   │                         duplicates · no owner — you accept or dismiss them, you don't edit them
│       │   └─ Metrics                how delivery is going + what it costs; comes with a default "Delivery dashboard"
│       ├─ Work queue                 one list for everything waiting for a decision or in progress (R4)
│       │   ├─ Recommendations        things the system prepared, waiting for you to decide — often from a signal
│       │   ├─ Candidates             proposed content + the checks run on it
│       │   ├─ Approvals              approve / reject / escalate / defer · who decided · the evidence
│       │   └─ Write-backs            approved changes being pushed back to the source tools · status · audit trail
│       ├─ Projects
│       │   └─ [Project]              a chunk of work (like an epic) — itself an object of type Project (R8)
│       │       ├─ Overview           its goal · outcome · what it moves forward
│       │       ├─ Included objects   the objects it pulls in (by reference; one object can be in several projects)
│       │       ├─ Views (project)    lists · boards · traceability · plus project-only slices of the graph and
│       │       │                     insights (the graph and signals themselves stay at workspace level)
│       │       └─ Access             who has which role on this project
│       ├─ Objects                    browse everything in this workspace (R3)
│       │   ├─ Object browser         search and filter the objects — the live, unsaved view
│       │   ├─ Saved views            saved searches — list · board · table · timeline · dashboard · diagram;
│       │   │                         includes a default "Graph" view (it's content, not the main screen — R3)
│       │   ├─ Object detail          everything about one object — its fields · content and versions · where it
│       │   │                         came from and its sync state · its links · its history · its Discussion (R7) ·
│       │   │                         its glossary terms · locked placeholders for neighbors you can't see
│       │   ├─ New from template      create a document from a kit template (PRD, postmortem, design doc)
│       │   └─ Inclusion              add or remove objects by reference · who, when, by hand or by rule
│       ├─ Workflows                  repeatable pipelines you can run
│       │   ├─ Workflow Library       the workflows you can run — shipped + custom, added by installed kits
│       │   ├─ Runs & history         past and running workflows · may pause to wait for an approval
│       │   ├─ Definitions (config)   admin: how a workflow is built — steps · who does what (incl. agents) · gates
│       │   └─ Automations            admin: "when X happens, run Y" rules (§3.3 Automation Rule)
│       ├─ Glossary                   the customer's OWN product terms — what the team is BUILDING · one per workspace
│       └─ Workspace settings
│           ├─ Installed kits         the kits this workspace uses; installing one adds its workflows · templates · checks
│           ├─ Lifecycle (SCLC)       the delivery phases and their 14 stages; config only, applied by the kit
│           ├─ Ontology (effective)   which object types are turned on here + this workspace's own renames (R1)
│           ├─ Access                 who has which role in this workspace
│           ├─ Model routing          which AI model this workspace uses (within tenant rules)
│           └─ Cost budgets           spending caps for this workspace (within tenant rules)
│   └─ Insights (all workspaces)      the same Insights, but across every workspace — only shows if you're a tenant
│                                     admin AND there are 2+ workspaces (never in a single-workspace company)
│
│  SUPPLY                             just a section label (not clickable) · the stuff that feeds the company's data
├─ Integrations                       admin · the company's connections to other tools
│   ├─ Connectors                     health · setup · field & link mappings · what can be written back
│   ├─ Source systems                 the tools on the other end (a tool can also show up in graphs as a `Tool` object)
│   ├─ Identity mappings              proposed "these two accounts are the same person" matches → admin confirms / splits
│   ├─ Sync runs & state              sync status per connection — in sync · pending · stale · conflicted · error · paused
│   └─ Conflicts                      a proper queue for clashes · resolved by the company's rules
├─ Kits                               installable packages of domain and delivery know-how
│   ├─ Kit Catalog                    per company: Constructor's kits + ones members publish · not a public marketplace
│   │   ├─ [Kit]                      what's inside — types · workflows · actions · checks · templates · gears
│   │   ├─ Installed by workspace     which workspaces run each kit
│   │   └─ Publish a kit              share your own kit · needs the publish permission · audit-logged
│   └─ Domain profiles                a starter dictionary + kit content for a given domain
├─ Ontology                           admin · the company-wide list of object and link types (R9)
│   ├─ Object types                   each maps to one org-model term; group / filter by which kit added it
│   ├─ Relation types                 the allowed kinds of links and which types they can connect
│   ├─ Org-model mapping              which Studio type stands for which org-model term (§9, as a live screen)
│   ├─ Domain dictionary              company-wide renames — labels only, never meaning
│   └─ Add types…                     one task, two doors: install a kit · define your own type
├─ Gears                              admin · Constructor's library of building blocks that kits use
│   └─ Building blocks                Identity · Authorization · Events · Serverless · GenAI · Platform
│
│  CONTROL                            just a section label (not clickable) · who can do what · under which rules · what we pay
├─ Members & Access                   admin · day-to-day access management (R9 — one thing: access)
│   ├─ Members                        someone who uses Studio · can be linked to one Person object
│   ├─ Teams                          Studio's own access groups · can be seeded from an org Team · never auto-synced
│   ├─ Roles (catalog)                named sets of permissions
│   └─ Role grants                    who (member | team) gets which role, and where (tenant / workspace / project)
├─ Governance                         admin · the company's controls over acting, data and AI
│   ├─ Data policies                  sensitivity · retention · redaction · model usage
│   ├─ Safety constraints             guardrails against bad write-backs · data leaks · uncontrolled AI use
│   ├─ Model routing policy           which AI model to use, by activity / role / cost / risk · can be locked
│   ├─ Cost budgets                   spending caps at every level
│   ├─ AI usage & cost                AI runs · usage events · costs
│   └─ Audit log                      the permanent record of every admin action
├─ Account                            owner · rarely touched · what we pay for and top-level policy
│   ├─ Subscription & billing         your plan and packaging
│   └─ Account policies               company policies · incl. which clients and API tokens are allowed
└─ (avatar menu) Personal settings    your own settings · reached from the avatar menu, not the shared nav (R10)
    ├─ Profile & notifications
    ├─ My views                       views you own — any kind, any workspace
    └─ Client access                  your CLI · IDE plugins · MCP servers · API tokens

What a plain member sees (no admin grants):   Workspaces · Kits (catalog only)
What a tenant admin sees:                      all of the above (+ Insights across all workspaces)
A single-workspace company:                    the workspace's menus move up to the top (R10 collapse)
```

## Design rules (how the model projects into navigation)

*Each rule says: given this from the model, the navigation does this. That's what lets the tree be rebuilt when the model changes, and defended in review (`Rn` in the tree points back here). At most one model reference per rule. Down from 16 rules to 11 (2026-07-21), now covering comments (§6.5) and the assistant (§6.6).*

1. **Where a thing lives depends on who it's for.** Things members use day-to-day live inside the Workspace. Things only admins touch live in the tenant-level areas (SUPPLY / CONTROL) or in Workspace settings — and they only appear if you have the right permission **and** there's actually something there (a brand-new small team sees an admin almost the same menu as a member). Internal plumbing the system runs on gets no menu item at all (the knowledge graph, source records, sync bookkeeping, usage events, etc.) — you only meet it inside an object's details. The two grey headers, `SUPPLY` and `CONTROL`, are just labels, not clickable. `Workspaces` always sits on top and everyone sees it. *One exception:* a few admin settings show up right where you use them (e.g. workflow Definitions and Automations sit inside Workflows), still gated by permission.
2. **Put what you use most at the top.** Within each level, everyday things sit above occasional ones, and setup comes last. The workspace reads like the daily loop: Overview → Insights → Work queue → Projects / Objects → Workflows → Glossary → settings. A new menu item earns its spot by "how often, and by whom" — not by when it was added.
3. **The knowledge graph isn't a drawing board.** You explore it by searching and filtering objects and opening their details — not by staring at one big diagram. A diagram is just one way to save a view, never the main screen.
4. **Everything waiting for a decision lives in one Work queue.** A recommendation, an approval, and a write-back are the *same thing* at different stages, so they're tabs (filters) on one queue — not separate systems. (Things prepared but not yet decided → Recommendations; approved changes headed back to a source tool → Write-backs.)
5. **Insights is the one place for things you only read.** Signals (what's wrong) and metrics (how you're doing) are computed by the system. You can accept or dismiss a signal, but you never "decide" it — so it stays out of the Work queue and gets its own place here. There's no separate Dashboards menu: a dashboard is just a saved view of this data. The only link between the two: a signal that leads to a prepared action shows up in Recommendations.
6. **A "view" is just a saved search.** The Object browser is the live, unsaved search; hit "Save as view" and it becomes a named, shareable one. Views live where they belong — workspace views in Objects, project views under the project, your own views under Personal settings. (Some behind-the-scenes building blocks — validators, quality gates, agent roles — never get their own menu item either; you meet them inside kits and workflow settings.)
7. **You see things where they naturally belong, filtered to what you're allowed to see.** Objects you can't access show up as locked placeholders wherever something links to them — there's no separate "restricted" area. Every object's detail shows where its data came from and whether it's in sync (clashes and identity matches go to the admin queues under Integrations). **Comments and discussions stick to the thing being discussed** — an object, a version, a draft, a run — and appear right there (Object detail ▸ Discussion), not on a separate Comments page (§6.5). Studio is the main home for the conversation and keeps it in sync with tools like Figma and GitHub.
8. **People, teams, and products don't get their own menus.** They come in as objects and you meet them through views (a people directory, a team page). The one exception is **Project**, because you actually work *inside* a project — it's an object of type Project (§3.1 · §9) that carries the workbench, so it gets a node. Job functions show up through roles and assignments, not as menus.
9. **Every menu item is exactly one kind of thing.** No "X & Y" items that hide two different things. Kits (packaged know-how you install) and Gears (a component library) are separate; Governance keeps its own audit log; Account is only billing and policy. **Kits and the Ontology stay separate but linked:** a kit is a package you install, the Ontology is the lasting registry of types that remembers which kit added each one — they meet as shared shortcuts ("Add types…" is one task with two doors: install a kit, or define your own). ("Members & Access" is still one thing — managing access — so it's allowed.)
10. **Your personal stuff lives under your avatar, and one-workspace companies collapse.** Views you own and your client access (CLI · IDE · MCP · API tokens) sit under the avatar menu, not the shared navigation (the company-wide *policy* on clients is under Account). And if a company has just one workspace, that workspace's menus move up to the top level and the "Workspaces" item disappears — it comes back when they add a second workspace. This only changes the shape of the menu, not how it works.
11. **The assistant doesn't get its own page.** It's the command bar on the Overview (§6.6). Whatever it does shows up as a normal object you can open — a run (Workflows ▸ Runs), a finding (Insights ▸ Signals), a recommendation (Work queue), an installed kit — so you always see its work in the places you already know (that's the model's "no invisible effect" rule, invariant 16).

## Layer mapping (IA area → model section)

| IA area                                                          | studio-product-domain-model section                                                                 |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Studio Tenant / Workspaces / Projects / Members                  | §3.1 Containers and people                                                                          |
| Objects (browser, detail, new-from-template, saved views, inclusion) | §3.2 Objects and relations + §3.3 View + §4 provenance/sync + §7 Template                        |
| Insights — workspace and all-workspaces scopes                   | §6.1 Signal + §6.3 Delivery/Cost Metric; tenant scope per §5 Role Grant                              |
| Object detail ▸ Discussion; comments in place on candidates & runs | §6.5 Comment · Discussion Thread                                                                  |
| Overview ▸ NL command bar; assistant output routes to existing surfaces | §6.6 The Assistant (invariant 16 — no invisible effect)                                       |
| Glossary                                                         | §7 Glossary Term · Term Mapping (mapping surfaces inside object detail and term detail)             |
| Views (Objects ▸ Saved views · project views · My views)         | §3.3 View (incl. graph view · insight view)                                                          |
| Workspace settings ▸ Lifecycle (SCLC) — applied state in place   | §7 SCLC · Lifecycle Phase · Lifecycle Stage · Activity · Synchronization Checkpoint                 |
| Workflows (library, runs, definitions, automations)              | §3.3 Workflow · Workflow Run · Automation Rule; §6.1 Action / Action Run                            |
| Work queue (recommendations, candidates, approvals, write-backs) | §6.1 acting layer (Action Run states · Candidate Object · Approval · Evidence)                      |
| Integrations                                                     | §4 How the Organization Enters Studio                                                               |
| Ontology (types, mapping, dictionary)                            | §3.2 Object Type / Relation Type + §9 mapping + §7 Domain Dictionary                                 |
| Kits (catalog, profiles)                                         | §7 Kit Catalog · Studio Kit · Domain Profile                                                        |
| Gears                                                            | §7 Gears Building Block                                                                             |
| Governance (policies, AI, audit)                                 | §5 Data Policy / Safety Constraint + §6.2 AI collaboration + §6.3 Usage and cost + §6.1 Audit Entry |
| Members & Access                                                 | §3.1 Member · Team + §5 Who Sees What (RBAC, User Projection)                                       |
| Account                                                          | §3.1 Studio Tenant (commercial packaging = configuration)                                           |
| Personal settings (profile, my views, client access)             | §3.3 View (member-owned); client access = member configuration, not entities (§3.1)                 |

## MVP overlay (D-054)

*The tree above is the **target**; the MVP renders the subset below (the IA↔MVP delta map, decided 2026-07-13, D-054). Build detail + seed states live in studio-mvp-scope ▸ "MVP screens / surfaces". Statuses: **FULL** · **THIN** · **READ-ONLY** · **HIDDEN** (in the model, not rendered in the MVP tenant shape) · **LATER** (Phase 3/4). A node absent from the table inherits its parent's status.*

**Sheet P** cross-checks each node against `studio-feature-prioritization-3mo-to-review-v3.xlsx` (v11 · 2026-07-20): the capability's priority there (**P0** = a demo scenario fails without it · **P1** = needed · **P2** = nice · **P3** = not in the 3-month MVP), with the driving capability numbers in brackets (F* = platform foundation, N* = setup/UX). ⚠️ marks where the IA status and the sheet priority pull in different directions — reconciled below the table.

| IA node | MVP | Sheet P (cap) | Note |
|---|---|---|---|
| Studio Tenant (chrome) | HIDDEN | P0 (F0) | structural, not a scope cut; first-run provisioning, invisible while single-workspace |
| Workspaces | HIDDEN | P0 (F0) | structural — single-workspace collapse (R10) |
| Overview | **FULL** ⭐ | P0 (N4, 47) | **the hero** — *Project Home* (D-008): NL command bar · Recommendations rail · object/document lists · gate & connector status strip |
| Insights (Signals · Metrics) | LATER | ⚠️ P0/P1 (1, 34, 19) | *surface* deferred, *content* ships: cost-per-accepted-change (P0, cap 1) + delivery metrics (P1, cap 34) + continuous findings (P1, cap 19) render on the Home rail / 5 ROI numbers, not a dedicated Insight tab |
| Work queue ▸ Recommendations | FULL | P0 (9, 19, 47) | the Home rail + a full detail view (home of the pinned gap) |
| Work queue ▸ Candidates | THIN | P2 (24) | folded into plan-preview + the approval flow; no separate tab |
| Work queue ▸ Approvals | FULL | P0 (F9, 22, 32) | human-gated approvals + «no-approved-spec-no-build» checkpoint + write-back queue |
| Work queue ▸ Write-backs | THIN | P0 (32) | the one bounded demo write-back + its audit trail |
| Projects / [Project] | THIN | P0 (N4, F0) | single project (N allowed in the model); project Overview collapses into the hero |
| [Project] ▸ Included objects · Inclusion | FULL | P0 (44, GRAPH-01) | GRAPH-01 curate-scope: keep / drop / relink via the Object Browser table + NL |
| [Project] ▸ Views (project) | THIN | P0 (8, 45) | backlog/stories list + sprint board; Graph View = traceability list, no canvas; Insight View → LATER |
| [Project] ▸ Access | THIN | P1 (40) | project-scope role grant = the visibility unit (D-012) |
| Objects ▸ Object browser | **FULL** ⬆ | P0 (F4, 44, 45) | filter/sort table + traceability / lineage as an indented list — NOT a canvas |
| Objects ▸ Saved views | THIN | P0 (44, 45) | **no pinned "Graph" diagram** (canvas dropped — D-007); the lineage list ships inside the browser |
| Objects ▸ Object detail | FULL | P0 (F4, 45) | attributes · evidence · related-as-grouped-lists · light history; at most a read-only neighbors micro-panel |
| Objects ▸ Object detail ▸ Discussion (comments) | LATER | — (not in sheet) | commenting is post-MVP; the sheet (v11/07-20) predates the comments requirements (studio-collaboration-comments-requirements, 07-21) — needs a new capability row when prioritized. MVP settles decisions into artifacts, not threaded comments |
| Objects ▸ New from template | FULL | P0 (7) | the Spec/PRD markdown editor (problem drafted from the gap) |
| Workflows ▸ Workflow Library | THIN | P0 (7, 8, 11, 36) | demoted to the "what can Studio do here?" fallback — invocation is NL-first + plan-preview (D-009) |
| Workflows ▸ Runs & history | THIN | P0 (F5, 47) | "watch it fill" + run evidence (PMS-04) |
| Workflows ▸ Definitions · Automations | LATER | P1 (39) | the *builder/automation editor* is deferred; workflows ship inside kits |
| Glossary | LATER | P3 (18) | outside the golden thread |
| Ws settings ▸ Installed kits | THIN | P0 (36) | SDLC + PM kits: install → prepare + readiness strip (ADM-05/06) |
| Ws settings ▸ Lifecycle (SCLC) | READ-ONLY | P0 (43, 22) | Reference SCLC applied by the kit; the Lifecycle editor is cut |
| Ws settings ▸ Ontology (effective) | LATER | ⚠️ P1 (37) | customization is P1 in the sheet (rename fields · change allowed values · add types); MVP ships only a sliver — template re-field + gate toggle (ADM-10) |
| Ws settings ▸ Access | THIN | P0/P1 (F3, N1, 40) | 3 fixed roles at workspace scope (ADM-09) |
| Ws settings ▸ Model routing | THIN | P0 (N6, 4) | ship config · swap-from-menu · projected cost · **LOCK** (ADM-08) |
| Ws settings ▸ Cost budgets | LATER | P3 (5) | projected cost only; the budget engine is deferred |
| Insights (all workspaces) | HIDDEN | P0 (N5) | the P0 portfolio need (cap N5) is met by **DISC-01** — a flat admin-only table, not the double-gated rollup (which never fires in a single-workspace tenant) |
| Integrations ▸ Connectors · Source systems | THIN | P0 (F2, 31) | Git + CI (read-only mirror, 1 repo) + Jira discovery; Connection Wizard |
| Integrations ▸ Identity mappings | THIN | P0 (F3, 44) | configured account mapping — single-source Person (D-033); merge-confirm queue → v-next |
| Integrations ▸ Sync runs & state | THIN | P0/P1 (31, 33) | connector / sync health on the status strip |
| Integrations ▸ Conflicts | LATER | P3 (—) | no conflict engine in MVP — single source per type (D-038) |
| Kits ▸ Kit Catalog · [Kit] | THIN | P0 (36) | the 2 shipped kits + PRJ-01 recommendation; Publish a kit → LATER |
| Kits ▸ Domain profiles | LATER | P1 (37) | new-domain introduction is P1; profiles surface deferred |
| Ontology (tenant registry) | LATER | P1 (37) | kit install registers types invisibly; no registry surface (mechanism ships, surface deferred) |
| Gears | THIN | P1 (14) | **now in MVP (D-077, 2026-07-21):** a read-only Gears catalog (the 6 building-block families) so members see what the build assembles from — cap 14's P1 assembly gets a nav home; authoring / publishing Gears stays LATER |
| Members & Access | THIN | P0/P1 (F3, F8, N1, 40) | invite + 3 fixed roles + project-scope grants (ADM-09); Teams / custom roles → LATER |
| Governance ▸ Audit log | THIN | P0 (F7, 39) | config changes · write-backs · discovery-report access |
| Governance ▸ Autonomy ladder (trust-ramp) | THIN | P1 (38, 39) | **now in MVP (D-078, 2026-07-21):** a per-workspace autonomy setting — read → recommend → act — plus per-actor reach; the "adopt gradually" pitch gets a real surface, alongside the routing lock + shipped-gates toggle |
| Governance (data policies · safety · budgets · AI usage · SOC2/SBOM/scanning) | LATER | P1/P3 (40, 41, 42, 48) | access control (P1, cap 40) rendered via Members & Access; heavier compliance/security (SOC2, SBOM, scanning — P3) deferred |
| Account | THIN | — (commercial) | billing stub; seats counted real |
| Personal settings | THIN | P1 (15) | profile; Client access = CLI / IDE / MCP for the dev session (DEV-01…03); My views → LATER |

### Reconciliation with the priority sheet

**Broad agreement.** Every IA node marked FULL / THIN / READ-ONLY maps to a **P0 or P1** capability, and every clearly-out node (Cost budgets, Conflicts, plus the whole deferred tail — feedback aggregation, service catalog, progressive rollout, SLOs/on-call, agent fleets, Slack triggers, SBOM/SOC2, security scanning) maps to **P3**. IA scope and sheet scope substantially coincide.

**Surface deferred, capability shipping (not conflicts — placement calls).** Three P0/P1 capabilities ship without their dedicated target surface, folded elsewhere for the MVP:
- **Insights** — cost-per-accepted-change (P0), delivery metrics (P1), continuous findings (P1) render on the Home rail / ROI numbers; the Insight tab itself is LATER.
- **Insights (all workspaces)** — the P0 portfolio review (N5) is served by the flat **DISC-01** table, not the rollup.
- **Ontology (registry + effective)** — the P1 customization/type mechanism runs invisibly at kit install; the registry surface is LATER.

**Two P1 tensions — resolved into the MVP (2026-07-21).** Both were P1 in the sheet with no MVP surface; both are now pulled in as THIN:
1. **Gears (cap 14, P1) → THIN (D-077).** A read-only Gears catalog (the 6 building-block families) ships so members can see what the build assembles from; the P1 assembly capability gets a nav home. Authoring / publishing Gears stays LATER.
2. **Governance / trust-ramp (caps 38–39, P1) → THIN (D-078).** A minimal autonomy-ladder surface (per-workspace read → recommend → act, plus per-actor reach) ships alongside the routing lock + gate toggle, giving the "adopt gradually" pitch a real surface. Access control (cap 40, P1) renders via Members & Access; heavier compliance/security (SOC2, SBOM, scanning — P3) stays LATER.

*These two are new MVP-scope decisions — mirror them into studio-mvp-scope (build detail) and log D-077 / D-078 in studio-decision-register.*

**Not yet priced.** Comments / Discussion (§6.5) is LATER in the IA but absent from the sheet — the sheet (v11/07-20) predates the comments requirements (07-21). It needs a new capability row before the next re-prioritization.

## Open decisions (IA-shaped only)

*Decisions that change the tree's **shape** or a node's **rendering**. Product / model / governance decisions that merely touch a surface are tracked in studio-decision-register, not copied here.*

- **Hero surface — DECIDED (2026-07-13, D-008):** one home surface keyed to the **workspace** (command bar + recommendations rail at workspace level); in a single-project tenant it reads as *Project Home*; the per-project Home slims as projects multiply.
- **Per-role IA views** *(D-044)* — draw the tree per role (PM and others): structural reparenting vs annotative tagging.
- **Projection across scopes** *(D-041 — pilot profile decided 2026-07-13: additive union of grants, downward inheritance, no deny; the enterprise variant — attribute-level restriction, legal walls — stays open)* — governs what the tree shows at each level.
- **Insights (all workspaces) placement** *(D-045)* — currently a child of Workspaces (double-gated); decide whether it earns its own root/section once real cross-workspace views exist. *(Formerly "Portfolio", renamed 2026-07-12.)*
- **Stage board** *(D-046)* — ship a saved-view kind (objects grouped by lifecycle stage) if the dissolved applied-state surface (stage & gates on detail · gate strip on Overview · checkpoint signals in Insights) proves insufficient.
- **Comment aggregation surface** *(NEW 2026-07-21, ties to §6.5 / studio-collaboration-comments-requirements)* — comments render in place (R7), but does the PM's cross-material review flow (walkthrough → per-shot problem → task) need a workspace-level **Discussions / Review** surface, or does the Work queue + in-place threads suffice? Decide with UX before comments ship.
- **Empty-state visibility matrix** *(D-053)* — the small-team degenerate case (1 workspace, 1 team, 0 policies) is a first-class IA state: per-node empty-state visibility, to be specified with UX.

Tracked in studio-decision-register (not IA-structural): D-040 first view kinds · D-047 ontology change control at scale · D-048 tenant-queue delegation & facets · D-049 compliance read-only role · D-050 in-context kit publishing · D-051 platform-squad pattern · D-052 kit catalog at scale.

## Related

- studio-product-domain-model — canonical Studio domain model (this IA conforms to draft-v0.9.24)
- software-organization-domain-model — canonical organization domain model
- studio-mvp-scope — build detail + seed states for the MVP overlay
- studio-collaboration-comments-requirements — collaboration / comments requirements (§6.5 surface, v-next)
- studio-decision-register — non-IA-structural decisions referenced above
- `competitors/deck/studio-feature-prioritization-3mo-to-review-v3.xlsx` (v11 · 2026-07-20) — the P0–P3 priority source for the MVP overlay's Sheet-P column
- `egor/STUDIO Information Architecture` — Egor's draft this responds to
- `v3.9 - Studio Information Architecture.xmind` — the earlier IA-track map (retired 2026-07-13 — this document is canonical)

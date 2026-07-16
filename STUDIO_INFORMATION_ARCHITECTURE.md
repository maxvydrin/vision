---
type: information-architecture
artifact: studio-information-architecture
status: draft-v0.8.15
date: 2026-07-13
tags: [studio, information-architecture, ux, foundations]
related: ["studio-product-domain-model", "software-organization-domain-model"]
---

# Studio Information Architecture

Navigation architecture for Constructor Studio, projected from studio-product-domain-model (the canonical Studio domain model, studio-product-domain-model). Root reading: `Workspaces` · **SUPPLY** (`Integrations · Kits · Ontology · Gears`) · **CONTROL** (`Members & Access · Governance · Account`) + per-member Personal settings. Scope model = **Tenant root**: **Tenant → Workspace → Project** — a Tenant is one organization's Studio instance; a **Workspace** is the working context for one purpose (typically a product line) and **owns its Knowledge Graph**; a **Project** is the effort container (≈ what trackers call an epic / initiative — colloquial, not the org-model Strategic Initiative) inside a workspace.

## Navigation tree

*Reading key: `§n` and `invariant n` cite studio-product-domain-model.*

```
Studio Tenant                         one organization's Studio instance · commercial packaging = configuration, not entities
├─ Workspaces                         the only root every member always sees — bare, above all sections
│   ├─ [Workspace]                    one purpose — typically a product line · owns its Knowledge Graph
│       ├─ Overview                   connector & gate status · recommendations rail (placement decided —
│       │                             D-008: workspace-level home surface)
│       ├─ Insights                   everything computed and read-only, in one place (invariant 14) — the trust
│       │                             ramp's first stage, rendered through insight views (§3.3)
│       │   ├─ Signals                gaps · drift · staleness · contradictions · duplicates · ownership holes —
│       │   │                         acknowledge or dismiss, never edit; recomputed as the graph changes; a signal
│       │   │                         may propose a recommendation (→ Work queue ▸ Recommendations)
│       │   └─ Metrics                delivery metrics (§6.3: cycle time · acceptance rate · time-to-ready ·
│       │                             requirement-to-test coverage — from transitions, never entered) · cost per
│       │                             accepted change (Cost Metric) · delivery health · release readiness —
│       │                             a "dashboard" is a saved view of kind `dashboard` over these (§3.3);
│       │                             ships with a default **"Delivery dashboard"** saved view
│       ├─ Work queue                 one queue for everything awaiting a decision or in flight
│       │                             (all states of one Action Run entity — design rule 4)
│       │   ├─ Recommendations        action runs in state `prepared` awaiting a human decision — often produced
│       │   │                         from a signal (← Insights ▸ Signals)
│       │   ├─ Candidates             candidate objects (proposed content) + validation results
│       │   ├─ Approvals              approve / reject / escalate / defer · decider & rationale · evidence cited
│       │   └─ Write-backs            approved changes applied to source systems · status · audit trail
│       ├─ Projects
│       │   └─ [Project]              effort ≈ epic / initiative (colloquial) — itself a managed object of type Project (§3.1)
│       │       ├─ Overview           goal · outcome · what it advances (a Roadmap Item · an epic work item)
│       │       ├─ Included objects   gathered by reference; an object may be in several projects
│       │       ├─ Views (project)    lists · boards · traceability · Graph View (project-scoped slice of the
│       │       │                     workspace Knowledge Graph) · Insight View (project window onto workspace
│       │       │                     signals & delivery metrics) — views only: the graph and the signals stay
│       │       │                     workspace-level (§3.3, Appendix A)
│       │       └─ Access             role grants at project scope
│       ├─ Objects                    browse everything this workspace includes — search, filter, open details
│       │                             (a graph diagram is one saved-view kind, not the primary surface — design rule 3)
│       │   ├─ Object browser         search & filter the workspace's objects; object type is one filter among many
│       │   ├─ Saved views            saved browsers (§3.3 View): list · board · table · timeline · dashboard ·
│       │   │                         graph diagram; kinds: object · traceability · review · graph view · insight
│       │   │                         view — the Object browser is the *unsaved* view; "Save as view" creates one;
│       │   │                         a **"Graph"** saved view (kind: graph view — the whole-workspace diagram)
│       │   │                         ships as one default among the saved views — content, not the primary
│       │   │                         surface (design rule 3; MVP: canvas dropped — see MVP overlay); a view
│       │   │                         owned by a member lives under Personal settings ▸ My views
│       │   ├─ Object detail          attributes · content & versions (content-backed) · provenance & sync state ·
│       │   │                         relations · state history (transitions, §6.1 — read-only) · validation status ·
│       │   │                         lifecycle stage & gate state · evidence · glossary terms expressed (term
│       │   │                         mappings, §7) · locked stubs for restricted neighbors — every detail page is
│       │   │                         a graph traversal
│       │   ├─ New from template      create an authored object from a kit template (PRD, postmortem, design doc)
│       │   └─ Inclusion              add / remove by reference · who, when, manual or rule
│       ├─ Workflows                  repeatable pipelines — what a member runs, published to the Workflow Library (§3.3)
│       │   ├─ Workflow Library       published workflows, predefined + custom — populated by installed kits (vision: Flow Library)
│       │   ├─ Runs & history         workflow runs → action runs (AI-run detail — model · tokens · cost —
│       │   │                         gated by the AI-usage grant); waits on approvals
│       │   ├─ Definitions (config)   admin-facing: activities · actors (incl. agent roles, §6.2) · gates · sub-workflows
│       │   └─ Automations            admin-facing: rules "when X happens — run Y": event / sync-result /
│       │                             schedule triggers firing workflows or actions (§3.3 Automation)
│       ├─ Glossary                   the living glossary of the customer's OWN product terms — what the team is
│       │                             BUILDING ("recovery point", "immutable backup") · per workspace; one surface:
│       │                             the term list (name + definition), a term opens into definition · where it is
│       │                             expressed (requirement · design · code · tests, via term mappings) · drift
│       │                             signals (→ Insights ▸ Signals); not Studio's delivery ontology, not label
│       │                             overrides (§7 Glossary Term — the surface and the entity share one lexicon)
│       └─ Workspace settings
│           ├─ Installed kits         kits this workspace runs; install populates Workflow Library · templates · validators
│           ├─ Lifecycle (SCLC)       config only: phases Plan / Build / Operate → 14 stages; per role & stage:
│           │                         activities · inputs / outputs · quality gates · synchronization checkpoints —
│           │                         applied state renders in place: stage & gates on object detail · gate strip
│           │                         on Overview · checkpoint signals in Insights
│           ├─ Ontology (effective)   which types are active in this workspace (invariant 13) + this workspace's own
│           │                         renames of type labels — a workspace rename wins over the tenant one; renames
│           │                         change labels only, never meaning (invariant 11)
│           ├─ Access                 role grants at workspace scope
│           ├─ Model routing          workspace-scope routing under tenant Governance policy
│           └─ Cost budgets           workspace-scope caps under tenant Governance policy
│   └─ Insights (all workspaces)      the same Insights surface at tenant scope: signals & metrics across every
│                                     workspace + cross-line objectives & compliance views (the tenant-wide read
│                                     surfaces model §5 promises) — renders only when BOTH hold: a tenant-scope
│                                     grant AND 2+ workspaces (double empty-state gate; never appears in a
│                                     collapsed single-workspace tenant)
│
│  SUPPLY                             section header (non-navigable) · what feeds the tenant's domain:
│                                     facts · types · knowledge · components
├─ Integrations                       admin-facing · tenant-level plumbing (connectors belong to the tenant)
│   ├─ Connectors                     health · lifecycle · field & relationship mappings · write-back capabilities
│   ├─ Source systems                 the plumbing side; the same tool may also appear in graphs as a `Tool` object
│   ├─ Identity mappings              proposed matches → admin confirms / splits · audit-logged
│   ├─ Sync runs & state              per source link: in sync · pending · stale · conflicted · error · paused
│   └─ Conflicts                      first-class queue · resolved per the organization's governance rules
├─ Kits                               distribution unit for domain & delivery knowledge — one supplier of the ontology;
│                                     catalog visible to members, admin depth gated by grants
│   ├─ Kit Catalog                    internal, per tenant: shipped by Constructor + published by members · not a marketplace
│   │   ├─ [Kit]                      kit detail — everything the kit contains: the object & relation types it
│   │   │                             defines (with live status: registered at the tenant · active in which
│   │   │                             workspaces — shown read-only in place for grant-less members, no navigation
│   │   │                             out) · workflows · actions · validators · templates · gears used (invariant 13)
│   │   ├─ Installed by workspace     where each kit runs; install registers types tenant-wide, activates them here
│   │   └─ Publish a kit              unit of sharing = kit · `publish` permission · audit-logged
│   └─ Domain profiles                dictionary + kit content for a target domain / operating model
├─ Ontology                           admin-facing · tenant-wide type registry — full tree, progressive disclosure (invariant 13)
│   ├─ Object types                   browse & manage the tenant's object types — each maps to one org-model term,
│   │                                 may specialize another (Metric · Decision); group or filter the list by the
│   │                                 kit that supplied each type (built-in / kit-installed / custom)
│   ├─ Relation types                 mirror the org model's primary relationships · allowed endpoint types
│   ├─ Org-model mapping              which Studio type stands for which organization term (the model's §9 table
│   │                                 as a living surface) — governance, never kit content
│   ├─ Domain dictionary              tenant-level terminology overrides — labels only, never semantics (invariant 11)
│   └─ Add types…                     one task, two doors: install a kit (→ Kit Catalog) · define a custom type
├─ Gears                              admin-facing · Constructor Gears library — building blocks that kits & actions assemble
│   └─ Building blocks                Identity · Authorization · Events · Serverless · GenAI · Platform
│                                     (browse & reference; an adopted gear also appears in graphs as software estate)
│
│  CONTROL                            section header (non-navigable) · who may do what · under which rules · what we pay
├─ Members & Access                   admin-facing · day-to-day access administration — deliberately NOT merged into
│                                     Account (one kind of thing: access — see the no-conjunction rule's scope note)
│   ├─ Members                        someone using Studio · optionally linked to one Person object
│   ├─ Teams                          Studio-native access groups · optionally seeded from an org Team object ·
│   │                                 never auto-synced — sources must not silently change access
│   ├─ Roles (catalog)                named permission sets · permission = right × resource
│   └─ Role grants                    grantee (member | team) × role × scope (tenant / workspace / project)
├─ Governance                         admin-facing · the tenant control plane over acting, data and AI
│   ├─ Data policies                  sensitivity · retention · redaction · model usage
│   ├─ Safety constraints             unauthorized write-back · data exposure · uncontrolled model use
│   ├─ Model routing policy           per activity type / role / cost / risk — lockable by the organization
│   ├─ Cost budgets                   caps at tenant / workspace / project / workflow / agent / model
│   ├─ AI usage & cost                AI runs · usage events · cost metrics
│   └─ Audit log                      who did what, when — the immutable record of every administrative act
│                                     (the industry-standard name: GitHub/Slack/GitLab all call it this):
│                                     role grants · team membership changes · kit publications · approvals ·
│                                     write-backs · identity merges & splits · agent actions (§6.1, invariant 7)
├─ Account                            owner-facing · rare-touch: what we pay for, tenant-level policy
│   ├─ Subscription & billing         plan · commercial packaging (configuration, not domain entities)
│   └─ Account policies               tenant policies · incl. allowed clients & API-token policy
└─ (avatar menu) Personal settings    per-member — not a tenant area, reached from the member menu
    ├─ Profile & notifications
    ├─ My views                       saved views I own — any kind, any workspace (§3.3: view belongs to
    │                                 workspace | project | member)
    └─ Client access                  CLI · IDE plugins · MCP servers · API tokens — access surfaces, outside the domain model

Member's effective root (no tenant-scope grants):   Workspaces · Kits (catalog only)
Tenant admin's effective root:                      all of the above (+ Insights (all workspaces), with a tenant-scope grant)
Single-workspace tenant:                            the workspace's children hoist to the root — see the collapse rule
```

## Design rules (how the model projects into navigation)

1. **The `Facing` column drives altitude.** User-facing entities become work surfaces inside the Workspace; Admin-facing entities land in tenant-level areas or Workspace settings; **System-facing entities get no navigation node at all** (Knowledge Graph, Source Record, Source Link, User Projection, Context Package, Usage Event, Transition, Term Mapping) — they surface only inside details and signals (a Transition appears as state history in object detail; a Term Mapping inside object detail and a glossary term's detail). One sanctioned exception: **workspace-scope admin configuration may render grant-gated inside the work area it configures** (Workflows ▸ Definitions, Automations) — placement follows the task, gating follows the grant. (Lifecycle (SCLC) config lives in Workspace settings — its applied state renders in place, so there is no work-area Lifecycle node to host it.)
2. **Deliberate no-node entities of the acting layer:** Action, Validator, Agent Role, Quality Gate and Synchronization Checkpoint definitions get no standalone nodes — they surface inside kit content (kit detail) and workflow/stage/lifecycle configuration detail.
3. **The graph is not a canvas.** The Knowledge Graph is a system model; members meet it through the Object browser (query/filter), object details and traceability views. A graph *diagram* is just one saved-view kind.
4. **Prepared Action and Write-back are Action Run states**, so the acting layer is one **Work queue**, not separate sections per object type — the queue filters by state (`prepared` → Recommendations; approved + source-system target → Write-backs).
5. **Signals are not queue items — Insights is its own surface, and it is the only computed-read-only surface.** The trust ramp's first stage gets a dedicated workspace node: a Signal is computed and acknowledged/dismissed (invariant 14), never *decided*, so putting it in the Work queue would break design rule 4's contract ("states of one Action Run entity"). The bridge is a single link: a signal that produces a prepared run surfaces in Recommendations. Metrics (delivery + cost) live in Insights too — **there is no separate Dashboards node**, because *dashboard* is a view **kind** in the model (§3.3), not an entity: a dashboard is a saved view over Insights content.
6. **A View is a saved browser.** The Object browser is the ad-hoc (unsaved) view; "Save as view" turns a filter into a shared, named View (§3.3) — so saved views live inside Objects (▸ Saved views), not as a parallel workspace node; project views under the project; member-owned views under Personal settings ▸ My views.
7. **Access renders in place.** Restricted objects appear as locked stubs wherever a relation reaches them; there is no separate "restricted items" area. Every surface renders through the member's User Projection.
8. **Sync trust is visible everywhere:** provenance + sync state on every object detail; Conflicts and Identity mappings are admin queues at the tenant.
9. **Org entities never become navigation.** People, Teams, Products arrive as managed objects and are met through views (people directory, team page, portfolio) — not as structural nodes. The one deliberate exception is **Project**: unified with the org-model entity (§2.2 — a Studio Project *is* a managed object of type Project), it carries Studio's workbench and therefore a node. Functions (org-model overlay) appear through roles, assignments and views (§9 conventions).
10. **Per-member surfaces live in Personal settings** (avatar menu), not in tenant navigation: member-owned views (My views) and client access (CLI · IDE plugins · MCP · API tokens — member configuration, not entities). Tenant policy over clients sits in Account → Account policies.
11. **No conjunction nodes.** One node = one kind of thing: Kits and Gears are separate roots (packaged knowledge vs component library), Governance carries its own audit, Account is billing/policy only — no "X & Y" umbrellas hiding two different things. Scope note: a feature-area name that names **one** kind is not a conjunction — "Members & Access" is one kind (access administration: members, teams, roles, grants).
12. **Sibling order = frequency × importance.** Within every level, everyday destinations sit above occasional ones and configuration sits last: the workspace reads as the daily loop — Overview → Insights (what's new / what's wrong) → Work queue (what awaits my decision) → Projects / Objects (the work) → Workflows → Glossary (occasional curation) → settings; SUPPLY orders Integrations (daily queues) → Kits (member-visible catalog) → Ontology → Gears; CONTROL orders Members & Access (daily) → Governance (weekly) → Account (rare). A new node earns its slot by answering "how often, by whom" — not by arrival order.
13. **Facing drives visibility, not only altitude — and headers group without nesting.** The root is structurally flat: `SUPPLY` and `CONTROL` are non-navigable section labels (no URL, no breadcrumb level, announced as group labels to assistive tech), while `Workspaces` sits bare above all sections — the one work surface every member always sees. Admin-facing roots render only for holders of the corresponding tenant-scope feature-area grants (§5), so root width is a per-persona fact — and nothing but Workspaces may ever occupy the unlabeled top position.
14. **Kits and Ontology stay separate, joined by provenance.** A kit is a distribution unit whose payload cuts across many registries (types are one of seven payload kinds); the ontology is the registry that outlives catalog entries and shows each type's supplier (built-in / kit-installed / custom — invariant 13). They meet as shared task entry points: the registry groups/filters by kit, the kit card lists the types it defines with live state, and "Add types…" is one task with two doors. **At the visibility boundary, cross-links degrade to read-only-in-place:** a grant-less member sees a kit's type status on the kit card but cannot navigate into the Ontology root.
15. **Single-workspace collapse.** When a tenant has exactly one workspace, the workspace's children (Insights · Work queue · Projects · Objects · Workflows · Glossary · Workspace settings) hoist to the root and the Workspaces node disappears; it reappears when a second workspace is created. Mirror of the hidden-Organization pattern for single-workspace companies. The collapse changes tree *shape*, not orientation: the scope selector / breadcrumb slot stays stable, so the second workspace extends the selector instead of re-teaching navigation.
16. **Visibility is state-based as well as grant-based.** An admin-facing root renders when its holder has the grant **and** the area has something to show or set up: Governance, Ontology and Gears appear for an admin only once a relevant artifact exists (first policy, first custom type, first gear reference) or via an explicit setup entry — a fresh small-team tenant shows an admin a near-member root, not the full console.

## Layer mapping (IA area → model section)

| IA area                                                          | studio-product-domain-model section                                                                 |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Studio Tenant / Workspaces / Projects / Members                  | §3.1 Containers and people                                                                          |
| Objects (browser, detail, new-from-template, saved views, inclusion) | §3.2 Objects and relations + §3.3 View (saved browsers) + §4 provenance/sync + §7 Template      |
| Insights — workspace and all-workspaces scopes                   | §6.1 Signal + §6.3 Delivery/Cost Metric; tenant scope per §5 Role Grant (tenant-wide surfaces)      |
| Glossary                                                         | §7 Glossary Term · Term Mapping (mapping surfaces inside object detail and term detail)             |
| Views (Objects ▸ Saved views · project views · My views)         | §3.3 View (incl. graph view · insight view; a project's Graph/Insight View = project-scoped views)  |
| Workspace settings ▸ Lifecycle (SCLC) — applied state in place   | §7 SCLC · Lifecycle Phase · Lifecycle Stage · Activity · Synchronization Checkpoint                 |
| Workflows (library, runs, definitions, automations)              | §3.3 Workflow · Workflow Run · Automation; §6.1 Action / Action Run                                 |
| Work queue (recommendations, candidates, approvals, write-backs) | §6.1 acting layer (Action Run states · Candidate Object · Approval · Evidence)                      |
| Integrations                                                     | §4 How the Organization Enters Studio                                                               |
| Ontology (types, mapping, dictionary)                            | §3.2 Object Type / Relation Type + §9 mapping + §7 Domain Dictionary (invariant 13)                 |
| Kits (catalog, profiles)                                         | §7 Kit Catalog · Studio Kit · Domain Profile                                                        |
| Gears                                                            | §7 Gears Building Block                                                                             |
| Governance (policies, AI, audit)                                 | §5 Data Policy / Safety Constraint + §6.2 AI collaboration + §6.3 Usage and cost + §6.1 Audit Entry |
| Members & Access                                                 | §3.1 Member · Team + §5 Who Sees What (RBAC, User Projection)                                       |
| Account                                                          | §3.1 Studio Tenant (commercial packaging = configuration)                                           |
| Personal settings (profile, my views, client access)             | §3.3 View (member-owned); client access = member configuration, not entities (§3.1)                 |

## MVP overlay (D-054)

*The tree above is the **target** navigation. The MVP renders the subset below — the IA↔MVP delta map, decided 2026-07-13 (register D-054); build detail + seed states live in studio-mvp-scope ▸ "MVP screens / surfaces". Statuses: **FULL** (design + build) · **THIN** (minimal) · **READ-ONLY** (view only) · **HIDDEN** (exists in the model, not rendered in the MVP tenant shape) · **LATER** (deferred to Phase 3/4). A node absent from the table inherits its parent's status.*

| IA node | MVP | Note |
|---|---|---|
| Studio Tenant (chrome) | HIDDEN | created by the first-run provisioning chain; invisible while single-workspace (mvp Locked 8/13) |
| Workspaces | HIDDEN | single-workspace collapse (rule 15) — the workspace's children hoist to the root |
| Overview | **FULL** ⭐ | **the hero** — reads as *Project Home* (D-008): NL command bar · Recommendations rail · object/document lists · gate & connector status strip |
| Insights (Signals · Metrics) | LATER | no Insight tab (mvp Locked 11); the golden-thread signal renders as a card on the Home rail; the 5 ROI numbers read from the D-034 transition log |
| Work queue ▸ Recommendations | FULL | = the Home rail + a full detail view (home of the pinned gap) |
| Work queue ▸ Candidates | THIN | folded into plan-preview + the approval flow; no separate tab |
| Work queue ▸ Approvals | FULL | human-gated approvals + the «no-approved-spec-no-build» checkpoint + the write-back queue |
| Work queue ▸ Write-backs | THIN | the one bounded demo write-back + its audit trail |
| Projects / [Project] | THIN | single project (N allowed in the model — Locked 13); the project Overview collapses into the hero |
| [Project] ▸ Included objects · Inclusion | FULL | GRAPH-01 curate-scope: keep / drop / relink via the Object Browser table + NL |
| [Project] ▸ Views (project) | THIN | backlog/stories list + sprint board (re-homed); Graph View = traceability list, no canvas; Insight View → LATER |
| [Project] ▸ Access | THIN | project-scope role grant = the visibility unit (D-012) |
| Objects ▸ Object browser | **FULL** ⬆ | filter/sort table + traceability / lineage as an indented list — NOT a canvas |
| Objects ▸ Saved views | THIN | **no pinned "Graph" diagram** (canvas dropped — Locked 7 / D-007); the lineage list ships inside the browser |
| Objects ▸ Object detail | FULL | attributes · evidence · related-as-grouped-lists · light history; at most a read-only neighbors micro-panel |
| Objects ▸ New from template | FULL | the Spec/PRD markdown editor (problem drafted from the gap) |
| Workflows ▸ Workflow Library | THIN | demoted to the "what can Studio do here?" fallback — invocation is NL-first + plan-preview (Locked 9 / D-009) |
| Workflows ▸ Runs & history | THIN | "watch it fill" + run evidence (PMS-04) |
| Workflows ▸ Definitions · Automations | LATER | no visual builder; workflows ship inside kits |
| Glossary | LATER | outside the golden thread |
| Ws settings ▸ Installed kits | THIN | SDLC + PM kits: install → prepare + readiness strip (ADM-05/06) |
| Ws settings ▸ Lifecycle (SCLC) | READ-ONLY | Reference SCLC applied by the kit; the Lifecycle editor is cut |
| Ws settings ▸ Ontology (effective) | LATER | customization sliver = template re-field + gate toggle only (ADM-10) |
| Ws settings ▸ Access | THIN | 3 fixed roles at workspace scope (ADM-09) |
| Ws settings ▸ Model routing | THIN | ship config · swap-from-menu · projected cost · **LOCK** (ADM-08) |
| Ws settings ▸ Cost budgets | LATER | projected cost only; the budget engine is deferred |
| Insights (all workspaces) | HIDDEN | the double gate never fires in a single-workspace tenant; the portfolio need is served by **DISC-01** — a flat admin-only table, not a rollup |
| Integrations ▸ Connectors · Source systems | THIN | Git + CI (read-only mirror, 1 repo) + Jira discovery (list-projects); Connection Wizard |
| Integrations ▸ Identity mappings | THIN | configured account mapping — single-source Person (D-033); merge-confirm queue → v-next |
| Integrations ▸ Sync runs & state | THIN | connector / sync health on the status strip |
| Integrations ▸ Conflicts | LATER | no conflict engine in MVP — single source per type (D-038) |
| Kits ▸ Kit Catalog · [Kit] | THIN | the 2 shipped kits + PRJ-01 recommendation; Publish a kit → LATER |
| Kits ▸ Domain profiles | LATER | — |
| Ontology (tenant registry) | LATER | kit install registers types invisibly (invariant 13); no registry surface |
| Gears | LATER | — |
| Members & Access | THIN | invite + 3 fixed roles + project-scope grants (ADM-09); Teams → LATER; custom roles → LATER |
| Governance ▸ Audit log | THIN | config changes · write-backs · discovery-report access |
| Governance (policies · safety · routing policy · budgets · AI usage) | LATER | MVP keeps the workspace-level routing lock + shipped-gates toggle instead |
| Account | THIN | billing stub; seats counted real |
| Personal settings | THIN | profile; Client access = CLI / IDE / MCP for the dev session (DEV-01…03); My views → LATER |


## Open decisions

- **Hero surface — DECIDED (2026-07-13, D-008):** one home surface, keyed to the **workspace** — the command bar + recommendations rail live at workspace level; in a single-project tenant it reads as *Project Home* (single-workspace collapse); the per-project Home slims down as projects multiply.
- **Per-role IA views** *(D-044)* — draw this tree per role (PM and others): structural reparenting vs annotative tagging (carried over from the IA track).
- **Projection across scopes** *(D-041 — **pilot profile decided** 2026-07-13: additive union of grants, downward inheritance, no deny semantics; the enterprise variant — attribute-level restriction, legal walls — stays open)* — affects what the tree shows at each level (model O3).
- **First view kinds for UX** *(D-040)* — which of list / board / traceability / review ship first (model open item).
- **Insights (all workspaces) placement** *(D-045)* — currently a child of Workspaces (double-gated: tenant-scope grant + 2+ workspaces); decide whether it deserves promotion to its own root/section once real cross-workspace views exist. *(Formerly named "Portfolio" — renamed 2026-07-12: it is the Insights surface at tenant scope, and same-surface-same-name beats a new exec word.)*
- **Stage board** *(D-046)* — a shipped saved-view kind (objects grouped by lifecycle stage), if the dissolved applied-state surface (stage & gates on object detail · gate strip on Overview · checkpoint signals in Insights) proves insufficient.
- **Ontology change control at scale** *(D-047)* — a member-published kit install registers types tenant-wide (a workspace act with tenant-global effect); large orgs likely need a pending-review state decided by an ontology-steward role; Constructor-shipped kits may bypass.
- **Tenant queue delegation** *(D-048)* — Integrations queues (Identity mappings, Sync runs, Conflicts) need workspace/connector facets, saved filters and item assignment at 10+ workspaces; feature-area grant scoping per connector/workspace.
- **Compliance read-only role** *(D-049)* — an audit-read grant that shows Audit log + Evidence/Approvals trails without Governance write access; plus a workspace-filtered audit slice in Workspace settings.
- **In-context kit publishing** *(D-050)* — a "Share as kit…" affordance on workflows/templates/views inside the workspace, pre-filling Publish-a-kit (the catalog leaf stays the canonical door).
- **Platform-squad pattern (20–100)** *(D-051)* — a squad serving several workspaces: bless a "Platform" workspace with an "asserted-elsewhere" indicator on object details in other workspaces, or another mechanism; asserted relations cannot span workspaces today (invariant 4).
- **Kit Catalog at scale** *(D-052)* — owning team, namespace prefix and lifecycle state (published / deprecated / archived) per catalog entry for 100+ orgs.
- **Empty-state visibility matrix** *(D-053)* — the small-team degenerate case (1 workspace, 1 team, 0 policies) is a first-class IA state: per-node empty-state visibility to be specified with UX.

## Related

- studio-product-domain-model — canonical Studio domain model
- software-organization-domain-model — canonical organization domain model
- `egor/STUDIO Information Architecture` — Egor's draft this responds to
- `v3.9 - Studio Information Architecture.xmind` — the earlier IA-track map (Max-owned, **retired 2026-07-13** — this document is canonical)

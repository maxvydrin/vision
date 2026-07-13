---
type: foundation
artifact: studio-glossary
status: draft-v0.8.07
date: 2026-07-13
source: STUDIO_VISION-final.md + [[software-organization-domain-model]] + [[studio-representation-model]]
tags:
  - studio
  - glossary
  - terminology
  - foundations
related:
  - "[[software-organization-domain-model]]"
  - "[[software-organization-glossary]]"
  - "[[pm-user-journeys]]"
  - "[[studio-user-journeys]]"
---

# Studio — Glossary of Terms

> **Index of:** studio-representation-model@0.8.13 · software-organization-domain-model@0.9.3 · 2026-07-13. **A term absent from a model is not canonical.**

> This is a product/platform glossary for Constructor Studio. It is not the canonical glossary for the software-organization domain model. For domain terms that exist independently of Studio, use [[software-organization-domain-model]] and [[software-organization-glossary]].

**What this is.** A shared dictionary for everyone building Constructor Studio — Product, Design, R&D, GTM. One canonical term per concept, with a short definition and where it comes from.

**Studio in one line:** an AI-native, open-core **control plane** that mirrors a team's existing SDLC tools into one governed graph and moves work forward with **validated, human-approved actions** — across the wider **Software Construction Lifecycle** (intent → build → operate → evolve), not just coding.

**How to read this table**

| Column | Meaning |
|---|---|
| **Canonical** | The one term we use in product, documents, scenarios and implementation discussions. |
| **Definition** | Short, shared definition. |
| **Source** | Where the definition comes from: `studio-representation-model@0.8.13`, `software-organization-domain-model@0.9.3`, a `Vision §…` section, or a formal standard it follows (ISO/IEC/IEEE, NIST). **Blank = defined in our own foundations work**. Industry analogies ("this is like X") are **not** sources and are not listed here. |
| **Aliases** | Other names for the same thing found across the docs — do **not** use these in new work; they map to the canonical term. |
| **Status** | `proposed` = **canonical-in-draft** — the term to use in new work; the label only marks that ratification (Factory sync, register D-043) hasn't happened yet · `ratified` (post-sync; none yet) · `deprecated` (don't use — tombstone, §11) · `conflict` (unresolved — needs a naming decision). |

**Source-of-truth hierarchy.** `STUDIO_VISION-final.md` defines product intent, scope and promise. [[software-organization-domain-model]] defines software-organization domain semantics; [[studio-representation-model]] defines Studio's representation of them. Studio platform/control-plane terms define Studio mechanisms. This glossary is an index of approved terms from those sources; it should not override the domain model.

**Layers in this one file** *(kept deliberately as a single glossary — sections play the role of separate dictionaries)*: **core model terms** (§1–§6, §8 — indexed from the two models) · **UI vocabulary** (§9 Surface names) · **kit & scenario vocabulary** (§7 — method terms, candidates for PM-Kit docs) · **tombstones** (§11 Deprecated & superseded — deprecated rows moved out of the working tables).

> **Two things stated up front (for the reader):** (a) **every *active* term is `proposed`** — nothing is ratified yet, so the Status column signals *maturity*, not disagreement; only *rejected* terms are `deprecated`. Ratification waits on the Factory sync (see Open questions). (b) the tables are wide — **scan Canonical + Definition first**, and treat Source / Aliases / Status as reference.

---

## 0. Product & umbrella

| Canonical               | Definition                                                                                                                                                                                                                                                                            | Source | Aliases                                                | Status                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| **Constructor Studio**  | AI-native software-**construction** workspace; an open-core control plane over existing SDLC tools.                                                                                                                                                                                   | Vision §1, §13 | Studio                                                               | proposed                                                 |
| **Constructor Fabric**  | The umbrella platform; Studio is one of its **3** elements — the others are **Constructor Insight** and **Constructor Gears**.                                                                                                                                                        | Vision §1, §11 | Fabric                                                               | proposed                                                 |
| **Open-core**           | The business + architecture model: the **core** (control-plane graph, actions, validators, connectors, SDKs, base SDLC Kit) is open-source; **proprietary** parts (HypoFinder Kit, enterprise/private deployment, premium connector/kit/benchmark packs) are paid. No vendor lock-in. | Vision §13 | open core                                                            | proposed                                                 |
| **Control Plane**       | Studio's role: it **governs / orchestrates** existing tools rather than being the system of record.                                                                                                                                                                                   | Vision §13 | open-core control plane                                              | proposed                                                 |
| **Constructor Insight** | Constructor's analytics / benchmarking product. From Studio's side it is a **source system behind a connector** — not Studio's connector layer (studio-representation-model@0.8.13 §2.2, decided 2026-07-12); the Vision §11.1 "connector layer" framing is superseded.                                                                                                                                                                                              | Vision §11.1 | Insight                                                              | proposed                                                 |
| **Insight (the word)** | ⚠️ Three meanings, never merged (model §2.2): the org-model **Insight** (interpreted learning — arrives as a managed object) · the trust ramp's *read-only insight* stage (rendered as **Signals** in insight views) · **Constructor Insight** (the product — a source system behind a connector). | studio-representation-model@0.8.13 §2.2 | — | proposed |
| **Constructor Gears**   | The Fabric element that supplies reusable OSS/BSS building-block modules; these are packaged into Kits (see **Gears**, §6).                                                                                                                                                           | Vision §1 | Gears *(the building-blocks sense — see §6)*                         | proposed *(naming overlap flagged — see Open questions)* |


---

## 1. Actors & Roles

**Actors** — *anything that performs a transformation in the lifecycle (Vision §7.1). Today mostly humans; increasingly AI agents and systems.*

| Canonical                | Definition                                                                                                                           | Source | Aliases  | Status   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- | -------- | -------- |
| **Actor**                | Anything that performs a transformation in the Software Construction Lifecycle.                                                      | Vision §7.1 | —        | proposed |
| ↳ **Human**              | A person acting in Studio — today the majority of actors.                                                                            | Vision §7.1 | person   | proposed |
| ↳ **AI Agent**           | An actor (runtime entity) that performs lifecycle work autonomously; it **runs the Skills** a kit ships (§6). Today built on Claude. | Vision §7.1 | agent    | proposed |
| ↳ **External Tool** *(vision label)* | Vision §7.1's name for a tool acting in the lifecycle (IDE agent, CLI) — in canon just an **Actor** kind; client tools themselves are member configuration (studio-representation-model@0.8.13 §3.1), and the org model deliberately defines no generic "External Tool" (its modeled term for systems an organization runs is **Tooling System**). | Vision §7.1 | — | proposed |
| ↳ **External System**    | A connected system that acts in the lifecycle.                                                                                       | Vision §7.1 | —        | proposed |
| ↳ **Automated Pipeline** | A CI/CD or scheduled pipeline acting as an actor.                                                                                    | Vision §7.1 | pipeline | proposed |

**Roles & functions** — *Studio uses separate role concepts for work, access and responsibility. A **Role Grant** grants a Role to a member or team at a scope (tenant, workspace or project).*

| Canonical           | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Source | Aliases | Status   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | --------------------- | -------- |
| **Role** | In Studio: a named permission set from the tenant's role catalog, granted to members and teams via Role Grants. ⚠️ Not the org model's Job Role (collision guard, studio-representation-model@0.8.13 §2.2); for the org senses use **Job Role** or **Responsibility Role**. | studio-representation-model@0.8.13 §5 | Access Role, permission set | proposed |
| **Job Role** | The person's working / organizational role used for org structure, skills, planning and activity ownership. | Vision §7.1–7.2 | work role, organizational role | proposed |
| **Responsibility Role** | An ownership / accountability role for a domain object. Examples: Product Owner, Tech Owner, Service Owner, Code Owner, Data Steward, Security Owner. |  | ownership role | proposed |
| **Role Grant** | The fact that a member **or a team** holds a Role **at a scope** — tenant, workspace or project. Tenant-scope grants enable tenant-wide surfaces (portfolio, compliance); archiving a scope suspends its grants. | studio-representation-model@0.8.13 §5 | Role Assignment, scoped role | proposed |
| **Permission** | Concrete right (read / create / change / connect / run / approve / publish / administer) over a **resource** — an object type, a scope or a feature area; bundled into Roles. | studio-representation-model@0.8.13 §5 | right | proposed |
| **User Projection** | The effective subset one member can see, computed from their role grants — direct grants plus grants via their teams. Objects outside it render as **locked stubs**: existence and type visible, details not. Access never propagates along relations. | studio-representation-model@0.8.13 §5 | effective visibility | proposed |
| **Agent Role** | Specialized role an AI agent plays in an activity: analyst, implementer, reviewer, tester, summarizer. ⚠️ Distinct from the access **Role** and the org **Job Role**. | studio-representation-model@0.8.13 §6.2 | — | proposed |
| **Function** | An organizational function — who participates in the work. The domain overlay defines **14 functions** (software-organization-domain-model@0.9.3 §5): Product Management · Product Marketing · R&D/Engineering · QA · DevOps/SRE · GTM/Sales · Customer Success · Design/UX · Security/Compliance · People Ops · Finance · Legal · Procurement · Internal IT. The **8** in the table below are the subset Studio's vision targets; vision names map: R&D → R&D/Engineering · DevOps/DCO → DevOps/SRE · GTM → GTM/Sales · User Experience Team → Design/UX. | software-organization-domain-model@0.9.3 §5 · Vision §7.2 | function set, role set | proposed |
| **Buyer (persona)** | The economic buyers for Studio (a subset of the roles above) — **PM:** CPO, Director of Product Management, Product Manager; **R&D:** CTO, Chief Architect, VP Engineering, Head of Platform, Head of R&D.                                                                                                                                                                                                                                                                                                                                                                         | Vision §6.2 | —                     | proposed |

**Functions & Job Roles** — *the **8** functions Studio's vision targets (Vision §7.2) — a subset of the domain overlay's **14** (software-organization-domain-model@0.9.3 §5); each groups its Job Roles and a purpose. Each **Actor** may play one or many Job Roles.*

| Function | Job Roles | Purpose |
|---|---|---|
| **Product Management** | CPO · Director of Product · Product Owner · Product Manager · Program Manager | Define what should be built |
| **Product Marketing** | CMO · Product Marketing Manager · Technical Marketing Manager · Marketing Communications Manager | Position and launch products |
| **User Experience Team** | UX Researcher · UX Designer · UI Designer · Interaction Designer · Design System Engineer | Design user experience |
| **R&D** | CDO · CTO · Chief Architect · Engineering Manager · Tech Lead · Developer · AI Engineer · Technical Writer | Design and construct software |
| **QA** | QA Engineer · Performance Engineer | Validate quality |
| **DevOps / DCO** | SRE · DevOps · Release Manager | Operate production systems |
| **GTM** | CRO · Regional VP | Sell and grow the business |
| **Customer Success** | Implementation team · Customer Support · TAM | Earn from customers, support customer growth |

> **Job Role aliases (map to canonical — don't use in new work):** Architect → **Chief Architect** · Team Lead → **Engineering Manager** · Platform engineer → **Developer / AI Engineer** · "Product Ops" → **Product Manager** *(retired — was the PM-J6 owner)*. **Reviewer** is not a Job Role — it is the *Review & Approval* activity (§2) performed by an assigned Responsibility Role.

---

## 2. Organization, Workspace, Project & Collaboration

**Organization, Workspace & Project (structural containers)**

| Canonical                     | Definition                                                                                                                                                                                                                                                                               | Source | Aliases                   | Status   |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------- | -------- |
| **Studio Tenant** | The instance of Studio serving one Organization (1:1). Contains workspaces, members, teams and connectors; keeps the **tenant-wide identity registry** — one identity per real entity, shared by all workspaces. Commercial packaging (subscription plan, account policies) is tenant configuration, not domain entities. | studio-representation-model@0.8.13 §3.1 | Studio Organization Account, account, tenant | proposed |
| **Organization** | A software-producing company or group of companies being modeled — the organization-model entity Studio represents; contains legal entities, organizational units, people and teams. A Studio Tenant represents exactly one Organization; use **Studio Tenant** for the account/tenant. | software-organization-domain-model@0.9.3 §3.1 | Business Organization, company, org | proposed |
| **Workspace** | Studio's working context, bounded by **one purpose** — typically a product line or several linked products; may span departments and teams; may be personal. Includes managed objects **by reference**; owns its **Knowledge Graph**; hosts projects, views, workflows, automation and its members' role grants. | studio-representation-model@0.8.13 §3.1 | — | proposed |
| **Project** | Studio's effort container — **itself a managed object of type Project** (unified 2026-07-12): usually authored in Studio, sometimes mirrored from a tracker and adopted. Belongs to a workspace; includes objects **by reference** (an object may belong to several projects); Studio adds the workbench — inclusion scope, workflows, advancement. Carries project-scoped **Graph View** and **Insight View** over the workspace's graph and signals; it does **not** own a graph. | studio-representation-model@0.8.13 §3.1 | delivery project, initiative scope | proposed |
| **Legal Entity** | A legally recognized entity associated with the Organization; employs people, may sign agreements and own products, assets or IP. *(org-owned term — see [[software-organization-glossary]]; kept here only because it arrives as a managed object.)* | software-organization-domain-model@0.9.3 §3.1 | company entity | proposed |
| **Person** | A real human being known to the Organization. Has Employment records; may fill Positions, join Teams and receive responsibilities. In Studio, a Person managed object links to at most one **Member**. | software-organization-domain-model@0.9.3 §3.1 · studio-representation-model@0.8.13 §3.1 | human | proposed |
| **Employment** | Relationship between a Person and a Legal Entity, with effective dates. Arrives in Studio as a managed object (reified relationship, invariant 8). | software-organization-domain-model@0.9.3 §3.1 | engagement | proposed |
| **Position** | Official role slot, title or function in the Organization. May be filled by a Person; may report to another Position; implies Job Roles. *(org-owned term — see [[software-organization-glossary]]; kept here only because it arrives as a managed object.)* | software-organization-domain-model@0.9.3 §3.1 | post, job position | proposed |
| **Member** | Someone using Studio — the vision's Studio "User". Links to at most one Person managed object (and a Person to at most one member); holds **Role Grants** at a scope, directly or via teams. Client access (CLI, IDE plugins, MCP endpoints, API tokens) is member configuration, not a domain entity. | studio-representation-model@0.8.13 §3.1 | User Identity, Studio User, workspace member | proposed |
| **Studio Team** | A Studio-native **group of members** — a grantee of roles and a unit of organizing work. ⚠️ Not the org's **Team**: an org Team arrives as a managed object; a Studio Team may be *seeded* from one, but membership is managed in Studio and never auto-synced — sources must not silently change access. | studio-representation-model@0.8.13 §3.1 | access group | proposed |
| **Inclusion** | The stored record of a workspace or project including a managed object **by reference**: who included it, when, manually or by rule. | studio-representation-model@0.8.13 §8.1 | scope membership | proposed |
| **Organizational Unit** | Business unit, department, division or practice inside the Organization; contains positions or teams. *(org-owned term — see [[software-organization-glossary]]; kept here only because it arrives as a managed object.)* | software-organization-domain-model@0.9.3 §3.1 | Org Unit, department, group | proposed |
| **Reporting Line** | Manager/report relationship from one Position to another Position; forms the org chart. Distinct from Job Role and Responsibility Role. *(org-owned term — see [[software-organization-glossary]]; kept here only because it arrives as a managed object.)* | software-organization-domain-model@0.9.3 §3.1 | manager relationship | proposed |
| **Team** | A stable group of people that builds, owns, operates, supports or governs work or assets — the **org-model** Team. Arrives in Studio as a managed object and may *seed* a **Studio Team** (access group). | software-organization-domain-model@0.9.3 §3.1 · studio-representation-model@0.8.13 §2.2 | group | proposed |
| **Team Membership** | Membership of a Person in a Team, with effective dates; may be imported from an external source. Arrives in Studio as a managed object (reified relationship, invariant 8). | software-organization-domain-model@0.9.3 §3.1 | team member | proposed |
| **Environment**               | A runtime/deployment context (**dev · staging · prod**) that software is built, validated, released or operated in; a Project uses Environments but does not own them.                                                                                                               |  | deploy target, env        | proposed |


**Collaboration** *(cross-cutting layer)* — the **sharing + coordination** capabilities (reviews, comments, handoffs, activity, sharing) that attach to other entities. *People, Teams, Roles & Access are the identity / access model — see §1 and §2 above; not repeated here.*

| Canonical                        | Definition                                                                                                                                                                | Source | Aliases            | Status              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------ | ------------------- |
| **Collaboration**                | The cross-cutting layer itself (sharing + coordination — reviews · comments · handoffs · activity feed).                                                                                                         | Vision §9 | —                  | proposed            |
| ↳ **Activity Feed**              | A chronological stream of changes / events.                                                                                                                               |                                                                           | feed               | proposed *(target)* |
| ↳ **Sharing**                    | Sharing reusable assets — guidelines, templates, workflows, artifacts — across projects / teams / org. Custom-kit sharing (**bridge to Customization, §6**) extends this. | Vision §9 | —                  | proposed            |
| ↳ **Guardrails & Quality Gates** | Shared standards defined at team / org level, with per-project enforcement where applicable.                                           | Vision §9 | —                  | proposed            |
| ↳ **Review & Approval**          | Coordinated review and sign-off on transitions and artifacts.                                                                                                             | Vision "Human-Centric Automation" | approval, sign-off | proposed            |
| ↳ **Handoff**                    | Passing one activity's outputs as the inputs of another.                                                                                                                  | Vision §3.3, §8 | —                  | proposed            |
| ↳ **Comment**                    | An inline discussion thread on an object / artifact.                                                                                                                      |                                                                           | —                  | proposed *(target)* |
| ↳ **Pull Request review** | Coordinated review/sign-off on a **Pull Request**; the Pull Request object itself is an org-model Delivery term — see [[software-organization-glossary]]. | Vision "Shadow SDLC Graph" | PR review, MR review | proposed |
| ↳ **Exception review**                  | Review of an **Exception** / waiver request before approval or rejection.                                                                                                                       | Vision "Expansion Roadmap" | waiver review   | proposed            |


---

## 3. Lifecycle & Stages

| Canonical                                  | Definition                                                                                                                                                                                                                                               | Source | Aliases                               | Status                             |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------------------------- |
| **SCLC (Software Construction Lifecycle)** | The full lifecycle Studio champions: from product **Intent** through construction and operation to **learning, evolution and transformation** — wider than SDLC, which stops at creating software. **3 phases** (Plan → Build → Operate), **14 stages**. | Vision §1, §8 · ISO/IEC/IEEE 12207 | Software Construction Lifecycle       | proposed *(NEW in updated vision)* |
| **SDLC (Software Development Lifecycle)**  | The traditional development lifecycle focused on *creating* software. Studio does **not** dictate one — it adapts to the company's SDLC and **extends it into an SCLC**. (The shadow graph, once "SDLC Graph," is now **Knowledge Graph** — §4.)           | Vision §8, §1.2–1.3, §13 · ISO/IEC/IEEE 12207 | —                                     | proposed                           |
| **Reference SCLC**                         | The example lifecycle Studio ships (Intent → … → Evolution); usable as-is or customizable. Delivered by the base **SDLC Kit** (§6).                                                                                                                      | Vision §8 | reference SCLC *(vision typo "SCLC")* | proposed                           |
| **Plan / Build / Operate**                 | The 3 high-level SCLC phases grouping the 14 stages.                                                                                                                                                                                                     | Vision §8 | —                                     | proposed                           |
| **Lifecycle Phase** | One of the SCLC's three phases — **Plan / Build / Operate** — grouping lifecycle stages. | studio-representation-model@0.8.13 §7 | phase | proposed |
| **Lifecycle Stage** | One stage of the SCLC; reference set = 14: Intent → Vision → Discovery → Strategy → Definition → Design → Construction → Validation → Release → Operation → Support → Intelligence → Optimization → Evolution. Per role and stage, Studio configures activities, their inputs/outputs, quality gates and synchronization checkpoints. | studio-representation-model@0.8.13 §7 · Vision §8 | Stage, lifecycle stage | proposed |
| **Activity**                               | Work an actor performs at a stage, defined (and configurable) with Inputs, Outputs, Quality gates, and Synchronization checkpoints.                                                                                                                      | Vision §8 · ISO/IEC/IEEE 12207 | —                                     | proposed                           |
| **Input / Output**                         | The artifact(s) an Activity **consumes / produces**; one activity's Output can feed another's Input.                                                                                                                                                     | Vision §8 | —                                     | proposed                           |
| **Synchronization Checkpoint**             | A defined coordination point between roles / activities at a stage — runs validators, raises conflicts and signals.                                                                                       | Vision §8 · studio-representation-model@0.8.13 §7 | sync checkpoint                       | proposed                           |


---

## 4. Studio Graph & Objects

| Canonical            | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Source | Aliases                                                     | Status             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------ |
| **Knowledge Graph** | The workspace-level home of the facts: the managed objects the workspace includes plus the relations among them. **One graph per workspace** — and a graph is a **system model, not a UI**: members see views; a graph diagram is just one view. | studio-representation-model@0.8.13 §3.2 | Workspace Knowledge Graph, SDLC Graph, Shadow SDLC Graph, shadow graph, Delivery Graph | proposed |
| **Graph View** | A view **kind**: a scoped graph diagram over the workspace's Knowledge Graph. A project's Graph View is exactly this — a project-scoped view; the graph itself stays workspace-level. | studio-representation-model@0.8.13 §3.3 | Project Graph View, project subgraph | proposed |
| **Insight View** | A view **kind**: the window onto workspace-level signals and delivery/cost metrics. A project's Insight View is project-scoped; the signals and metrics themselves stay workspace-level. | studio-representation-model@0.8.13 §3.3 · App A D-027 | project insight view | proposed |
| **View** | Saved way of selecting and presenting objects: list, board, table, timeline, dashboard, graph diagram. Recurring kinds: **object view** · **traceability view** · **review view** · **graph view** · **insight view**. Belongs to a workspace, a project or a member (exactly one); always renders through the viewer's projection. | studio-representation-model@0.8.13 §3.3 | saved view | proposed |
| **Source of record** | The external tool that **owns the truth** for an object; Studio mirrors it and does not replace it.                                                                                                                                                                                                                                                                                                                                                                          | Vision §13 | system of record                                            | proposed           |
| **Source System** | External system holding original records: Jira, GitLab, Confluence, HRIS, CRM, CI/CD, monitoring. Remains the **system of record** for what it exports; Studio-authored objects are Studio-authoritative. ⚠️ The same tool can also appear *in* the graph as a managed object (`Tool`) — plumbing and portrait, optionally linked. | studio-representation-model@0.8.13 §4 | external system | proposed |
| **Source Record** | One original record as fetched (an issue, a repo, an employee row). Maps to **at most one** managed object; superseded by newer fetches. | studio-representation-model@0.8.13 §4 | raw record | proposed |
| **Source Link** | The pair (managed object × source record) — where provenance lives; carries the **Sync State** for that pair. | studio-representation-model@0.8.13 §4 | External Object Link, external link | proposed |
| **Identity Mapping** | Rule or confirmed fact that several source records are the same real entity. Studio proposes matches (e-mail, linked accounts, names); an administrator confirms uncertain ones and can split wrong merges; every merge/split is audit-logged. | studio-representation-model@0.8.13 §4 | identity resolution | proposed |
| **Field Mapping** | Mapping between source-record fields and managed-object attributes; configured per connector / object type. | studio-representation-model@0.8.13 §4 | attribute mapping | proposed |
| **Relationship Mapping** | Mapping between source-system links and Studio relation types; configured per connector; produces imported relations. | studio-representation-model@0.8.13 §4 | link mapping | proposed |
| **Sync Run** | One synchronization execution: import, update, reconcile, check. Creates or updates managed objects and imported relations; surfaces conflicts. | studio-representation-model@0.8.13 §4 | Sync Event, sync log | proposed |
| **Sync State** | Synchronization status per **source link**: in sync, pending, stale, conflicted, error, paused. Answers "does this match the source?" — distinct from **Validation Status**, which answers "does this make sense?". | studio-representation-model@0.8.13 §4 | sync status | proposed |
| **Audit Entry** | Immutable record of the things that must never be silent: identity merges/splits, role grants, team membership changes, kit publications, approvals, write-backs, agent actions. Written by the system; queryable by admins. | studio-representation-model@0.8.13 §6.1 | Audit Event, audit log, audit trail | proposed |
| **Managed Object** | Studio's representation of one real entity. **One object per tenant** — workspaces include it by reference, never copy it. Carries exactly one acquisition mode (**mirrored / linked / authored**); may be **content-backed** (owns its versioned content — informally, a document); records provenance, confidence and sync state. Typed by an Object Type. | studio-representation-model@0.8.13 §3.2 | Graph Object, Shadow Object, Object, Node | proposed |
| **Relation** | Typed, directed connection between exactly two managed objects, with provenance and confidence. Two kinds: **imported** — a fact from the sources; **asserted / inferred** — made by a member or proposed by Studio inside one workspace. An inferred relation is decided in place (proposed → confirmed / retired). | studio-representation-model@0.8.13 §3.2 | Link, edge | proposed |
| **Relation Type** | Registered kind of relation (`realized_by`, `implements`, `depends_on`, `has_owner`, `supports`…); constrains which object types it may connect. Registered tenant-wide and activated per workspace, like object types. | studio-representation-model@0.8.13 §3.2 | edge type | proposed |
| **Conflict** | A detected inconsistency between Studio and one or more sources — a first-class object so resolution work can target it. Resolves **according to the organization's governance rules** (per type or per field); resolved by rule, member or workflow. | studio-representation-model@0.8.13 §4 | data conflict | proposed |
| **Object Type** | Registered type of managed object. Every domain-facing type **represents exactly one organization-model term**; a type may **specialize** another. The type registry is **tenant-wide**; each workspace activates a subset (its *effective ontology*). Types arrive built-in, via kit install, or custom; provenance is kept per type. | studio-representation-model@0.8.13 §3.2 | node type | proposed |
| **Work item** | A tracked delivery object — **Epic · User story · Task · Bug · Remediation Task** — usually mirrored from a work tracker. Incidents, Risks and Findings are not Work Items; they may create Work Items. | Vision "Shadow SDLC Graph" · software-organization-domain-model@0.9.3 §4 | Epic, Story, Task, Bug | proposed |
| **Attribute**        | A tracked field on an object (source system + external ID, owner, team, state, version, last sync, validation status, staleness / risk).                                                                                                                                                                                                                                                                                                                                     | Vision "Shadow SDLC Graph" | Property, свойство                                          | proposed           |
| **Validation Status** | Whether an object currently satisfies the rules that apply to it: pass, fail, warning, retry, escalated, blocked. Semantic health — distinct from **Sync State**. Evaluated by validators against quality gates. | studio-representation-model@0.8.13 §6.1 | validation status | proposed |
| **Report field**     | Reporting/query projection of an object **Attribute**. It is not a separate domain object.                                                                                                                                                                                                                                                           |  | column, parameter                                           | proposed           |
| **Traceability**     | The relationships linking requirement → design → code → test across the graph.                                                                                                                                                                                                                                                                                                                                                                                               | Vision §1.1–1.3 · ISO/IEC/IEEE 29148 | —                                                           | proposed           |
| **Evidence** | Record supporting a validation or approval: test run, review, document version, source reference. Supports every quality-gate and approval decision. ⚠️ Guarded vs the org model's Governance Evidence (studio-representation-model@0.8.13 §2.2), which arrives as a managed object. | studio-representation-model@0.8.13 §6.1 · Vision "Validated Action Graph" | attestation, proof record | proposed |


---

## 5. Actions, Flows & Validators

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **Action** | Reusable definition of a transformation: `create_design`, `decompose_feature`, `run_ci` — inputs, outputs, actor requirements, gates. Naming follows the Workflow / Workflow Run pattern: **Action** is the definition, **Action Run** the execution. Packaged by kits, composed into workflows; performs the activities of lifecycle stages. | studio-representation-model@0.8.13 §6.1 | Action Definition, Method, Job | proposed |
| **Action Run** | One concrete execution of an action by an actor — **one entity with two attributes**: a **state** (`prepared → approved / rejected / deferred / escalated → running → applied / failed / dropped`) and an **effect target** (the knowledge graph, or a source system = write-back). Mirror-touching runs always enter at `prepared`; runs touching only Studio-authored objects may start at `running` where policy allows (invariant 9). | studio-representation-model@0.8.13 §6.1 | Action Execution, run | proposed |
| **Context Package** | The selected set of objects, relations, artifacts, rules and evidence handed to an actor for one action or review — Studio's unit of "what the model saw". Constrained by data policies and projections. | studio-representation-model@0.8.13 §6.2 | bound context | proposed |
| **Candidate Object** | Proposed graph **content** — a would-be managed object, relation or content version — produced by Studio or an agent but **not yet accepted** as authoritative. A candidate object is a proposed *thing*; a prepared action run is a proposed *act*. Checked by validators; decided by approvals. | studio-representation-model@0.8.13 §6.1 | candidate | proposed |
| **AI Run** | One execution by a model or agent: model used, tokens, runtime, **cost**. The atomic unit under every AI-spend surface; belongs to an action or workflow run and is attributed to an actor. | studio-representation-model@0.8.13 §6.3 | Model Invocation, model call | proposed |
| **Execution mode** | How an action runs: **deterministic script** / **AI-assisted transformation** / **human task**. ⚠️ Unrelated to **Transition** (the immutable state-change record, §5) — renamed from "Transition type" to kill the collision. | Vision "Core Ideas" | transition type | proposed |
| **Transition** | Immutable state-change record of one managed object, workflow run or action run: actor, from-state, to-state, timestamp, via which action or sync run. **The measurement substrate** — cycle time, acceptance rate, time-to-ready are read out of transitions, never entered. For mirrored objects, transitions derive from sync deltas. | studio-representation-model@0.8.13 §6.1 | state-change record | proposed |
| **Write-back (Controlled write-back)** | UX label for an **approved Action Run whose effect target is a source system** — create ticket, update doc, open PR, update incident. Not an object type: an Action Run state + effect target. Requires capability + permission + passing validation + approval + audit — all five (invariant 10). | studio-representation-model@0.8.13 §6.1 | write-back, Write-back Action | proposed |
| **Write-back Capability** | Configured *ability* to update a given source system — per connector, per object type, under policy; enables write-back action runs. | studio-representation-model@0.8.13 §6.1 | — | proposed |
| **Legacy-to-spec (brownfield)** | Ingesting existing code / repositories to generate or reconstruct a consistent spec set (reverse engineering). | Vision §1.1, §1.2 | brownfield reconstruction | proposed |
| **Workflow run (Run)** | One execution of a **Workflow**, with its status and history. A Workflow Run may carry many Action Runs and AI Runs and may wait on approvals. Distinct from **Workflow** and **Activity**. | Vision "First Killer Workflow" · studio-representation-model@0.8.13 §3.3 | run | proposed |
| **Workflow** | A repeatable automation pipeline — **one entity**: activities, actors, validators, quality gates; may include sub-workflows. Configured by admins; **published to the Workflow Library**, where a member runs it in one click. | Vision "Killer Workflow(s)" · studio-representation-model@0.8.13 §3.3 | Flow | proposed (canonical: Workflow; *Flow* = the loose vision synonym — Flow/Workflow merged 2026-07-12, studio-representation-model@0.8.13 App A) |
| **Workflow Library** | Catalog of workflows published to a workspace — predefined + custom; what a member browses and runs. The vision's **Flow Library**; populated by kits. | Vision "Studio Flow Library" · studio-representation-model@0.8.13 §7 | Flow Catalog, Flow Library | proposed |
| **Automation** | Rule that reacts to events, sync results or schedules; watches graphs and sync runs; triggers workflows or actions. | studio-representation-model@0.8.13 §3.3 | trigger rule | proposed |
| **Predefined workflow** | A **shipped, ready-to-run** workflow a **Studio Kit** provides — **each Function Kit ships its own set** (its **Kit Workflows**, §6). The 14 below are the **SDLC-Kit** deterministic-analysis set: gap · traceability · contradiction · bloat · stale-artifact · ownership-gap · duplicate-work · architecture-drift · security-impact · test-gap · release-readiness · incident→postmortem · ops-metrics · AI-cost. *Catalog content, not a model entity — which workflows ship is out of scope of the model.* | Vision "Studio Flow Library" | predefined flow, smart flow | proposed |
| ↳ **PM-Kit flows** | The Product-Management-Kit flow set (mostly **AI-assisted** gathering/analysis, not deterministic): `competitor-discovery` · `competitor-product-profile` · `competitor-scale-traction` · `competitor-price-collection` (J1–J3) · `instrumentation-taxonomy` (J6) · `cep-synthesis` (J7) · `epsvs-scorecard` (J8). | project · [[pm-user-journeys]] | — | proposed |
| **Validator** | Check — rule, test, model or **human review** — that evaluates objects, candidates or action runs against gates and policies; produces validation statuses and evidence. | studio-representation-model@0.8.13 §6.1 · Vision "Validated Action Graph" | — | proposed |
| **Validator Loop** | The pass / fail / retry / escalate cycle around a validator (bounded automation). | Vision "Validator Loops" | validation loop | proposed |
| **Quality Gate** | A **must-pass checkpoint**: work cannot advance to the next state (or write back) until it passes. *"No approved spec — no build."* Gates action runs and activities; requires evidence. | Vision §8 · studio-representation-model@0.8.13 §6.1 | gate | proposed |
| **Safety Constraint** | Rule preventing unsafe automation: unauthorized write-back, sensitive-data exposure, uncontrolled model usage. Constrains actions, workflows and agents. *Guardrail* stays as the UX label. | studio-representation-model@0.8.13 §5 | Guardrail, hard block | proposed |

---

## 6. Kits & Gears

| Canonical                                                                               | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                | Source                            | Aliases                                                 | Status   |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------- | -------- |
| **Studio Kit** | Package of reusable delivery knowledge that **defines a domain**: object & relation type definitions (the ontology contribution), templates, workflows, actions, validators, policies, reference architectures, Gears building blocks. Two origins: **shipped** (by Constructor) and **authored** in the organization. Install registers the kit's types tenant-wide and activates them in the installing workspace (invariant 13). | studio-representation-model@0.8.13 §7 | Kit, Domain Kit, SaaS Development Kit | proposed |
| **Kit Catalog** | The tenant's internal catalog of kits available to install — shipped kits plus kits **published by the organization's own members**. Not a marketplace: no third-party publishers, no monetization; sharing stays inside the tenant. The unit of sharing is the kit. | studio-representation-model@0.8.13 §7 | kit library | proposed |
| **SDLC Kit**                                                                            | The open-source **base / default** kit; implements the Reference SCLC. Not a role variant.                                                                                                                                                                                                                                                                                                                                                                | Vision "Credible Wedge"           | Product Design Kit                                      | proposed |
| **Ontology**                                                                            | The entities and relationships that define a domain — the schema a kit brings.                                                                                                                                                                                                                                                                                                                                                                            | Vision "Shadow SDLC Graph"        | kit schema                                              | proposed |
| **Template**                                                                            | A reusable artifact scaffold shipped in a kit.                                                                                                                                                                                                                                                                                                                                                                                                            | Vision "SaaS Development Kits"    | —                                                       | proposed |
| **Sample data** | Seed / demo data a kit ships to populate a workspace's Knowledge Graph or a project's **Graph View**, so a workspace/project shows the product working out of the box. Part of the **Studio Kit**. | Vision "SaaS Development Kits" | seed data, demo data, examples | proposed |
| **Kit Workflows**                                                                       | The recommended workflows a kit ships; they populate the Workflow Library and can be run inside a project.                                                                                                                                                                                                                                                                                                                                                        | Vision "SaaS Development Kits"    | kit flows, recommended flows                            | proposed |
| **Gears Building Block** | A module from **Constructor Gears** (§0) — the Constructor platform's library of reusable engines, modules and developer/operations tools. Kits and actions assemble them; if the customer adopts one, it also appears in their graph as software estate. | studio-representation-model@0.8.13 §7 | Gears, building blocks | proposed |
| **Skill** | **Engineering-internal term, not product vocabulary** (no model entity). The code (Python scripts) that implements a kit's domain logic / workflow — what an **AI Agent** (§1) actually runs. |  | Claude Skill, Python agent | proposed |
| **Function Kit**                                      | A ready-to-install kit scoped to a function or role family, such as Architect, PM, Engineering Management, DevOps, QA or Support. Kits can also be base/default kits or domain kits. *Catalog content, not a model entity — which kits exist is out of scope of the model.* |                                   | role kit, pre-defined kits, installed kits, kit catalog | proposed |
| ↳ **Architect Kit**                                                                     | Kit for architects — system design, ADRs, architecture artifacts & flows. *(catalog content, not an entity)*                                                                                                                                                                                                                                                                                                                                                                                 |                                   | —                                                       | proposed |
| ↳ **Product Management Kit**                                                            | Kit for PM / PgM — the 8 PM journeys (competitive landscape, PRD, metrics). *(catalog content, not an entity)*                                                                                                                                                                                                                                                                                                                                                                               |                                   | PM Kit                                                  | proposed |
| ↳ **Engineering Management Kit**                                                        | Kit for engineering managers — planning, delivery tracking, throughput. *(catalog content, not an entity)*                                                                                                                                                                                                                                                                                                                                                                                   |                                   | Eng Mgmt Kit                                            | proposed |
| ↳ **DevOps Kit**                                                                        | Kit for DevOps / SRE — CI/CD, deployment, ops artifacts & flows. *(catalog content, not an entity)*                                                                                                                                                                                                                                                                                                                                                                                          |                                   | —                                                       | proposed |
| ↳ **QA Kit**                                                                            | Kit for QA — test planning, validation, coverage flows. *(catalog content, not an entity)*                                                                                                                                                                                                                                                                                                                                                                                                   |                                   | —                                                       | proposed |
| ↳ **Support Kit**                                                                       | Kit for support / customer success — incidents, tickets, customer signals. *(catalog content, not an entity)*                                                                                                                                                                                                                                                                                                                                                                                |                                   | —                                                       | proposed |
| ↳ **HypoFinder Kit**                                                                    | The proprietary research kit — science ontology + hypothesis-search flows; product name = **HypoFinder** (§0). *(Domain-axis; listed here because the shipped map places it in this set.)* *(catalog content, not an entity)*                                                                                                                                                                                                                                                                |  | Scientific Research Kit, science kit                    | proposed |
| ↳ **Any other Kit**                                                                     | Placeholder slot for additional / custom function-role kits (not itself a shipped kit). *(catalog content, not an entity)*                                                                                                                                                                                                                                                                                                                                                                   |                                   | custom kit                                              | proposed |
| **Glossary Term** | A term of the customer's **own product domain**, with a definition — the ontology of *what the team is building* ("recovery point", "immutable backup"). Not an Object Type (Studio's delivery ontology) and not a Terminology Override (labels only). The workspace surface over glossary terms is labeled **Glossary** in navigation. *(Renamed from "Concept" 2026-07-13 — model §2.1/§7, register D-028; "Concept" is now a deprecated alias.)* | studio-representation-model@0.8.13 §7 | Concept *(deprecated)*, product-domain term | proposed |
| **Term Mapping** | The tie between a Glossary Term and the managed objects expressing it — the requirement, design, code and tests that carry it. Lets Studio detect **term drift**, surfaced as a Signal. *(Renamed from "Concept Mapping" 2026-07-13.)* | studio-representation-model@0.8.13 §7 | Concept Mapping *(deprecated)* | proposed |
| **Domain Dictionary** | Configurable vocabulary of a tenant or workspace; holds terminology overrides. Workspace-level entries shadow tenant-level ones — labels only (invariant 11). | studio-representation-model@0.8.13 §7 | — | proposed |
| **Terminology Override** | Workspace- or tenant-specific **label** for a canonical concept (*Roadmap Item → "Research Plan Item"*). Changes labels, **never** canonical semantics or relation meaning (invariant 11). | studio-representation-model@0.8.13 §7 | relabel | proposed |
| **Domain Profile** | Package of mappings, terminology, validators, workflows and templates for a target domain or operating model; bundles dictionary + kit content. | studio-representation-model@0.8.13 §7 | — | proposed |
| **Customization** *(the authoring face of Kits & Gears — an activity, not a container)* | Extending what the platform can do — introducing object types, properties, methods, workflows, and validation policies **without modifying the core**; building & sharing custom kits. **Orthogonal to Collaboration (§2):** the two meet only where a custom kit is shared or reused.                                                             | Vision "SaaS Development Kits"    | Customizable (adj.), Kit Customization                  | proposed |
| ↳ **Kit authoring**                                                                     | Build / extend a kit's domain model: objects (schema), properties, methods / actions, workflows, validators / policies.                                                                                                                                                                                                                                                                                                                                   |                                   | —                                                       | proposed |
| ↳ **Instance configuration**                                                            | Per-workspace runtime settings: model routing, which validators / gates run, context compression.                                                                                                                                                                                                                                                                                                                                                         | Vision §5, §5.2                   | runtime config                                          | proposed |
| ↳ **Build & share custom kit**                                                          | Package a custom kit and share / reuse it — the single bridge to Collaboration ▸ Share.                                                                                                                                                                                                                                                                                                                                                                   |                                   | —                                                       | proposed |

---

> **Organization-domain terms** live in [[software-organization-glossary]]; the collision guards live in [[studio-representation-model]] §2.2.

---

## 7. PM-scenario terms (first-version scope)

> **Method vocabulary** — the terms in this section sit outside both domain models ([[studio-representation-model]], [[software-organization-domain-model]]); they are candidates to move into PM Kit documentation.

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **User Journey** | An end-to-end path a role takes from intent to outcome, written in the `ALGORITHM` schema (Actor/Goal/Inputs/Outputs/Steps/Decision points/Guards/Next). |  | journey | proposed |
| **Scenario** | A concrete *way* of accomplishing an action within a journey; spans several atomic steps. |  | — | proposed |
| **Atomic scenario** | The leaf unit Scenarios are composed from: one Action or Workflow step mapped to one domain object or Studio platform object, expressed in glossary terms. |  | — | proposed |
| **Scenario group** | The 3 first-version groups: **Competitive Landscape**, **Requirements / PRD**, **Metrics**. |  | 3 groups | proposed |
| **Opportunity Statement** | The Intent-stage output naming a market/customer opportunity worth pursuing. | Vision §8, §12.1 | — | proposed |
| **JTBD (Jobs to Be Done)** | Framing a need as the "job" a customer hires the product to do; used in Discovery. | Vision §8 | jobs-to-be-done | proposed |
| **Competitive register** | Shared competitor comparison schema populated in layers: identity → product & traction → pricing. |  | competitor register | proposed |
| **Comparison matrix** | The quarterly-comparison output Artifact — side-by-side competitors across product & functionality + scale & traction, versioned per quarter. |  | quarterly comparison | proposed |
| **Pricing benchmark** | The pricing-analysis output Artifact — our price vs competitors per geography × tier (normalised), with trend, versioned. |  | pricing benchmark grid | proposed |
| **CEP (Customer Experience Program)** | Weekly practice of analysing our own users' experience (usage + VoC) to find friction → improvement work. |  | continuous discovery | proposed |
| **EPSVS** | Internal 5-dimension quality framework: Efficiency, Performance, Scalability, Versatility, Security. Team-defined, not an industry standard. | ISO/IEC 25010 | — | proposed |
| **Instrumentation** | Adding tracking events to the product per release. Naming scheme = *taxonomy*; emitted data = *telemetry*. |  | — | proposed |

**Spec framework** — *the artifact set Studio produces (each is also an Artifact object-type, §4)*

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **BRD** | Business Requirements Document — business goals, scope, stakeholders (the *why* at business level). | Vision §1.1 | — | proposed |
| **PRD** | Product Requirements Document — what to build: problem, requirements, acceptance, success metrics. Authored in **two layers**: *intent* (PM-J4 — what/why, no ids) → *spec* (Studio-J7 — adds cpt-* FR/NFR, RFC-2119, `cfs validate`). | Vision §1.1 · ISO/IEC/IEEE 29148 | spec | proposed |
| **Requirement** | An atomic statement of something the product must do or satisfy — the lead Object type; anchors traceability (**requirement → design → code → test**). Grouped/authored in BRD & PRD; a graph object. | Vision §1.1 · ISO/IEC/IEEE 29148 | — | proposed |
| **ADR** | Architecture Decision Record — one architectural decision + context + consequences. | Vision §1.1 | — | proposed |
| **Decision** | A recorded decision — choice + rationale + date — a graph object & Document Artifact; **ADR** is the architecture-specific form, a plain Decision covers non-architectural choices. | Vision "Shadow SDLC Graph" | — | proposed |
| **Design** | The architecture / design artifact produced from a PRD. | Vision §1.1 | architecture | proposed |
| **Decomposition** | Breaking a design / feature into tasks. | Vision §1.1 | breakdown | proposed |
| **Feature spec** | The buildable feature definition, tied to code via @cpt-\* markers. | Vision §1.1 | FEATURE | proposed |

**Other document artifacts** — *additional document-like Artifact types used across product, delivery and operations.*

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **Product strategy brief** | The durable "why" — north-star, positioning, bets — a PM returns to across the lifecycle. |  | strategy brief | proposed |
| **Roadmap view / document** | A document, board or timeline representation of the org-model **Roadmap** — see [[software-organization-glossary]]. Distinct from **Roadmap phases** (§8, the Studio build-out phases). |  | roadmap document, product roadmap | proposed |
| **One-pager / narrative** | The concise pitch / exec-alignment document for an initiative. |  | narrative, brief | proposed |
| **Launch plan / GTM checklist** | The cross-functional launch-coordination document (distinct from Release notes = the artifact). |  | GTM checklist | proposed |
| **Release notes** | The customer-facing summary of what shipped in a release (PM often owns this version). |  | changelog | proposed |
| **Test plan / Validation report** | The Validation-stage document — planned checks and their results/evidence (the *report*, not the `Test` work object). | Vision §8 · IEEE 829 | validation report | proposed |
| **Runbook** | An operational procedure document for running / recovering a system. | Vision "Shadow SDLC Graph" | — | proposed |
| **Postmortem** | The incident-retrospective document (what happened, why, prevention). | Vision "Shadow SDLC Graph" | incident retro | proposed |
| **Instrumentation plan** | The J6 per-release doc — key flows, the events + properties to track, and coverage. | project · [[pm-user-journeys]] | tracking plan | proposed |
| **CEP synthesis** | The J7 quarterly customer-experience-program / Voice-of-Customer synthesis fed into discovery. | project · [[pm-user-journeys]] | VoC synthesis | proposed |
| **Event taxonomy / data dictionary** | The versioned event schema (events + global/local properties + naming convention) a project maintains — a living **Ontology** (§6), not a one-off document. | project · [[pm-user-journeys]] | tracking taxonomy, data dictionary | proposed |

**Requirements & delivery**

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **EPIC** | A large body of work that decomposes into user stories. ⚠️ In the domain models *epic* is a **Work Item Type** value, not an entity (software-organization-domain-model@0.9.3 §4) — this row is PM-method vocabulary only. | software-organization-domain-model@0.9.3 §4 | epic | proposed |
| **User story** | A backlog-ready item with acceptance criteria, sized to fit a sprint; decomposed from an EPIC. ⚠️ A **Work Item Type** value in the models, not an entity (software-organization-domain-model@0.9.3 §4). | software-organization-domain-model@0.9.3 §4 | story | proposed |
| **Remediation task** | Work item created to mitigate a Risk, resolve a Finding, or prevent recurrence after an Incident. ⚠️ A **Work Item Type** value in the models, not an entity (software-organization-domain-model@0.9.3 §4). | software-organization-domain-model@0.9.3 §4 | remediation work | proposed |
| **Backlog** | The prioritised, groomed list of stories / items awaiting a sprint. |  | — | proposed |
| **Sprint** | A fixed-length delivery iteration; scope committed at **sprint planning**, inspected at **sprint review**. |  | iteration | proposed |
| **Backlog refinement** | Ongoing refinement of the backlog (clarify, estimate, split) to keep it ≥ 1 sprint ahead. |  | grooming, backlog grooming *(deprecated in Scrum)* | proposed |
| **Problem statement** | Who is affected, the pain, and the evidence — how a PRD opens. |  | — | proposed |
| **Success criteria** | The business / user outcomes a feature must achieve. |  | — | proposed |
| **Acceptance criteria** | The testable conditions that define "done" for a story / spec. | ISO/IEC/IEEE 29148 | — | proposed |
| **Effort estimate** | A high-level R&D sizing (t-shirt size or range) attached to a spec. |  | estimate, t-shirt size | proposed |
| **Mockup** | A mid/high-fidelity Design artifact reviewed where a story / spec has UX. |  | wireframe | proposed |
| **Design review** | **Review & Approval** with the Design team of UX-bearing work. |  | — | proposed |
| **Prioritisation basis** | How the backlog is ordered: value / risk / dependency. |  | — | proposed |
| **Blocker** | A dependency or open question that stops a story entering a sprint; carries an owner. |  | impediment | proposed |

**Metrics & instrumentation** — *(CEP · EPSVS · Instrumentation above; Product metrics in §8)*

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **Analytics Event** | A tracked user / product action emitted to analytics — telemetry of the org's own product. Distinct from Studio's **Usage Event** (§8) and **Transition** (§5). |  | tracking event | proposed |
| **Event property** | A field on an event — **global** (super) properties on every event + **local** (event-specific) ones. |  | super property, local property | proposed |
| **Event taxonomy** | The versioned catalogue + naming scheme of events, properties and definitions. |  | tracking plan, data dictionary | proposed |
| **Naming convention** | The single self-describing name format (`object_action`, snake_case, past tense). |  | — | proposed |
| **Autocapture** | SDK-level automatic capture of a baseline (`page_viewed`, `button_clicked`). |  | SDK autocapture | proposed |
| **Data-quality gate** | Pass/fail check that events arrive with correct properties, no duplicates or gaps, before a release is marked instrumented. |  | — | proposed |
| **Coverage** | Share of key user flows emitting the expected events (target 100%). |  | instrumentation coverage | proposed |
| **Telemetry** | The emitted data / signals (events, metrics, traces) the analytics journeys consume. |  | — | proposed |
| **Session replay** | Behavioural capture of a user session, used in CEP to explain the *why* behind a drop-off. |  | — | proposed |
| **Cohort / Segment** | A slice of users (plan/tier, role, persona, platform, tenure). |  | segment | proposed |
| **Feature adoption** | How widely a Capability Increment / feature is used across the base; flags under-adopted areas. |  | adoption | proposed |
| **Drop-off / funnel** | Where users abandon a flow — the quantified UX-inefficiency signal in CEP. |  | funnel drop-off | proposed |
| **Scorecard** | A periodic rollup of metrics per dimension. |  | — | proposed |
| **Gap severity** | Disposition of a found gap: critical / planned / monitor. |  | — | proposed |
| **Peer review** | PM-team review of judgement-heavy analysis (severity / metric calls) before publishing. |  | — | proposed |

---

## 8. Platform Signals, Recommendations, Configuration & Notifications

**Signals & metrics**

| Canonical             | Definition                                                                                | Source                       | Aliases     | Status   |
| --------------------- | ----------------------------------------------------------------------------------------- | ---------------------------- | ----------- | -------- |
| **Delivery Health**   | Aggregate signal of delivery status across objects: gaps, risks, staleness, blocked work and readiness.      | Vision "Expansion Roadmap" | delivery health summary | proposed |
| **AI Cost**           | Measured token, model and compute spend; "AI cost per accepted change" is the key metric. | Vision §3.1, §5 | token spend | proposed |
| **Release Readiness** | Assessment of whether work is ready to release, based on quality gates, validation, risks and evidence.                         | Vision "Studio Flow Library" | readiness assessment | proposed |
| **Product Metrics**   | Product-analytics metrics such as usage, funnels, adoption, retention and customer impact.                       |  | analytics   | proposed |
| **Delivery Metric** | Studio-computed delivery measurement, read from transitions and relations: cycle time, acceptance rate, time-to-ready, requirement-to-test coverage. **Never entered by hand.** ⚠️ Mirrored org Metrics stay managed objects (mapping conventions, studio-representation-model@0.8.13 §9). | studio-representation-model@0.8.13 §6.3 | — | proposed |
| **Cost Metric** | Studio-specific measurement: **AI cost per accepted change**, PRD-to-task cycle cost, review cost saved. Computed over AI runs and usage events. | studio-representation-model@0.8.13 §6.3 | — | proposed |
| **Usage Event** | Measured Studio activity: connector syncs, workflow executions, validations, member activity; aggregates into cost metrics. | studio-representation-model@0.8.13 §6.3 | — | proposed |
| **Cost Budget** | Cap on spend at a scope: tenant, workspace, project, workflow, agent or model. Caps AI runs; alerts and blocks per policy. | studio-representation-model@0.8.13 §6.3 | — | proposed |

**Recommendations**

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **Recommendation** | The vision/UX word for what Studio surfaces next — canonically an **Action Run in state `prepared`** ("Prepared Action"), produced from a **Signal**. | studio-representation-model@0.8.13 §2.1 | next best action | proposed |
| **Next action** | The suggested next task / action for the user. | Vision §8 | — | proposed |
| **Signal** | Computed finding over the graph: a gap, a drift, staleness, a contradiction, a duplicate, an ownership hole. **Computed, never authored** — members acknowledge or dismiss a signal, never edit one; recomputed as the graph changes. The substance of the trust ramp's first phase (read-only insight); may produce prepared action runs; rendered in insight views. ⚠️ Three "signals", three entities: org **Market Signal** and **Telemetry Signal** arrive as managed objects; Studio Signal is computed (model §2.2). | studio-representation-model@0.8.13 §6.1 | Detected gap, gap/risk signal | proposed |
| **Prepared action** | UX label for an **Action Run in state `prepared`** — a recommendation awaiting a human decision; against mirrored objects this is the only kind of write until write-back is approved. Not an object type. | studio-representation-model@0.8.13 §6.1 | prepared action run | proposed |
| **Approval** | Recorded human decision (approve / reject / escalate / defer) on a prepared action run, a candidate object or a write-back, with decider and rationale; audit-logged. One approval per decision event; a deferred run returns to `prepared` and may be re-decided, producing a new approval record each time. | studio-representation-model@0.8.13 §6.1 | sign-off | proposed |
| **Autonomy level / Reach** | The two attributes every **Actor** carries — human or agent: **autonomy level** = what it may do unattended; **reach** = how far effects may extend (draft / graph / write-back). Enforced through role grants, model routing and safety constraints. | studio-representation-model@0.8.13 §6.2 | Trust level | proposed |

**Configuration & integrations**

| Canonical                   | Definition                                                                                                                                                                                                                                                                                                           | Source | Aliases             | Status   |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------- | -------- |
| **Workspace Configuration** | Workspace-level configuration: model routing, instance config, connectors, localization and policy settings.                                                                                                                                                                                                               |  | workspace configuration  | proposed |
| **Model Routing Policy** | Rule selecting the AI model or tool per activity type, role, cost, risk or data policy — lockable by the organization; set at tenant/workspace scope. | studio-representation-model@0.8.13 §6.2 | Model routing, multi-model support | proposed |
| **Data Policy** | Rule for data sensitivity, retention, redaction or model usage over object types and sources; constrains projections, context packages and model routing. | studio-representation-model@0.8.13 §5 | — | proposed |
| **Context compression**     | Reducing token load via summarisation / filtering / pruning.                                                                                                                                                                                                                                                         | Vision §5.2 | —                   | proposed |
| **Benchmarking**            | Measuring cost / quality of AI tokens and dev compute for optimization.                                                                                                                                                                                                                                              | Vision §5.3, §11.1 | —                   | proposed |
| **Connector** | Configured integration between the tenant and one source system. Produces source records; runs sync runs; has health and lifecycle. **Constructor Insight is a source system behind a connector — not the connector layer** (studio-representation-model@0.8.13 §2.2, decided 2026-07-12). | studio-representation-model@0.8.13 §4 | integration | proposed |
| **Localization**            | Locale support: UI translation + currency / date / time formats, week-start, RTL.                                                                                                                                                                                                                                    | Vision §10 | l10n                | proposed |
| **Notification**            | A signal to the user about gaps, risks, stale work, or failures.                                                                                                                                                                                                                                                     | Vision "Expansion Roadmap" | alert               | proposed |
| **Secret / Credential**     | The connection credentials (OAuth tokens, PATs, API keys) a Connector needs — held **separately** from connector config, **Workspace / Environment-scoped**, with rotation + audit.                                                                                                                                  |  | credential, token   | proposed |
| **Data residency / region** | Where account / workspace data is **stored & processed** (region pinning) — an Organization policy with a per-Workspace region. Distinct from **Localization** (formats / language).                                                                                                                                 |  | region, residency   | proposed |

**Advanced / roadmap**

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **Roadmap phases** | The 4 build-out phases: **Phase 1** CLI PoC · **Phase 2** Validated actions · **Phase 3** Centralized automation (workspaces, flow catalog, dashboards) · **Phase 4** Enterprise control plane (Insight-at-scale, on-prem, World Model). | Vision "Credible Wedge" | — | proposed (roadmap) |
| **World Model** | A predictive model over the SDLC graph that forecasts a change's downstream impact; a Phase-4 enterprise capability and part of the moat. | Vision "Expansion Roadmap" | — | proposed (roadmap) |

---

## 9. Surface names (UI vocabulary)

*Navigation and screen names from the MVP scope and information architecture ([[studio-mvp-scope]], [[studio-information-architecture]]). These are **UI labels over model entities**, not entities themselves.*

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **Project Home** | The home surface as it reads in a single-project tenant: NL command bar, Recommendations / Next-action rail, object & document lists, status strip. **Decided 2026-07-13 (D-008):** one home surface keyed to the **workspace** — reads as Project Home under single-workspace collapse, becomes Workspace Overview as projects multiply. | studio-mvp-scope decision 8 / IA | home base, Workspace Overview *(multi-project reading)* | proposed |
| **NL command bar ("Ask Studio")** | The natural-language command bar — the primary interaction; runs workflows/actions from typed intent. | studio-mvp-scope / IA | Ask Studio, NL bar | proposed |
| **Plan-preview** | "Here's the plan before I run it" — the modal/inline preview fronting every action run; the user confirms or edits before execution. | studio-mvp-scope / IA | NL plan-preview | proposed |
| **Portfolio overview** | Admin-only cross-project table from read-only discovery: project, lead, last activity, derived status counts — never issue bodies; not auto-shared. | studio-mvp-scope / IA | portfolio overview report | proposed |
| **Work queue** | One queue for everything awaiting a decision or in flight — Action Run states, filtered: `prepared` → Recommendations; approved + source-system target → Write-backs. | IA | — | proposed |
| **Insights** | The workspace's computed-read-only surface: signals plus delivery & cost metrics, rendered through insight views. Not a queue — a signal is acknowledged or dismissed, never decided. | IA | insight surface | proposed |
| **Object browser** | Search & filter over the workspace's objects — the ad-hoc (unsaved) view; object type is one filter among many. | IA | — | proposed |
| **Saved views** | Named, shareable Views created from the Object browser ("Save as view"): list, board, table, timeline, dashboard, graph diagram. | IA | My views | proposed |
| **Setup checklist** | The admin's first-run checklist after provisioning — orients across empty states toward a working workspace. | studio-mvp-scope | — | proposed |
| **Connection wizard** | Guided connector setup — read-only-first OAuth, scope selection, project/repo picking. | studio-mvp-scope | — | proposed |
| **Empty state** | What a surface shows before data exists — oriented toward the next setup action. | studio-mvp-scope | — | proposed |
| **Seed / sample data (control)** | The opt-in, per-kit, project-scoped, previewable and resettable demo-data control — sample-data banner, provenance-tagged objects, guaranteed reset. | studio-mvp-scope | sample-data control | proposed |
| **Get-started** | Role-aware first-session guidance — one primary next-action card; folds into the Project Home rail. | studio-mvp-scope | next-action card | proposed |
| **construct** | Constructor's platform identity primitive — find-or-create at first login, linked to a Studio Member (canon: Member ↔ Person, studio-representation-model@0.8.13 §3.1). | studio-mvp-scope decision 14 | — | proposed |
| **Project membership** | MVP visibility unit — in canon a **role grant at project scope** over the project's Inclusion set (studio-representation-model@0.8.13 §5); not a separate entity. | studio-mvp-scope decision 12 | — | proposed |
| **Access mode** | Connector toggle: read-only vs bounded write-back (write-back additionally needs capability + approval, studio-representation-model@0.8.13 §6.1). | studio-mvp-scope | — | proposed |
| **Kit readiness** | A kit's install → enable → bind → ready state strip in a workspace. | studio-mvp-scope (ADM-05/06) | readiness panel | proposed |
| **Onboarding** | The guided first-run path: provisioning → setup checklist → connections → kit prep → seed data → first sessions. | studio-mvp-scope | first-run | proposed |
| **Typed graph store vs markdown projection** | The store is the typed Knowledge Graph; markdown is a projection (LLM context, export, document bodies) — never the system of record. | studio-mvp-scope decision 10 | — | proposed |
| **Integrations catalog** | The browsable per-capability catalog of possible connections — distinct from **Connector** (the runtime) and **Constructor Insight** (the product). | studio-mvp-scope decision 11 | — | proposed |

---

## 10. Open questions

| # | Open question | Context |
|---|---|---|
| 1 | **Ratification — Factory sync.** Every *active* term in this glossary is `proposed`; nothing is ratified until the Factory sync. The Status column signals maturity, not disagreement. | Header note ("Two things stated up front"). |
| 2 | **Gears naming overlap.** *Constructor Gears* (the Fabric element, §0) and *Gears Building Block* (the reusable module, §6) share one name; a naming decision is pending. | Flagged on the §0 row. |


---

## 11. Deprecated & superseded (tombstones)

*Retired vocabulary, moved out of the working tables (2026-07-13) so active sections read clean. Every row keeps its superseded-by pointer; grouped by the section it came from. Do not use these terms in new work.*

**From §1. Actors & Roles:**

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **Access Role** | Superseded by **Role** (studio-representation-model@0.8.13 §5) — Studio's Role *is* the access/permission set; no separate term needed. | studio-representation-model@0.8.13 §5 | — | deprecated |
| **Role Assignment** | Superseded by **Role Grant** (studio-representation-model@0.8.13 §5) — grantee (member \| team) × Role × Scope. | studio-representation-model@0.8.13 §5 | — | deprecated |
| **Access Control** | Superseded by **Role**, **Permission** and **User Projection** (studio-representation-model@0.8.13 §5) — the access model is RBAC; permissions attach to roles, never to individual objects. | studio-representation-model@0.8.13 §5 | — | deprecated |

**From §2. Organization, Workspace, Project & Collaboration:**

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **Studio Organization Account** | Superseded by **Studio Tenant** (studio-representation-model@0.8.13 §3.1) — one organization's Studio instance. | studio-representation-model@0.8.13 §3.1 | — | deprecated |
| **Business Organization** | Superseded by **Organization** (software-organization-domain-model@0.9.3 §3.1) — the plain org-model term; **Studio Tenant** disambiguates the account/tenant sense. | software-organization-domain-model@0.9.3 §3.1 | — | deprecated |
| **User Identity** | Superseded by **Member** (studio-representation-model@0.8.13 §3.1) — someone using Studio; links to at most one Person managed object. | studio-representation-model@0.8.13 §3.1 | — | deprecated |
| **Service Principal** | Not in the current model — non-human work is attributed to an **Actor** (studio-representation-model@0.8.13 §6.2); client/API access is member configuration (§3.1). | studio-representation-model@0.8.13 §6.2 | — | deprecated |
| **Workspace Membership** | Superseded by **Member** + **Role Grant** (studio-representation-model@0.8.13 §3.1, §5) — presence comes with the member; access comes from role grants at a scope. | studio-representation-model@0.8.13 §3.1 | — | deprecated |
| **Seat** | Not in the current model — commercial packaging (plans, seats, billing) is tenant configuration, not a domain entity (studio-representation-model@0.8.13 §3.1). | studio-representation-model@0.8.13 §3.1 | — | deprecated |
| **Workspace Product Context** | Not in the current model — a workspace is purpose-bound (typically a product line) and includes objects by reference (studio-representation-model@0.8.13 §3.1). | studio-representation-model@0.8.13 §3.1 | — | deprecated |
| **Project Scope** | Superseded by **Inclusion** (studio-representation-model@0.8.13 §8.1) — a project includes managed objects by reference; each inclusion is its own record. | studio-representation-model@0.8.13 §8.1 | — | deprecated |
| **Project Scope Membership** | Superseded by **Inclusion** (studio-representation-model@0.8.13 §8.1). | studio-representation-model@0.8.13 §8.1 | — | deprecated |
| **Project Baseline** | Not in the current model — no snapshot/baseline entity; history is read from immutable **Transitions** (studio-representation-model@0.8.13 §6.1). | studio-representation-model@0.8.13 §6.1 | — | deprecated |
| **Shared asset** | Superseded by the **Kit Catalog** (studio-representation-model@0.8.13 §7) — the unit of sharing is the kit; a lone template or workflow is published as a small kit. | studio-representation-model@0.8.13 §7 | — | deprecated |

**From §3. Lifecycle & Stages:**

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **Lifecycle Model** | Superseded as a separate term — use **SCLC** (the configurable lifecycle model, studio-representation-model@0.8.13 §7); **Reference SCLC** is the shipped default configuration, not a second entity. | studio-representation-model@0.8.13 §7 | — | deprecated |

**From §4. Studio Graph & Objects:**

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **Workspace Knowledge Graph** | Superseded by **Knowledge Graph** (studio-representation-model@0.8.13 §3.2) — one per workspace; the "Workspace" prefix is redundant. | studio-representation-model@0.8.13 §3.2 | — | deprecated |
| **External Object Link** | Superseded by **Source Link** (studio-representation-model@0.8.13 §4) — renamed. | studio-representation-model@0.8.13 §4 | — | deprecated |
| **Source of Record Mapping** | Not in the current model — the source system remains system of record for what it exports (studio-representation-model@0.8.13 §4); per-type authority assignments are an open question (App A). | studio-representation-model@0.8.13 §4 | — | deprecated |
| **Sync Event** | Superseded by **Sync Run** (studio-representation-model@0.8.13 §4) — one synchronization execution. | studio-representation-model@0.8.13 §4 | — | deprecated |
| **Audit Event** | Superseded by **Audit Entry** (studio-representation-model@0.8.13 §6.1). | studio-representation-model@0.8.13 §6.1 | — | deprecated |
| **Graph Object** | Superseded by **Managed Object** (studio-representation-model@0.8.13 §3.2) — Studio's representation of one real entity, one identity per tenant. | studio-representation-model@0.8.13 §3.2 | — | deprecated |
| **Canonical Entity Identity** | Superseded by the **tenant-wide identity registry** (studio-representation-model@0.8.13 §3.1, invariant 2) — one identity per real entity per tenant. | studio-representation-model@0.8.13 §3.1 | — | deprecated |
| **Studio-owned Record** | Superseded by the **authored** acquisition mode of a Managed Object (studio-representation-model@0.8.13 §3.2). | studio-representation-model@0.8.13 §3.2 | — | deprecated |
| **Externally-owned Record** | Superseded by the **mirrored / linked** acquisition modes of a Managed Object (studio-representation-model@0.8.13 §3.2). | studio-representation-model@0.8.13 §3.2 | — | deprecated |
| **Mirror Representation** | Superseded by the **mirrored** acquisition mode of a Managed Object (studio-representation-model@0.8.13 §3.2). | studio-representation-model@0.8.13 §3.2 | — | deprecated |
| **Assertion** | Not in the current model — asserted facts are **Relations** (asserted / inferred) with provenance and confidence (studio-representation-model@0.8.13 §3.2). | studio-representation-model@0.8.13 §3.2 | — | deprecated |
| **Authority** | Not in the current model — sources stay authoritative for what they export; conflicts resolve per the organization's governance rules (studio-representation-model@0.8.13 §4); per-type authority assignments are an open question (App A). | studio-representation-model@0.8.13 §4 | — | deprecated |
| **Derived Fact** | Superseded by the inferred **Relation** (studio-representation-model@0.8.13 §3.2) and the **Signal** (§6.1). | studio-representation-model@0.8.13 §3.2, §6.1 | — | deprecated |
| **Event** | Superseded by **Transition** (state-change history, studio-representation-model@0.8.13 §6.1) and **Usage Event** (measured Studio activity, §6.3). | studio-representation-model@0.8.13 §6.1, §6.3 | — | deprecated |
| **Snapshot** | Not in the current model — no snapshot entity; history is read from immutable **Transitions** (studio-representation-model@0.8.13 §6.1). | studio-representation-model@0.8.13 §6.1 | — | deprecated |
| **Artifact** | Superseded by the **content-backed Managed Object** (studio-representation-model@0.8.13 §3.2) — object and document are one node, with versions; a separate Artifact entity was explicitly rejected (App A). ⚠️ The org model's Build Artifact (Delivery) is untouched. | studio-representation-model@0.8.13 §3.2, App A | — | deprecated |
| ↳ **Document Artifact** | Superseded by the **content-backed Managed Object** (studio-representation-model@0.8.13 §3.2) — a PRD, policy or postmortem is an object that owns its versioned content. | studio-representation-model@0.8.13 §3.2 | — | deprecated |
| ↳ **Execution Artifact** | Superseded by ordinary **managed objects** of Delivery types (Pull Request, Build, Release, Deployment), mirrored from sources — no separate Artifact entity (studio-representation-model@0.8.13 §3.2, App A). | studio-representation-model@0.8.13 §3.2 | — | deprecated |
| **Object state** | Split and superseded: **Validation Status** ("does this make sense?", studio-representation-model@0.8.13 §6.1) vs **Sync State** ("does this match the source?", §4) vs per-entity lifecycles (App B). | studio-representation-model@0.8.13 §6.1, §4, App B | — | deprecated |

**From §5. Actions, Flows & Validators:**

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **Action Definition** | Superseded by **Action** (studio-representation-model@0.8.13 §6.1) — the definition side of the Action / Action Run pair. | studio-representation-model@0.8.13 §6.1 | — | deprecated |
| **Action Execution** | Superseded by **Action Run** (studio-representation-model@0.8.13 §6.1) — one concrete execution of an action by an actor. | studio-representation-model@0.8.13 §6.1 | — | deprecated |
| **Input Binding** | Superseded by **Context Package** (studio-representation-model@0.8.13 §6.2) — the selected context handed to an actor for one action. | studio-representation-model@0.8.13 §6.2 | — | deprecated |
| **Action Output** | Superseded by **Candidate Object** and **Evidence** (studio-representation-model@0.8.13 §6.1). | studio-representation-model@0.8.13 §6.1 | — | deprecated |
| **Execution Attempt** | Superseded by **Action Run** retry states (bounded validation loop, studio-representation-model@0.8.13 §6.1) — retries are states of the one Action Run entity. | studio-representation-model@0.8.13 §6.1 | — | deprecated |
| **Model Invocation** | Superseded by **AI Run** (studio-representation-model@0.8.13 §6.3). | studio-representation-model@0.8.13 §6.3 | — | deprecated |
| **Step** | Superseded by **Activity** (studio-representation-model@0.8.13 §7) — one configured unit of work inside a workflow or lifecycle stage. | studio-representation-model@0.8.13 §7 | — | deprecated |
| **Blueprint** | Superseded by **Template** (content scaffolds) and the published **Workflow** (studio-representation-model@0.8.13 §7, §3.3) — no separate workflow-template entity. | studio-representation-model@0.8.13 §7 | — | deprecated |

**From §6. Kits & Gears:**

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **Kit Package** | Superseded by **Studio Kit** (studio-representation-model@0.8.13 §7) — the kit *is* the packaged, installable unit; no separate package entity. | studio-representation-model@0.8.13 §7 | — | deprecated |

**From §8. Platform Signals, Recommendations, Configuration & Notifications:**

| Canonical | Definition | Source | Aliases | Status |
|---|---|---|---|---|
| **Detected gap** | Superseded by **Signal** (studio-representation-model@0.8.13 §6.1) — a computed finding over the graph. | studio-representation-model@0.8.13 §6.1 | — | deprecated |
| **Approval Request** | Superseded by **Approval** (studio-representation-model@0.8.13 §6.1) — the recorded decision, not a request object. | studio-representation-model@0.8.13 §6.1 | — | deprecated |
| **Trust level** | Superseded by the Actor attributes **autonomy level + reach** (studio-representation-model@0.8.13 §6.2). | studio-representation-model@0.8.13 §6.2 | — | deprecated |
| **Audit (log / trail)** | Superseded by **Audit Entry** (studio-representation-model@0.8.13 §6.1) — the log is the queryable set of audit entries. | studio-representation-model@0.8.13 §6.1 | — | deprecated |

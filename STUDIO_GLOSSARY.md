---
type: foundation
artifact: studio-glossary
status: draft-v0.9.6
date: 2026-07-16
source:
  - "[[software-organization-domain-model]]"
  - "[[studio-product-domain-model]]"
  - STUDIO_VISION.md
tags:
  - glossary
  - software-organization
  - studio
  - foundations
related:
  - "[[software-organization-domain-model]]"
  - "[[studio-product-domain-model]]"
supersedes: "software-organization-glossary (merged in and deleted 2026-07-13) + the former standalone studio-glossary"
---

# Studio Glossary — Software Organization + Studio

> **Index of:** software-organization-domain-model@0.9.11 · studio-product-domain-model@0.9.24 · 2026-07-16. **A term absent from a model is not canonical.**

One dictionary for both worlds. **Part A** — the software-organization domain (what exists in any software-producing company, independent of Studio). **Part B** — the Studio platform (how Studio represents and acts on that domain). Terms that mean the same everywhere appear **once**, with one shared definition. Terms whose meaning **diverges** between the organization model and Studio carry **both meanings in the same row**, marked ⚠️.

**How to read the tables**

| Column | Meaning |
|---|---|
| **Term** | The one canonical term to use in documents, scenarios and implementation discussions. |
| **Where** | `Org` = organization-domain term · `Studio` = Studio platform term · `Both` = same meaning in both worlds (org terms that arrive in Studio as managed objects keep their org meaning) · `⚠️ Both` = the word exists in both worlds **with different meanings** — the row gives both. |
| **Definition** | The shared meaning; for ⚠️ rows — both meanings (**Org:** … / **Studio:** …). |
| **Aliases / Notes** | Other names found across the docs (do not use in new work), deprecation tombstones, source pointers (`org §…` = software-organization-domain-model; `repr §…` = studio-product-domain-model). |

All terms are canonical-in-draft unless marked *deprecated*.

---

## ⚠️ Divergent terms — quick index

The words that mean different things in the organization model and in Studio. Full rows live in their sections; never merge these meanings.

| Word | Org meaning | Studio meaning |
|---|---|---|
| **Role** | Job Role — work/organizational role (PM, Developer, SRE). | Named permission set from the tenant's role catalog, granted via Role Grants. |
| **Team** | Stable group of people that builds/owns/operates work or assets. | **Studio Team** — a group of *members* (access group); may be seeded from an org Team, membership never auto-synced. |
| **User** | Person or system actor — including integrations and API clients — interacting with a Product. | Someone using Studio is a **Member** (never "user" in canon). |
| **Workspace** | Only **Tool Workspace** — a container inside a specific Tooling System (Slack workspace, GitHub org). | Studio's working context bounded by one purpose; owns the Knowledge Graph. |
| **Evidence** | Governance Evidence — artifact/record attesting a claim, control, decision, finding or release. | Record supporting a validation or approval: test run, review, document version. |
| **Activity** | Bounded action or step within a process, project or workstream. | Configured unit of work inside a lifecycle stage or workflow, with declared input/output object types. |
| **Insight** | Interpreted learning from evidence that may influence decisions. | Never merged (product §2): the org Insight arrives as a managed object · the trust-ramp *read-only insight* stage renders as **Findings** (surfaced) · **Constructor Insight** is a product behind a connector. |
| **Conflict** | Not modeled (a git merge conflict is transient tool state). | First-class object: a detected inconsistency between Studio and one or more sources. |
| **Organization** | The software-producing company being modeled. | Represented 1:1 by a **Studio Tenant** (the account); use Studio Tenant for the tenant. |
| **Project** | *Unified — same entity, two faces.* Bounded execution effort (org §4). | The same managed object, adopted by Studio as an effort container: adds inclusion scope, workflows, advancement. |

---

## Cross-layer alias table — one concept across all layers

*The **canonical home** of the cross-layer naming map (D-072): the same concept named across the **organization model**, the **Studio product model**, the **kernel contract** [[studio-kernel-model]] (the **Studio Kernel Model**) and **STUDIO_VISION**. The product model's §2 points here rather than duplicating it. Resolve this map first; `—` = no term at that layer.*

| Concept | Organization model | Studio product model | Kernel contract | VISION |
|---|---|---|---|---|
| Modeled entity | any domain entity/record | **Managed Object** | `Object` *(state-profile type)* | artifact |
| Typed link | Relationship / Dependency | **Relation** | `Relationship` | Link |
| Fact store | — | **Knowledge Graph** *(one per workspace)* | workspace-local `Object` graph | — |
| Editable authored doc | the record itself | **Content-backed object** | `Object` (`state`-profile version) | Artifact *(authored)* |
| Frozen output | Build Artifact | **Immutable Blob** *(proposed)* | `Artifact` | Artifact *(frozen)* |
| Point-in-time snapshot | — | **Snapshot** | `Snapshot` | — |
| Type schema | the term itself | **Object Type / Relation Type** | GTS `ObjectType` / `RelationshipType` | — |
| Person in Studio | Person / User | **Member** | `Principal` + WorkspaceMembership | User / Studio User |
| AI actor | AI Agent *(AI Estate)* | **AI Agent** *(Actor)* / Agent Role | `ActorRef` *(agent)* | AI Agent |
| Repeatable process | Process | **Workflow / Workflow Run** | `Flow`/`FlowRun` → Workflow *(rename proposed)* | Workflow |
| Transformation step | Activity step | **Action / Action Run** | `Worker` / `WorkerRun` | Action |
| AI execution | AI Estate usage | **AI Run** | `WorkerRun` (+ `cf.ai` attrs) | AI Agent |
| Conversational orchestrator | — | **Assistant** *(an AI Agent Actor; composes a governed sequence — no new entity)* | *out-of-kernel orchestration + D-059 correlation (kernel-confirmed)* | conversational interface (§5.5) |
| Check | — | **Validator** | configured `Worker` | — |
| Detection | **Finding** | **Finding** *(computed = Gap)* | validator → Evidence/finding | Gap |
| Suggested change | — | **Action Run (`prepared`)** | `cf.governance` recommendation | Recommendation |
| Decision to accept | — | **Approval** | `cf.governance` approval | — |
| Pass/fail barrier | — | **Quality Gate** | validator gate + `StateTransitionRule` | Quality Gate |
| History entry | — | **Transition** | projection over versions + audit | — |
| Audit trail | Audit record | **Audit Entry** | `AuditRecord` | — |
| Discussion / note | — | **Comment / Discussion Thread / Notification** | — *(`cf.*` kit types)* | — |
| Account | **Organization** | **Tenant** *(1:1; may sit in an admin hierarchy)* | `Tenant` *(`parentTenantId`)* | Organization |
| Domain package | — | **Kit** | `Kit` | Kit |
| Lifecycle | Process / Product Lifecycle | **CLC** *(SDLC Kit = flagship)* | kit lifecycle config / `StateTransitionRule` | Product Lifecycle |
| Platform building blocks | — *(adopted → software estate)* | **Gears** | platform Gears | Gears |
| Attestation | Evidence *(Governance)* | **Evidence** | evidence material | — |
| Source tie | — | **Source Link** | `SourceBinding` | — |
| Product vocabulary | — | **Glossary Term** | kit-defined vocabulary | — |
| Editable value set | *(open enumerations)* | **Reference Catalog** | `configuration`-profile object | — |
| Identity resolution | — | **Studio Identity Mapping** *(records → object)* | `IdentityMapping` *(IdP subject → Principal)* | — |

*Words that mean **different** things across layers are guarded in the ⚠️ index above and in the product model's §2 — never merge them.*

---

# Part A — Software Organization Domain

## Organizational Structure

| Term                          | Where   | Definition                                                                                                                                                                                                                                                                                                                                                                                                 | Aliases / Notes                                                                              |
| ----------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Organization**              | ⚠️ Both | **Org:** software-producing company or group of companies being modeled. **Studio:** represented by exactly one **Studio Tenant** (1:1); use Studio Tenant for the account.                                                                                                                                                                                                                                | company; org §3.1 · repr §3.1                                                                |
| **Legal Entity**              | Both    | Legally recognized entity associated with the Organization; employs people, may sign agreements and own products, assets or IP.                                                                                                                                                                                                                                                                            | company entity                                                                               |
| **Organizational Unit**       | Both    | Business unit, department, division or practice inside the Organization; contains positions or teams.                                                                                                                                                                                                                                                                                                      | org unit, department                                                                         |
| **Person**                    | Both    | Real human being known to the Organization. In Studio, a Person managed object links to at most one **Member**.                                                                                                                                                                                                                                                                                            | human                                                                                        |
| **Employment**                | Both    | Dated relationship between a Person and a Legal Entity (carries effective dates); arrives in Studio as a managed object (reified relationship).                                                                                                                                                                                                                                                            | employee/contractor engagement                                                               |
| **Competency**                | Org     | Named capability, skill, expertise area or strength a Person can hold and a Position or Assignment can require (e.g., Kubernetes, payments-domain expertise, incident command); proficiency level and source (declared / assessed / derived) on the possession record. `Person has_competency Competency`. | capability, expertise; **renamed from _Skill_ 2026-07-13** to clear the collision with Studio's Claude **Skill** (Part B) |
| **Capacity**                  | Org     | Available effort / throughput a Person or Team can commit over a period — basis for sprint/capacity planning (FTE, story points/sprint, hours/week, % allocation); dated, unit is an open enumeration. *How much*, vs Competency's *what*. `Person / Team has_capacity Capacity`. | availability, throughput, allocation; org §3.1 |
| **Employee**                  | Org     | Person employed by a Legal Entity.                                                                                                                                                                                                                                                                                                                                                                         | *deprecated* — not an entity; only **Employment** is modeled; record such distinctions on it |
| **Contractor**                | Org     | Person engaged under contract rather than employment.                                                                                                                                                                                                                                                                                                                                                      | *deprecated* — see Employment                                                                |
| **External Collaborator**     | Org     | Person outside the Organization who participates in work.                                                                                                                                                                                                                                                                                                                                                  | *deprecated* — see Employment                                                                |
| **Position**                  | Both    | Official role slot, title or function in the Organization; may be filled by a Person, report to another Position, imply Job Roles.                                                                                                                                                                                                                                                                         | job position                                                                                 |
| **Team**                      | ⚠️ Both | **Org:** stable group of people that builds, owns, operates, supports or governs work/assets; arrives in Studio as a managed object. **Studio:** a **Studio Team** is a group of *members* — a grantee of roles; may be *seeded* from an org Team, but membership is managed in Studio and never auto-synced.                                                                                              | group · access group (Studio sense); repr §3.1                                               |
| **Team Membership**           | Both    | Dated membership of a Person in a Team; arrives in Studio as a managed object (reified relationship).                                                                                                                                                                                                                                                                                                      | team member relation                                                                         |
| **Position Allocation**       | Org     | Dated allocation of a Position to a Team.                                                                                                                                                                                                                                                                                                                                                                  | position/team allocation                                                                     |
| **Reporting Line**            | Both    | Dated manager/report relationship from one Position to another; forms the org chart.                                                                                                                                                                                                                                                                                                                       | management line                                                                              |
| **Job Role**                  | Both    | Work/organizational role such as Product Manager, Developer, SRE or Security Lead. Held two ways: **org-wide** through a Position (`Position implies Job Role`) and **per project** through an Assignment (`Assignment in_role`) — one person may act in a different role on each project.                                                                                                                 | organizational role, work role; ⚠️ not Studio's access **Role**                              |
| **Responsibility Assignment** | Org     | Dated record that a Person or Team is accountable for a domain object.                                                                                                                                                                                                                                                                                                                                     | ownership, accountability                                                                    |
| **Organizational Metric**     | Org     | Measures teams, positions, employment, staffing, responsibility coverage or team health.                                                                                                                                                                                                                                                                                                                   | org metric                                                                                   |

## Strategy

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **Mission** | Org | Timeless purpose: why the Organization exists. Grounds Vision and Strategy; at most one, organization-scoped. | purpose |
| **Vision** | Org | Desired future state and product/business ambition. A company Vision `frames` Strategy; a product/line Vision guides one or more Products/Lines (at most one active per Product/Line). | north star; level set by relationships, not a scope attribute |
| **Product Vision** | Org | *Deprecated* — a **Vision** that guides a Product or Product Line (`guided_by`, org §3.4). | see Vision |
| **Strategy** | Org | Durable direction: where the organization chooses to compete and how it intends to win. | strategic direction |
| **Objective** | Org | Measurable outcome leadership wants to achieve. | goal |
| **Objective Metric** | Org | Measures progress toward an Objective. | goal metric |
| **Strategic Initiative** | Org | Strategic investment theme or intent connecting Objectives to planned changes. | initiative |
| **Investment Direction** | Org | Chosen direction for allocating funding, capacity or attention. | renamed from Investment |
| **Investment Metric** | Org | Measures funding, capacity, spend, cost allocation or investment performance. | investment measure |
| **Budget** | Org | Approved funding envelope for a period and scope: organizational unit, strategic initiative, project or team. | funding envelope |
| **Spend Record** | Org | Recorded actual cost — people, vendors, infrastructure, tooling or AI model usage — compared against Budgets. | actual spend |
| **Roadmap** | Org | Planning view over intended changes for a defined scope and horizon. | company/product/platform/engineering roadmaps are types and scopes, not separate entities |
| **Roadmap Item** | Org | Planned outcome/change on a Roadmap. | roadmap entry |
| **Roadmap Type** | Org | Classification of a Roadmap: company, product, platform, engineering, technology or governance. | org §3.2 |
| **Roadmap Scope** | Org | Domain object or area a Roadmap is about (Organization, Product Line, Product, Capability, Software System, Team). | org §3.2 |
| **Roadmap Horizon** | Org | Planning time window: quarter, half-year, year or custom period. | org §3.2 |
| **Product Roadmap** | Org | *Deprecated* — a **Roadmap** (type = product) covering a Product or Line (`has_planning_view`). | see Roadmap |
| **Business Decision** | Org | Specialized Decision about investment, market, budget, pricing, partnership or priority. | commercial decision |

## Products And Market

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **Product Portfolio** | Org | Managed set of Product Lines and Products. | *deprecated* — removed from the model (2-level offering); a portfolio view = Organization-scoped Vision/Roadmap or a rollup |
| **Product Line** | Org | Optional grouping of related Products (may be absent in smaller organizations); a Product can belong to zero, one or several lines. | product family |
| **Product** | Org | Managed offering that delivers value to internal or external customers. | offering |
| **Product Capability** | Org | Stable ability of a Product to solve a coherent user or business scenario. | capability |
| **Product Module** | Org | Logical part of a Product through which capabilities are delivered. | *deprecated* — no model backing; escalate as candidate model add |
| **Feature** | Org | Product function or behavior available to a user or customer. | |
| **Capability Increment** | Org | Bounded change to a Feature or Product Capability. | capability change |
| **Opportunity** | Org | Product/market opportunity worth evaluating or pursuing. | |
| **Hypothesis** | Org | Testable belief about value, market response, usability, feasibility or business impact. | assumption to test |
| **Experiment** | Org | Bounded activity to test a Hypothesis. | validation activity |
| **Requirement** | Org | Atomic statement of what a Product or System must do or satisfy. In Studio: content-backed managed object. | product/system requirement |
| **Acceptance Criteria** | Org | Conditions that must be satisfied for a Requirement or Work Item to be accepted. | done criteria |
| **Design Artifact** | Org | Design output specifying user experience or interface: wireframe, design prototype (mock, not running code), design specification. | UX spec, mockup; org §3.4 |
| **UI/UX Interactive PoC App** | Org | Runnable proof-of-concept application in working code, built to validate a product experience; needs hosting and sharing, unlike a design prototype. A PoC that graduates lives on as a Repository. | interactive PoC; org §3.4 |
| **PRD** | Org | Product Requirements Document — authored spec packaging Requirements, actors and success criteria for a product change. | org §3.4 |
| **DESIGN Document** | Org | System/architecture design document: components, interfaces and constraints; references Architecture Decisions. | design doc; org §3.4 |
| **Decomposition** | Org | Ordered, dependency-linked FEATURE list derived from a DESIGN, with coverage back to Requirements. | org §3.4 |
| **Feature Spec** | Org | Implementable specification of a Feature: flows, algorithms, states and test scenarios. | org §3.4 |
| **Impact/Coverage Report** | Org | Analysis of which downstream artifacts and code a change affects, with coverage gaps and version-bump signal. | org §3.4 |
| **Success Criteria** | Org | Expected outcome condition for a change, expressed through metrics or qualitative evidence. | outcome criteria |
| **Product Metric** | Org | Measures product value, adoption, engagement, retention, usage, quality or outcome. | product outcome metric |
| **EPSVS Scorecard** | Org | Periodic scorecard across efficiency, performance, scalability, versatility and security dimensions. | org §3.4 |
| **Customer** | Org | Individual, group or organization receiving value from a Product; may be internal or external. | |
| **User** | ⚠️ Both | **Org:** person or system actor — including integrations and API clients — interacting with a Product or affected by its behavior. **Studio:** someone using Studio is a **Member**; "user" is not canon for that. | end user, operator |
| **Customer Account** | Org | Commercial or organizational customer that buys, uses or evaluates a Product. | account |
| **Customer Agreement** | Org | Agreement governing a commercial, legal or service relationship with a customer. | |
| **Commercial Customer Relationship** | Org | Ongoing relationship between the organization and a customer account across buying, usage, support and renewal. | org §3.5 |
| **Deal** | Org | Sales opportunity with a customer account, moving through pipeline stages toward an agreement. | org §3.5 |
| **Win/Loss Record** | Org | Recorded outcome and reasons of a closed deal. | org §3.5 |
| **Commercial Plan** | Org | Packaged commercial offer — plan or tier — defining available capabilities, limits, pricing or service level. | plan, tier |
| **Pricing** | Org | Rules or model for how product value is monetized. | org §3.5 |
| **Entitlement** | Org | Right granted to a customer, account or user to access a product capability, plan, limit or service. | org §3.5 |
| **Product License** | Org | Legal grant under which the organization's **own** Product is provided: commercial license, EULA, or the product's own open-source license. Outbound counterpart of the inbound third-party License. | outbound license, EULA |
| **Subscription** | Org | Ongoing commercial relationship granting access to a product, plan or service for a period. | org §3.5 |
| **Renewal** | Org | Commercial event or process of extending, changing or ending an existing customer relationship. | org §3.5 |
| **Support Case** | Org | Tracked customer support request or issue with its own lifecycle and response commitments. | ticket; org §3.5 |
| **Customer Health** | Org | Assessed state of a customer relationship, derived from usage, support cases, incidents and renewals. | org §3.5 |
| **Usage** | Org | Measured product consumption, adoption or activity by customers or accounts. | org §3.5 |
| **SLA** | Org | Agreement-backed service-level commitment to a customer. | service-level agreement |
| **Commercial Metric** | Org | Measures revenue, churn, expansion, agreement value, usage revenue or commercial performance. | revenue metric |
| **Market** | Org | External arena in which the organization competes, sells, learns or seeks adoption. | org §3.3 |
| **Market Segment** | Org | Target market, customer group or context in which Products compete. | segment |
| **Persona** | Org | Representative user, buyer, customer or stakeholder type used to reason about needs and behavior. | org §3.3 |
| **Competitor** | Org | Organization competing for the same customer need. | rival company |
| **Competitor Product** | Org | Product offered by a Competitor. | competing product |
| **Competitor Feature** | Org | Observed competitor capability, behavior, offer or change. | competitor capability |
| **Competitive Comparison** | Org | Structured comparison of the organization's offering against Competitor Products across features, pricing or positioning. | feature matrix; org §3.3 |
| **Pricing Benchmark** | Org | Comparison of competitor pricing structures, tiers and price points across markets or segments. | org §3.3 |
| **Market Signal** | Org | Evidence from market, competitors, sales or customers that may influence product decisions. | signal |
| **Research Evidence** | Org | Observed or collected evidence from research, analysis, interviews, experiments or market monitoring. | org §3.3 |
| **CEP Synthesis** | Org | Synthesis document consolidating competitor/evidence/pricing research into decision-ready findings. | org §3.3 |
| **Insight** | ⚠️ Both | **Org:** interpreted learning from evidence that may influence strategy, product or commercial decisions; arrives in Studio as a managed object. **Studio:** the trust-ramp *read-only insight* stage renders as **Findings** in insight views ("signal" = informal UI word for an active finding) · **Constructor Insight** is a separate product behind a connector. Three meanings, never merged (product §2). | |
| **Market Metric** | Org | Measures market size, growth, share, demand, win/loss, competitor traction or segment behavior. | market measure |
| **Customer Feedback** | Org | Input from customers/users: support tickets, interviews, surveys, usage signals or sales feedback. | feedback |

## Work And Planning

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **Project** | ⚠️ Both | *Unified — one entity, two faces (repr §3.1, 2026-07-12).* **Org:** bounded execution effort: feature delivery, research, migration, complex bugfix, customer implementation or remediation. **Studio:** the same managed object adopted as the effort container — belongs to a workspace, includes objects **by reference**, adds inclusion scope, workflows, advancement; carries project-scoped Graph/Insight Views; does not own a graph. | delivery effort, initiative scope |
| **Workstream** | Org | Coordinated stream of work inside or across Projects, often focused on a discipline, domain, system or outcome. | stream |
| **Process** | Org | Repeatable way of performing work or making decisions. | org §4 |
| **Activity** | ⚠️ Both | **Org:** bounded action or step within a process, project or workstream. **Studio:** one *configured* unit of work inside a lifecycle stage (per performer role) or a workflow, with declared **input/output object types**; performed by actors via actions. | org §4 · repr §7 |
| **Milestone** | Org | Significant target date or achievement in a Project, Workstream or Roadmap. | checkpoint |
| **Work Plan** | Org | Planned sequence of work required to deliver a Project, Workstream or Roadmap Item. | *deprecated* — no model backing; escalate as candidate model add |
| **Backlog** | Org | Ordered or triaged collection of work that may be considered, planned or executed. | product/delivery backlog |
| **Work Item** | Both | Tracked unit of work, typed by its **Work Item Type** — a *delivery* item (epic, task) or a *follow-up* item (bug, remediation task). Usually mirrored from a work tracker. An **Incident**, **Risk** or **Finding** is *not* a Work Item — each is its own record that may *create* Work Items. | ticket / tracker item |
| **Work Item Type** | Org | Classification of a Work Item; controlled vocabulary: epic, user story, task, bug, spike, chore, incident follow-up, remediation task. | values, not separate entities (org §4) |
| **Sprint** | Org | Time-boxed execution iteration into which work items are planned (Scrum; other cadences map to Process). | org §4 |
| **Assignment** | Org | Allocation of work to a Person, Team, Job Role, Function or AI Agent; may carry the Job Role in which the assignee acts for this work; effective dates when needed. Neither `(Project, Job Role)` nor `(Person, Project)` is unique (invariant 12): several people may hold the same role on one project, and one person may act in different roles across projects. | work assignment; not ownership |
| **Epic / User Story / Task / Bug / Remediation Task** | Org | *Deprecated as entities* — **Work Item Type** values (org §4). | |
| **Dependency** | Org | Relationship where one object, work item, team or external constraint affects another. **In Studio: a plain link arrives as a Relation; a reified Dependency record arrives as a managed object (invariant 8).** | blocker |
| **Handoff** | Both | Transfer of responsibility, context or work output between people, teams or functions; in Studio also: passing one activity's outputs as another's inputs. | org §4 · Vision §5.6 |
| **Outcome** | Org | Result or effect the work is intended to create or has actually created. | org §4 |

## Software Estate

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **Software System** | Org | Technical system that implements part of a Product or internal platform. | system |
| **Application** | Org | User-facing or operator-facing deployable unit within or associated with a Software System. | app |
| **Service** | Org | Deployable runtime unit exposing behavior to applications, systems or external consumers; includes serverless functions and scheduled jobs/workflows. | backend service |
| **Software Component** | Org | Technical part of a Software System: module, adapter, deployable unit or infrastructure module. Consumed reusable packages are modeled as Library. | technical component |
| **Component Version** | Org | Identified version of a Software Component. | *deprecated* — no model backing; escalate as candidate model add |
| **API** | Org | Interface specification through which systems, services or external consumers interact. | interface |
| **Library** | Org | Reusable code library or package consumed by applications, services or components; internal or third-party. | package |
| **Repository** | Org | Source-control container for code, infrastructure, configuration or documentation. | repo |
| **Code Area** | Org | Logical area of code inside one or more Repositories. | codebase area |
| **Documentation** | Org | Authored documentation about a product, system or API, versioned in a Repository. | docs; org §3.6 |
| **Data Asset** | Org | Dataset, schema, data product, event taxonomy or managed data resource. | dataset |
| **Instrumentation Plan** | Org | Per-release plan of events, properties and triggers defining the event taxonomy captured to analytics. | org §3.6 |
| **Infrastructure Resource** | Org | Compute, network, storage, cloud, identity or platform resource used to run systems (a datacenter or an AWS region are instances). | infrastructure |
| **Environment** | Both | Runtime/deployment context such as dev, staging or production; in Studio a Project uses Environments but does not own them. | env, deploy target |
| **Tooling System** | Org | Software system used by the organization to plan, build, test, run, support or govern work; internally built or vendor-provided. A git provider (GitHub, GitLab) is a Tooling System instance. | renamed from Tool |
| **Tool Workspace** | ⚠️ Both | **Org:** collaboration or configuration container inside a specific Tooling System — a Slack workspace, Figma team, Notion workspace, Jira site, GitHub organization. The org model deliberately avoids a generic "Workspace". **Studio:** **Workspace** is Studio's own working context — see Part B. | org §3.6 · repr §3.1 |
| **Technology Stack** | Org | Set of technologies, tooling systems, frameworks, languages and platforms used by the organization; composition expressed as `Technology Stack groups Library / Tooling System / Infrastructure Resource / AI Model`. | stack |
| **AI Model** | Org | AI/ML model used by products or tooling — vendor-provided or internally built; has versions. | org §3.6 |
| **Prompt Asset** | Org | Managed prompt, prompt template or agent instruction used with AI models; has versions. | org §3.6 |
| **Eval Run** | Org | Evaluation of an AI model, prompt or AI-backed feature against defined criteria. | org §3.6 |
| **AI Agent** | Both | Software actor that performs work using AI models under human accountability (attribution — invariant 8; ownership stays with people/teams). In Studio: an actor kind that runs the Skills a kit ships. **The same real agent may be both — a managed object in the graph and an actor on it.** | agent |
| **Software Estate Metric** | Org | Measures systems, applications, services, repositories, components, data assets, tooling or technology stack. | estate metric |

## Delivery And Operations

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **Commit** | Org | Versioned source-code change; attributed to a Person or AI Agent. | git commit |
| **Branch** | Org | Line of development within a Repository; groups commits, typically merged via a Pull Request. | org §3.7 |
| **Pull Request** | Org | Proposed code change for review and merge. | PR, merge request |
| **Code Review** | Org | Review activity or record evaluating a Pull Request or code change before merge or release; produces Evidence / Finding / Work Item (comments are its content, not entities). | org §3.7 |
| **Build** | Org | Execution of a build for a source revision: status, logs, metadata and produced artifacts; also produces Evidence / Finding from in-build scans (SAST/DAST, quality). The build *definition* is CI configuration versioned in a Repository (no separate term). | build run |
| **Build Artifact** | Org | Output of a build process: binary, container image, package or bundle. | build output |
| **Test Case** | Org | Test definition verifying behavior, requirement or quality condition. | test definition |
| **Test Run** | Org | Execution of Test Cases. | test execution |
| **Release** | Org | Planned or shipped change boundary with scope, version, decision, notes and rollout intent (a git tag is the repo-level version pointer). | |
| **Release Decision** | Org | Specialized Decision for approving, rejecting or deferring a Release or Deployment; multiple approvers = multiple Decision records. | release approval |
| **Release Notes** | Org | Human-readable summary of what a Release changes: features, fixes, breaking changes, upgrade notes. | changelog; org §3.7 |
| **SBOM** | Org | Machine-readable bill of materials: components, libraries and licenses contained in a Build Artifact or Release; feeds vendor/component/license visibility. | software bill of materials; org §3.7 |
| **Deployment** | Org | Event/record of placing a Build Artifact or Release into an Environment. | deploy event |
| **Change Record** | Org | Record connecting a delivered change to its scope, evidence, decision and deployment context. | org §3.7 |
| **Delivery Metric** | Org | Measures delivery flow, throughput, quality, lead time, release readiness or effectiveness (coverage and quality ratings are instances). In Studio: computed from Transitions, never mirrored. | delivery measure |
| **Runtime Instance** | Org | Running instance of an Application, Service, job, database, queue, model endpoint or other runtime unit. | running instance |
| **Telemetry Signal** | Org | Observed runtime signal: log, trace, metric, event or health check. | org §3.8 |
| **Operational Metric** | Org | Measures runtime, reliability, performance, availability or operational behavior. | operational measure |
| **Alert** | Org | Operational signal emitted by monitoring or observation. | |
| **Incident** | Org | Disruption or operational event requiring response and follow-up. | |
| **Problem** | Org | Underlying or recurring cause behind incidents, defects or operational instability. | org §3.8 |
| **Runbook** | Org | Operational procedure for running, diagnosing or recovering a system. | operational procedure |
| **Postmortem** | Org | Analysis of an Incident and prevention actions. | incident review |
| **SLO** | Org | Internal measurable reliability or service-level objective. | service-level objective |
| **Service Health** | Org | Current or historical view of whether a service is operating within expected thresholds. | org §3.8 |
| **Customer Impact** | Org | Effect of an operational event on Customers, Customer Accounts, revenue, commitments or usage. | impact |

## Governance, Risk And Decisions

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **Policy** | Org | Normative organizational rule, expectation or requirement. | |
| **Standard** | Org | Required way of meeting a Policy or engineering/governance expectation — e.g., a reference architecture, coding or review standard. | |
| **Guideline** | Org | Recommended practice that is not mandatory unless referenced by Policy/Standard. | guidance |
| **Control** | Org | Verifiable mechanism that implements a Policy or reduces a Risk. | compliance control |
| **Assessment** | Org | Evaluation of an object, process or control against Policies, Standards or Risks (a SAST/DAST scan is an instance). | review, audit |
| **Finding** | Both | Observed issue, gap, non-compliance, vulnerability or problem. **Org:** authored by an Assessment/review/test (§3.9). **Studio:** same concept with a **provenance** — mirrored (from a tool), computed (Studio's own graph analysis; auto-resolves), or authored. Studio has no separate "Signal" entity (D-067). | gap, issue, signal *(informal, computed Studio finding)* |
| **Review Findings Report** | Org | Structured report packaging review Findings by severity and domain (code, design, ADR, PRD). | org §3.9 |
| **Risk** | Org | Possible negative event with likelihood, impact, owner and treatment status. | exposure |
| **Exception** | Org | Approved deviation from Policy, Standard or Control; always has a scope and an expiry or review date. | waiver |
| **Decision** | Org | General recorded choice with rationale, date, owner, evidence and consequences; specialized Decisions inherit its record fields. | decision record |
| **Product Decision** | Org | Specialized Decision about product direction, scope, trade-off, roadmap or capability. | product call |
| **Architecture Decision** | Org | Specialized Decision about technical architecture, system design or platform direction. | ADR |
| **Risk Acceptance Decision** | Org | Specialized Decision to accept a known Risk under stated conditions. | risk acceptance |
| **Evidence** | ⚠️ Both | **Org (Governance Evidence):** supporting or attesting artifact/record for a claim, control, decision, finding, risk or release; arrives in Studio as a managed object. **Studio:** record supporting a validation or approval — test run, review, document version, source reference; backs every quality-gate and approval decision. Guarded, never merged (product §2). | attestation, proof record |
| **Remediation** | Org | Planned treatment to resolve a Finding or reduce a Risk. | corrective action |
| **Governance Metric** | Org | Measures risk exposure, control coverage, finding aging, exception volume or assessment status. | governance measure |

## Assets, IP, Licenses And Third Parties

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **Asset / IP Asset / Copyright / Patent / Trademark / Trade Secret** | Org | *Deprecated* — no model area; **License / License Obligation** are the modeled terms; escalate to the model owner if needed. | |
| **License** | Org | Legal permission or constraint governing use, distribution, modification or commercialization of an asset or component (inbound, third-party; the outbound counterpart is Product License). | software license |
| **License Obligation** | Org | Requirement created by a License: attribution, notices, usage restriction, disclosure, payment or audit. | obligation |
| **Third-Party Component** | Org | Externally supplied component, package, service or dataset; externally consumed AI models are modeled as AI Model. | vendor component |
| **External Service** | Org | Service operated by an external party and used by the organization. | org §3.10 |
| **Technology Dependency** | Org | Dependency on a technology, framework, platform, runtime or standard outside direct product ownership. | org §3.10 |
| **Supply-Chain Risk** | Org | Risk created by external components, vendors, services, licenses or delivery dependencies. | org §3.10 |
| **Vendor** | Org | Supplier outside the organization that provides tools, components, services, infrastructure or data (an LLM provider is a Vendor). | supplier |
| **Supplier Agreement** | Org | Agreement with a vendor, supplier, partner or external service provider. | |
| **External Dependency Metric** | Org | Measures vendor performance, external service reliability, license exposure, component risk or dependency cost. | dependency measure |

## Function Overlay

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **Function** | Both | Organizational function — who participates in the work. The overlay defines **14** (org §5): Product Management · Product Marketing · R&D/Engineering · QA · DevOps/SRE · GTM/Sales · Customer Success · Design/UX · Security/Compliance · People Ops · Finance · Legal · Procurement · Internal IT. Studio's vision targets **8** of them. Functions never hold accountable ownership (invariant 1); role granularity (Architect, DBA, Performance Engineer) lives in **Job Role**, not in extra functions. | function set |

---

# Part B — Studio Platform

## Products & Wedge

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **Constructor Studio** | Studio | AI-native, open-core **control plane** that mirrors a team's existing SDLC tools into one governed graph and moves work forward with validated, human-approved actions — across the CLC, not just coding. | Studio |
| **Constructor Insight** | Studio | Constructor's analytics/benchmarking product; from Studio's side a **source system behind a connector**. | Insight (the product) |
| **Constructor Gears** | Studio | The Fabric element supplying reusable OSS/BSS building-block modules; packaged into Kits. | Gears |
| **HypoFinder** | Studio | The proprietary research product folded into Studio as a kit (science ontology + hypothesis-search flows). | HypoFinder Kit, Scientific Research Kit |

## Actors, Members & Access

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **Actor** | Studio | Anything that performs a transformation in the lifecycle: Human, AI Agent, external system, automated pipeline. Carries an **autonomy level** and a **reach** (≤ graph, never write-back for an agent) that gate what it may do without approval (invariants 9, 12). | Vision §4.3 |
| **Member** | Studio | Someone using Studio — the vision's Studio "User". Links to at most one Person managed object; holds Role Grants at a scope, directly or via teams. Client access (CLI, IDE plugins, MCP endpoints, API tokens) is member configuration, not a domain entity. | User Identity, Studio User, workspace member |
| **Role** | ⚠️ Both | **Studio:** named permission set from the tenant's role catalog, granted to members and teams via Role Grants. **Org:** for the organizational sense use **Job Role** (work role); ownership/accountability is a **Responsibility Assignment** (an accountable Person or Team), not a role — never merged (product §2). | Access Role, permission set |
| **Role Grant** | Studio | The fact that a member or a team holds a Role **at a scope** — tenant, workspace or project; archiving a scope suspends its grants. | Role Assignment, scoped role |
| **Permission** | Studio | Concrete right (read / create / change / connect / run / approve / publish / administer) over a resource — an object type, a scope or a feature area; bundled into Roles. | right |
| **User Projection** | Studio | The effective subset one member can see, computed from their role grants (direct + via teams). Objects outside it render per their type's **Data Policy** — **full / stub / concealed**, shipped default **stub** (D-061); access never propagates along relations. | effective visibility |
| **Agent Role** | Studio | Specialized role an AI agent plays in an activity: analyst, implementer, reviewer, tester, summarizer. Distinct from access Role and org Job Role. | repr §6.2 |
| **Studio Team** | Studio | Studio-native group of members — a grantee of roles and a unit of organizing work. May be *seeded* from an org Team; membership managed in Studio, never auto-synced. | access group |
| **Buyer (persona)** | Studio | The economic buyers for Studio — PM: CPO, Director of PM, PM; R&D: CTO, Chief Architect, VP Engineering, Head of Platform, Head of R&D. | Vision §4.2 |
| **Data Policy** | Studio | Rule for data sensitivity, retention, redaction or model usage over object types and sources; constrains projections, context packages, model routing. | repr §5 |
| **Safety Constraint** | Studio | Rule preventing unsafe automation: unauthorized write-back, sensitive-data exposure, uncontrolled model usage. *Guardrail* stays as the UX label. | Guardrail, hard block |

## Containers & Structure

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **Studio Tenant** | Studio | The instance of Studio serving one Organization (1:1; may sit in a control-plane admin hierarchy, D-016). Contains workspaces, members, teams, connectors; keeps the **control-plane registries** (members, teams, roles, policies, connectors, kits, audit). **Object identity is workspace-local — the tenant holds no object-identity registry** (D-058). Commercial packaging is tenant configuration, not domain entities. | account, tenant |
| **Workspace** | ⚠️ Both | **Studio:** Studio's working context bounded by **one purpose** (typically a product line); includes managed objects **by reference**; owns its **Knowledge Graph**; hosts projects, views, workflows, automation and role grants. **Org:** the org model deliberately has no generic Workspace — only **Tool Workspace** (a container inside a specific Tooling System). | repr §3.1 · org §3.6 |
| **Inclusion** | Studio | Stored record of a workspace or project including a managed object by reference: who included it, when, manually or by rule. | scope membership |

## Graph, Objects & Sync

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **Knowledge Graph** | Studio | Workspace-level home of the facts: the included managed objects plus the relations among them. One graph per workspace; a **system model, not a UI** — members see views. | SDLC Graph, Shadow Graph *(superseded names)* |
| **Citizen Stand-in** | Studio | A workspace-local graph object that **stands in for a control-plane citizen** (a Member, a Team) when a workspace needs it *on* the graph (e.g. a Person object standing for a Member). Stand-in only — never authoritative, never consulted for authorization (invariant 15). The third layer of §3; *not* a distinct metatype — a role a graph object plays. | *was Representation object*; shadow object |
| **Managed Object** | Studio | Studio's representation of one real entity. **One object per workspace** (workspace-local — the same real entity in two workspaces is two independent objects, D-058); projects within the workspace include it by reference, never copy. Carries one acquisition mode (**mirrored / linked / authored**); may be **content-backed** (owns versioned content — informally, a document); records provenance, confidence, sync state. Typed by an Object Type. | Graph Object, Node |
| **Object Type** | Studio | Registered type of managed object. Every domain-facing type **represents exactly one organization-model term**; a type may specialize another. Registry is tenant-wide; each workspace activates a subset (its *effective ontology*). Provenance per type: built-in / kit / custom. | node type |
| **Relation** | Studio | Typed, directed connection between exactly two managed objects, with provenance and confidence. Kinds: **imported** (fact from sources) and **asserted / inferred** (by a member or proposed by Studio; decided in place). | Link, edge |
| **Relation Type** | Studio | Registered kind of relation (`realized_by`, `implements`, `depends_on`…); mirrors the org model's primary relationships; constrains which object types it may connect. | edge type |
| **Attribute** | Studio | Tracked field on an object (source system + external ID, owner, state, version, last sync, validation status…). | Property |
| **View** | Studio | Saved way of selecting and presenting objects: list, board, table, timeline, dashboard, graph diagram. Kinds: object · traceability · review · **Graph View** · **Insight View**. Always renders through the viewer's projection. | saved view |
| **Graph View** | Studio | A view kind: scoped graph diagram over the workspace's Knowledge Graph (a project's Graph View is project-scoped; the graph stays workspace-level). | project subgraph |
| **Insight View** | Studio | A view kind: the window onto workspace-level signals and delivery/cost metrics; project-scoped when in a project. | |
| **Source System** | Studio | External system holding original records (Jira, GitLab, Confluence, HRIS, CRM, CI/CD, monitoring); stays **system of record** for what it exports. The same tool can also appear *in* the graph as a managed object. | source of record, external system |
| **Source Record** | Studio | One original record as fetched (an issue, a repo, an employee row); maps to at most one managed object. | raw record |
| **Source Link** | Studio | The pair (managed object × source record) — where provenance lives; carries the **Sync State** for that pair. | external link |
| **Identity Mapping** | Studio | Rule or confirmed fact that several source records are the same real entity; Studio proposes matches, an administrator confirms; every merge/split is audit-logged. | identity resolution |
| **Field Mapping / Relationship Mapping** | Studio | Mapping between source-record fields ↔ object attributes / source-system links ↔ relation types; configured per connector. | attribute mapping, link mapping |
| **Sync Run** | Studio | One synchronization execution: import, update, reconcile, check; creates/updates objects and imported relations; surfaces conflicts. | sync log |
| **Sync State** | Studio | Sync status per source link: in sync, pending, stale, conflicted, error, paused. Answers "does this match the source?" — distinct from **Validation Status** ("does this make sense?"). | sync status |
| **Conflict** | ⚠️ Both | **Studio:** detected inconsistency between Studio and one or more sources — first-class object, resolved by rule, member or workflow per governance. **Org:** not modeled — a git merge conflict is transient tool state. | data conflict |
| **Signal** *(deprecated → Finding)* | Studio | **Not a separate entity** (D-067): a computed detection is a **Finding** with `provenance = computed` (auto-resolves; invariant 14). "Signal" survives only as informal UI wording for an active finding on the trust ramp. | → **Finding** |
| **Candidate Object** | Studio | Proposed graph content — a would-be object, relation or content version — produced by Studio or an agent but not yet accepted. A proposed *thing*; a prepared action run is a proposed *act*. | candidate |
| **Audit Entry** | Studio | Immutable record of things that must never be silent: identity merges/splits, role grants, membership changes, kit publications, approvals, write-backs, agent actions. | audit log |
| **Transition** | Studio | Immutable state-change record of one object, workflow run or action run: actor, from-state, to-state, timestamp, via which action/sync run. **The measurement substrate** — cycle time, acceptance rate are read out of transitions, never entered. | state-change record |
| **Validation Status** | Studio | Whether an object currently satisfies the rules that apply to it: pass, fail, warning, retry, escalated, blocked. Semantic health. | |
| **Traceability** | Studio | The relationships linking requirement → design → code → test across the graph. | |

## Lifecycle & Stages

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **CLC (Construction Lifecycle)** | Studio | The lifecycle **framework**, **kit-defined — no universal stage ladder** (D-064). The flagship **SDLC Kit** ships the default: 3 phases (Plan → Build → Operate), 14 stages (Intent…Evolution). Studio ships no platform-level lifecycle; a non-software vertical's kit names its own. *(VISION §4.5 calls it **SCLC** — Software Construction Lifecycle; renamed to CLC, D-064.)* | SCLC *(VISION §4.5)*; Vision §4.5 |
| **SDLC** | Studio | The traditional development lifecycle focused on *creating* software; Studio adapts to the company's SDLC and extends it into a CLC. | |
| **Reference CLC** | Studio | The example lifecycle Studio ships (Intent → … → Evolution); usable as-is or customizable; delivered by the SDLC Kit. | |
| **Lifecycle Phase / Lifecycle Stage** | Studio | Phase = Plan / Build / Operate. Stage = one of the 14 (Intent → Vision → Discovery → Strategy → Definition → Design → Construction → Validation → Release → Operation → Support → Intelligence → Optimization → Evolution); per role and stage Studio configures activities, gates, checkpoints. | repr §7 |
| **Input / Output** | Studio | The artifact(s) an Activity consumes / produces; one activity's Output can feed another's Input. | Vision §5.6 |
| **Synchronization Checkpoint** | Studio | Defined coordination point between roles/activities at a stage — runs validators, raises conflicts and signals. | sync checkpoint |

## Actions, Workflows & Validation

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **Action** | Studio | Reusable **definition** of a transformation (`create_design`, `decompose_feature`, `run_ci`): inputs, outputs, actor requirements, gates. Packaged by kits, composed into workflows. | Action Definition |
| **Action Run** | Studio | One **execution** of an action by an actor — one entity with a state (`prepared → approved / rejected / deferred / escalated → running → applied / failed / dropped`) and an effect target (graph or source system = write-back). Mirror-touching runs always enter at `prepared`. | run |
| **Workflow** | Studio | Repeatable automation pipeline — activities, actors, validators, quality gates; may include sub-workflows; published to the Workflow Library. | Flow *(loose vision synonym, merged)* |
| **Workflow Run** | Studio | One execution of a Workflow, with status and history; may carry many Action Runs and AI Runs, may wait on approvals. | run |
| **Workflow Library** | Studio | Catalog of workflows published to a workspace — predefined + custom; what a member browses and runs. Populated by kits. | Flow Library |
| **Automation Rule** | Studio | Standing config rule reacting to events / sync / schedules; triggers workflows or actions — *config, not a run*. May trigger several workflows/actions (and a workflow may also be run manually). | trigger rule; *was Automation* |
| **Assistant** | Studio | Conversational surface (§6.6): open goal → selects tools **from the activated catalogue** → **composes an ordered sequence of governed operations** (Workflow/Action Runs + control-plane decisions), shown in plan-preview, run on approval. **Not a new entity** — an **AI Agent (Actor)** in an orchestrator Agent Role; the sequence is out-of-kernel orchestration (no new object type), conversation-correlated via the D-059 pattern; every effect is visible & governed (invariant 16 / PC-13). | AI chat, Studio Assistant |
| **Predefined workflow** | Studio | Shipped, ready-to-run workflow a kit provides (e.g., the SDLC-Kit deterministic-analysis set: gap, traceability, contradiction, release-readiness…; the PM-Kit flow set). *Catalog content, not a model entity.* | smart flow |
| **Validator** | Studio | Check — rule, test, model or **human review** — that evaluates objects, candidates or action runs against gates and policies; produces validation statuses and evidence. | |
| **Validator Loop** | Studio | The pass / fail / retry / escalate cycle around a validator (bounded automation). | validation loop |
| **Quality Gate** | Studio | Must-pass checkpoint: work cannot advance (or write back) until it passes. *"No approved spec — no build."* Requires evidence. | gate |
| **Context Package** | Studio | The selected set of objects, relations, artifacts, rules and evidence handed to an actor for one action or review — the unit of "what the model saw". Constrained by data policies and projections. | bound context |
| **AI Run** | Studio | One execution by a model or agent: model, runtime, **cost**, and a **token breakdown** (prompt / completion / cached / retry-overhead / batch-saving). The atomic unit under every AI-spend surface; attributed to an actor. Kernel-side a **projection over execution runs** (`WorkerRun` + `cf.ai` attrs), no independent execution identity. | model call |
| **Cost Budget** | Studio | Cap on AI spend at a scope (tenant / workspace / project / workflow / agent / model); alerts and blocks per policy. Ships in the `cf.ai` kit-set. | spend cap |
| **Usage Event** | Studio | Measured Studio activity (connector syncs, workflow executions, validations, member activity) — a **computed metering projection** over existing runs, aggregated into Cost Metrics; not authored, not a run of its own. | metering event |
| **Cost Retrospective** | Studio | Computed after-the-fact analysis of a workflow run/phase: plan vs actual tokens/cost, where spend went (cache misses, retries, chatty loops), and whether it could have been cheaper and how; surfaces as a computed Finding → Recommendation. | cost analysis, cost review; repr §6.3 |
| **Execution mode** | Studio | How an action runs: deterministic script / AI-assisted transformation / human task. Renamed from "Transition type" to kill the collision with **Transition**. | |
| **Write-back** | Studio | UX label for an **approved Action Run whose effect target is a source system** (create ticket, update doc, open PR). Requires capability + permission + validation + approval + audit — all five (invariant 10). | controlled write-back |
| **Write-back Capability** | Studio | Configured *ability* to update a given source system — per connector, per object type, under policy. | |
| **Legacy-to-spec (brownfield)** | Studio | Ingesting existing code/repositories to generate or reconstruct a consistent spec set (reverse engineering). | brownfield reconstruction |

## Kits, Customization & Vocabulary

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **Studio Kit** | Studio | Package of reusable delivery knowledge that **defines a domain**: object & relation types (ontology contribution), templates, workflows, actions, validators, policies, reference architectures, Gears blocks. Origins: **shipped** or **authored** in the organization. Install registers types tenant-wide, activates them in the installing workspace. | Kit, Domain Kit |
| **Kit Catalog** | Studio | The tenant's internal catalog of kits available to install — shipped + published by the organization's own members. Not a marketplace; sharing stays inside the tenant. | kit library |
| **SDLC Kit** | Studio | The open-source base/default kit; implements the Reference CLC. | |
| **Function Kit** | Studio | Ready-to-install kit scoped to a function or role family (Architect, PM, Engineering Management, DevOps, QA, Support…). *Catalog content, not a model entity.* | role kit |
| **Ontology** | Studio | The entities and relationships that define a domain — the schema a kit brings. | kit schema |
| **Template** | Studio | Reusable artifact scaffold shipped in a kit. | |
| **Sample data** | Studio | Seed/demo data a kit ships to populate a workspace or project out of the box. | seed data |
| **Kit Workflows** | Studio | The recommended workflows a kit ships; they populate the Workflow Library. | kit flows |
| **Gears Building Block** | Studio | Module from Constructor Gears — reusable engines, modules, developer/operations tools; kits and actions assemble them. | building blocks |
| **Skill** | Studio | **Engineering-internal term, not product vocabulary** (no model entity). The code (scripts) implementing a kit's domain logic / workflow — what an **AI Agent** actually runs. Distinct from the org **Competency** (Part A), which was renamed from _Skill_ to clear this collision. | Claude Skill, Python agent |
| **Glossary Term** | Studio | A term of the customer's **own product domain** with a definition ("recovery point", "immutable backup") — the ontology of *what the team is building*. Not an Object Type and not a Terminology Override. | Concept *(deprecated)* |
| **Term Mapping** | Studio | The tie between a Glossary Term and the managed objects expressing it; lets Studio detect **term drift** (a Signal). | Concept Mapping *(deprecated)* |
| **Domain Dictionary** | Studio | Configurable vocabulary of a tenant or workspace; holds terminology overrides (workspace entries shadow tenant ones — labels only). | |
| **Terminology Override** | Studio | Workspace- or tenant-specific **label** for a canonical concept (*Roadmap Item → "Research Plan Item"*). Changes labels, never semantics (invariant 11). | relabel |
| **Reference Catalog** | Studio | Editable named **set of allowed values** for a field (Work Item types, cost units, severities…); kit ships defaults, workspace adds/disables, versioned + audited. Changes *values* only — not the label (Terminology Override) or the kind (Object Type). Value sets carrying logic stay fixed schema. Kernel: `configuration`-profile object. | lookup catalog, value set; repr §7 |
| **Domain Profile** *(deprecated → Kit)* | Studio | **Folded into Kit** (2026-07-16): a "package of ontology + terminology + validators + workflows + templates for a target domain" is exactly a Kit (D-024/070/076). Use **Kit** (+ its bundled Domain Dictionary). | → **Kit** |
| **Customization** | Studio | Extending what the platform can do — types, properties, methods, workflows, policies — **without modifying the core**; building & sharing custom kits. | kit authoring |

## Collaboration Layer

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **Collaboration** | Studio | The cross-cutting sharing + coordination layer: reviews · comments · handoffs · activity feed · sharing. | Vision §5.7 |
| **Activity Feed** | Studio | Chronological stream of changes/events. | feed |
| **Review & Approval** | Studio | Coordinated review and sign-off on transitions and artifacts (incl. Pull Request review, Exception review). | approval, sign-off |
| **Comment** | Studio | Inline discussion thread on an object/artifact. | |
| **Guardrails & Quality Gates** | Studio | Shared standards defined at team/org level, with per-project enforcement. | Vision §5.1 |

## Method Vocabulary (PM scenarios)

> Sits outside both models; candidates for PM Kit documentation.

| Term | Where | Definition | Aliases / Notes |
|---|---|---|---|
| **User Journey** | Studio | End-to-end path a role takes from intent to outcome, written in the `ALGORITHM` schema (Actor/Goal/Inputs/Outputs/Steps/Decision points/Guards/Next). | journey |
| **Scenario / Atomic scenario / Scenario group** | Studio | A concrete way of accomplishing an action within a journey / its leaf unit (one Action or Workflow step mapped to one object) / the 3 first-version groups: Competitive Landscape, Requirements-PRD, Metrics. | |
| **Opportunity Statement** | Studio | The Intent-stage output naming a market/customer opportunity worth pursuing. | Vision §4.6 |
| **JTBD (Jobs to Be Done)** | Studio | Framing a need as the "job" a customer hires the product to do; used in Discovery. | jobs-to-be-done |
| **Competitive register** | Studio | Shared competitor comparison schema populated in layers: identity → product & traction → pricing. | competitor register |

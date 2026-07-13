---
type: foundation
artifact: software-organization-glossary
status: draft-v0.8.12
date: 2026-07-13
source:
  - "[[software-organization-domain-model]]"
  - Critical domain-boundary feedback, 2026-07-11
tags:
  - software-organization
  - glossary
  - domain-model
  - foundations
related:
  - "[[software-organization-domain-model]]"
---

# Software Organization Glossary

Index of software-organization-domain-model@0.9.3, 2026-07-13.

This glossary contains only terms that belong to the software-organization domain. It excludes product interface concepts, platform implementation concepts, account/licensing constructs of a specific tool, and representation/synchronization mechanisms.

## Organizational Structure

| Term | Definition | Aliases / Notes |
|---|---|---|
| **Organization** | Software-producing company or group of companies being modeled. | company |
| **Legal Entity** | Legally recognized entity associated with the Organization. | company entity |
| **Organizational Unit** | Business unit, department, division or practice inside the Organization. | org unit, department |
| **Person** | Real human being known to the Organization. | human |
| **Employment** | Dated relationship between a Person and a Legal Entity (carries effective dates). | employee/contractor engagement |
| **Skill** | Named capability, expertise area or strength a Person can hold and a Position or Assignment can require (e.g., Kubernetes, payments-domain expertise, incident command). Proficiency level and source (declared / assessed / derived) recorded on the possession record. | capability, expertise |
| **Employee** | Person employed by a Legal Entity. | deprecated — not an entity in model@0.9.3; only **Employment** (the reified relationship, §3.1) is modeled — record such distinctions on it |
| **Contractor** | Person engaged under contract rather than employment. | deprecated — not an entity in model@0.9.3; only **Employment** (the reified relationship, §3.1) is modeled — record such distinctions on it |
| **External Collaborator** | Person outside the Organization who participates in work. | deprecated — not an entity in model@0.9.3; only **Employment** (the reified relationship, §3.1) is modeled — record such distinctions on it |
| **Position** | Official role slot, title or function in the Organization. | job position |
| **Team** | Stable group of people that builds, owns, operates, supports or governs work/assets. | group |
| **Team Membership** | Membership of a Person in a Team. | team member relation |
| **Position Allocation** | Allocation of a Position to a Team. | position/team allocation |
| **Reporting Line** | Manager/report relationship from one Position to another Position. | management line |
| **Job Role** | Work/organizational role such as Product Manager, Developer, SRE or Security Lead. | organizational role |
| **Responsibility Assignment** | Fact that a Person or Team is accountable for a domain object. | ownership, accountability |
| **Organizational Metric** | Measurement used to evaluate organizational structure, staffing, capacity, responsibility coverage or team health. | org metric |

## Strategy

| Term | Definition | Aliases / Notes |
|---|---|---|
| **Mission** | Timeless purpose: why the Organization exists. Grounds Vision and Strategy; not itself a future state (Vision) nor a way to win (Strategy). At most one, organization-scoped. | purpose |
| **Vision** | Desired future state and product/business ambition. A company Vision `frames` Strategy; a product/line Vision guides one or more Products/Lines. A Product or Line has at most one active Vision; one Vision may cover several. | north star; level is set by relationships, not a scope attribute |
| **Product Vision** | Deprecated — not a separate term in model@0.9.3; a **Vision** that guides a Product or Product Line (`Product / Product Line guided_by Vision`, §3.4). | see Vision |
| **Strategy** | Durable direction: where the organization chooses to compete and how it intends to win. | strategic direction |
| **Objective** | Measurable outcome leadership wants to achieve. | goal |
| **Objective Metric** | Measurement used to evaluate progress toward an Objective. | goal metric |
| **Strategic Initiative** | Strategic investment theme or intent connecting Objectives to planned changes. | initiative |
| **Investment Direction** | Chosen direction for allocating funding, capacity or attention. | renamed from Investment (model@0.9.3 §3.2) |
| **Investment Metric** | Measurement used to evaluate funding, capacity, spend, cost allocation or investment performance. | investment measure |
| **Budget** | Approved funding envelope for a period and scope: organizational unit, strategic initiative, project or team. | funding envelope (model@0.9.3 §3.2) |
| **Spend Record** | Recorded actual cost — people, vendors, infrastructure, tooling or AI model usage — compared against Budgets. | actual spend (model@0.9.3 §3.2) |
| **Roadmap** | Planning view over intended changes for a defined scope and horizon. | company/product/platform/engineering roadmaps are types and scopes, not separate entities |
| **Roadmap Item** | Planned outcome/change on a Roadmap. | roadmap entry |
| **Roadmap Type** | Classification of a Roadmap: company, product, platform, engineering, technology or governance. | model@0.9.3 §3.2 |
| **Roadmap Scope** | Domain object or area a Roadmap is about, such as Organization, Product Line, Product, Product Capability, Software System or Team. | model@0.9.3 §3.2 |
| **Roadmap Horizon** | Planning time window for a Roadmap: quarter, half-year, year or custom period. | model@0.9.3 §3.2 |
| **Product Roadmap** | Deprecated — not a separate term in model@0.9.3; a **Roadmap** (type = product) that covers a Product or Product Line (`Product / Product Line has_planning_view Roadmap`, §3.4). | see Roadmap |
| **Business Decision** | Specialized Decision about investment, market, budget, pricing, partnership or priority. | commercial decision |

## Products And Market

| Term | Definition | Aliases / Notes |
|---|---|---|
| **Product Portfolio** | Managed set of Product Lines and Products. | deprecated — removed from model (2-level offering: Product Line ⊇ Product); a portfolio view = an Organization-scoped Vision/Roadmap or a rollup over Product Lines and Products |
| **Product Line** | Optional grouping of related Products (may be absent in smaller organizations); a Product can belong to zero, one or several lines. | product family |
| **Product** | Managed offering that delivers value to internal or external customers. | offering |
| **Product Capability** | Stable ability of a Product to solve a coherent user or business scenario. | capability |
| **Product Module** | Logical part of a Product through which capabilities are delivered. | deprecated — no model backing; escalate as candidate model add |
| **Feature** | Product function or behavior available to a user or customer. | |
| **Capability Increment** | Bounded change to a Feature or Product Capability. | capability change |
| **Opportunity** | Product/market opportunity worth evaluating or pursuing. | |
| **Hypothesis** | Testable belief about value, market response, usability, feasibility or business impact. | assumption to test |
| **Experiment** | Bounded activity to test a Hypothesis. | validation activity |
| **Requirement** | Atomic statement of what a Product or System must do or satisfy. | product/system requirement |
| **Acceptance Criteria** | Conditions that must be satisfied for a Requirement or Work Item to be accepted. | done criteria |
| **Design Artifact** | Design output specifying user experience or interface for a feature or capability: wireframe, prototype or design specification. | model@0.9.3 §3.4 |
| **Success Criteria** | Expected outcome condition for a change, expressed through metrics or qualitative evidence. | outcome criteria |
| **Product Metric** | Metric used to evaluate product value, adoption, engagement, retention, usage, quality or product outcome. | product outcome metric |
| **Customer** | Individual, group or organization receiving value from a Product; may be internal or external. | |
| **User** | Person or actor interacting with a Product or affected by its behavior. | end user, operator |
| **Customer Account** | Commercial or organizational customer that buys, uses or evaluates a Product. | account |
| **Customer Agreement** | Agreement governing a commercial, legal or service relationship with a customer. | |
| **Commercial Customer Relationship** | Ongoing relationship between the organization and a customer account across buying, usage, support and renewal. | model@0.9.3 §3.5 |
| **Deal** | Sales opportunity with a customer account, moving through pipeline stages toward an agreement. | model@0.9.3 §3.5 |
| **Win/Loss Record** | Recorded outcome and reasons of a closed deal. | model@0.9.3 §3.5 |
| **Commercial Plan** | Packaged commercial offer — often called a plan or tier — defining available capabilities, limits, pricing or service level. | plan, tier (model@0.9.3 §3.5) |
| **Pricing** | Rules or model for how product value is monetized. | model@0.9.3 §3.5 |
| **Entitlement** | Right granted to a customer, account or user to access a product capability, plan, limit or service. | model@0.9.3 §3.5 |
| **Product License** | Legal grant under which the organization's own Product is provided to a customer or the public: commercial license, EULA, or the product's own open-source license. Outbound counterpart of the inbound third-party License (§3.10). | outbound license, EULA |
| **Subscription** | Ongoing commercial relationship granting access to a product, plan or service for a period. | model@0.9.3 §3.5 |
| **Renewal** | Commercial event or process of extending, changing or ending an existing customer relationship. | model@0.9.3 §3.5 |
| **Support Case** | Tracked customer support request or issue with its own lifecycle and response commitments. | model@0.9.3 §3.5 |
| **Customer Health** | Assessed state of a customer relationship, derived from usage, support cases, incidents and renewals. | model@0.9.3 §3.5 |
| **Usage** | Measured product consumption, adoption or activity by customers or accounts. | model@0.9.3 §3.5 |
| **SLA** | Agreement-backed service-level commitment to a customer. | service-level agreement |
| **Commercial Metric** | Metric used to evaluate revenue, churn, expansion, agreement value, usage revenue or commercial performance. | revenue metric |
| **Market** | External arena in which the organization competes, sells, learns or seeks adoption. | model@0.9.3 §3.3 |
| **Market Segment** | Target market, customer group or context in which Products compete. | segment |
| **Persona** | Representative user, buyer, customer or stakeholder type used to reason about needs and behavior. | model@0.9.3 §3.3 |
| **Competitor** | Organization competing for the same customer need. | rival company |
| **Competitor Product** | Product offered by a Competitor. | competing product |
| **Competitor Feature** | Observed competitor capability, behavior, offer or change. | competitor capability |
| **Market Signal** | Evidence from market, competitors, sales or customers that may influence product decisions. | signal |
| **Research Evidence** | Observed or collected evidence from research, analysis, interviews, experiments or market monitoring. | model@0.9.3 §3.3 |
| **Insight** | Interpreted learning from evidence that may influence strategy, product or commercial decisions. | model@0.9.3 §3.3 |
| **Market Metric** | Measurement used to evaluate market size, growth, share, demand, win/loss, competitor traction or segment behavior. | market measure |
| **Customer Feedback** | Input from customers/users: support tickets, interviews, surveys, usage signals or sales feedback. | feedback |

## Work And Planning

| Term | Definition | Aliases / Notes |
|---|---|---|
| **Project** | Bounded execution effort such as feature delivery, research, migration, bugfix or remediation. | delivery effort |
| **Workstream** | Coordinated stream of work inside or across Projects, often focused on a discipline, domain, system or outcome. | stream |
| **Process** | Repeatable way of performing work or making decisions. | model@0.9.3 §4 |
| **Activity** | Bounded action or step within a process, project or workstream. | model@0.9.3 §4 |
| **Milestone** | Significant target date or achievement in Workstream, Project or Roadmap. | checkpoint |
| **Work Plan** | Planned sequence of work required to deliver a Project, Workstream or Roadmap Item. | deprecated — no model backing; escalate as candidate model add |
| **Backlog** | Prioritized list of candidate Work Items. | product/delivery backlog |
| **Work Item** | Tracked unit of delivery or follow-up work. | delivery item |
| **Work Item Type** | Classification of a Work Item; controlled vocabulary: epic, user story, task, bug, spike, chore, incident follow-up, remediation task. | values, not separate entities (model@0.9.3 §4) |
| **Sprint** | Time-boxed execution iteration into which work items are planned (Scrum; other cadences map to Process). | added to the model 2026-07-13 (model §4) |
| **Assignment** | Allocation of work to a Person, Team, Job Role, Function or AI Agent. | work assignment; not ownership; has effective dates when needed |
| **Epic** | Large body of work decomposed into User Stories or Tasks. | deprecated — **Work Item Type** value, not an entity (model@0.9.3 §4) |
| **User Story** | User-centered delivery item with acceptance criteria. | deprecated — **Work Item Type** value, not an entity (model@0.9.3 §4) |
| **Task** | Concrete unit of work. | deprecated — **Work Item Type** value, not an entity (model@0.9.3 §4) |
| **Bug** | Defect or incorrect behavior requiring correction. | deprecated — **Work Item Type** value, not an entity (model@0.9.3 §4) |
| **Remediation Task** | Work created to mitigate Risk, resolve Finding or prevent Incident recurrence. | deprecated — **Work Item Type** value, not an entity (model@0.9.3 §4) |
| **Dependency** | Relationship where one object, work item, team or external constraint affects another. | blocker; renamed from Work Dependency (model@0.9.3 §4) |
| **Handoff** | Transfer of responsibility, context or work output between people, teams or functions. | model@0.9.3 §4 |
| **Outcome** | Result or effect the work is intended to create or has actually created. | model@0.9.3 §4 |

## Software Estate

| Term | Definition | Aliases / Notes |
|---|---|---|
| **Software System** | Technical system that implements part of a Product or internal platform. | system |
| **Application** | User-facing or operator-facing deployable unit within or associated with a Software System. | app |
| **Service** | Deployable runtime unit exposing behavior to applications, systems or external consumers. | backend service |
| **Software Component** | Technical part of a Software System: module, adapter, deployable unit or infrastructure module. Consumed reusable packages are modeled as Library. | technical component |
| **Component Version** | Identified version of a Software Component. | deprecated — no model backing; escalate as candidate model add |
| **API** | Interface specification through which systems, services or external consumers interact. | interface |
| **Library** | Reusable code package consumed by applications, services or components; internal or third-party. | package |
| **Repository** | Source-control container for code, infrastructure, configuration or documentation. | repo |
| **Code Area** | Logical area of code inside one or more Repositories. | codebase area |
| **Data Asset** | Dataset, schema, data product, event taxonomy or managed data resource. | dataset |
| **Infrastructure Resource** | Compute, network, storage, cloud, identity or platform resource used to run systems. | infrastructure |
| **Environment** | Runtime/deployment context such as dev, staging, production, region-specific or customer-specific environment. | env |
| **Tooling System** | Software system used by the organization to plan, build, test, run, support or govern work. | renamed from Tool; internally built or vendor-provided (model@0.9.3 §3.6) |
| **Tool Workspace** | Collaboration or configuration container inside a specific Tooling System, such as a Slack workspace, Figma team, Notion workspace, Jira project space or GitHub organization. | model@0.9.3 §3.6 |
| **Technology Stack** | Set of technologies, tooling systems, frameworks, languages and platforms used by the organization. | stack |
| **AI Model** | AI/ML model used by products or tooling — vendor-provided or internally built. | model@0.9.3 §3.6 |
| **Prompt Asset** | Managed prompt, prompt template or agent instruction used with AI models. | model@0.9.3 §3.6 |
| **Eval Run** | Evaluation of an AI model, prompt or AI-backed feature against defined criteria. | model@0.9.3 §3.6 |
| **AI Agent** | Software actor that performs work using AI models under human accountability. | accountable ownership stays with people and teams (model@0.9.3 §3.6) |
| **Software Estate Metric** | Measurement used to evaluate technical estate health, complexity, ownership, dependency freshness or architecture conformance. | estate metric |

## Delivery And Operations

| Term | Definition | Aliases / Notes |
|---|---|---|
| **Commit** | Versioned source-code change. | git commit |
| **Pull Request** | Proposed code change for review and merge. | PR, merge request |
| **Branch** | Line of development within a Repository; groups commits, typically merged via a Pull Request. | added to the model 2026-07-13 (model §3.7) |
| **Code Review** | Review activity or record evaluating a Pull Request or code change before merge or release. | model@0.9.3 §3.7 |
| **Build** | Build process result for a source revision, including status, logs, metadata and produced artifacts. | build run |
| **Build Artifact** | Output of a build process: binary, container image, package or bundle. | build output |
| **Delivery Metric** | Metric used to evaluate flow, throughput, quality, lead time, release readiness or delivery effectiveness. | delivery measure |
| **Test Case** | Test definition verifying behavior, requirement or quality condition. | test definition |
| **Test Run** | Execution of Test Cases. | test execution |
| **Release** | Planned or shipped change boundary with scope, version, decision, notes and rollout intent. | |
| **Deployment** | Event/record of placing a Build Artifact or Release into an Environment. | deploy event |
| **Change Record** | Record that connects a delivered change to its scope, evidence, decision and deployment context. | model@0.9.3 §3.7 |
| **Runtime Instance** | Running instance of Application, Service, job, database, queue, model endpoint or runtime unit. | running instance |
| **Telemetry Signal** | Observed runtime signal such as log, trace, metric, event or health check. | model@0.9.3 §3.8 |
| **Operational Metric** | Metric used to evaluate runtime, reliability, performance, availability or operational behavior. | operational measure |
| **Alert** | Operational signal emitted by monitoring or observation. | |
| **Incident** | Disruption or operational event requiring response and follow-up. | |
| **Problem** | Underlying or recurring cause behind incidents, defects or operational instability. | model@0.9.3 §3.8 |
| **Runbook** | Operational procedure for running, diagnosing or recovering a system. | operational procedure |
| **Postmortem** | Analysis of an Incident and prevention actions. | incident review |
| **SLO** | Internal measurable reliability or service-level objective. | service-level objective |
| **Service Health** | Current or historical view of whether a service is operating within expected thresholds. | model@0.9.3 §3.8 |
| **Customer Impact** | Effect of operational event on Customers, Customer Accounts, revenue, commitments or usage. | impact |

## Governance, Risk And Decisions

| Term | Definition | Aliases / Notes |
|---|---|---|
| **Policy** | Normative organizational rule, expectation or requirement. | |
| **Standard** | Required way of meeting a Policy or engineering/governance expectation. | |
| **Guideline** | Recommended practice that is not mandatory unless referenced by Policy/Standard. | guidance |
| **Control** | Verifiable mechanism that implements a Policy or reduces a Risk. | compliance control |
| **Assessment** | Evaluation of object, process or control against Policies, Standards or Risks. | review, audit |
| **Finding** | Observed issue, gap, non-compliance, vulnerability or problem. | gap, issue |
| **Risk** | Possible negative event with likelihood, impact, owner and treatment status. | exposure |
| **Exception** | Approved deviation from Policy, Standard or Control. | waiver |
| **Decision** | General recorded choice with rationale, date, owner, evidence and consequences. | decision record |
| **Product Decision** | Specialized Decision about product direction, scope, trade-off, roadmap or capability. | product call |
| **Architecture Decision** | Specialized Decision about technical architecture, system design or platform direction. | ADR |
| **Risk Acceptance Decision** | Specialized Decision to accept a known Risk under stated conditions. | risk acceptance |
| **Release Decision** | Specialized Decision for approving, rejecting or deferring a Release or Deployment. | release approval |
| **Evidence** | Supporting or attesting artifact/record for a claim, control, decision, finding, risk or release. | attestation |
| **Remediation** | Planned treatment to resolve Finding or reduce Risk. | corrective action |
| **Governance Metric** | Measurement used to evaluate risk exposure, control coverage, finding aging, exception volume or assessment status. | governance measure |

## Assets, IP, Licenses And Third Parties

| Term | Definition | Aliases / Notes |
|---|---|---|
| **Asset** | Managed thing of value: software, data, document, design, infrastructure, model, process, tool or knowledge asset. | deprecated — no model area; License / License Obligation are the modeled terms; escalate to model owner if needed |
| **IP Asset** | Intellectual property asset: source code, algorithm, model, dataset, design, invention, trademark, trade secret or know-how. | deprecated — no model area; License / License Obligation are the modeled terms; escalate to model owner if needed |
| **Copyright** | IP protection for original works such as code, documents, designs and media. | deprecated — no model area; License / License Obligation are the modeled terms; escalate to model owner if needed |
| **Patent** | Legal protection for patentable invention. | deprecated — no model area; License / License Obligation are the modeled terms; escalate to model owner if needed |
| **Trademark** | Brand/name/logo protection. | deprecated — no model area; License / License Obligation are the modeled terms; escalate to model owner if needed |
| **Trade Secret** | Confidential knowledge that has business value and is protected by secrecy. | deprecated — no model area; License / License Obligation are the modeled terms; escalate to model owner if needed |
| **License** | Legal permission or constraint governing use, distribution, modification or commercialization of an asset or component. | software license |
| **License Obligation** | Requirement created by a License: attribution, notices, usage restriction, disclosure, payment or audit. | obligation |
| **Third-Party Component** | Externally supplied component, package, service or dataset used by the organization; externally consumed AI models are modeled as AI Model. | vendor component |
| **External Service** | Service operated by an external party and used by the organization. | model@0.9.3 §3.10 |
| **Technology Dependency** | Dependency on a technology, framework, platform, runtime or standard outside direct product ownership. | model@0.9.3 §3.10 |
| **Supply-Chain Risk** | Risk created by external components, vendors, services, licenses or delivery dependencies. | model@0.9.3 §3.10 |
| **Vendor** | Supplier outside the organization that provides tools, components, services, infrastructure or data. | supplier |
| **Supplier Agreement** | Agreement with a vendor, supplier, partner or external service provider. | |
| **External Dependency Metric** | Measurement used to evaluate vendor performance, external service reliability, license exposure, component risk or dependency cost. | dependency measure |

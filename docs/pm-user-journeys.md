---
status: draft-v1.1
date: 2026-07-15
source: modelled on studio-user-journeys v1.5.9 (Constructor Studio)
---
# Product Management — User Journeys - v1.1

## Introduction

This document describes the eight primary Product Management / Program Management (PgM) user journeys practised by the product team today. Each journey traces the full path a role takes from intent to outcome, using the ordinary product-management toolchain — competitor databases, spreadsheets, PRD and backlog tools, design tools, and product-analytics platforms.

Companion document: the Constructor Studio user journeys this draft is modelled on and will be integrated with — <https://github.com/constructorfabric/studio/blob/main/docs/research/user-journeys.md>.

**Studio-native scenarios** derived from these journeys (mapped step-by-step): Competitive Landscape (J1–J3), Requirements/PRD (J4–J5), Metrics (J6–J8). These journeys hold the *intent* (as-is practice); the scenarios are the *Studio execution* (to-be).

**How to read ALGORITHM blocks**

Each block follows a fixed schema:

- `ACTOR` — the role that initiates the journey
- `GOAL` — the outcome they are trying to reach
- `INPUTS` — what must already exist before the journey begins
- `OUTPUTS` — what is produced when the journey ends
- `STEPS` — the ordered sequence of actions the actor performs
- `DECISION_POINTS` — named forks where the actor chooses a path
- `GUARDS` — invariants that must hold throughout; violation halts the journey
- `NEXT` — optional handoff to a downstream journey or team

**Enrichment metadata**

Beyond the schema above, each journey carries a one-line metadata header drawn from the product-activity catalog. These fields do not exist in a pure workflow description but are what make a PM journey operational:

- `Category` — the practice area the journey belongs to (Competitive Research, Product Ops, Product Metrics)
- `Stage` — Planning (set up once, revisited periodically) or Recurring (runs on a fixed rhythm)
- `Cadence` — how often the journey runs (Annual, Quarterly, Monthly, Weekly)
- `Owner` — the accountable role (this is also the journey `ACTOR`)
- `Partnering teams` — the teams the actor collaborates with
- `Skill group` — the class of PM work exercised
- `Direction` — whether the journey primarily serves the Business or R&D
- `Success metric` — the measurable outcome that says the journey succeeded

---

## Journey Index

> The table is an at-a-glance subset; each journey's header below carries the full field set (including Skill group and Direction).

| #   | Journey                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                              | Owner             | Category             | Stage     | Cadence   | Partnering teams | Success metric                                   |
| --- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | -------------------- | --------- | --------- | ---------------- | ------------------------------------------------ |
| 1   | Identify Competitors                                                         | Identify the competitors for each target geography for each product.                                                                                                                                                                                                                                                                                                                                                                     | Product Owner     | Competitive Research | Planning  | Annual    | —                | Competitor list per country per product          |
| 2   | Quarterly Competitive Comparison                                             | Quarterly comparison with selected competitors:<br>• Product functionality<br>• Company size — employees<br>• Company size — ARR<br>• Company size — number of customers                                                                                                                                                                                                                                                                 | Product Owner     | Competitive Research | Recurring | Quarterly | —                | Quarterly comparison published                   |
| 3   | Competitive Pricing Analysis                                                 | • Compare pricing with the competition in each of the target geographies (obtain real competitor pricing on a regular basis — mystery shopping, partners)<br>• Identify the pricing trends in each target geography                                                                                                                                                                                                                      | Product Manager   | Competitive Research | Recurring | Quarterly | —                | Quarterly pricing benchmark                      |
| 4   | Author a PRD / Product Spec                                                  | Product / feature specifications.<br><br>PgM activities:<br>• Business requirements writing (PRD / high-level feature spec)<br>• Define problem statement, success and acceptance criteria<br>• High-level estimations from R&D team                                                                                                                                                                                                     | Program Manager   | Product Ops          | Recurring | —         | Design, R&D      | Every feature shipped has a spec; accuracy ≥ 90% |
| 5   | User Story Writing & Backlog Management                                      | Translate PRD into backlog-ready work items. Prioritise and groom the backlog each sprint.<br><br>PgM activities:<br>• Decompose EPICs into user stories<br>• Write acceptance / success criteria per story<br>• Design review and mockup review with Design<br>• User-story grooming with Dev team<br>• Sprint planning and sprint review<br>• Backlog prioritisation; review limitations with Dev team                                 | Program Manager   | Product Ops          | Recurring | —         | Design, R&D      | Sprint backlog groomed ≥ 1 sprint ahead          |
| 6   | Analytics Instrumentation & Taxonomy                                         | Event taxonomy and instrumentation plan per release. Consistent naming, data quality, coverage.                                                                                                                                                                                                                                                                                                                                          | Product Ops (TBD) | Product Metrics      | Recurring | —         | R&D, Data        | 100% of key user flows instrumented              |
| 7   | Customer Experience Program (CEP)                                            | Analyse CEP data to:<br>• Identify UX inefficiency<br>• Product usage patterns<br>• Functionality usage<br><br>PgM activities:<br>• Analyse CEP / usage data to find UX inefficiencies and drop-offs<br>• Map product usage patterns and feature adoption<br>• Define success criteria / metrics for UX improvements<br>• Convert findings into improvement EPICs and user stories<br>• Design review and mockup review with Design team | Program Manager   | Product Metrics      | Recurring | Weekly    | Design           | Quarterly CEP synthesis fed into discovery       |
| 8   | EPSVS Analysis (Efficiency, Performance, Scalability, Versatility, Security) | PgM activities:<br>• Define and track success criteria / metrics for each dimension (efficiency, performance, scalability, versatility, security)<br>• Review performance and scalability limitations with Dev team<br>• Identify security and compliance gaps<br>• Convert findings into EPICs, decompose into user stories<br>• PM team peer-review of the analysis                                                                    | Program Manager   | Product Metrics      | Recurring | Monthly   | R&D              | Quarterly EPSVS scorecard                        |

**Competitive-intelligence comparison framework (split across J1 · J2 · J3).** The three Competitive Research journeys populate one shared competitor register in layers: **J1** captures the *stable identity* layer (annual), **J2** the *volatile product-and-traction* layer (quarterly), and **J3** the *pricing* layer (quarterly). Every parameter below is owned by exactly one journey — nothing is collected twice. This is the comparison schema each journey fills in.

| Parameter | J1 | J2 | J3 | Typical source / method |
|---|:--:|:--:|:--:|---|
| **Company & firmographics — J1, annual (stable)** | | | | |
| Company / brand name | ✓ | | | Website, company registries |
| Primary domain / website | ✓ | | | Website |
| HQ location (country / city) | ✓ | | | LinkedIn, registries |
| Geographies served / market coverage | ✓ | | | Website, case studies |
| Year founded / years in market | ✓ | | | Crunchbase, registries |
| Ownership type (public / private / PE-backed / startup) | ✓ | | | Crunchbase, filings |
| Total funding raised (as of last annual review) / last major round | ✓ | | | Crunchbase, press |
| Parent company / key subsidiaries | ✓ | | | Filings, press |
| **Positioning & ICP — J1, annual (stable)** | | | | |
| Segment / ICP & primary buyer persona (K-12, higher-ed, SMB, enterprise) | ✓ | | | Website, sales input |
| Product category (one-line “what they do”) | ✓ | | | Website |
| Positioning / value-proposition statement | ✓ | | | Website messaging |
| Business / pricing-model type (subscription / perpetual / usage-based / freemium — model, not prices) | ✓ | | | Website, sales input |
| Relationship to us (direct / indirect / adjacent) | ✓ | | | PM judgement |
| Competitive tier / priority | ✓ | | | PM judgement |
| **Product & functionality — J2, quarterly (tracked)** | | | | |
| Feature-by-feature parity (core capabilities) | | ✓ | | Trials, product docs, demos |
| Capability depth / maturity per feature | | ✓ | | Hands-on trial |
| AI / automation capabilities | | ✓ | | Trials, release notes |
| Integrations / API / extensibility | | ✓ | | Docs, marketplace |
| Platforms & channels (web / mobile / offline) | | ✓ | | Product docs |
| Languages / localization supported | | ✓ | | Product docs, website |
| UX / usability score (against a fixed rubric) | | ✓ | | Hands-on trial |
| Security & compliance certifications (SOC 2, ISO, GDPR, accessibility) | | ✓ | | Trust page, docs |
| Recent releases / roadmap signals / release cadence | | ✓ | | Changelog, release notes |
| Notable product gaps / weaknesses | | ✓ | | Trial, reviews |
| **Company scale & traction — J2, quarterly (tracked)** | | | | |
| Employees / headcount + growth | | ✓ | | LinkedIn |
| Revenue / ARR estimate + growth | | ✓ | | Analyst estimates, press, funding disclosures; filings only where public |
| Customers / logos — count + notable names | | ✓ | | Website, case studies |
| Market share / analyst rank | | ✓ | | Analyst reports |
| Web traffic & SEO visibility | | ✓ | | SimilarWeb |
| Review scores & volume (rating, # reviews) | | ✓ | | G2, Capterra |
| Sentiment — common praise & complaints | | ✓ | | G2 / Capterra reviews |
| Hiring signals / open roles | | ✓ | | Careers page, LinkedIn |
| New funding / M&A since last quarter | | ✓ | | Crunchbase, press |
| Partnerships / integrations announced | | ✓ | | Press, blog |
| **Pricing & packaging — J3, quarterly (tracked)** | | | | |
| List price per tier / package per geography | | | ✓ | Pricing page, mystery shopping |
| Packaging structure (tiers, editions, add-ons) | | | ✓ | Pricing page |
| Pricing metric / unit (per seat / site / student / usage) | | | ✓ | Pricing page, quotes |
| Free tier / trial terms | | | ✓ | Website |
| Effective / street price & discounting patterns | | | ✓ | Mystery shopping, partners |
| Published add-on / implementation fees (where listed) | | | ✓ | Pricing page |
| Contract terms (annual / multi-year / minimums) | | | ✓ | Quotes, partners |

Assignment rule: a parameter lives in **J1** if it is identity-stable (changes rarely, refreshed annually); in **J2** if it is a tracked product or company-scale / traction metric (re-measured quarterly); in **J3** if it is a pricing detail. Where a stable snapshot and a volatile delta coexist (e.g. total funding raised to date vs. new rounds this quarter), the stable snapshot sits in J1 and the delta in J2 — so no parameter is collected twice.

Every populated cell carries an **as-of date** and a source; **J2 and J3 cells additionally carry a confidence flag (measured / estimated)**, per J2's GUARDS and J3's output contract. Journeys 2 and 3 additionally *derive* position-vs-us and trend-over-time (J2: rolling QoQ trend and position per capability / metric; J3: pricing trend and price positioning) from the tracked series — these are analysis outputs, not separately collected inputs.

---

## Journeys

### Journey 1: Identify Competitors

`Category: Competitive Research` · `Stage: Planning` · `Cadence: Annual` · `Owner: Product Owner` · `Partnering teams: —` · `Skill group: Research & Analysis` · `Direction: Business` · `Success metric: Competitor list per country per product`

```text
ALGORITHM IdentifyCompetitors
  ACTOR: Product Owner
  GOAL: Maintain an accurate, agreed register of competitors for every
        target geography and every product in the portfolio, each carrying
        a light, stable profile (identity taxonomy)
  INPUTS: [
    Defined target geographies (countries / regions),
    Current product portfolio,
    Access to market-intelligence sources (analyst reports, review sites,
      company databases, sales-team field intel)
  ]
  OUTPUTS: [
    Competitor register (spreadsheet or database) listing competitors
      per country per product,
    A light, stable profile per competitor: name / brand, website, HQ
      country and geographies served, year founded, ownership type, total
      funding / last round, parent company, segment / ICP, product category
      (one-line "what they do"), business / pricing-model type, and
      relationship (direct / indirect / adjacent),
    Optional tier / priority per competitor,
    Register (source and as-of date per entry) shared with product,
      sales, and leadership
  ]
  STEPS:
    1. DECISION: Geography scope this cycle?
       - PRIORITY MARKETS: cover a subset of priority markets.
       - FULL MATRIX: cover the full target-geography × product matrix.
       Confirm the geographies × products in scope.
    2. Gather candidate competitors per cell from mixed sources: analyst
       reports (Gartner, Forrester), review sites (G2, Capterra), company
       databases (Crunchbase, LinkedIn, local registries), web search, and
       inbound signals from sales and customer conversations.
    3. DECISION: Competitor scope per cell?
       - DIRECT ONLY: only head-to-head substitutes for the same buyer.
       - DIRECT + INDIRECT: include partial substitutes and adjacent tools
         a buyer might use instead.
       - INCLUDE EMERGING: additionally track early-stage or well-funded
         entrants not yet winning deals.
    4. Deduplicate and normalise competitor names.
    5. Capture the light profile per competitor — the identity fields above
       (firmographics, positioning / ICP, product category, pricing-model
       type, relationship) — each with its source and as-of date. Record
       only stable identity attributes here; volatile metrics are gathered
       downstream (see GUARDS).
    6. Optionally assign a tier / priority per competitor to steer how much
       depth Journeys 2 and 3 invest in each one.
    7. Validate the draft register with sales and regional leads; add or
       remove entries based on field reality.
    8. Publish the register to the shared workspace and set the annual
       review reminder.
  DECISION_POINTS:
    - GeographyScope: subset of priority markets / full target matrix
    - CompetitorScope: direct only / direct + indirect / include emerging
  GUARDS: [
    Every target geography × product cell must have at least one entry
      or an explicit "no known competitor" note,
    Every competitor entry must carry its profile fields with a source and
      as-of date,
    The register records stable identity attributes only — feature-by-feature
      functionality and company size (employees, ARR, customer count) are
      added in Journey 2, and actual prices and pricing trends in Journey 3;
      Journey 1 captures at most the pricing-model type, never prices,
    The register is reviewed at least annually and re-validated with sales
  ]
  NEXT: Journeys 2 (Quarterly Competitive Comparison) and 3 (Competitive
        Pricing Analysis) consume this register and layer their tracked
        metrics onto each competitor's stable profile
```

---

### Journey 2: Quarterly Competitive Comparison

`Category: Competitive Research` · `Stage: Recurring` · `Cadence: Quarterly` · `Owner: Product Owner` · `Partnering teams: —` · `Skill group: Research & Analysis` · `Direction: Business` · `Success metric: Quarterly comparison published`

```text
ALGORITHM QuarterlyCompetitiveComparison
  ACTOR: Product Owner
  GOAL: Produce a quarterly, side-by-side comparison against selected
        competitors across two dimension families — product & functionality,
        and company scale & traction
  INPUTS: [
    Competitor register from Journey 1 (stable identity profiles),
    Prior N quarters' versioned comparisons (trailing window, default last
      4) for QoQ deltas and the rolling trend,
    Our current product capabilities and company-scale figures (our own
      baseline for position vs. us),
    Access to public and paid data sources (LinkedIn, SimilarWeb, review
      sites, analyst reports, trust / certification pages)
  ]
  OUTPUTS: [
    Comparison matrix covering two families:
      product & functionality — feature parity and depth, integrations / API,
        platforms, AI / automation, UX, security & compliance certifications,
        recent releases, and notable gaps,
      company scale & traction — headcount, ARR, customer count, market
        share, web traffic, review scores and sentiment, hiring, funding /
        M&A events, and partnerships,
    Notable quarter-over-quarter deltas highlighted,
    Output-format contract per metric: current value + QoQ change
      (absolute, %, and direction ↑ / ↓ / →) + as-of date + confidence
      (measured / estimated),
    Rolling trend over the trailing N quarters (default 4) per key metric,
    Position vs. us per capability / metric (ahead / at parity / behind),
    Executive summary: top material QoQ movements, new entrants and threats,
      and recommended actions,
    Change log of any competitor-set or metric-definition changes since the
      prior quarter,
    Comparison published to the shared workspace, versioned by quarter
  ]
  STEPS:
    1. Select the competitor subset to compare this quarter (typically the
       top head-to-head set from the register).
    2. Fix the comparison dimensions across both families — product &
       functionality, and company scale & traction (see DECISION:
       DimensionScope for how deep to profile scale & traction this quarter).
    3. Gather product & functionality data: hands-on trials, public product
       docs, release notes, changelogs, demo recordings, and trust /
       certification pages.
    4. Gather company scale & traction data: headcount from LinkedIn; ARR
       and customer counts from analyst estimates, press, and funding-round
       disclosures (filings only where public; label estimates as such);
       web traffic from SimilarWeb; review scores and sentiment from G2 /
       Capterra; hiring from careers pages; funding / M&A and partnership
       news from press.
    5. DECISION: Depth of functionality comparison?
       - FEATURE-PARITY GRID: presence/absence per capability.
       - SCORED: weighted scoring per capability against our roadmap.
    6. Populate the comparison matrix; for each metric record the current
       value, the QoQ change (absolute, %, direction), and the rolling
       trend over the trailing N quarters (see DECISION: TrendWindow).
    7. Mark our position vs. each competitor (ahead / at parity / behind)
       per capability and metric.
    8. Write the executive summary (top movements, new entrants, threats,
       recommended actions), update the change log for any competitor-set
       or metric-definition changes, and publish the quarter-tagged
       comparison.
  DECISION_POINTS:
    - CompetitorSubset: top head-to-head set / full register
    - DimensionScope: full depth on both families / lighter scale-&-traction
      pass
    - ComparisonDepth: feature-parity grid / weighted scored comparison
    - TrendWindow: N = 4 (default) / N = 8 / custom
  GUARDS: [
    Every data point is dated and its source labelled measured or estimated,
    Every scale / traction figure carries its as-of date and source; stale
      figures are flagged, not silently reused as current,
    Slow-moving attributes (e.g. security certifications) are refreshed on
      change rather than re-verified every quarter,
    Metric definitions, units, and the competitor set are held constant
      quarter-to-quarter; any change is flagged in the change log,
    Each quarter's comparison is versioned and retained so trends remain
      reconstructable,
    On the first cycle, current values and as-of dates form the baseline;
      QoQ change and trend are marked not-yet-available and begin from the
      second cycle,
    The comparison is published before quarter close
  ]
  NEXT: Journey 3 (Competitive Pricing Analysis); feeds roadmap prioritisation
```

---

### Journey 3: Competitive Pricing Analysis

`Category: Competitive Research` · `Stage: Recurring` · `Cadence: Quarterly` · `Owner: Product Manager` · `Partnering teams: —` · `Skill group: Research & Analysis` · `Direction: Business` · `Success metric: Quarterly pricing benchmark`

> Note: pricing is owned by a Product Manager (the commercial / pricing call), while the competitor register and comparison (Journeys 1–2) are owned by the Product Owner — the roles are taken as-is from the source activity catalog.

```text
ALGORITHM CompetitivePricingAnalysis
  ACTOR: Product Manager
  GOAL: Benchmark our pricing against competitors in each target geography
        and identify pricing trends over time
  INPUTS: [
    Competitor register and comparison from Journeys 1–2,
    Our current price list per geography,
    Channels to obtain real competitor prices (published pricing,
      mystery shopping, partner intel)
  ]
  OUTPUTS: [
    Normalised pricing benchmark per geography × tier / package: our price
      vs. each competitor's price in comparable units (per seat / site /
      student / year, common currency, equivalent tier),
    Per-price metadata: capture method (published / mystery shopping /
      partner), observed-on date, list vs. effective, and confidence
      (measured / estimated),
    Change since each competitor's last observed price (event-based delta
      with the date the change was detected — prices move irregularly, not
      on a fixed quarterly beat),
    Pricing trend over time per competitor / geography (trajectory, not a
      single delta),
    Position vs. us per geography / tier (premium / at parity / discount),
    Benchmark published with a recommendation flag where we are mispriced,
      versioned so trajectories remain reconstructable
  ]
  STEPS:
    1. DECISION: Geography depth this cycle?
       - PRIORITY ONLY: benchmark only the priority geographies.
       - ALL TARGETS: benchmark every target geography.
       For each geography in scope, list the competitors to price against.
    2. Obtain real competitor prices:
       - Published pricing pages where available.
       - Mystery shopping (request quotes as a prospective buyer) where
         pricing is gated.
       - Partner and reseller intel for negotiated / channel pricing.
    3. Normalise prices to comparable units (per seat, per site, per year;
       common currency; equivalent tier).
    4. DECISION: Normalisation basis?
       - LIST PRICE: compare published / rack rates.
       - EFFECTIVE PRICE: adjust for typical discounts and bundling.
    5. Build the normalised benchmark per geography × tier; record each
       price with its capture method, observed-on date, list-vs-effective
       flag, and confidence.
    6. Compute the change since each competitor's last observed price (with
       the change-detected date) and plot the pricing trend over time —
       prices move on their own schedule, so track by observation date, not
       a forced quarter boundary (see DECISION: PriceChangeTracking).
    7. Mark our position vs. each competitor (premium / at parity /
       discount) per geography and tier.
    8. Publish the benchmark (tagged with its publication cycle, not the
       observation dates), versioned so trajectories remain reconstructable,
       with a recommendation flag where we are mispriced.
  DECISION_POINTS:
    - GeographyDepth: priority geographies only / all target geographies
    - NormalisationBasis: list price / effective price
    - PriceChangeTracking: since last observed price / since last N
      observations (both event-based)
  GUARDS: [
    Every competitor price records its capture method (published / mystery
      shopping / partner) and date,
    Every price carries its observed-on date; trends are built from dated
      observations, never from undated or carried-over figures,
    Tier definitions, units, and the competitor set are held constant across
      benchmarks; any change is flagged,
    On the first cycle, observed prices form the baseline; change-since-last
      and pricing trend are marked not-yet-available and begin once a prior
      observation exists,
    Prices are normalised to comparable units before any comparison,
    Mystery-shopping is conducted per policy and never misrepresents the team
  ]
  NEXT: Feeds pricing decisions and packaging changes; informs roadmap
```

---

### Journey 4: Author a PRD / Product Spec

`Category: Product Ops` · `Stage: Recurring` · `Cadence: —` · `Owner: Program Manager` · `Partnering teams: Design, R&D` · `Skill group: Enablement & Communication` · `Direction: R&D` · `Success metric: Every feature shipped has a spec; accuracy ≥ 90%`

```text
ALGORITHM AuthorPRD
  ACTOR: Program Manager
  GOAL: Produce a PRD / high-level feature spec that defines the problem,
        success and acceptance criteria, and carries a high-level effort
        estimate
  INPUTS: [
    Feature idea or opportunity (from discovery, metrics, or leadership),
    Competitive comparison from Journey 2 (how competitors implement a
      comparable feature, where one exists — parity, gaps, differentiation),
    Customer context (discovery, VoC, support signals),
    Availability of Design and R&D for review
  ]
  OUTPUTS: [
    PRD / high-level feature spec in the docs workspace,
    Problem statement, success criteria, and acceptance criteria,
    Competitive context: parity / differentiation summary for the feature
      (referencing the Journey 2 comparison),
    High-level effort estimate from R&D
  ]
  STEPS:
    1. Capture the feature intent and the opportunity it addresses.
    2. Write the problem statement: who is affected, the pain, the evidence.
    3. Review how competitors implement a comparable feature (from the
       Journey 2 comparison): identify table-stakes vs. differentiators,
       parity gaps, and the differentiation angle; feed this competitive
       context into the problem framing and scope. If the feature is not
       covered by the current Journey 2 comparison, note the gap and either
       record it as confirmed whitespace / leapfrog with that rationale or
       request the Journey 2 owner to add it next cycle — never re-collect
       competitor data inside the PRD.
       DECISION: Competitive posture?
       - MATCH PARITY: close a table-stakes gap to reach competitive parity.
       - DIFFERENTIATE: solve the problem materially better than competitors.
       - LEAPFROG: address a need no competitor covers yet.
    4. Define success criteria (business/user outcomes) and acceptance
       criteria (what "done" means, testably).
    5. DECISION: Requirements framing?
       - LEAN: one-pager for a small, well-understood change.
       - FULL PRD: sections for actors, requirements, use cases, and
         non-functional requirements for a larger initiative.
    6. Review the draft with Design (feasibility of UX, mockup direction)
       and with R&D (technical feasibility, unknowns).
    7. Request a high-level effort estimate (t-shirt size or range) from R&D.
    8. DECISION: Ready to proceed?
       - APPROVE: spec accepted; hand off to backlog decomposition.
       - REVISE: incorporate review feedback and re-review.
       - PARK: insufficient value or clarity; shelve with rationale.
    9. Finalise and publish the spec; link it to the initiative / epic.
  DECISION_POINTS:
    - CompetitivePosture: match parity / differentiate / leapfrog
    - RequirementsFraming: lean one-pager / full PRD
    - Readiness: approve / revise / park
  GUARDS: [
    Every feature that ships must have an approved spec (no spec, no build),
    Success and acceptance criteria must be present and testable,
    Competitive context references the Journey 2 comparison rather than
      re-collecting competitor data,
    Design and R&D must review before the spec is marked approved,
    Scope changes after approval trigger a spec update and re-review before
      build continues
  ]
  NEXT: Journey 5 (User Story Writing & Backlog Management)
```

---

### Journey 5: User Story Writing & Backlog Management

`Category: Product Ops` · `Stage: Recurring` · `Cadence: —` · `Owner: Program Manager` · `Partnering teams: Design, R&D` · `Skill group: Planning & Definition` · `Direction: R&D` · `Success metric: Sprint backlog groomed ≥ 1 sprint ahead`

```text
ALGORITHM UserStoryWritingAndBacklogManagement
  ACTOR: Program Manager
  GOAL: Translate an approved spec into backlog-ready work items and keep
        the backlog groomed and prioritised at least one sprint ahead
  INPUTS: [
    Approved PRD / feature spec from Journey 4,
    Improvement EPICs / user stories from Journeys 7 (CEP) and 8 (EPSVS),
    Competitive comparison from Journey 2 (for feature-parity reference),
    Design mockups (where the work has UX),
    Team velocity and known constraints from R&D
  ]
  OUTPUTS: [
    EPICs decomposed into user stories with acceptance criteria,
    Prioritised, groomed backlog at least one sprint ahead,
    Sprint plan agreed and sprint review completed each cycle
  ]
  STEPS:
    1. Decompose each EPIC into user stories sized to fit within a sprint.
    2. Write acceptance / success criteria for every story; where a story
       implements a feature competitors also offer, reference their
       implementation (from the Journey 2 comparison) to set a parity bar
       and avoid known gaps.
    3. Attach and review Design mockups with Design where the story has UX.
    4. Groom stories with the Dev team: clarify scope, surface unknowns,
       confirm estimates.
    5. DECISION: Story disposition in grooming?
       - READY: fully specified and estimated; eligible for a sprint.
       - NEEDS-SPLIT: too large; split into smaller stories.
       - BLOCKED: dependency or open question; park with a blocker note.
    6. Prioritise the backlog and review limitations and trade-offs with
       the Dev team.
       DECISION: Prioritisation basis?
       - VALUE: order by expected business / user value.
       - RISK: pull high-risk or high-uncertainty items forward.
       - DEPENDENCY: order so no item precedes what it depends on.
    7. Run sprint planning (commit the sprint scope) and, at cycle end,
       sprint review (inspect what shipped).
    8. Re-groom continuously so the backlog stays at least one sprint ahead.
  DECISION_POINTS:
    - StoryDisposition: ready / needs-split / blocked
    - PrioritisationBasis: value / risk / dependency order
  GUARDS: [
    No story enters a sprint without acceptance criteria,
    Every story traces back to a spec / EPIC,
    The backlog is groomed at least one sprint ahead at all times,
    Blocked stories carry an explicit blocker and owner
  ]
  NEXT: R&D implementation; Journey 6 (instrumentation for the new flows)
```

---

### Journey 6: Analytics Instrumentation & Taxonomy

`Category: Product Metrics` · `Stage: Recurring` · `Cadence: —` · `Owner: Product Ops (TBD)` · `Partnering teams: R&D, Data` · `Skill group: Governance & Operations` · `Direction: R&D` · `Success metric: 100% of key user flows instrumented`

> Note: this journey makes the product measurable. "Instrumentation" = adding tracking events in the product (e.g. `signup_started`, `signup_completed`); "taxonomy" = the consistent naming/structure scheme those events follow. It runs per release so new flows ship measurable, and it is the data foundation the downstream analytics journeys (7 CEP and 8 EPSVS) consume. (Owner — Product Ops — is still to be assigned; flagged for review.)

```text
ALGORITHM AnalyticsInstrumentationAndTaxonomy
  ACTOR: Product Ops (TBD)
  GOAL: Define a consistent event taxonomy, property schema, and
        instrumentation plan per release so that key user flows are
        measurable with good data quality
  INPUTS: [
    Release scope and the user flows it introduces or changes,
    Existing event taxonomy, naming convention, and global-property set,
    Analytics platform and access for R&D and Data
  ]
  OUTPUTS: [
    Instrumentation plan per release (events, properties, triggers),
    Auto-tracked baseline present on every surface: page_viewed and
      button_clicked (plus session_started),
    Property schema: global (super) properties attached to every event and
      local (event-specific) properties per event,
    Events named per a single self-describing naming convention,
    Updated, versioned event taxonomy / data dictionary (the cumulative
      catalogue of events, properties, and definitions the downstream
      analytics journeys read against),
    Instrumented event data stream flowing to the analytics platform — the
      data Journeys 7 and 8 consume,
    Coverage confirmation: key user flows emit the expected events
  ]
  STEPS:
    1. Identify the key user flows in the release that must be measurable.
    2. Define the events and properties needed per flow; map each to a
       question the product team wants to answer.
    3. Ensure the auto-tracked baseline is in place — every page emits
       page_viewed and every interactive control emits button_clicked
       (plus session_started) — so common interactions are captured
       without per-feature work.
       DECISION: Autocapture mode?
       - SDK AUTOCAPTURE: capture pageviews and clicks automatically via
         the analytics SDK.
       - EXPLICIT: define each event by hand for precision and governance.
       - HYBRID: autocapture the baseline; explicit events for key funnels.
    4. Specify the property schema: global (super) properties attached to
       every event (user / anon id, account / org, plan / tier, role, app
       version, platform / device, locale, environment, session id) and
       local (event-specific) properties per event.
    5. Apply the naming convention: every event name is self-describing and
       follows ONE consistent format across the whole taxonomy —
       object_action, snake_case, past tense (e.g. page_viewed,
       button_clicked, signup_completed); property names follow one
       consistent convention too.
    6. DECISION: Taxonomy fit?
       - EXTEND: new events slot cleanly into the existing scheme.
       - REFACTOR: naming drift detected; align new and adjacent events,
         keeping an old→new mapping and bumping the tracking-plan version.
    7. Hand the instrumentation plan to R&D for implementation; specify
       exact trigger conditions and property values.
    8. Validate coverage and data quality with Data: fire the flows, confirm
       events arrive with correct properties and no duplication or gaps.
    9. DECISION: Data quality gate?
       - PASS: coverage complete and clean; taxonomy updated.
       - FAIL: gaps or dirty data; return to R&D for correction.
   10. Publish the updated, versioned taxonomy / data dictionary with a
       change log of any renames or retirements, notify Journeys 7 and 8,
       and mark the release instrumented.
  DECISION_POINTS:
    - AutocaptureMode: SDK autocapture / explicit / hybrid
    - TaxonomyFit: extend / refactor
    - DataQualityGate: pass / fail (return to R&D)
  GUARDS: [
    Every key user flow has a documented event-to-question mapping and is
      instrumented (100% coverage) before sign-off,
    The auto-tracked baseline (page_viewed, button_clicked, session_started)
      is present on every surface,
    Every event name is self-describing and follows one consistent format
      across the whole taxonomy (object_action, snake_case, past tense),
    Every event carries the required global properties; local properties are
      typed and named per convention,
    Identifiers are pseudonymous (opaque user / anon id, account id) — never
      raw PII (names, emails, free-text, or precise location) in event names
      or property values,
    Event and property definitions are versioned; renames and retirements are
      recorded in a change log and communicated to Journeys 7 and 8 so
      downstream trends remain reconstructable,
    Data quality (correct properties, no duplicates, no gaps) is verified
      with Data before the release is marked instrumented
  ]
  NEXT: Journey 7 (CEP) and Journey 8 (EPSVS) consume the resulting data
```

---

### Journey 7: Customer Experience Program (CEP)

`Category: Product Metrics` · `Stage: Recurring` · `Cadence: Weekly` · `Owner: Program Manager` · `Partnering teams: Design` · `Skill group: Research & Analysis` · `Direction: R&D` · `Success metric: Quarterly CEP synthesis fed into discovery`

> Note: CEP (Customer Experience Program) is the continuous, weekly practice of watching how our own users actually experience the product. It combines quantitative usage data (from Journey 6) with qualitative Voice-of-Customer signals (surveys, NPS, support tickets, interviews) plus session-replay/behavioural analytics to find friction and convert it into improvement work — looking inward at our users, unlike the competitive journeys (1–3) which look outward at the market. (Some teams call this a Voice-of-Customer or continuous-discovery program.)

```text
ALGORITHM CustomerExperienceProgram
  ACTOR: Program Manager
  GOAL: Analyse customer-experience and usage data to find UX inefficiencies,
        usage patterns, and feature adoption, and convert findings into
        improvement work
  INPUTS: [
    Instrumented product data (from Journey 6),
    Voice-of-customer signals (surveys, NPS, support tickets, interviews),
    Session-replay / behavioural analytics access
  ]
  OUTPUTS: [
    Identified UX inefficiencies and drop-off points, broken down by segment,
    Mapped product-usage patterns and feature-adoption levels,
    Improvement EPICs and user stories with defined success metrics,
    Quarterly CEP synthesis fed into product discovery
  ]
  STEPS:
    1. Review usage and experience data on a weekly rhythm.
    2. Identify UX inefficiencies and funnel drop-offs; quantify how many
       users are affected.
       DECISION: Evidence threshold?
       - ACT ON TREND: the signal is strong and consistent enough to act now.
       - WAIT FOR MORE DATA: the signal is thin; keep observing before acting.
    3. Break inefficiencies and adoption down by cohort — plan / tier, role,
       persona, platform, tenure — using the global properties from Journey
       6, to locate where friction concentrates.
    4. Code and theme the qualitative Voice-of-Customer signals (support
       tickets, NPS verbatims, interviews, session replays) and triangulate
       them with the quantitative drop-offs to explain the why behind the
       where.
    5. Map product-usage patterns and feature-adoption levels; flag
       under-adopted or over-friction areas.
    6. Define success criteria / metrics for each proposed UX improvement.
    7. DECISION: Finding disposition?
       - QUICK-FIX: small, high-confidence change; log directly as a story.
       - IMPROVEMENT EPIC: larger opportunity; frame as an EPIC for discovery.
       - INVESTIGATE: signal unclear; schedule deeper research first.
    8. Review candidate improvements and mockups with Design.
    9. Convert findings into improvement EPICs and user stories; hand to
       backlog management (Journey 5).
   10. Each quarter, synthesise the weekly findings into a CEP summary and
       feed it into product discovery.
  DECISION_POINTS:
    - EvidenceThreshold: act on trend / wait for more data
    - FindingDisposition: quick-fix / improvement EPIC / investigate
  GUARDS: [
    Every UX finding is evidence-backed and sized — a quantified affected
      population where instrumented, or documented qualitative evidence
      (session count, ticket volume, interview frequency) where the signal
      is qualitative,
    Every proposed improvement has a defined success metric before it
      enters the backlog,
    Design reviews UX changes before they are committed,
    The weekly cadence rolls up into a quarterly synthesis
  ]
  NEXT: Journey 5 (stories into backlog); quarterly synthesis into discovery
```

---

### Journey 8: EPSVS Analysis (Efficiency, Performance, Scalability, Versatility, Security)

`Category: Product Metrics` · `Stage: Recurring` · `Cadence: Monthly` · `Owner: Program Manager` · `Partnering teams: R&D` · `Skill group: Research & Analysis` · `Direction: R&D` · `Success metric: Quarterly EPSVS scorecard`

> Note: EPSVS is an internal quality framework (not an industry standard); the five dimensions below are defined and maintained by the product team.

```text
ALGORITHM EPSVSAnalysis
  ACTOR: Program Manager
  GOAL: Track and analyse the product across five quality dimensions —
        efficiency, performance, scalability, versatility, security — and
        convert gaps into prioritised improvement work
  INPUTS: [
    Instrumented product-analytics data (from Journey 6, user-facing events),
    System / performance telemetry from APM / observability, and
      performance / scalability observations from R&D,
    Security and compliance requirements and audit inputs
  ]
  OUTPUTS: [
    Defined success criteria / metrics per dimension (E, P, S, V, S),
    Identified gaps across all five dimensions (efficiency, performance,
      scalability, versatility, and security / compliance),
    Improvement EPICs decomposed into user stories,
    Quarterly EPSVS scorecard, peer-reviewed by the PM team
  ]
  STEPS:
    1. Define and maintain success criteria / metrics for each dimension:
       efficiency (system / resource efficiency — compute, cost — distinct
       from J7's UX efficiency and from performance's latency / throughput),
       performance, scalability, versatility (# of supported integrations /
       platforms / locales as a fraction of the target set), and security
       (e.g. open critical / high vulnerabilities, mean-time-to-patch, % of
       controls passing, open audit findings).
    2. Collect current readings per dimension from product data and from R&D.
       DECISION: Dimension focus this month?
       - FULL SWEEP: read all five dimensions.
       - FLAGGED ONLY: focus on dimensions flagged last cycle; monitor the rest.
    3. Identify gaps against target metrics for efficiency, performance,
       scalability, and versatility — reviewing performance and scalability
       limitations with the Dev team.
    4. Identify security and compliance gaps against requirements.
    5. DECISION: Gap severity per dimension?
       - CRITICAL: address now; raise a high-priority EPIC.
       - PLANNED: schedule into an upcoming cycle.
       - MONITOR: within tolerance; keep watching the metric.
    6. Convert material gaps into EPICs and decompose them into user stories.
    7. Peer-review the analysis with the PM team to challenge assumptions
       and severity calls.
    8. Roll the monthly readings into a quarterly EPSVS scorecard.
  DECISION_POINTS:
    - DimensionFocus: full five-dimension sweep / focus on flagged dimensions
    - GapSeverity: critical / planned / monitor
  GUARDS: [
    Every dimension has a defined, tracked metric before analysis,
    Security and compliance gaps are never silently dropped — each is
      logged with a disposition,
    The analysis is peer-reviewed by the PM team before the scorecard is
      published,
    Monthly readings roll up into the quarterly scorecard
  ]
  NEXT: Journey 5 (improvement stories into backlog); quarterly scorecard
        to leadership
```

---

## Cross-Journey Patterns

The eight journeys share a set of recurring structural patterns. Understanding these helps reason about how the product function operates as a system.

### Competitive-Intelligence Cadence

Journeys 1–3 form a nested cadence: an **annual** foundation (identify competitors) feeds **quarterly** refresh loops (comparison, pricing). The register built once per year is the shared spine; the quarterly journeys never start from a blank page because they inherit it. Trend value comes from disciplined dating — every company-size figure carries its as-of date and source, and stale figures are flagged rather than silently reused as current.

### Discovery → Delivery Handoff

Journeys 4 and 5 are a two-stage funnel from intent to buildable work: a PRD defines the problem and success criteria (the *what* and *why*), then story writing decomposes it into acceptance-criteria-bearing stories (the *how much* and *done*). The guard "no spec, no build" and "no story without acceptance criteria" make each stage gate explicit, so scope is an agreement rather than an inference.

### Metrics-Driven Discovery Loop

Journeys 6, 7, and 8 form a closed loop: instrumentation (6) produces the user-facing product-analytics data that CEP (7) consumes and that EPSVS (8) draws on alongside system telemetry from R&D / observability and audit inputs, and both analyses emit improvement EPICs that re-enter delivery via Journey 5. The loop only works if instrumentation coverage is complete — which is why Journey 6's guard is a hard 100% on key flows. CEP watches the *user-facing* experience; EPSVS watches the *system* qualities; together they cover both halves of product health.

### Design-Review Gate

Journeys 4, 5, and 7 all pass UX-bearing work through a Design review before it is committed. This gate is consistent across the discovery and delivery journeys: mockups are reviewed with Design at spec time (4), at story time (5), and when converting CEP findings into improvements (7). It prevents UX decisions from being made implicitly inside implementation.

### Peer-Review Gate

Journey 8 routes findings through a PM-team peer review before they are published or acted on. Because severity calls and metric interpretations are judgement-heavy, the peer review is the mechanism that keeps individual bias out of prioritisation.


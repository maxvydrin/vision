# Studio: Collaboration through comments — business requirements

Capture **how we want comments and collaboration to work in Studio** — at the business-requirements level, before designing the implementation. 
## 1. Why we need this (the problem)

- In Figma we had collaboration: click a piece of the mockup → leave a comment → mention a person → create a task. When we move to prototypes / vibe-coding, all of that **disappears**.
- The discussion is scattered across tools: the designer comments in Figma, the developer replies in GitHub, the PM writes in Slack, the final decision is made in a meeting and **recorded nowhere**.
- The PM does a lot of manual work: records a walkthrough video with voice-over → cuts it into screenshots → lays them out in Miro → writes a problem under each → creates a ticket. We want to automate this.
- A comment often loses its context. Screenshots go stale on top of that.

**Team's conclusion:** commenting is a valuable, standalone thing (it could even be sold separately). We need to think it through **now**, so the 3-month MVP doesn't close the door to comments on video, audio, 3D, and different screens.

## 2. Principles

1. **A comment works the same way on any material** — on text (PRD/Vision), a prototype, a visual, audio, video, a live product. For the user it's one and the same tool; only the thing it's attached to changes.
2. **Collaboration lives both in the tools and in Studio.** We don't forbid commenting in Figma/GitHub/Slack. Studio is the **primary home of the conversation**: it pulls the discussion in from connected tools and keeps it in sync both ways (matches the Product Domain Model, §6.5). We do not claim Studio is the only place.
3. **A comment isn't lost when the material changes.** Like in Figma: the comment stays on top of the current version instead of going stale with a screenshot.
4. **Manual first, automation later.** First describe the real review flow and let people comment by hand; layer automation (turning video into tasks, etc.) on top of it, not instead of it.
5. **Nothing decided should "vanish into thin air."** Everything discussed — in a comment, a task, or a meeting — must settle into the artifacts.

## 3. What a comment must be able to do (basics)

- Be attached **to a specific element**, not "to the whole document" — and point to the same place for both the author and the reader.
- Form a **thread**: replies, @-mentions of people, reactions.
- Have a clear lifecycle: **open → in discussion → resolved → reopened**.
- **Who closes the thread matters:** if someone other than the person who opened it closes the thread, the author gets a notification and can reopen it in one click. For important discussions — a "proposed to close" mode that needs the author's agreement.
- Respect **access rights**: whoever can see the material sees the comments; only the author can edit their own comment; in some places commenting can be disabled entirely (read-only).

## 4. What you can comment on (modalities)

| Material | What must work |
|---|---|
| **Text / PRD / Vision** | Comment on a specific paragraph/block, thread, mentions. |
| **Prototype / vibe-code** | Hover an element → it highlights → leave a comment right on it (like inspect in a browser). |
| **Visual / mockup** | A pin comment anywhere on the canvas, attached to an object. |
| **Audio** | Comment on a segment of the recording (by timecode). |
| **Video** | Comment on a moment/segment of the video and on a specific spot in the frame. |
| **Live product** | Comment right on the running site/app (find a problem → select → write), with context attached automatically (see §7). |
| **Meeting** | The discussion and decisions from a meeting are also material for comments and for linking to artifacts (see §10). |

**Different screens (desktop / mobile / watch).** The same prototype renders differently on different screens. A comment must be able to refer either to the element **on all screens at once** or **to a specific screen** ("it's cut off on the watch"). It's useful to see the screens side by side with a shared comment layer and to get a hint like "built for one screen only, no adaptation for the others."

## 5. Stability of the attachment

- A comment **moves** with the element when the material is edited, and stays on top of the current version.
- If the element changed or disappeared, the comment is **not deleted**: it's marked as "lost its context," shown separately together with a snapshot of what it was attached to, and can be re-attached by hand.
- Comments are **versioned together with the material**: you can see the discussion history across versions. This is a product requirement — it **must not be constrained by the limits** of the versioning engine we build on (Git, etc.); the technical "how" is up to the engineers, but the functionality (images, audio, video, resolve, notifications) must not be trimmed down to fit the engine.

## 6. How a comment turns into tasks (decomposition)

The idea: you leave a comment in whatever form is convenient — Studio helps turn it into tasks. Works for every form:

- **Text** — from the comment Studio proposes one or more tasks (bug / feature / improvement / question). Unrelated problems are split apart, duplicates are merged.
- **Audio** — transcribe to text, split by meaning, propose a task from each chunk. The transcript can be corrected before the breakdown.
- **Video** (fixes the PM's main pain) — Studio transcribes the voice itself, cuts the video into meaningful chunks and **grabs key-frame screenshots**, attaches each chunk to a spot in the interface, and proposes tasks. The layout of cards can be viewed as a board (Miro-like), only assembled automatically.

## 7. Linking to a task and an assignee (Actor)

- **Comment → task in one click** — like in Figma: click, write, mention, create a task. The task keeps a link to the source comment and its context.
- Each task is **attached to the material/element** it came from.
- **A task is assigned to an Actor — which can be either a human or an AI agent** (the term and model come from the Product Domain Model, §6.2/§6.4). For the user there's no difference in how you assign it: you pick an assignee, and it's either a person or an agent.
  - Every Actor has an **autonomy level**: what it may do unattended. A key Product Model rule — **an agent is never granted autonomous write-back**: an agent's output arrives as a **candidate** (a proposed change) that goes through validation and is approved by a human, rather than being applied silently.
  - **An assignee is suggested automatically** (owner of the material, whoever last edited that area, history of similar tasks) — it's a hint; who to assign, a human or an agent, is decided by a human.
- A task can be linked to a **release** (useful for the EM: how many bugs a release produced, what shipped, who came in with feedback).
- The **comment ↔ task link is two-way**: from the task you can see the source comment, from the comment you can see all the tasks it spawned.
- For a live product, **context is attached to the comment automatically** (browser and version, device, screen, page, and state if needed) — so a bug is reproducible and you don't start with "clear the cache, tell me your browser version."

## 8. Validation after a task is done

As soon as a task is done (no matter whether by a human or an agent), a **default validation flow runs automatically** — before the result counts as accepted. Aligned with the Product Domain Model:

- The result of the work is a **candidate** (a proposed change), not "the truth" right away. It goes through a validation **Workflow** made of **Validators** (a rule, a test, a model, or a human review) against **Quality Gates** ("no approved spec — no build").
- The outcome is a **Validation Status** (pass / fail / warning / retry / escalated / blocked) and, when there are problems, **Findings** (what didn't add up). Only after passing the gates and **approval** does the change become authoritative; for changes in an external tool it goes out as a governed write-back (the source stays the system of record).
- **The default set of checks comes out of the box** — these are the Product Model's guaranteed first-party workflows: traceability, gap analysis, stale-artifact, PRD-to-code validation, etc. A kit for a specific domain/organization can extend and configure this set.
- The author of the original comment and the person who created the task see the validation result in the shared feedback loop (§9): passed / failed and why.

## 9. How feedback is given

- The comment's author gets a notification: **"N tasks were created from your comment"** with links.
- The author sees the **status of their comments** (created / in progress / done / rejected) **without going into the tracker**.
- If a proposed task was rejected, the author sees **why** (closes the "why wasn't my point taken" gap).
- When a task is closed — a notification + a link to the result (what changed, the new version).
- The author can mark whether the system understood their comment correctly — this improves the breakdown and builds trust in the automation.

## 10. Notifications, inbox, and meetings

- **You shouldn't have to go into the product to learn about comments.** Notifications go outward (email, Slack/Teams/Zulip, in-app) and lead **straight to the relevant element**.
- **A unified inbox** — all comments that concern you in one place, with filters (mentions / assigned to me / unresolved / by project) and actions right from there (reply, close, reopen, make a task). You can reply straight from email/chat.
- **Meetings are first-class material.** People often comment, then decide otherwise in a meeting, and it's recorded nowhere. Studio should: take the transcript, pull out **decisions and action items**, attach them to specific artifacts (mockups, PRD, BRD), mark the comments the meeting overrode, and point out: **"you decided X, but it's not in the Vision/PRD"** — with a suggestion to add it (on confirmation). Meeting notes are assembled from the meeting.

> Meta-note from the call: this very conversation is already a Studio flow. Ideally Studio would attach the discussion to Denis's mockups and to the BRD, run through the artifacts, and say what's missing from the Vision.

## 11. What matters for the MVP

- Comments on **text and prototype** (the first modalities) with element-level attachment, threads, statuses, and the resolve flow with author disagreement.
- A comment is **not lost** when the material's version changes.
- A **unified inbox** and outward notifications with a link to the element.
- **Comment → task** in one click, the task assigned to an **Actor** (human or AI agent), two-way link.
- A **default validation flow** after a task is done (validators + quality gates → approval), out of the box.
- Collaboration **both in Studio and in the connected tools**, kept in sync.
- The architecture is designed so that **video, audio, 3D, and different screens can be added later without a rebuild** — even though they aren't implemented now.

## 12. Open questions

- How deeply we sync external tools in the MVP (two-way with GitHub/Slack) vs. later.
- Which automation mode for the breakdown we ship as the default in the first release.
- What's the priority after "text + prototype": video (the PM's pain) or meetings (lost decisions).
- Exactly which set of Validators/Quality Gates we include in the default validation flow at the start.

---


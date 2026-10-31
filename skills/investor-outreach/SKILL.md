# Investor Outreach — Mallow

Run investor outreach for **Mallow** (consumer personal AI assistant; company brand AgentPod; legal entity **Vibe Technologies, LLC**, Seattle, 100% Den, bootstrapped, $0 raised): research why we win, keep the investor register in order, draft and (only through the gates below) send outreach via Gmail and LinkedIn, log every touch, handle replies.

Standing order: Den, 2026-11-01. Conversation-handling rules (reply tracking, signatures, escalation) live in `local_startup_conversations` (`~/workspace/custom-skills/local-startup-conversations/SKILL.md`) — follow it; this skill adds the investor pipeline on top and does not restate it. Traction pulls follow `agentpod_admin`. Accelerator submissions are OUT of scope (per-program go-ahead only, see `accelerator_applications`).

## The gates (read before any send — these outrank enthusiasm)

1. **Founder approves exact recipient + exact text before any send.** Written into the register DB itself and the template page. No approval = draft only. This gate has no pilot exception.
2. **LinkedIn: drafts only, NEVER send** (Den's hard rule, in `local_startup_conversations`). Prepare the text; Den sends from his signed-in session himself, or it doesn't go.
3. **No links unless the founder approves that exact link for that recipient** (template page rule).
4. **Pilot rule:** when a batch is approved, send 2–3 first, verify each in Gmail Sent, log the same hour, report to Den/orchestrator before scaling.
5. **Never mark a row Passed or Invested without an evidence link** (DB rule). Never accept an intro, call, or terms yourself — anything committing Den's time or money escalates the same day.
6. Check `~/workspace/startup-conversations/reply-ledger.md` before contacting anyone: if a live thread exists, no cold template ever goes on top of it.

## Notion map (all links verified live 2026-11-01)

| What | Where |
|---|---|
| **Investor register (the operating list + log)** | DB "Investor Outreach — Mallow" — https://app.notion.com/p/4d1e9612c40e46c6a974178a6fab7437 · data source `collection://cc7a329f-c748-42b6-9a2f-40f4b3084dc8`. One row per investor: Investor (title) · Firm · Contact · Role · Email · LinkedIn · Channel (LinkedIn/Gmail/Telegram/Intro/Friends) · Pipeline status (Not contacted / Contacted / Replied / Call scheduled / Call done / On hold / Passed / Invested) · Reply sentiment (agent-computed, separate from status) · Product (Mallow / Vibe Browser) · Interest tags · Intro source · First/Last contact · Next follow-up · Follow-up count · Next action · Legacy note · Deck version · Objection tags. |
| **Message template + send rules** | "Investor Outreach Template — Mallow" — https://app.notion.com/p/406ac25eb49f814db3c2c0c8791a6de1 |
| **Advantages ("why we win")** | "Why Mallow Wins — Advantages (verified 2026-11-01)" — https://app.notion.com/p/40aac25eb49f812592cefdb1a0bbd9f4 (child of the hub; refresh the date + claims on every reuse) |
| **Hub** | "Fundraising & investors" — https://app.notion.com/p/3b6ac25eb49f81318787d7f56504ff16 · Open structural items recorded there: LLC vs Delaware C-corp undecided (needs a decision before a term sheet); no cap-table document exists. |
| **Legacy investor table (history only)** | "Investors" — https://app.notion.com/p/296ac25eb49f80788295ebb8c2771aea · Vibe Browser era (last edited 2025-12-10); its 10 rows are migrated into the register with Product=Vibe Browser and "legacy only" next actions. Do not re-pitch a legacy row for Mallow without a new angle or founder confirmation — each row's Next action says which. |
| **Scoring scratch DB (not the register)** | "Investor outreach" — https://app.notion.com/p/406ac25eb49f81799c51dacd59217853 · 2 rows (a test row + Gradient Ventures draft, 2026-10-27). Ignore for pipeline work. |
| **Mallow PRD** | https://app.notion.com/p/404ac25eb49f81f18b9df1c115bdfd9f · Technical Design: https://app.notion.com/p/404ac25eb49f81b6a0b5fdf2b504b599 |
| **Pitch deck** | Current: `~/workspace/investor-outreach/mallow-v2-deck.html` (7 slides; comparison vs Muse / Grok Bot / Dots / Instinct). Prototype: `~/workspace/investor-outreach/mallow-app-prototype.html` — its Muse-storage public link EXPIRES (last issued 2026-11-02 06:01 PT); re-upload before any use, and get the link approved per recipient (gate 3). Older AgentPod deck page: https://www.notion.so/28bac25eb49f8181a4d4e48c2b47e982 (AgentPod-era, not the Mallow v2 narrative). |
| **Target research** | `~/workspace/investor-outreach/investor-targets.md` (researched 2026-10-14: Tier 1/2/3 with thesis fit + contact paths). Tier 1 is already seeded into the register; Tier 2/3 are not — add rows as they enter the pipeline. |
| **Traction sources** | Users tracker (Notion, data source `collection://3ecac25e-b49f-809c-9023-000b4e56df14`) via `agentpod_admin`; **Stripe is the only revenue truth**. |

Register state at skill creation (2026-11-01): 21 rows — 11 Mallow (Tier 1, all "Not contacted") + 10 legacy Vibe Browser. Zero Mallow outreach has ever been sent.

## Why we win — verified claims (checked 2026-11-01, official pages only)

Use these; re-verify every competitor line from the vendor's own page before reusing it (pages change; the advantages page carries the sources + date).

1. **Self-modifying core.** Hermes "modifies itself (installs and edits its own skills mid-conversation)" — Mallow PRD, verbatim. Mallow also runs OpenClaw runtimes; per-user isolated containers. Contrast: Muse "figures out which **built-in** skills it needs" (ai.meta.com/muse FAQ — it selects, it does not author); Dots learn from feedback; Grok Bot saves a *demonstrated* path as a skill (closest rival — never writes code); Instinct states no skills concept.
2. **Profiles = a team, not a chatbot.** Named agents with own role/skills/memory on the Hermes/OpenClaw runtimes. Proof, not promise: we operate an 11-profile Hermes team in production on this stack daily. Do NOT claim uniqueness — Grok Bot ships named coordinating bots; Dots promises teams "over time". Our edge: profiles on open runtimes, hosted per user, proven in our own operation.
3. **Telegram-native + hosted.** Live today in Telegram + web console; keeps working while the user is offline. None of the four rivals is on Telegram: Muse = Meta's apps/web + WhatsApp; Dots = ChatGPT + Slack + Teams ("texting coming soon"); Grok Bot = Cursor desktop/mobile apps; Instinct = text/call (iMessage, SMS, WhatsApp), invite-only, no public price.
   **Precision rule:** Slack/WhatsApp reach Mallow via *owner-configured Hermes connections* (manual setup; WhatsApp = self-chat scope). The consumer UI honestly shows them "Coming soon" until the one-tap path is proven (PRD). Never pitch them as live consumer channels. **Discord is in the deck's messenger row but is NOT in the PRD — do not assert it until the founder resolves the discrepancy.**
4. **Acceptance-gated completion.** A Hermes goal closes only after an acceptance check of the finished work, not when the agent says "done". Dots' auto-review checks actions *before* they run (official page) — pre-action review is table stakes; post-work verification is the gap.
5. **Phone connectors — ROADMAP, always labeled.** Files / location / notifications / SMS as permission-gated connector tools are specced in the PRD (Mallow v2 native app section, added 2026-10-31) and prototyped — **not built**. No rival's product page states a tool reading the user's own phone (phrase it as "their page does not state", never "they can't").

**Cut claims (verified false — never resurrect):** "Instinct is WhatsApp-only" (it's iMessage/SMS/WhatsApp/calls) · "Muse is one channel" (apps + web + WhatsApp) · "Slack/WhatsApp/Discord are live Mallow channels" · "Only Mallow has agent teams".

## Honesty floor (non-negotiable)

- Mallow revenue: **$0**. No paying subscribers. (Standing Stripe-verified fact; the one "Pro"-labeled tracker row is explicitly unverified in Stripe.)
- Traction, latest pull 2026-11-01 (Users tracker): **7 active users** (handle + provisioned agent), **14 accounts**. Re-pull before quoting; date every number.
- **$0 raised, bootstrapped.** Never claim a raise, a term sheet, or investor interest that isn't a register row with evidence.
- Live since Feb 2026 · $100/mo Unlimited personal · free 3-day trial · raising pre-seed to prove people pay.
- Founder: Dzianis Vashchuk — ex-Coinbase Sr. SWE, Chainlink Member of Technical Staff; solo founder, 100% owner.

## Message system

- Source template: the Notion template page (above). Rules: **≤60 words; one thesis, one proof, one ask** (the ask = a 20-minute guided demo / intro call); no adjectives (no empowering/seamless/revolutionary/unlocking/cutting-edge/next-gen/world-class/game-changing); no invented anything.
- Personalization: warm/neutral prior contact → first line names the actual prior topic (from the row's Legacy note). No prior contact → first line is the firm's focus in one clause, no flattery. Cold/Passed rows: do not re-pitch unless Den names them.
- First touch carries **no attachment**; the deck is sent only when a genuine thread asks for materials. One demo/prototype link max, and only with per-recipient approval (gate 3).
- Sign investor mail **"Dzianis"** + Vibe Technologies, LLC. Gmail sends go from dzianisvv@gmail.com via the Gmail connector; log the send in the reply ledger the same turn (`local_startup_conversations` discipline).
- Current pilot drafts (2026-11-01, NOT sent, gate 1 + LinkedIn-only route): Matthew Chen (NPU Ventures) and Leo Lu (Foundation Capital) — texts live in their register rows and `~/workspace/investor-outreach/notion-run-2026-11-01/pilot-drafts.md`.

## Bookkeeping (every touch, same hour)

1. Register row updated: Pipeline status, Last contact, Follow-up count, Next action (concrete + dated), Reply sentiment when a reply lands. Drafts prepared → put the draft text in the row body and say so in Next action.
2. Gmail sends also go into `~/workspace/startup-conversations/reply-ledger.md`.
3. Replies: log + draft the answer per `local_startup_conversations`; terms, money, valuation, or anything committing Den's calendar beyond an intro call → escalate to Den the same day with a one-line recommendation.
4. A workstream state that lives only in a chat is not a state — if it isn't in the register, it didn't happen.

## Cadence

- Weekly: re-pull traction (Users tracker), scan register for stale Next actions, refresh the advantages page if any competitor page changed.
- Per send batch: gates → pilot 2–3 → Sent verification → log → report → scale only on the report-back.

# Roadmap — maxwellhandler.com

> Build order and phase status. Product decisions live in [`PRD.md`](PRD.md); this file assumes them.

---

## Build order

The v12 homepage is live. Work from here is incremental, so there is one open-ended phase. Add a new phase here (and a matching GitHub milestone) when a larger, bounded piece of work comes up, such as a redesign.

### Phase 1 — Ongoing site polish

Content updates, placeholder fills, and design and accessibility polish on the live single page.

**Done when:** never closed as a whole; each issue in it is done when merged to `stage`, checked on the Netlify preview, and promoted to `main`.

**Milestone:** `Ongoing - Site polish`

---

## Current status

Active phase: **Ongoing - Site polish**.

```bash
gh issue list --milestone "Ongoing - Site polish"
```

---

## How to iterate

Check every change on the Netlify staging site at 375, 768, 1280 and 1440px before promoting it.

Never ship a fix that hasn't been observed working, and say plainly when a fix is inferred rather than confirmed, so the next session targets the right thing instead of confirming a guess.

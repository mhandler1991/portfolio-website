# maxwellhandler.com — branching, deploy and sync workflow

> The developer ↔ Claude loop: how code moves from a feature branch → `stage` → `main`, what's automated, and exactly what to tell Claude at each step.

---

## 1. The big picture

```
main    ── production (GitHub Pages, maxwellhandler.com)
  ▲
  │  PR (stage → main) + tag          👤 you merge, ⚡ /promote opens it
  │
stage   ── integration (Netlify, maxwellhandler.netlify.app)
  ▲
  │  PR (feature → stage) + merge     ⚡ /start opens · 👤 you merge
  │
feature/<issue>-<slug>
```

🚫 Never commit or push directly to `stage` or `main`. Everything goes through a branch and a PR.

📌 **`stage` is the repository's default branch, deliberately.** GitHub auto-closes an issue only when a PR merges into the default branch, and every feature PR targets `stage`. It also keeps `stage` safe from delete-branch-on-merge when a `stage → main` PR merges. GitHub Pages still builds from `main`; the Pages source is a separate setting.

---

## 2. Automated vs. manual

| Thing | Status | Notes |
|---|---|---|
| Whitespace / conflict-marker check | ⚙️ `git diff --check --cached origin/stage`, run by `/start` after staging; `/promote` checks `origin/main origin/stage` | No CI; there is no build, lint or test tooling (PRD P1) |
| Staging deploy | 🚀 Automatic, Netlify on push to `stage` | |
| Production deploy | 🚀 Automatic, GitHub Pages on push to `main` | |
| Visual check at 375, 768, 1280, 1440px | 🧑‍💻 Manual | Layout and the red-pencil marks can only be judged by eye |

---

## 3. Standard feature loop

`/start` runs end to end through "PR is open": implement, self-review against acceptance criteria, prohibition sweep, checks with real output reported, commit with the reasoning in the body, push, open the PR. There is no separate ship step (why: [`RATIONALE.md`](RATIONALE.md) R1).

| # | Step | Who | Say this |
|---|---|---|---|
| 1 | Start (implement through PR) | 👤→⚡ | `/start {issue}` |
| 2 | Merge into `stage` | 👤 | — |
| 3 | Sync | 👤→⚡ | `/merged {pr}` |
| 4 | Check the Netlify preview | 👤 | — |

**This table is the single source of truth for the loop.** `commands.md` links here rather than reproducing it.

📌 **Workflow intensity** is `solo-trusted` (`CLAUDE.md` §3): `/start` may bundle small related or dependent issues, and `/batch-issues` works independent ones back-to-back. Neither touches step 2. You merge every PR.

📌 **Repo setup requirement:** delete-branch-on-merge is on. Without it, `/merged`'s prune step runs clean and deletes nothing, with no error.

📌 Anything more than a couple of prompts to implement and verify gets its own issue, filed with `/new-issue`.

---

## 4. Promote to production

Run `/promote` (or say "promote stage → main"). It opens the `stage → main` PR; you merge it and tag the release (`v12.{patch}`, continuing the homepage version). Tags are the rollback handle.

---

## 5. Testing before you promote

Open the Netlify staging site and check the changed sections at 375, 768, 1280 and 1440px, with reduced motion both on and off if the change touches `js/home.js`. Hard-refresh if the change doesn't show; Netlify usually deploys a minute or two after the merge.

---

## 6. Gotchas

- Opening `index.html` from disk blocks the self-hosted fonts, so text falls back to system fonts. Use `python3 -m http.server 8000`.
- `main` collects merge commits from each `stage → main` PR, so `git log origin/stage..origin/main` is never empty. That's expected, not drift.

---

## 7. Issues, milestones, branch naming

📌 **The audit log.** `/merged` posts to the `audit-log`-labeled issue (#15) every cycle. Most findings govern this project; ones tagged `kit candidate` apply to project-kickoff itself and are reviewed manually. The issue body holds the format.

- Milestone: `Ongoing - Site polish` (from [`ROADMAP.md`](ROADMAP.md)).
- Branches: `feature/{issue}-{slug}`, or `feature/{slug}` with no issue.

📌 **"Current phase"**, wherever it's referenced in `.claude/skills/`, means whatever `ROADMAP.md`'s "Current status" names.

---

## 8. What to tell Claude

| Moment | Say this |
|---|---|
| Starting (through PR) | `/start {issue}`, then anything broken or delicate |
| Starting several small related issues together | `/start {issue} {issue} ...` |
| Starting, no issue | "Branch off stage for `<thing>`, no issue" |
| New work discovered | `/new-issue {description}` |
| Working a batch of independent issues | `/batch-issues {milestone or issue list}` |
| After merging | `/merged {pr}` |
| Releasing | `/promote`, or "promote stage → main" |
| Checking the doc set | `/audit-docs` |
| "What commands do I have?" | `/commands` |

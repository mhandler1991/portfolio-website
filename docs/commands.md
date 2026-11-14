# Commands — cheat sheet

> Source: [`.claude/skills/`](../.claude/skills/). Full mechanics in [`workflow.md`](workflow.md) §3 · standards in [`../CLAUDE.md`](../CLAUDE.md).
>
> These are Claude Code **skills**. Every one below with a side effect is set to `disable-model-invocation: true`, so Claude runs it only when you type it.

---

## The loop

```
/start {issue}  →  implement, self-review, sweep, checks, commit, PR  →  👤 merge  →  /merged {pr}  →  👤 check Netlify
```

⚠️ **`/merged` takes the PR number. `/start` and `/new-issue` take the issue number or a description.** Easiest mistake to make.

---

## `/start {issue} [{issue} ...] [anything broken]`

*In plain words: picks up one or more tickets, builds them, checks its own work, and opens a pull request for you to review.*

Loads the issues and repo state, reads `PRD.md`/`ROADMAP.md` plus the docs `CLAUDE.md`'s map says apply, branches `feature/{issue}-{slug}` off `stage` (resuming if it exists), implements, self-reviews each issue's criteria, runs the prohibition sweep and `git diff --check`, commits with the decisions in the body, pushes, and opens the PR into `stage` (`Closes #N` for every issue). Text after the numbers is context.

## `/merged {pr}`

*In plain words: after you merge, it tidies up and writes down what shipped.*

Confirms the PR merged (via GitHub, not local git), syncs `stage`, deletes the merged branch, finds which issue it closed from the PR text, files any follow-ups first, then posts the completion record and an audit-log entry. Idempotent.

## `/promote`

*In plain words: opens the pull request that sends tested work from `stage` to production. You merge and tag it.*

## `/new-issue {description}`

*In plain words: turns a rough idea into a properly written ticket.*

Writes Purpose, User story, Description, Acceptance criteria, Depends on / Blocks, and a suggested Effort / Model / Command style (Claude's suggestion; you override).

## `/batch-issues`

*In plain words: works through a pile of independent tickets without checking in between. You still review and merge each one.*

- `/batch-issues Ongoing - Site polish`: every eligible open issue in that milestone
- `/batch-issues 12 15 18`: exactly those issues
- `/batch-issues`: the milestone `ROADMAP.md` names as current

Issues that build on one another belong in one session instead: `/start 12 15 18`.

## `/audit-docs`

*In plain words: checks the docs and commands for drift and hazards, and reports; it changes nothing unless you say so.*

## `/commands`

*In plain words: lists this project's commands and what each does.* For Claude Code's built-ins run `/help`; for every installed skill run `/skills`.

---

## What stays manual

| Step | Why |
|---|---|
| Merging any PR | You review, you merge |
| Tagging a release | The rollback handle, deliberately not automated |
| Visual check at four widths on Netlify | Layout and hand-drawn marks can only be judged by eye |

---

## Working without an issue

`Branch off stage for <thing>, no issue`. Branch naming drops the number: `feature/{slug}`.

---

## Fixing a command

They're markdown files in `.claude/skills/<name>/SKILL.md`, version controlled like anything else. Fix a wrong ritual in a PR. If you change how arguments or a tool's fields behave, confirm the new behavior with a real throwaway test first.

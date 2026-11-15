---
description: Check this project's docs and skills against the project-kickoff standard — drift, missing gates, injection and permission hazards, ticket shape, stale roadmap
argument-hint: [optional — focus area, e.g. "just the skills"]
allowed-tools: Read, Grep, Glob, Bash(gh issue list:*), Bash(gh issue view:*), Bash(gh pr list:*), Bash(gh pr view:*), Bash(gh api --method GET:*)
---

# Doc set audit

$ARGUMENTS

(Empty means audit everything. If a focus is given, narrow to it but still flag anything clearly broken.)

## What to check

**Docs**
1. **Duplicated facts.** The same specific claim in more than one file. Name the files and which should own it.
2. **Root vs `docs/`.** Only `README.md`, `CLAUDE.md` and `LICENSE` belong at root.
3. **`CLAUDE.md` restating instead of routing.** Anything that duplicates `docs/workflow.md`, `DESIGN.md`, `DATA-MODEL.md`, `DEPLOY.md` or the PR template should be a pointer.
4. **Doc vs complexity.** A `DATA-MODEL.md` with no real schema, a `DEPLOY.md` with no quirks.
5. **`ROADMAP.md` vs milestones.** Compare phases to `gh api --method GET` on the milestones endpoint; flag any without a match, either way.
6. **Missing structure.** A phase without a done-when bar, no principles section in the PRD, no doc map in `CLAUDE.md`.
7. **Command-set drift.** `docs/commands.md` and `CLAUDE.md` §11 must list every skill in `.claude/skills/` and nothing removed.
8. **Inline justification.** A skill read every session or cycle (`start`, `merged`) carrying paragraph-length "why" that belongs in `docs/RATIONALE.md` behind a short pointer.
9. **Prohibitions without a source.** Every `CLAUDE.md` §12 rule must cite the PRD line or dated owner decision it derives from, and that source must still say it. A rule that can't name its source is an invention; ask the owner.
10. **Unmarked claims.** In `DESIGN.md`, a mitigation or safety claim that doesn't say whether it was observed or assumed.

**Skills**
11. **Side effects without `disable-model-invocation: true`** on a skill that branches, pushes, deletes, files an issue or opens a PR.
12. **A `.claude/skills/ship/` directory.** An error, not a style note: a kept-but-unused command is still loaded and listed every session (`docs/RATIONALE.md` R1, R5). Delete it.
13. **Injection hazards.** An injected command (the bang-backtick form) must be one plain command with no shell-special character: `* ? [ ] " ' ( ) { } | & ; < >` or a command substitution. One bad character aborts the whole skill silently (an unquoted glob did, on zsh). The first-argument and full-argument-string variables are the only exceptions. Live commands in the body may be chained with `&&` only when every part is individually allowed, and not at all for a ticket marked `Command style: strict`.
14. **Command vs grant mismatch.** For every injected and live command, its first tokens must match an entry in that skill's own `allowed-tools`. Editing a command's opening words can silently drop it out of its grant, so check each one mechanically.
15. **Substitution tokens in prose.** Every occurrence of the argument variables in a skill body is replaced at invocation, including in explanatory sentences. They belong only where you want the value inserted (a heading, an injection, a code block or code span). Never in a sentence that merely describes the mechanism: there, say "the first argument" or "the full argument string".
16. **Un-probed argument indexing.** Skills using positional arguments must match the installed Claude Code version's confirmed behavior; flag any skill generated against an unconfirmed version.
17. **Field-name trust.** A structured field relied on for a factual answer (for example a closing-references field) instead of the raw text it derives from, with no observed evidence.

**Records and gates**
18. **A documented gate with no forced trigger.** A sweep, review or record step on a command that isn't the one that always runs. Cross-check evidence: do closed issues and PRs actually show the step happened?
19. **A silent no-op cleanup.** A prune or delete step whose precondition (a repo setting) isn't satisfied, for example delete-branch-on-merge off.
20. **A non-idempotent record write.** Anything that posts a comment or label without first checking for its own earlier output; or a write followed by a chained fallback write.
21. **Reconstructed reasoning stated as recalled,** and **Claude-posted text with no "Authored by Claude." line.**
22. **Missing or stale audit log.** An `audit-log` issue should exist and track merged PRs with `## Cycle #{PR}` entries (no-issue PRs included). A project that predates the feature has none; offer, don't flag as a bug. Report how many `kit candidate` findings are waiting (the review itself stays manual).

**Tickets and permissions**
23. **Ticket shape.** `.github/ISSUE_TEMPLATE/feature.md` should have Purpose, User story, Description / context, Acceptance criteria, Depends on / Blocks, and Effort / model. Flag open issues missing "Depends on" or with a criterion that is a literal command rather than a property.
24. **Headless readiness.** If the project runs unattended or headless sessions, `.claude/settings.json` needs scoped file-editing grants (an all-`Bash` list is silently useless there), and the run must check `permission_denials` rather than trusting "completed".

**Kit**
25. **Kit version.** Compare the version stamped in `CLAUDE.md`'s header with the installed kit's `~/.claude/skills/project-kickoff/VERSION` (outside the project; if it can't be read, say so) and report whether this project was generated by an older kit. That folder's `CHANGELOG.md` lists what changed since.

## Report

Concrete: the file and what's wrong, with a confidence from 1 to 10 where a finding rests on inference. Then ask whether to fix what you found rather than fixing unprompted; some items (4, 9) are judgment calls. End with "Authored by Claude."

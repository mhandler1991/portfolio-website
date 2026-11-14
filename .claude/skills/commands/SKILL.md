---
description: List this project's own .claude/skills/ commands and what each one does
allowed-tools: Bash(ls:*)
---

# This project's commands

!`ls -1 .claude/skills/`

Read each `SKILL.md` listed above with your Read tool. For each one except `commands` itself, report:

- `/{name}`: its `description` field
- whether it is `disable-model-invocation: true` (if so, "you invoke this; Claude won't run it on its own")

For Claude Code's built-in commands run `/help`. For every installed skill including bundled ones run `/skills`.

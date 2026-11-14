---
name: Feature
about: A unit of work tied to the build order
labels: owner:claude
---

## Purpose
Why this exists. Name the ROADMAP phase bar it moves, and whether it clears it.

## User story
As a {who}, I want {what}, so that {why}. (Internal tooling with no user-facing angle: write "None, internal".)

## Description / context
What's built or changed; links to the docs that own the facts.

## Acceptance criteria
- [ ] A property to verify, not a literal command, and one a broken implementation could not satisfy.

## Depends on / Blocks
Depends on: #N or None. Blocks: #N or None.

## Effort / model (a suggestion; the owner overrides)
Effort: XS | S | M | L. Model: haiku | sonnet | opus, with a one-line reason.
Command style: relaxed | strict. Strict if this touches untrusted input, permissions or auth, or irreversible operations; otherwise relaxed.

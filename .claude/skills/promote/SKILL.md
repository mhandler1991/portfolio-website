---
description: Open the integration-to-production promotion PR
disable-model-invocation: true
allowed-tools: Bash(git fetch:*), Bash(git log:*), Bash(gh pr create:*), Bash(gh pr list:*), Bash(git diff:*)
---

# Promote stage → main

## Before

- Fetch latest: !`git fetch origin --quiet`
- Recent history on stage: !`git log --oneline -10 origin/stage`
- Commits ahead of main: !`git log --oneline origin/main..origin/stage`

## Sequence

1. There is no CI. Confirm with the person that `stage` has been checked on the Netlify preview (maxwellhandler.netlify.app) before opening anything.
2. Run the check:
   ```bash
   git diff --check origin/main origin/stage
   ```
3. Open the PR from stage into main using the promotion shape in `.github/PULL_REQUEST_TEMPLATE.md`: a one-line summary of what's included and a reminder to tag after merge. End the body with "Authored by Claude."
4. Do not merge or tag it yourself. Report the PR URL and stop, in two or three plain sentences.

After you merge: tag the release (`v12.{patch}`) and push it with `git push origin main --tags`. Tags are the rollback handle, so this is deliberately manual.

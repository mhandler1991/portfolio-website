## [#{issue}] {Issue title}

Closes #{issue}

### What
- {what was implemented}

### Decisions and what was rejected
<!-- Facts only; seeded from the commit body. -->

### Interpretation (opinion, editable)
<!-- Anything uncertain or contested about why. -->

### Files changed
- `path`: new / modified

### Checks
- [ ] `git diff --check --cached origin/stage` clean, run after staging (output quoted, written after it ran)
- [ ] Checked locally at 375, 768, 1280 and 1440px
- [ ] Values come from `css/tokens.css`, no inline styles
- [ ] Copy rules: curly quotes, → and ↗, no em dashes
- [ ] Docs updated if a product or design decision changed

<!--
Promotion PR (stage → main, opened by /promote) uses this shorter shape instead:

## Promote stage → main
One line: what this release includes.
- [ ] Checked on the Netlify preview
- [ ] Tagged after merge (v12.{patch}, docs/workflow.md §4)
-->

_Authored by Claude._

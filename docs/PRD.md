# PRD — maxwellhandler.com

> Product decisions only. Build order and status: [`ROADMAP.md`](ROADMAP.md). How code ships: [`workflow.md`](workflow.md). Design and architecture detail: [`../README.md`](../README.md).

---

## 1. What this is

Maxwell Handler's personal site: one page that shows how he works, what he has built, and his career, for hiring managers, collaborators and peers.

### What it is not

- Not a blog or a CMS. There is no post list, feed or authoring flow.
- Not a web app. No accounts, forms that store data, or backend.
- Not a multi-page site. The archived previous site under `archive/` is kept for reference, not extended.

---

## 2. Why it exists

A resume says what someone did; it doesn't show how they work. The page puts the working method, the builds and the lessons from each in one place a reader can scan in a couple of minutes.

---

## 3. Principles

> These decide arguments. When a feature conflicts with one of these, the principle wins.

1. **P1. Static and dependency-free.** Plain HTML, CSS and vanilla JavaScript, with no build step, framework, package manager or CSS library. Why: nothing to install or upgrade, and the site loads fast and ages well.
2. **P2. Tokens, not raw values.** Every color, size, space, radius and timing value comes from `css/tokens.css`. Why: the hand-edited look depends on a small, consistent set of values.
3. **P3. Accessible by default.** Text contrast of at least 4.5:1, visible focus rings, adequate tap areas, and reduced-motion respected (full list in `README.md` "Accessibility"). Why: a portfolio that excludes readers undercuts its own claim.
4. **P4. Copy rules hold everywhere.** Curly quotes and apostrophes, arrows → and ↗, and no em dashes. Why: the page is meant to read as carefully edited.
5. **P5. Production changes only through `stage`.** Every change is tested on the Netlify staging site before it reaches `main`. Why: `main` is the live domain.

---

## 4. Scope

### In scope

| Area | What |
|---|---|
| Content | The five sections described in `README.md` "What's on the page", including filling the pending-link placeholders |
| Design | Polish within the existing design language (tokens, red-pencil marks, one blue accent) |
| Accessibility and performance | Keeping the bars in P3 as content changes |

### Out of scope, permanently

- A build pipeline, framework or package manager (P1).
- Third-party trackers or analytics scripts that require a cookie banner.

### Deferred

| Item | Why deferred |
|---|---|
| Additional pages beyond the homepage | No content needs one yet; the single page is the product |

---

## 5. Success

**The bar:** a reader can understand how Maxwell works and what he has built from the homepage alone, on any screen size, with no broken or placeholder links in the sections they read.

Secondary signals:
- No pending “Soon” placeholders remain (`grep -n TODO index.html` is empty).
- The page renders correctly at 375, 768, 1280 and 1440px.

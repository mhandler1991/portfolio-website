# AI Lab — new standalone page

## Context

The portfolio site (vanilla HTML/CSS/JS, single page) needs a dedicated **AI Lab** page that showcases Maxwell's experience with AI tooling and the meta-story of how this very site was built using AI-assisted workflows. This is both a content addition and a positioning play — AI fluency is a hot topic across product/engineering hiring, and the page demonstrates the user is not just talking about it but building with it.

**V1 ships the page only.** The forward-looking competitor-analysis project (Brave search → Claude analysis → Claude Code site updates) is teased as "in progress" and built later in V2.

**Outcome:** A new page at `maxwellhandler.com/ai/` linked from the main nav via a CTA button styled like the existing Contact button. Page reuses existing site styles for visual consistency and adds only minimal new CSS.

---

## Approach

### Routing & file layout

- New page at **`ai/index.html`** — folder route gives the clean URL `/ai/`.
- All shared assets referenced with **root-absolute paths** on the new page: `/css/styles.css`, `/js/scripts.js`, `/assets/favicon.svg`, `/assets/profile.jpg`. This keeps the page resilient regardless of folder depth and works on both GitHub Pages and Netlify out of the box (no `_redirects` or `netlify.toml` needed).
- `index.html` remains as-is (relative paths preserved — it is at the root so they resolve correctly).

### Files to modify / create

| File | Change |
| --- | --- |
| `ai/index.html` | **Create** — new standalone page (see structure below) |
| `index.html` | Add `<a href="/ai/" class="nav-cta">AI Lab</a>` to `.site-nav`, immediately before the Contact CTA |
| `css/styles.css` | Add a small `.pipeline` block component (~30–50 lines) for the build-pipeline stepper. Reuse everything else. |

No JS changes — `js/scripts.js` already guards every selector with null checks (`if (!shell || !track) return;`, `if (heroPhoto && heroProfile)`, `if (!nav || !toggle) return;`), so it runs harmlessly on a page without hero photo / hero-tags / etc. The mobile nav toggle and `#year` footer stamp work identically on both pages.

### Page structure (`ai/index.html`)

Reuses the existing site shell — header, footer, container, section, `.btn`, `.section-title`, `.pillar-card`, `.skill-group/.skill-chips`, and `.timeline` patterns from `css/styles.css`.

1. **Hero** — short kicker ("AI · Tooling · Workflow"), title ("AI is in my workflow, not just my vocabulary"), one-paragraph manifesto on pushing comfort with AI. Reuse `.hero` + `.hero-bg` blobs minus the `.hero-profile` block.
2. **How this site was built** — horizontal pipeline stepper showing **Nimbalyst + Cursor → Claude → GitHub → Netlify (stage) → GitHub Pages (prod)**. Each step is a small card with an icon, label, and one-line role. New `.pipeline` component (CSS-grid, wraps gracefully on narrow viewports).
3. **AI tools I use** — three columns mirroring the existing `.skill-groups` + `.skill-chips` pattern:
   - **Daily driver** (e.g., Claude, Claude Code, Cursor, Nimbalyst, GitHub Copilot)
   - **Exploring** (e.g., Brave Search API, Notion AI, ChatGPT for research)
   - **On the radar** (e.g., MCP server building, agentic eval frameworks, vibe-coded ETL)
4. **Iteration log** — `.timeline` reused. Initial entries: "Site refresh (vanilla HTML/CSS/JS rewrite)", "OG/Twitter meta + favicon move", "AI Lab page launch". Designed to grow over time.
5. **What's next: competitor-intel agent** — single `.pillar-card`-style callout describing the Brave → Claude → Claude Code → site-update flow as **"In progress."** Sets the V2 hook without overpromising.
6. **CTA / contact** — reuse `.section-contact` pattern with one button back to home (`/`) and one to email.

### Nav changes in `index.html`

Add the new CTA link inside `<nav id="site-nav" class="site-nav">` (lines 26-33), placed immediately before the Contact link so both CTAs sit adjacent at the right edge:

```html
<a href="/ai/" class="nav-cta">AI Lab</a>
<a href="#contact" class="nav-cta">Contact</a>
```

The same nav block is mirrored into `ai/index.html`, with section anchors rewritten as `/#about`, `/#pillars`, etc. so they cross-navigate back to the main page. The `AI Lab` link on the AI page resolves to the current page (or can be omitted there — leaning toward keeping it for parity, since browsers treat `/ai/` as a no-op when already there).

### CSS additions (in `css/styles.css`)

One new section near the bottom of the file:

```css
/* Pipeline stepper (used on /ai/) */
.pipeline { display: grid; gap: 1rem; grid-template-columns: 1fr; }
@media (min-width: 720px) { .pipeline { grid-template-columns: repeat(5, 1fr); } }
.pipeline-step { /* card-like, reuses tokens (--bg-card, --border, --radius-md) */ }
.pipeline-step-icon { /* 2.5rem square, gradient bg, mirrors .pillar-icon */ }
.pipeline-arrow { /* chevron between steps on wide viewports, hidden on narrow */ }
```

Token reuse — no new design tokens added. Honors `prefers-reduced-motion` (no animation needed; pipeline is static).

### SEO / meta on the new page

- `<title>AI Lab · Maxwell Handler</title>`
- `<meta name="description">` — one-line summary of the page contents
- Canonical: `https://maxwellhandler.com/ai/`
- OG + Twitter Card tags mirroring the home page pattern (`og:url`, `og:image` pointing to `/assets/profile.jpg`)
- Same theme-color and favicon link

### Existing patterns to reuse (paths)

- Header/nav markup — `index.html:18-35`
- `.nav-cta` styles — `css/styles.css:175-185`
- `.hero` + blob background — `css/styles.css:267-325`, markup at `index.html:38-43`
- `.pillar-grid` / `.pillar-card` — `css/styles.css:665-728`
- `.skill-groups` / `.skill-chips` — `css/styles.css:975-1010`
- `.timeline` — `css/styles.css:735-972`
- `.section-contact` — `css/styles.css:1077-1133`
- Footer — `index.html:304-309`, styles `css/styles.css:1136-1158`
- Mobile nav JS (auto-applies) — `js/scripts.js:31-51`

---

## Verification

1. Restart the local PowerShell static server: `powershell -NoProfile -ExecutionPolicy Bypass -File "$env:TEMP\nimbalyst-static-server.ps1" -Root "C:\Users\mhand\Documents\Documents\Website\portfolio-website" -Port 8000`
2. **Home → AI Lab nav**: open `http://127.0.0.1:8000/`, click the new "AI Lab" CTA, confirm `/ai/` loads with full styling.
3. **AI Lab → Home nav**: from `/ai/` click each section link (About / What I do / Experience / Skills / Credentials / Contact) — confirm they navigate to `/` and scroll-snap to the right section.
4. **Mobile nav**: resize to <768px on both pages, open the hamburger, click links, confirm it closes and navigates correctly.
5. **Reduced motion**: toggle OS-level reduced-motion setting, reload `/ai/`, confirm hero blobs are static (existing CSS rule already handles this).
6. **Asset paths**: verify in DevTools Network tab that `/css/styles.css`, `/js/scripts.js`, `/assets/favicon.svg`, and `/assets/profile.jpg` all return 200 from `/ai/`.
7. **Meta tags**: `curl -s http://127.0.0.1:8000/ai/ | grep -E "(og:|twitter:|canonical)"` — confirm 11 lines (canonical + 6 OG + 4 Twitter).
8. **Visual diff**: `mcp__nimbalyst-mcp__capture_editor_screenshot` on `ai/index.html` to confirm rendered layout before requesting commit.
9. **Deploy preview**: push branch `stage` → confirm Netlify preview at `maxwellhandler.netlify.app/ai/` renders identically.

---

## Out of scope (V2+)

- Live competitor analysis pipeline (Brave Search API, Claude API integration, automated commit suggestions). Will need: API keys via Netlify env vars or a small Cloudflare Worker, a scheduled trigger, and a structured iteration log that the agent can append to. Plan separately.
- Backend / dynamic content of any kind. V1 stays fully static.
- Search-indexed iteration archive. Today's iteration log is hand-maintained markdown-style content; if it gets long enough to need filtering, revisit.

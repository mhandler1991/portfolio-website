# maxwellhandler.com

Personal site for Maxwell Handler, product manager in San Diego. I run a technical product team in fintech lending, and I build software with Claude.

- Production: [maxwellhandler.com](https://maxwellhandler.com) (`main`, GitHub Pages)
- Staging: [maxwellhandler.netlify.app](https://maxwellhandler.netlify.app/) (`stage`, Netlify)

## What’s on the page

One page, five parts, in this order:

| Section | Anchor | What it holds |
| --- | --- | --- |
| Header | `#top` | Status line, name, intro, resume and profile links |
| 01 How I work | `#how-i-work` | The thesis, a five-step workflow row, and eight cards describing the kit behind it |
| 02 Builds | `#builds` | Five projects, each with a meta rail (platform, dates, stack, links) and a story: lede, process, what worked, what didn’t |
| 03 Experiments | `#experiments` | Two smaller experiments and what each one taught me |
| 04 Journey | `#journey` | Career timeline, most recent first, and the full resume link |
| Footer | `#contact` | Contact buttons, email and location |

## Design

A plain homepage that looks edited by hand: white page, warm near-black type, one blue accent, and a small set of red-pencil marks (an underline, a redaction bar, a circle, a margin note) placed on specific content.

- **Tokens:** every color, size, space, radius and timing value is a CSS custom property in [`css/tokens.css`](css/tokens.css). Components use the tokens instead of raw values.
- **Type:** Geist for text, Geist Mono for labels and meta, Caveat only for the “try it!” note. All three are self-hosted.
- **Color roles:** blue (`--accent`) is for links, section numbers, the active step and the current role. Red (`--pencil`) always means “marked up by hand.” Yellow highlighter appears on two stats and on text selection.
- **Rules:** a black rule starts each section; light gray rules separate items inside a section.

## Architecture

Static HTML, CSS and vanilla JavaScript. There is no build step, framework, package manager or CSS library.

- [`index.html`](index.html) is the whole site: semantic markup (`header`, `main`, `section`, `article`, `footer`) with no inline styles.
- [`css/tokens.css`](css/tokens.css) loads first and holds the design tokens plus global rules (links, buttons, focus rings, phone menu visibility).
- [`css/home.css`](css/home.css) holds `@font-face` declarations and every layout and component style, written in a light BEM style (`.project__title`, `.timeline__row--current`).
- [`js/home.js`](js/home.js) (deferred) does two things:
  - **Workflow steps:** highlights steps 01 to 05 in turn, only while the row is at least half on screen, pauses on hover, stops after two cycles, and does nothing when the visitor prefers reduced motion.
  - **Phone menu:** at 640px and under, a Menu button opens the section links. It keeps `aria-expanded` in sync, and closes on a link click or Escape.

Layout breakpoints: 640px (compact top bar and menu) and 500px (Journey rows and the footer line stack). Builds entries switch from two columns to one on their own when the content column gets too narrow.

## Folder structure

```
.
├── index.html                 # The homepage
├── css/
│   ├── tokens.css             # Design tokens and global rules
│   └── home.css               # Fonts, layout and components
├── js/
│   └── home.js                # Step animation and phone menu
├── assets/
│   ├── favicon.svg
│   ├── profile.jpg            # Link-preview image (Open Graph, Twitter)
│   └── fonts/                 # Geist, Geist Mono, Caveat (woff2) + OFL licenses
├── archive/                   # Previous site, kept for reference (noindex)
│   ├── index.html             # Old homepage
│   ├── ai/index.html          # Old AI Lab page
│   ├── css/styles.css
│   └── js/scripts.js
├── nimbalyst-local/plans/     # Planning notes for the archived AI Lab page
├── CNAME                      # Custom domain for GitHub Pages
├── LICENSE                    # MIT (code)
└── README.md
```

The archived pages still load at [`/archive/`](https://maxwellhandler.com/archive/) and are marked `noindex`.

## Working on it

Run a local server from the repo root:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly from disk mostly works, but browsers block the self-hosted fonts over `file://`, so text falls back to system fonts.

Before shipping a change, check it at 375, 768, 1280 and 1440px wide.

### Filling a placeholder

Links and images that don’t exist yet render as a “pending link”: muted text with a “Soon” tag, not clickable. Each one has a `TODO` comment above it in `index.html` that names what’s needed:

```sh
grep -n TODO index.html
```

To fill a link, replace the `<span class="pending">…</span>` with a real link. External links open in a new tab:

```html
<a class="link-sm" href="https://…" target="_blank" rel="noopener noreferrer">Live ↗</a>
```

Copy rules: curly quotes and apostrophes (’ “ ”), arrows → and ↗, and no em dashes.

## Deployment

| Environment | Branch | Host | URL |
| --- | --- | --- | --- |
| Production | `main` | GitHub Pages | <https://maxwellhandler.com> |
| Staging | `stage` | Netlify | <https://maxwellhandler.netlify.app/> |

1. Branch from `stage` and open a pull request into `stage`.
2. Merge it, then check the Netlify preview.
3. Merge `stage` into `main` to ship to production.

The custom domain is set by [`CNAME`](CNAME).

## Accessibility

- Text contrast is at least 4.5:1 everywhere.
- Links outside running text have a 44px tap area; buttons are 48px tall.
- Every link and button shows a 2px blue focus ring; a skip link leads to the main content.
- Headings run h1 (name), h2 (sections), h3 (projects and experiments).
- Hand-drawn marks are decorative and hidden from screen readers. The redacted title reads as “codename lantern.”
- With reduced motion, the step animation and smooth scrolling are off.

## License

Code: MIT, see [`LICENSE`](LICENSE). © Maxwell Handler. Fonts: SIL Open Font License 1.1 (see [`assets/fonts/`](assets/fonts/)).

## Contact

- Email: [mhandler1991@gmail.com](mailto:mhandler1991@gmail.com)
- LinkedIn: [linkedin.com/in/handler1991](https://www.linkedin.com/in/handler1991/)
- GitHub: [github.com/mhandler1991](https://github.com/mhandler1991)

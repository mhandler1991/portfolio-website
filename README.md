# maxwellhandler.com

Personal site for **Maxwell Handler**, product manager in San Diego. I run a technical product team in fintech lending, and I build software with Claude.

- 🌐 **Production:** [maxwellhandler.com](https://maxwellhandler.com) — `main` branch via GitHub Pages
- 🧪 **Staging:** [maxwellhandler.netlify.app](https://maxwellhandler.netlify.app/) — `stage` branch via Netlify

---

## Stack

- Static **HTML / CSS / vanilla JS**, no build step, no framework
- Self-hosted fonts: **Geist**, **Geist Mono** and **Caveat** (woff2, OFL, in `assets/fonts/`)
- Hosted on **GitHub Pages** with custom domain via [`CNAME`](CNAME)

## Project structure

```
.
├── assets/
│   ├── favicon.svg      # SVG favicon
│   ├── profile.jpg      # Open Graph / Twitter preview image
│   └── fonts/           # Geist, Geist Mono, Caveat (woff2) + licenses
├── css/
│   ├── tokens.css       # Design tokens and global rules
│   └── home.css         # Homepage layout and components
├── js/
│   └── home.js          # Workflow step animation, phone menu
├── archive/             # Previous homepage and AI Lab page (noindex)
├── index.html           # Single-page entry
├── CNAME                # GitHub Pages custom domain
└── README.md
```

## Preview

No build step, no local server needed. Push to `stage` and preview on Netlify: <https://maxwellhandler.netlify.app/>.

## Deployment

| Environment | Branch | Host | URL |
| --- | --- | --- | --- |
| Production | `main` | GitHub Pages | <https://maxwellhandler.com> |
| Staging | `stage` | Netlify | <https://maxwellhandler.netlify.app/> |

Workflow: push to `stage` → preview on Netlify → merge `stage` → `main` to ship to production. Custom domain is wired via [`CNAME`](CNAME).

## Notes

- Respects `prefers-reduced-motion` (step animation and smooth scroll off)
- 44px tap areas on links, 48px buttons, visible `:focus-visible` rings
- Placeholder links render as a muted "Soon" tag; search `TODO` in `index.html` for what is still missing
- Open Graph + Twitter Card metadata for link previews

## License

[MIT](https://opensource.org/license/mit) © Maxwell Handler

## Contact

**Maxwell Handler**

- ✉️ Email: [mhandler1991@gmail.com](mailto:mhandler1991@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/handler1991](https://www.linkedin.com/in/handler1991/)
- 🌐 Web: [maxwellhandler.com](https://maxwellhandler.com)

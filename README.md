# maxwellhandler.com

Personal portfolio site for **Maxwell Handler** — Senior Technical Product Manager working at the intersection of fintech platforms, APIs, and Salesforce architecture.

- 🌐 **Production:** [maxwellhandler.com](https://maxwellhandler.com) — `main` branch via GitHub Pages
- 🧪 **Staging:** [maxwellhandler.netlify.app](https://maxwellhandler.netlify.app/) — `stage` branch via Netlify

---

## Stack

- Static **HTML / CSS / vanilla JS** — no build step, no framework
- Google Fonts: **DM Sans** + **Fraunces** (loaded with `preconnect`)
- Hosted on **GitHub Pages** with custom domain via [`CNAME`](CNAME)

## Project structure

```
.
├── assets/
│   ├── favicon.svg      # SVG favicon
│   └── profile.jpg      # Hero portrait
├── css/
│   └── styles.css       # Design tokens, sections, animations
├── js/
│   └── scripts.js       # Mobile nav, year stamp, hero-tags marquee
├── index.html           # Single-page entry
├── CNAME                # GitHub Pages custom domain
└── README.md
```

## Local preview

No build step. Serve the folder with any static server:

```bash
# Python 3
python -m http.server 8000

# Node
npx serve .
```

Then open <http://127.0.0.1:8000/>.

## Deployment

| Environment | Branch | Host | URL |
| --- | --- | --- | --- |
| Production | `main` | GitHub Pages | <https://maxwellhandler.com> |
| Staging | `stage` | Netlify | <https://maxwellhandler.netlify.app/> |

Workflow: push to `stage` → preview on Netlify → merge `stage` → `main` to ship to production. Custom domain is wired via [`CNAME`](CNAME).

## Notes

- Respects `prefers-reduced-motion` (decorative animations and marquee disabled)
- Mobile-friendly: viewport `viewport-fit=cover`, safe-area insets, 44px tap targets
- `:focus-visible` outlines for keyboard navigation
- Open Graph + Twitter Card metadata for link previews
- SVG favicon — no PNG fallback needed in modern browsers
- Single-page layout: hero, about, what I do, experience timeline, skills, credentials, contact

## License

[MIT](https://opensource.org/license/mit) © Maxwell Handler

## Contact

**Maxwell Handler**

- ✉️ Email: [mhandler1991@gmail.com](mailto:mhandler1991@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/handler1991](https://www.linkedin.com/in/handler1991/)
- 🌐 Web: [maxwellhandler.com](https://maxwellhandler.com)

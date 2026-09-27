# Trio Restaurant & Lounge: spec website

A finished, production-ready spec website for **Trio Restaurant & Lounge** ("TRiO"), a soul food restaurant, cocktail bar and lounge at 3817 Hull Street Rd, Richmond, VA 23224. Built by Couture House Co. as a sales pitch for the owner, ready to launch as soon as the facts in `LAUNCH-NOTES.md` are confirmed.

- **Proposed domain:** `triorva.com` (matches their TikTok handle `@triorva7`). All canonical, Open Graph and sitemap URLs already use it.
- **Stack:** static HTML, one stylesheet, one vanilla JS file. No build step, no frameworks, no external JS.
- **Design concept:** "After Hours on Hull Street". Velvet-night palette with ember-orange neon, Big Shoulders Display + Manrope, a scroll-spun vinyl record in the hero, and a weekly lineup that slides sideways as you scroll.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Hero, "Tonight at Trio" (shows today's event by Richmond time), signature plates, weekly lineup, reviews, tables & sections, quick facts, FAQ |
| `menu.html` | Full menu with prices, sticky category nav that highlights on scroll, print-friendly |
| `events.html` | Tuesday to Sunday lineup, DJs and hosts, happy hours, live music, tables/bottle service, event FAQ |
| `visit.html` | Hours with live open/closed status, location and directions, parking, kids and age notes, contact, FAQ |
| `404.html` | Branded not-found page (Netlify serves it automatically) |

Other files: `assets/css/site.css`, `assets/js/site.js`, `assets/img/` (optimized WebP, `-800` variants for `srcset`, `og.jpg`, favicons), `robots.txt`, `sitemap.xml`, `llms.txt`, `site.webmanifest`, `netlify.toml`.

## Preview locally

Any static server works. From this folder:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` straight from the file system also works, but a local server matches production more closely.

## Deploy on Netlify

1. Register `triorva.com` (or the owner's preferred domain; see LAUNCH-NOTES).
2. In Netlify: **Add new site > Deploy manually** and drag this folder in, or connect a Git repo containing it. There is no build command; the publish directory is the folder root (already set in `netlify.toml`).
3. **Domain management > Add a domain** and point the registrar's DNS at Netlify (or move nameservers to Netlify DNS). HTTPS is provisioned automatically.
4. After it's live: submit `https://triorva.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools, and add the website URL to the Google Business Profile, Instagram bio, TikTok and Facebook page.

`netlify.toml` sets security headers (CSP, HSTS, frame and content-type protection), long-lived caching for images, short caching for CSS/JS/HTML, and the pretty 404.

## If the domain changes

Search and replace `https://triorva.com` across `*.html`, `sitemap.xml`, `robots.txt` and `llms.txt`.

## Editing notes

- **Hours** appear in the HTML (hero, quick facts, footer, visit table, JSON-LD) and in `assets/js/site.js` (`HOURS` array, which drives the open/closed status). Update both.
- **Weekly events** appear on the home page (Tonight module and lineup cards), `events.html`, the Event JSON-LD on `events.html`, and `llms.txt`.
- **Menu prices** appear on `menu.html` (visible and inside the Menu JSON-LD), home page highlights, FAQ price answers, and `llms.txt`.
- Motion is disabled automatically for visitors who prefer reduced motion, and all content is visible without JavaScript.
- `assets/img/weekly-events-flyer.webp`, `weekend-plans-flyer*.webp`, `logo-board.webp` and `cocktail-bar*.webp` are reference/source images not used on the pages (the cocktail photo is used as the cropped `cocktail-glass.webp`). They can be removed before launch.

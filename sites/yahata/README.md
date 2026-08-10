# 株式会社ヤハタ — site

A Next.js rebuild of <https://www.yahata-sa.co.jp/>: same pages, same copy, same
photography, same layout — rewritten as a typed React codebase instead of
WordPress plus a pile of jQuery plugins.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## How it is put together

```
app/            one route per page of the original site
components/     header, footer, key-visual slider, forms, splash screen
data/           page content, generated from the live site by scripts/
public/assets/  the original stylesheet, fonts, photography and SVG artwork
public/wp/      images that lived in the WordPress uploads folder
scripts/        one-off extractors that (re)generate everything in data/
```

**The stylesheet is the original one, unchanged.** `public/assets/css/style.css`
is served verbatim from `/public` so its relative `url(../img/…)` and
`url(../fonts/…)` references keep resolving, and the components reuse its class
names. That is what keeps the rebuild pixel-accurate: layout, the fluid
`1vw`-based type scale, the skewed section banners and every breakpoint behave
exactly as before. `public/assets/css/site.css` holds the small number of extra
rules needed for the behaviours that used to come from jQuery plugins.

**The JavaScript is gone.** The original loaded a single 414 KB bundle
(jQuery + slick + slideout + lottie + site code). Its five behaviours are now
small React components:

| Original | Now |
| --- | --- |
| slick carousel (key visual) | `components/KvSlider.tsx` |
| scroll handler adding `.is-anime` | `components/ScrollReveal.tsx` (IntersectionObserver) |
| slideout drawer | `components/Header.tsx` |
| back-to-top handler | `components/PageTop.tsx` |
| lottie splash | `components/Loader.tsx` |

**Content lives in `data/`.** Every file there is generated — the header of each
one names the script that produces it. To refresh after the client edits the
live site, save the pages as served (plain `curl`/`wget` with **no** link
rewriting: `wget -k` breaks the extractors) and re-run the scripts:

```bash
node scripts/extract-news.mjs     <mirror-root> news-assets.txt
node scripts/extract-products.mjs <mirror-root> product-assets.txt
node scripts/extract-recruit.mjs  <mirror-root> recruit-assets.txt
node scripts/extract-company.mjs  <mirror-root>
node scripts/extract-privacy.mjs  <mirror-root>
```

Each script also writes a manifest of the uploads its pages reference, so any
new images can be copied into `public/`.

Long-form editorial content — news post bodies, interview bodies, the job
listings and the privacy policy — is stored as markup and rendered as-is. It
came out of a WYSIWYG editor, so keeping it verbatim is both safer and closer to
how the client edits it.

## Forms

`/contact` and `/entry` were MW WP Form. They keep the same three-step flow
(fill in → 入力内容を確認する → send) and the same fields, and post to
`app/api/inquiry/route.ts`.

**That route needs an endpoint before the forms will work.** Set
`INQUIRY_WEBHOOK_URL` to anything that accepts a JSON `POST` — a mail relay, a
form service, an internal API:

```bash
INQUIRY_WEBHOOK_URL=https://…
```

Without it the route answers `503` and logs, rather than quietly discarding
enquiries. The payload is `{ form, submittedAt, fields }`.

Note that the entry form's résumé upload only sends the file *name*; wiring up
real file uploads needs a storage target and is left for whoever configures the
endpoint.

## Things worth knowing

- **The splash screen** replays the original lottie animation
  (`public/assets/loading.json`, extracted from the old bundle) and, as before,
  shows at most once per 24 hours via a `loaded` cookie. It runs for ~13
  seconds; worth shortening if the client is open to it.
- **Fonts** still come from Google Fonts, as on the original site. Self-hosting
  them would remove the third-party request if that is wanted.
- **One image 404s**: a 1×1 spacer in the May 2024 news post
  (`/wp/wp-content/uploads/2024/05/8b187bca9c541b8666b270428cc3e4fe-1.png`)
  returns 403 from the origin, so it could not be copied. It is invisible and
  already broken on the live site.
- **`/news/<id>` and `/products/type/<group>/<slug>`** keep the original URLs, so
  existing links and search results still land in the right place.
- The footer's photographic band appears on the front page only, matching the
  original.

# SharePal — Gaming Gadgets on Rent (Bangalore)

A recreation of [sharepal.in/bangalore/gaming-gadgets-on-rent](https://sharepal.in/bangalore/gaming-gadgets-on-rent), built with Next.js 16 (App Router), React 19, Tailwind CSS 4 and TypeScript.

**Live URL:** _add after deploy_

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run check` | Lint → typecheck → unit tests → build |
| `npm test` | Vitest unit + component tests |
| `npm run test:e2e` | Playwright smoke tests (desktop 1440 + mobile 375) |

## How the design values were obtained

The live site blocks bots, so instead of scraping it the page was measured in a
real browser via DevTools: computed styles were read off live DOM nodes, and CSS
variables and served stylesheets were inspected. Every colour, radius, font size
and grid measurement in `app/globals.css` comes from that reading rather than from
guesswork — for example the header is `#030D31` on desktop but `#4C187C` on
mobile, cards are `24px` radius on desktop and `16px` on mobile, and the product
grid is 4 columns on desktop and 2 on mobile with `8px`/`20px` gaps.

Tokens are declared once under `@theme inline` in `app/globals.css` and used
everywhere else; no component hardcodes a hex value.

## Folder structure

```
app/           App Router entry: layout.tsx, page.tsx, globals.css
components/    One folder per component, test beside it
  header/ footer/ mobile-tab-bar/ hero/ category-rail/ category-tabs/
  product-card/ product-grid/ asset-partner-banner/ rent-out-banner/
  faq/ testimonials/ stats/
data/          products.json — the product catalogue
lib/           format.ts (rent/booking formatting), products.ts (load + validate)
types/         product.ts
e2e/           Playwright smoke tests
```

Server components throughout. Nothing here needs client state, so there is no
`"use client"` anywhere — including the FAQ, which uses native `<details>`.

## What I changed, and why

Three small improvements beyond a straight copy:

1. **Prices are shown up front.** The original hides the price behind a
   "Select Dates to view price" placeholder and a date-picker modal that opens on
   load, so you cannot tell what anything costs until you have picked dates. Cost
   is the first thing a renter wants to know, so each card shows its real
   per-day rent from `data/products.json`. The date picker is also the one part
   of the original that would need a new dependency, so it is out of scope here.

2. **Icon-only controls are labelled.** The search, cart, account and
   save-for-later buttons were given `aria-label`s, the active category and tab
   are marked with `aria-current="page"`, and the decorative artwork (hero art,
   brand logos, category icons) uses `alt=""` so a screen reader reads the visible
   text label instead of announcing the same thing twice.

3. **The FAQ works without JavaScript and is findable.** Each answer is real
   text in the DOM inside a `<details>/<summary>`, so it is keyboard operable,
   surfaced by in-page find, and the section stays a server component. The chevron
   rotates with `group-open:` rather than a state hook.

## Deliberate deviations from the original

- **Prices** are displayed directly rather than gated behind the date-picker
  modal (see above).
- **Banner placement.** The original interleaves the promo banners between rows
  of the product grid; here "Become an Asset Partner" and "Rent Out Your Gear"
  follow the grid.
- **Item count** reads 23 items, from `data/products.json`. The live page shows
  50; the provided data set is the 23.
- **FAQ answers and reviews** are written to match the structure and tone of the
  original sections; their exact wording was not part of the provided data.
- **Hero and rail artwork** are the original's own assets, loaded from
  `images.sharepal.in` (allow-listed in `next.config.ts`).
- The `next/image` `priority` prop is not used because Next 16 deprecated it in
  favour of `loading="eager"`; the first row of cards uses `loading="eager"` and
  the rest lazy-load.

## Product data

`data/products.json` is the source of truth and is never inlined into a
component. `lib/products.ts` loads it and narrows `tag` to the allowed union, and
`lib/format.ts` handles presentation: `₹158.25` keeps its paise, `2527` renders as
`2.5k+`, a `0` rating renders no stars, and an `out_of_stock` product dims and
shows a disabled **Out of Stock** button instead of a rent CTA. A product tagged
**Vote to Launch** gets a vote CTA rather than a rental one.

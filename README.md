# SharePal — Gaming Gadgets on Rent (Bangalore)

A recreation of [sharepal.in/bangalore/gaming-gadgets-on-rent](https://sharepal.in/bangalore/gaming-gadgets-on-rent), built with Next.js 16 (App Router), React 19, Tailwind CSS 4 and TypeScript.

**Live URL:** recreate-alpha.vercel.app(https://recreate-alpha.vercel.app/)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest unit + component tests |
| `npm run test:e2e` | Playwright smoke tests (desktop 1440 + mobile 375) |
| `npm run check` | Lint → typecheck → tests → build, the gate before every commit |

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

## How the page works

**Rentals are date-gated, as on the original.** A date picker opens on first load.
Until two dates are chosen every card reads *Select Dates to view price* over a
blurred `₹N/A`; afterwards the header shows the delivery and pickup dates, and each
card swaps to `Rent for N days` with the total for the period. Delivery and pickup
days are both free, so `days = pickup − delivery − 1`. Picking `+` adds the item and
slides the cart in from the right, where the quantity, the dates (editable) and the
total can all be changed.

**The calendar is hand-rolled**, so the picker needs no new dependency. Two months
sit side by side from `md` up; below that the second month steps aside and the
arrows page a month at a time, because two months in a 375px panel crushed each day
cell to 18px and the numbers overlapped.

**The catalogue is filterable** — search, five sort orders, quick chips for
`New` / `Trending` / `Under ₹250 a day`, an in-stock toggle, and an empty state that
offers to clear the filters. The promo banners only appear while the whole
catalogue is on screen, and paging resets whenever a filter changes.

**Gadgets can be saved for later.** The heart on a card was decoration on the
original; here it fills, adds a `Saved (n)` control to the header, and opens a
*Saved for later* rail above the FAQ. The rail prices and adds under exactly the
same date gate as the card, and removing an item reverses all three. A second rail,
*Recently viewed*, fills as cards scroll past — one `IntersectionObserver` over the
grid, most recent first, deduped and capped at six. Both rails hide themselves when
empty, and both are stored as ids under one `localStorage` key, read after mount so
the server and the first client render still agree; ids are resolved against the
catalogue, so a product that disappears cannot resurrect a stale card.

## How it is tested

128 Vitest tests across 14 files, written against behaviour a user can see rather
than implementation: the rental maths (`lib/rental.test.ts`), cart line totals
(`lib/cart.test.ts`), filtering and sorting (`lib/catalogue.test.ts`), saved and
recently viewed lists (`lib/saved.test.ts`), and the components — a sold-out
product cannot be added, a `0` rating renders no stars, the empty state clears the
filters, the cart drawer re-prices, saving fills the heart and puts the gadget in
the rail, an unknown saved id is dropped. No snapshots, and no tests that only
assert a mock was called.

The Playwright suite in `e2e/smoke.spec.ts` runs twice, against a 1440px desktop
project and a 375px mobile one, and covers the whole journey: load, pick a range,
see the dates in the header and the price on a card, add to cart, step the
quantity and watch the total double, then the search, sort, stock filter and empty
state. It also saves and unsaves a gadget, scrolls the grid to fill the recently
viewed rail, and asserts the page never scrolls sideways at 375.

## Folder structure

```
app/           App Router entry: layout.tsx, page.tsx, globals.css
components/    One folder per component, test beside it
  header/ mobile-tab-bar/ hero/ category-rail/ category-tabs/
  product-filters/ product-grid/ product-card/ product-strip/ saved/ saved-context/
  rental-context/ rental-dates/ date-picker/ cart/
  asset-partner-banner/ rent-out-banner/ faq/ testimonials/ stats/ footer/
data/          products.json — the product catalogue
lib/           rental.ts, cart.ts, catalogue.ts, saved.ts (pure maths, filtering
               and list handling), format.ts (rent/booking formatting),
               products.ts (load + validate)
types/         product.ts, catalogue.ts, saved.ts
e2e/           Playwright smoke tests
```

Server components by default. The thirteen components that hold state or read a
context — the two providers, the date picker and calendar, the cart drawer and its
button, the date strip, the product card and grid, the filter bar's owner, the
saved rails and its header control, and the mobile tab bar — are the only ones
marked `"use client"`, and each carries it at the smallest scope that works.

## What I changed, and why

1. **The catalogue can actually be searched and narrowed.** The original's tabs
   are navigation, not filtering, and the provided data has no category field to
   filter on — every one of the 23 products is a PS5 bundle. So instead of
   inventing categories, there is a filter bar backed only by fields that really
   exist: name, tag, per-day price and stock. It started as the three small
   improvements in the brief (in-stock filter, sort by price, empty state) and
   grew a search box and quick chips once it was clear the grid could not be
   narrowed at all otherwise.

2. **Icon-only controls are labelled.** The search, cart, account and
   save-for-later buttons were given `aria-label`s, the active category and tab
   are marked with `aria-current="page"`, and the decorative artwork (hero art,
   brand logos, category icons) uses `alt=""` so a screen reader reads the visible
   text label instead of announcing the same thing twice.

3. **The FAQ works without JavaScript and is findable.** Each answer is real
   text in the DOM inside a `<details>/<summary>`, so it is keyboard operable,
   surfaced by in-page find, and the section stays a server component. The chevron
   rotates with `group-open:` rather than a state hook.

4. **The cart icon carries its count**, so the drawer does not have to be opened
   to know whether anything is in it.

5. **The footer's rental prose is folded away**, behind a *Read more* disclosure,
   because it otherwise runs to a full screen of links.

6. **Gadgets can be saved instead of only rented or lost.** The heart on each card
   was decoration on the original, so it now saves, the header counts what is
   saved, and a *Saved for later* rail keeps those gadgets one click from the cart
   — useful when you are comparing two bundles and the date gate means no price is
   shown until you commit to dates. *Recently viewed* covers the other half of the
   problem: finding the thing you scrolled past.

## Deliberate deviations from the original

- **Totals are flat `per-day rent × days`.** The original applies length-based
  discount slabs of up to 12% from a pricing table that is not in the provided
  data, so the arithmetic here is internally consistent but will not always match
  the live site's rupee figure.
- **`+` opens the cart directly.** The original turns the button into a `− 1 +`
  stepper and floats a separate lime *Go to Cart* pill; the pill is skipped and the
  stepper appears on the card once the item is in the drawer.
- **Continue needs at least one chargeable day.** With a single date the rental box
  reads `00 Day` / `--` exactly as the original does, but the button stays disabled,
  because there is nothing to rent yet.
- **The date picker shows one month below `md`** (see above).
- **Item count** reads 23 items, from `data/products.json`. The live page shows
  50; the provided data set is the 23.
- **FAQ answers and reviews** are written to match the structure and tone of the
  original sections; their exact wording was not part of the provided data.
- **Hero, rail and promo artwork** are the original's own assets, loaded from
  `images.sharepal.in` (allow-listed in `next.config.ts`). The two promo banners
  sit between rows of the grid at the original's positions, each wrapped in a
  link to the original's destination.
- The `next/image` `priority` prop is not used because Next 16 deprecated it in
  favour of `loading="eager"`; the first row of cards uses `loading="eager"` and
  the rest lazy-load.
- **Saved and recently viewed lists live in `localStorage`,** not on an account,
  because there is no login in this build. Rental dates stay in memory only, so
  they are deliberately not persisted — writing them to storage would make the
  server and the first client render disagree.

## Product data

`data/products.json` is the source of truth and is never inlined into a
component. `lib/products.ts` loads it and narrows `tag` to the allowed union, and
`lib/format.ts` handles presentation: `₹158.25` keeps its paise, `2527` renders as
`2.5k+`, a `0` rating renders no stars, and an `out_of_stock` product dims and
shows a disabled **Out of Stock** button instead of a rent CTA. A product tagged
**Vote to Launch** gets a vote CTA rather than a rental one.

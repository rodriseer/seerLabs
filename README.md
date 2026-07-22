# Seer Labs

Minimal portfolio site for Seer Labs — outdoor technology studio.

## Stack

- **Next.js 15** (App Router) + **Tailwind CSS**
- Reusable components: `HeroBanner`, `ProductCard`, `Section`, `Footer`, `Nav`

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Pages

- **/** — Home (hero + Featured Products)
- **/products** — Products index
- **/products/surfseer** — SurfSeer case study (live app: [surfcheckseer.com](https://surfcheckseer.com))
- **/products/cycleseer** — CycleSeer case study (live app link: set in `src/app/products/cycleseer/page.tsx`)
- **/about** — About
- **/contact** — Contact

## Customize

- **CycleSeer URL**: Update the `href` in `src/app/products/cycleseer/page.tsx` and the `viewHref` in `src/app/page.tsx` and `src/app/products/page.tsx` with your live CycleSeer URL.
- **OG image**: Add a 1200×630 image at `public/images/og-placeholder.png` for social sharing (or change the path in `src/app/layout.tsx`).
- **Site URL**: Set `NEXT_PUBLIC_SITE_URL` in production for correct OG URLs.

## Assets

- **Logo**: `public/images/logo.png` — used in the nav and footer.
- **Hero and product images**: `public/images/` — `hero.png` (hero), `surfseer.jpg`, `cycleseer.jpg` (product images). Replace with your own as needed.

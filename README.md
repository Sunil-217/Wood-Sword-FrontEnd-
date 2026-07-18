# 🏏 Woodsword Cricket — Storefront

A premium, front-end-only cricket-equipment store, inspired by the layout of
[wood-swordcricket.com](https://wood-swordcricket.com). Built with **Next.js 16
(App Router)**, **TypeScript**, and **Tailwind CSS v4**.

> Demo project with **sample data** — nothing is scraped from the reference
> site, and checkout is not wired to a real payment provider.

## ✨ Features

- **Home page** — animated hero, value props, category bento grid, best-sellers,
  promo bands and a newsletter block.
- **Shop** — server-side **filtering** (category, price, size, hand) + **search**
  + **sorting**, live category counts, removable filter chips and an empty state.
- **Product detail** — image gallery, variant selectors (colour / hand / size),
  quantity stepper, add-to-bag & buy-now, features and related products.
- **Cart** — client-side cart with **localStorage** persistence, quantity edits,
  free-shipping progress bar, order summary and a demo checkout.
- **Design system** — custom forest-green + gold palette, Sora/Inter type,
  fully responsive, accessible, self-contained **SVG product artwork** (no
  external image dependencies).

## 🚀 Getting started

```bash
npm install      # if dependencies aren't installed yet
npm run dev      # start the dev server
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build    # production build (also type-checks + prerenders)
npm start        # serve the production build
```

## 🗂️ Project structure

```
src/
├─ app/
│  ├─ layout.tsx              # fonts, cart provider, header/footer
│  ├─ page.tsx                # home
│  ├─ shop/page.tsx           # listing + filters + sort + search
│  ├─ product/[slug]/page.tsx # product detail (SSG)
│  ├─ cart/page.tsx           # cart + demo checkout
│  └─ globals.css             # design tokens (Tailwind v4 @theme)
├─ components/
│  ├─ Header / Footer / AnnouncementBar / Logo
│  ├─ ProductArt.tsx          # SVG artwork per category
│  ├─ ProductCard / ProductGrid / QuickAdd
│  ├─ home/*                  # hero, category tiles, promos, newsletter
│  ├─ shop/*                  # FilterSidebar, SortSelect
│  ├─ product/ProductActions  # variant selectors + add to cart
│  └─ ui/*                    # Container, Rating, Badge
├─ context/CartContext.tsx    # cart state + persistence
└─ lib/
   ├─ types.ts                # domain types
   ├─ catalog.ts              # categories + sample products
   ├─ filters.ts              # sort/filter helpers
   └─ format.ts               # ₹ formatting
```

## 🛠️ Editing the catalog

All products and categories live in [`src/lib/catalog.ts`](src/lib/catalog.ts).
Add or edit entries there — each product picks an `art` kind (`bat`, `gloves`,
`pads`, `helmet`, `ball`, `keeping`, `bag`, `jersey`, `misc`) and an `accent`
colour that tints its artwork.

## 📌 Notes / next steps

This is a front-end build. To make it a real store you'd add: a backend/CMS for
products, real product images, authentication, a checkout/payment integration
(e.g. Razorpay/Stripe), and order management.

"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/ProductGrid";
import { useCatalog } from "@/context/CatalogContext";
import { discountPct } from "@/lib/format";
import type { Product } from "@/lib/types";
import { SectionHeading } from "./SectionHeading";

const TABS = [
  { key: "best", label: "Bestsellers" },
  { key: "new", label: "New arrivals" },
  { key: "deals", label: "Top deals" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function FeaturedProducts() {
  const { products } = useCatalog();
  const [tab, setTab] = useState<TabKey>("best");

  const lists = useMemo(() => {
    const inStock = products.filter((p) => p.inStock);
    const rank = (p: Product) =>
      p.badge === "Bestseller" ? 0 : p.badge === "Pro" ? 1 : p.badge ? 2 : 9;
    const best = [...inStock]
      .sort((a, b) => rank(a) - rank(b) || b.price - a.price)
      .slice(0, 8);
    // "New" badges first, topped up with the latest catalog additions.
    const badged = inStock.filter((p) => p.badge === "New");
    const fresh: Product[] = [...badged];
    for (let i = inStock.length - 1; i >= 0 && fresh.length < 8; i--) {
      if (!fresh.includes(inStock[i])) fresh.push(inStock[i]);
    }
    const deals = inStock
      .filter((p) => discountPct(p.price, p.mrp))
      .sort(
        (a, b) =>
          (discountPct(b.price, b.mrp) ?? 0) - (discountPct(a.price, a.mrp) ?? 0),
      )
      .slice(0, 8);
    return { best, new: fresh.slice(0, 8), deals } as Record<TabKey, Product[]>;
  }, [products]);

  return (
    <Container className="py-4 sm:py-6">
      <SectionHeading
        eyebrow="Fan favourites"
        title="Gear everyone's playing with"
        subtitle="The kit our players reach for most, across every sport."
        href="/shop"
        linkLabel="View all"
      />

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            aria-pressed={tab === t.key}
            className={`press rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t.key
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                : "bg-subtle text-ink ring-1 ring-line/8 hover:bg-brand-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Re-keyed so the stagger entrance replays on tab change */}
      <div key={tab} className="grid-stagger mt-6">
        <ProductGrid products={lists[tab]} spotlight />
      </div>
    </Container>
  );
}

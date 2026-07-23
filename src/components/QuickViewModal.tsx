"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ProductArt } from "./ProductArt";
import { Rating } from "./ui/Rating";
import { ProductBadge } from "./ui/Badge";
import { ProductActions } from "./product/ProductActions";
import { useQuickView } from "@/context/QuickViewContext";
import { categoryMap } from "@/lib/catalog";
import { discountPct, inr } from "@/lib/format";

export function QuickViewModal() {
  const { product, close } = useQuickView();

  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [product, close]);

  if (!product) return null;
  const off = discountPct(product.price, product.mrp);

  return (
    <div className="fixed inset-0 z-[95] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-brand-950/50 backdrop-blur-[2px]" onClick={close} />
      <div className="animate-toast-in relative flex w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-surface shadow-2xl sm:rounded-3xl md:flex-row">
        <button
          onClick={close}
          aria-label="Close"
          className="press absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface/80 text-ink shadow-sm backdrop-blur"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>

        {/* Visual */}
        <div className="relative md:w-1/2">
          <ProductArt
            art={product.art}
            accent={product.accent}
            image={product.image}
            label={product.name}
            className="aspect-[4/3] w-full md:aspect-square md:h-full"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            {product.badge && <ProductBadge kind={product.badge} />}
            {off && <ProductBadge kind="Sale" />}
          </div>
        </div>

        {/* Details */}
        <div className="flex max-h-[70vh] flex-col overflow-y-auto p-5 sm:p-6 md:w-1/2">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            {product.brand} · {categoryMap[product.category].name}
          </p>
          <h2 className="mt-1 font-display text-xl font-bold text-ink">{product.name}</h2>
          <div className="mt-2">
            <Rating value={product.rating} reviews={product.reviews} />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-ink">{inr(product.price)}</span>
            {product.mrp && <span className="text-sm text-muted/40 line-through">{inr(product.mrp)}</span>}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted/65">{product.tagline}</p>

          <div className="mt-5">
            <ProductActions product={product} onDone={close} />
          </div>

          <Link
            href={`/product/${product.slug}`}
            onClick={close}
            className="mt-4 text-center text-sm font-semibold text-accent hover:underline"
          >
            View full details →
          </Link>
        </div>
      </div>
    </div>
  );
}

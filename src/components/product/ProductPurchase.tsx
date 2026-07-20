"use client";

import Link from "next/link";
import { useCatalog } from "@/context/CatalogContext";
import { ProductActions } from "./ProductActions";
import { discountPct, inr } from "@/lib/format";
import type { Product } from "@/lib/types";

/**
 * Price + purchase panel that reflects live admin edits (price, MRP,
 * stock) from the catalog store, falling back to the statically
 * rendered product before hydration.
 */
export function ProductPurchase({ product: base }: { product: Product }) {
  const { getById, ready } = useCatalog();
  const live = ready ? getById(base.id) : undefined;
  const product = live ?? base;
  const removed = ready && !live; // admin removed it from the store
  const off = discountPct(product.price, product.mrp);

  return (
    <>
      <div className="mt-5 flex flex-wrap items-baseline gap-3">
        <span className="font-display text-3xl font-bold text-ink">{inr(product.price)}</span>
        {product.mrp && <span className="text-lg text-muted/40 line-through">{inr(product.mrp)}</span>}
        {off && (
          <span className="rounded-full bg-ball-500/10 px-2.5 py-1 text-sm font-bold text-ball-600">
            Save {off}%
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-muted/45">
        Inclusive of all taxes · Free shipping over ₹2,000
      </p>

      <div className="my-7 h-px bg-brand-900/8" />

      {removed ? (
        <div className="rounded-2xl border border-line/10 bg-subtle p-6 text-center">
          <p className="font-display text-lg font-bold text-ink">No longer available</p>
          <p className="mt-1 text-sm text-muted/60">This product has been removed from the store.</p>
          <Link
            href="/shop"
            className="press mt-4 inline-block rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Browse all gear
          </Link>
        </div>
      ) : (
        <ProductActions product={product} />
      )}
    </>
  );
}

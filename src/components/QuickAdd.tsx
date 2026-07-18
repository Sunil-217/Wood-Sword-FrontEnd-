"use client";

import { useState } from "react";
import { makeLineId, useCart } from "@/context/CartContext";
import type { ArtKind } from "@/lib/types";

export interface QuickAddProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  art: ArtKind;
  accent: string;
  price: number;
  size?: string;
  color?: string;
  hand?: string;
}

export function QuickAdd({ product }: { product: QuickAddProduct }) {
  const { addLine } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    const id = makeLineId(product.id, {
      size: product.size,
      color: product.color,
      hand: product.hand,
    });
    addLine({
      id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      art: product.art,
      accent: product.accent,
      price: product.price,
      size: product.size,
      color: product.color,
      hand: product.hand,
      qty: 1,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      aria-label={`Add ${product.name} to bag`}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
        added
          ? "bg-brand-600 text-white"
          : "bg-brand-950/5 text-brand-900 hover:bg-brand-900 hover:text-white"
      }`}
    >
      {added ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12.5l4.5 4.5L19 7"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

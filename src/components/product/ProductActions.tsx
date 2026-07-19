"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { makeLineId, useCart } from "@/context/CartContext";
import { showToast } from "@/components/Toaster";
import { inr } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductActions({ product }: { product: Product }) {
  const { addLine } = useCart();
  const router = useRouter();

  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [hand, setHand] = useState(product.hands?.[0]);
  const [qty, setQty] = useState(1);

  function buildLine() {
    const id = makeLineId(product.id, { size, color, hand });
    return {
      id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      art: product.art,
      accent: product.accent,
      price: product.price,
      size,
      color,
      hand,
      qty,
    };
  }

  function handleAdd() {
    addLine(buildLine());
    showToast(`${product.name} added to your bag`);
  }

  function handleBuyNow() {
    addLine(buildLine());
    router.push("/cart");
  }

  return (
    <div className="space-y-6">
      {/* Color */}
      {product.colors.length > 0 && (
        <Selector
          label="Colour"
          value={color}
          options={product.colors}
          onSelect={setColor}
        />
      )}

      {/* Hand */}
      {product.hands && product.hands.length > 0 && (
        <Selector label="Hand" value={hand} options={product.hands} onSelect={setHand} />
      )}

      {/* Size */}
      {product.sizes.length > 0 && (
        <Selector label="Size" value={size} options={product.sizes} onSelect={setSize} />
      )}

      {/* Quantity + Add */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="inline-flex items-center rounded-full border border-brand-900/15 bg-white">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-12 w-12 items-center justify-center rounded-full text-brand-900 transition-colors hover:bg-brand-50"
            aria-label="Decrease quantity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
          </button>
          <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(20, q + 1))}
            className="flex h-12 w-12 items-center justify-center rounded-full text-brand-900 transition-colors hover:bg-brand-50"
            aria-label="Increase quantity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
          </button>
        </div>

        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className="flex-1 rounded-full bg-brand-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/15 transition-all hover:bg-brand-800 hover:shadow-brand-900/25 disabled:cursor-not-allowed disabled:bg-brand-900/40 disabled:shadow-none"
        >
          {product.inStock ? `Add to bag · ${inr(product.price * qty)}` : "Out of stock"}
        </button>
      </div>

      {product.inStock ? (
        <button
          onClick={handleBuyNow}
          className="w-full rounded-full border border-brand-900/15 bg-white px-6 py-3.5 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-50"
        >
          Buy it now
        </button>
      ) : (
        <p className="rounded-xl bg-brand-50 px-4 py-3 text-center text-sm text-brand-900/60">
          This item is currently out of stock — check back soon.
        </p>
      )}
    </div>
  );
}

function Selector({
  label,
  value,
  options,
  onSelect,
}: {
  label: string;
  value?: string;
  options: string[];
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-900/50">
          {label}
        </span>
        {value && <span className="text-sm font-medium text-brand-950">{value}</span>}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                active
                  ? "border-brand-900 bg-brand-900 text-white"
                  : "border-brand-900/15 bg-white text-brand-900/80 hover:border-brand-900/40"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

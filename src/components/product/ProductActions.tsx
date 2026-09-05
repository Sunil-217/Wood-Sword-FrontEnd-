"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { makeLineId, useCart } from "@/context/CartContext";
import { flyToCart } from "@/lib/flyToCart";
import { inr } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductActions({
  product,
  onDone,
}: {
  product: Product;
  onDone?: () => void;
}) {
  const { addLine } = useCart();
  const router = useRouter();

  const [added, setAdded] = useState(false);
  const addedTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(addedTimer.current), []);
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
      image: product.image,
      size,
      color,
      hand,
      qty,
    };
  }

  function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    flyToCart(e.currentTarget);
    addLine(buildLine());
    // Confirm on the button itself rather than throwing a toast over the page.
    setAdded(true);
    window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setAdded(false), 1600);
    onDone?.();
  }

  function handleBuyNow() {
    addLine(buildLine());
    onDone?.();
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
        <div className="inline-flex items-center rounded-full border border-line/15 bg-surface">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-12 w-12 items-center justify-center rounded-full text-ink transition-colors hover:bg-subtle"
            aria-label="Decrease quantity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
          </button>
          <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(20, q + 1))}
            className="flex h-12 w-12 items-center justify-center rounded-full text-ink transition-colors hover:bg-subtle"
            aria-label="Increase quantity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
          </button>
        </div>

        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`press btn-shine flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-[--duration-normal] disabled:cursor-not-allowed disabled:bg-brand-900/40 disabled:shadow-none ${
            added
              ? "bg-brand-600 shadow-brand-600/25"
              : "bg-brand-900 shadow-brand-900/15 hover:bg-brand-800 hover:shadow-brand-900/25"
          }`}
        >
          {!product.inStock ? (
            "Out of stock"
          ) : added ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Added to bag
            </>
          ) : (
            `Add to bag · ${inr(product.price * qty)}`
          )}
        </button>
      </div>

      {product.inStock ? (
        <button
          onClick={handleBuyNow}
          className="press w-full rounded-full border border-line/15 bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-subtle"
        >
          Buy it now
        </button>
      ) : (
        <p className="rounded-xl bg-subtle px-4 py-3 text-center text-sm text-muted/60">
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
        <span className="text-xs font-semibold uppercase tracking-wider text-muted/50">
          {label}
        </span>
        {value && <span className="text-sm font-medium text-ink">{value}</span>}
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
                  : "border-line/15 bg-surface text-muted/80 hover:border-line/40"
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

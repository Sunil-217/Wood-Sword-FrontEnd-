"use client";

import { useEffect, useRef, useState } from "react";
import { inr } from "@/lib/format";
import type { Product } from "@/lib/types";

/**
 * Mobile buy bar. Slides up once the main add-to-bag button has scrolled
 * out of view, so the price and a way to buy are always one tap away.
 * Tapping it scrolls back to the real purchase panel, which owns the
 * size/colour selection.
 */
export function StickyBuyBar({ product }: { product: Product }) {
  const [shown, setShown] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const panel = document.getElementById("purchase-panel");
    if (!panel) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (ticking.current) return;
        ticking.current = true;
        requestAnimationFrame(() => {
          ticking.current = false;
          // Only once we're past it — not before the user has reached it.
          setShown(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        });
      },
      { threshold: 0 },
    );
    io.observe(panel);
    return () => io.disconnect();
  }, []);

  function goToPanel() {
    document
      .getElementById("purchase-panel")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (!product.inStock) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[75] border-t border-line/10 bg-surface/95 px-4 py-3 backdrop-blur transition-transform duration-300 [transition-timing-function:var(--ease-spring)] lg:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-muted/55">{product.brand}</p>
          <p className="font-display text-lg font-bold text-ink">
            {inr(product.price)}
          </p>
        </div>
        <button
          onClick={goToPanel}
          className="press btn-shine shrink-0 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25"
        >
          Add to bag
        </button>
      </div>
    </div>
  );
}

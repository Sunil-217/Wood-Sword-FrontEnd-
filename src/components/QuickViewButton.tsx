"use client";

import { useQuickView } from "@/context/QuickViewContext";
import type { Product } from "@/lib/types";

export function QuickViewButton({ product }: { product: Product }) {
  const { open } = useQuickView();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        open(product);
      }}
      aria-label={`Quick view ${product.name}`}
      className="press pointer-events-auto flex w-full items-center justify-center gap-1.5 rounded-full bg-surface/90 py-2 text-xs font-semibold text-ink shadow-sm backdrop-blur transition-colors hover:bg-surface"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      Quick view
    </button>
  );
}

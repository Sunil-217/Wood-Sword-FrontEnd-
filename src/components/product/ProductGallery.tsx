"use client";

import { useRef, useState } from "react";
import { ViewTransition } from "react";
import { useCatalog } from "@/context/CatalogContext";
import { ProductArt } from "@/components/ProductArt";
import { ProductBadge } from "@/components/ui/Badge";
import { discountPct } from "@/lib/format";
import type { Product } from "@/lib/types";

/**
 * Product visualisation.
 *
 * A photo can be inspected: the cursor drives a soft light across the frame,
 * and clicking magnifies around the pointer. Products that only have SVG
 * artwork show the single panel — the store has one image per product, so
 * there are no alternate views to offer.
 */
export function ProductGallery({ product: base }: { product: Product }) {
  const { getById, ready } = useCatalog();
  const product = (ready && getById(base.id)) || base;
  const off = discountPct(product.price, product.mrp);
  const hasPhoto = !!product.image;

  const frameRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const raf = useRef(0);

  function reduced() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const frame = frameRef.current;
    if (!frame) return;
    const r = frame.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      if (lightRef.current && !reduced()) {
        lightRef.current.style.opacity = "1";
        lightRef.current.style.background = `radial-gradient(28% 28% at ${x}% ${y}%, rgba(255,255,255,0.5), transparent 70%)`;
      }
      if (zoomRef.current && zoomed) {
        zoomRef.current.style.transformOrigin = `${x}% ${y}%`;
      }
    });
  }

  function onLeave() {
    if (lightRef.current) lightRef.current.style.opacity = "0";
    if (zoomRef.current) {
      zoomRef.current.style.transform = "";
      zoomRef.current.style.transformOrigin = "";
    }
    setZoomed(false);
  }

  function toggleZoom() {
    if (!hasPhoto) return;
    const next = !zoomed;
    setZoomed(next);
    if (zoomRef.current) {
      zoomRef.current.style.transform = next ? "scale(2)" : "";
    }
  }

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div
        ref={frameRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative overflow-hidden rounded-3xl border border-line/8 shadow-sm"
      >
        <div
          ref={zoomRef}
          className="transition-transform duration-[--duration-slow] ease-[--ease-emphasized] will-change-transform"
        >
          <ViewTransition name={`product-${product.slug}`} share="morph">
            <ProductArt
              art={product.art}
              accent={product.accent}
              image={product.image}
              label={product.name}
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="aspect-square w-full"
            />
          </ViewTransition>
        </div>

        {/* cursor-tracked highlight */}
        <div
          ref={lightRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-[--duration-normal]"
        />

        <div className="pointer-events-none absolute left-4 top-4 flex gap-2">
          {product.badge && <ProductBadge kind={product.badge} />}
          {off && <ProductBadge kind="Sale" />}
        </div>

        {hasPhoto && (
          <button
            type="button"
            onClick={toggleZoom}
            aria-pressed={zoomed}
            className="press absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-surface/85 px-3.5 py-2 text-xs font-semibold text-ink shadow-sm backdrop-blur transition-colors duration-[--duration-fast] hover:bg-surface"
          >
            {zoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
            {zoomed ? "Reset" : "Zoom"}
          </button>
        )}
      </div>
    </div>
  );
}

function ZoomInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M11 8v6M8 11h6M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function ZoomOutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M8 11h6M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

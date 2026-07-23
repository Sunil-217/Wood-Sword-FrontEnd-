"use client";

import { useCatalog } from "@/context/CatalogContext";
import { ProductArt } from "@/components/ProductArt";
import { ProductBadge } from "@/components/ui/Badge";
import { discountPct } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductGallery({ product: base }: { product: Product }) {
  const { getById, ready } = useCatalog();
  const product = (ready && getById(base.id)) || base;
  const off = discountPct(product.price, product.mrp);
  const hasImage = !!product.image;

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div className="relative overflow-hidden rounded-3xl border border-line/8 shadow-sm">
        <ProductArt
          art={product.art}
          accent={product.accent}
          image={product.image}
          label={product.name}
          className="aspect-square w-full"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          {product.badge && <ProductBadge kind={product.badge} />}
          {off && <ProductBadge kind="Sale" />}
        </div>
      </div>

      {/* Alternate-view thumbnails (only meaningful for the SVG artwork) */}
      {!hasImage && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {["Front", "Face", "Back", "Detail"].map((view, i) => (
            <div key={view} className="relative overflow-hidden rounded-xl border border-line/8" title={view}>
              <ProductArt
                art={product.art}
                accent={mixShade(product.accent, i)}
                label={`${product.name} ${view}`}
                className="aspect-square w-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function mixShade(hex: string, i: number): string {
  const tones = [
    hex,
    blend(hex, "#ffffff", 0.16),
    blend(hex, "#0b1524", 0.18),
    blend(hex, "#ffffff", 0.28),
  ];
  return tones[i] ?? hex;
}

function blend(a: string, b: string, t: number): string {
  const pa = parse(a);
  const pb = parse(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `#${[r, g, bl].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

function parse(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

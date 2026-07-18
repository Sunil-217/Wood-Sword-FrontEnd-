import Link from "next/link";
import type { Product } from "@/lib/types";
import { inr, discountPct } from "@/lib/format";
import { ProductArt } from "./ProductArt";
import { Rating } from "./ui/Rating";
import { ProductBadge } from "./ui/Badge";
import { QuickAdd } from "./QuickAdd";

export function ProductCard({ product }: { product: Product }) {
  const off = discountPct(product.price, product.mrp);
  const href = `/product/${product.slug}`;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-900/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-900/15 hover:shadow-xl hover:shadow-brand-900/10">
      <Link href={href} className="relative block aspect-square overflow-hidden">
        <ProductArt
          art={product.art}
          accent={product.accent}
          label={product.name}
          className="h-full w-full transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badge && <ProductBadge kind={product.badge} />}
          {off && !product.badge && <ProductBadge kind="Sale" />}
        </div>
        {off && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[11px] font-bold text-ball-600 shadow-sm backdrop-blur">
            -{off}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-500">
          {product.brand}
        </p>
        <h3 className="mt-0.5 font-display text-[15px] font-semibold leading-snug text-brand-950">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-brand-900/55">{product.tagline}</p>

        <div className="mt-2">
          <Rating value={product.rating} reviews={product.reviews} />
        </div>

        <div className="mt-3 flex items-end justify-between gap-1.5">
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
            <span className="font-display text-base font-bold text-brand-950 sm:text-lg">
              {inr(product.price)}
            </span>
            {product.mrp && (
              <span className="text-xs text-brand-900/40 line-through sm:text-sm">
                {inr(product.mrp)}
              </span>
            )}
          </div>
          {/* z-10 keeps the button above the card-wide link overlay */}
          <div className="relative z-10">
            <QuickAdd
              product={{
                id: product.id,
                slug: product.slug,
                name: product.name,
                brand: product.brand,
                art: product.art,
                accent: product.accent,
                price: product.price,
                size: product.sizes[0],
                color: product.colors[0],
                hand: product.hands?.[0],
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

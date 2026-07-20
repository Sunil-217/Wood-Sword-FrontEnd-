import Link from "next/link";
import type { Product } from "@/lib/types";
import { inr, discountPct } from "@/lib/format";
import { ProductArt } from "./ProductArt";
import { Rating } from "./ui/Rating";
import { ProductBadge } from "./ui/Badge";
import { QuickAdd } from "./QuickAdd";
import { WishlistButton } from "./WishlistButton";

/**
 * Card titles drop a trailing "(variant)" so grid rows stay tidy —
 * the full name still shows on the product page, and the variant
 * lives in the subtitle line.
 */
function splitName(name: string): { base: string; variant?: string } {
  const m = name.match(/^(.*)\s\(([^()]+)\)$/);
  if (!m) return { base: name };
  return { base: m[1], variant: m[2] };
}

export function ProductCard({ product }: { product: Product }) {
  const off = discountPct(product.price, product.mrp);
  const href = `/product/${product.slug}`;
  const { base, variant } = splitName(product.name);

  return (
    <article className="group relative flex transform-gpu flex-col overflow-hidden rounded-2xl border border-line/8 bg-surface shadow-sm transition-all duration-500 [transition-timing-function:var(--ease-spring)] hover:-translate-y-1.5 hover:border-line/15 hover:shadow-xl hover:shadow-brand-900/10">
      <Link href={href} className="relative block aspect-square overflow-hidden">
        <ProductArt
          art={product.art}
          accent={product.accent}
          label={product.name}
          className="h-full w-full transform-gpu transition-transform duration-700 [transition-timing-function:var(--ease-spring)] group-hover:scale-[1.07]"
        />
        <span className="sheen" aria-hidden />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badge && <ProductBadge kind={product.badge} />}
          {off && !product.badge && <ProductBadge kind="Sale" />}
          {off && (
            <span className="rounded-full bg-white/90 px-2 py-1 text-[11px] font-bold text-ball-600 shadow-sm backdrop-blur">
              -{off}%
            </span>
          )}
        </div>
        {!product.inStock && (
          <span className="absolute inset-x-3 bottom-3 rounded-full bg-brand-950/80 px-3 py-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
            Out of stock
          </span>
        )}
      </Link>

      {/* wishlist heart — above the card-wide link overlay */}
      <div className="absolute right-3 top-3 z-10">
        <WishlistButton slug={product.slug} name={base} />
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
          {product.brand}
        </p>
        <h3 className="mt-0.5 line-clamp-2 min-h-[2.4em] font-display text-[15px] font-semibold leading-snug text-ink">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {base}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-muted/55">
          {variant ?? product.tagline}
        </p>

        <div className="mt-2">
          <Rating value={product.rating} reviews={product.reviews} />
        </div>

        <div className="mt-auto flex items-end justify-between gap-1.5 pt-3">
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
            <span className="font-display text-base font-bold text-ink sm:text-lg">
              {inr(product.price)}
            </span>
            {product.mrp && (
              <span className="text-xs text-muted/40 line-through sm:text-sm">
                {inr(product.mrp)}
              </span>
            )}
          </div>
          {/* z-10 keeps the button above the card-wide link overlay */}
          {product.inStock && (
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
          )}
        </div>
      </div>
    </article>
  );
}

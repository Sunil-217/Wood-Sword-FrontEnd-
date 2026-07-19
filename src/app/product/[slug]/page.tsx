import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";
import { Rating } from "@/components/ui/Rating";
import { ProductBadge } from "@/components/ui/Badge";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductActions } from "@/components/product/ProductActions";
import { getProduct, products, relatedProducts, categoryMap } from "@/lib/catalog";
import { discountPct, inr } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — ${categoryMap[product.category].name}`,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const off = discountPct(product.price, product.mrp);
  const category = categoryMap[product.category];
  const related = relatedProducts(product, 4);

  return (
    <Container className="py-8 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-brand-900/50">
        <Link href="/" className="hover:text-brand-700">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-brand-700">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-brand-700">
          {category.name}
        </Link>
        <span>/</span>
        <span className="text-brand-900/80">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-3xl border border-brand-900/8 shadow-sm">
            <ProductArt
              art={product.art}
              accent={product.accent}
              label={product.name}
              className="aspect-square w-full"
            />
            <div className="absolute left-4 top-4 flex gap-2">
              {product.badge && <ProductBadge kind={product.badge} />}
              {off && <ProductBadge kind="Sale" />}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {["Front", "Face", "Back", "Detail"].map((view, i) => (
              <div
                key={view}
                className="relative overflow-hidden rounded-xl border border-brand-900/8"
                title={view}
              >
                <ProductArt
                  art={product.art}
                  accent={mixShade(product.accent, i)}
                  label={`${product.name} ${view}`}
                  className="aspect-square w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">
            {product.brand} · {category.name}
          </p>
          <h1 className="title-fluid mt-1.5 font-display font-extrabold tracking-tight text-brand-950">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-brand-900/60">{product.tagline}</p>

          <div className="mt-3">
            <Rating value={product.rating} reviews={product.reviews} size="md" />
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-brand-950">
              {inr(product.price)}
            </span>
            {product.mrp && (
              <span className="text-lg text-brand-900/40 line-through">{inr(product.mrp)}</span>
            )}
            {off && (
              <span className="rounded-full bg-ball-500/10 px-2.5 py-1 text-sm font-bold text-ball-600">
                Save {off}%
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-brand-900/45">Inclusive of all taxes · Free shipping over ₹2,000</p>

          <div className="my-7 h-px bg-brand-900/8" />

          <ProductActions product={product} />

          {/* Trust row */}
          <div className="mt-7 grid grid-cols-3 gap-3">
            {[
              { t: "Free shipping", s: "Over ₹2,000" },
              { t: "7-day returns", s: "No questions" },
              { t: "Secure checkout", s: "100% safe" },
            ].map((x) => (
              <div key={x.t} className="rounded-xl border border-brand-900/8 bg-white px-3 py-3 text-center">
                <p className="text-xs font-semibold text-brand-950">{x.t}</p>
                <p className="text-[11px] text-brand-900/50">{x.s}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mt-8 rounded-2xl border border-brand-900/8 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-brand-950">Why you&apos;ll love it</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-900/65">{product.description}</p>
            <ul className="mt-4 space-y-2.5">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-brand-900/80">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold tracking-tight text-brand-950">
            You might also like
          </h2>
          <div className="mt-6">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </Container>
  );
}

/** Slightly vary the accent so gallery thumbnails read as alternate views. */
function mixShade(hex: string, i: number): string {
  const tones = [
    hex,
    blend(hex, "#ffffff", 0.16),
    blend(hex, "#0a2016", 0.18),
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
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

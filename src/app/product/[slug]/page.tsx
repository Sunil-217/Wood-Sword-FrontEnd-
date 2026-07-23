import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Rating } from "@/components/ui/Rating";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductReviews } from "@/components/product/ProductReviews";
import { getProduct, products, relatedProducts, categoryMap } from "@/lib/catalog";

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

  const category = categoryMap[product.category];
  const related = relatedProducts(product, 4);

  return (
    <Container className="py-8 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted/50">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-accent">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-accent">
          {category.name}
        </Link>
        <span>/</span>
        <span className="text-muted/80">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Gallery (client — reflects admin-uploaded photos) */}
        <ProductGallery product={product} />

        {/* Info */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            {product.brand} · {category.name}
          </p>
          <h1 className="title-fluid mt-1.5 font-display font-extrabold tracking-tight text-ink">
            {product.name}
          </h1>
          <div className="seam-stitch mt-3 w-16" aria-hidden />
          <p className="mt-2 text-sm text-muted/60">{product.tagline}</p>

          <div className="mt-3">
            <Rating value={product.rating} reviews={product.reviews} size="md" />
          </div>

          <ProductPurchase product={product} />

          {/* Trust row */}
          <div className="mt-7 grid grid-cols-3 gap-3">
            {[
              { t: "Free shipping", s: "Over ₹2,000" },
              { t: "7-day returns", s: "No questions" },
              { t: "Secure checkout", s: "100% safe" },
            ].map((x) => (
              <div key={x.t} className="rounded-xl border border-line/8 bg-surface px-3 py-3 text-center">
                <p className="text-xs font-semibold text-ink">{x.t}</p>
                <p className="text-[11px] text-muted/50">{x.s}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mt-8 rounded-2xl border border-line/8 bg-surface p-6">
            <h2 className="font-display text-lg font-bold text-ink">Why you&apos;ll love it</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted/65">{product.description}</p>
            <ul className="mt-4 space-y-2.5">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-muted/80">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-accent">
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

      {/* Reviews */}
      <ProductReviews product={product} />

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
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

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";
import { groups, productsByGroup } from "@/lib/catalog";

/**
 * Editorial break between the product sections — oversized type over a
 * dark field, with three sports pulled from the catalog so the imagery is
 * always something the store actually stocks.
 */
const SHOWCASE = ["cricket", "badminton", "football"] as const;

export function BrandStatement() {
  const picks = SHOWCASE.map((slug) => {
    const group = groups.find((g) => g.slug === slug);
    const hero = group
      ? productsByGroup(group.slug).find((p) => p.image) ??
        productsByGroup(group.slug)[0]
      : undefined;
    return group && hero ? { group, hero } : null;
  }).filter(Boolean) as { group: (typeof groups)[number]; hero: NonNullable<ReturnType<typeof productsByGroup>[number]> }[];

  return (
    <section className="grain aurora-field relative overflow-hidden bg-brand-950 text-white">
      <Container className="relative py-20 sm:py-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
          The Oneup standard
        </p>

        <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.25rem,6.5vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-tight">
          Built for the
          <br />
          <span className="bg-gradient-to-r from-brand-400 via-gold-400 to-gold-500 bg-clip-text text-transparent">
            next generation.
          </span>
        </h2>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-white/60">
          Fourteen sports under one roof in Chromepet — from a child&apos;s
          first racquet to a tournament cleft. Every English willow bat is
          ping-tested and knocked in by hand before it leaves the counter.
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {picks.map(({ group, hero }) => {
            const count = productsByGroup(group.slug).length;
            return (
              <Link
                key={group.slug}
                href={`/shop?group=${group.slug}`}
                className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 transition-transform duration-[--duration-normal] ease-[--ease-emphasized] hover:-translate-y-1"
              >
                <div className="holo relative">
                  <ProductArt
                    art={hero.art}
                    accent={hero.accent}
                    image={hero.image}
                    label={`${group.name} at Oneup Sports`}
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="aspect-[4/5] w-full transition-transform duration-[--duration-slow] ease-[--ease-emphasized] group-hover:scale-105"
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/25 to-transparent"
                />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="font-display text-2xl font-extrabold uppercase tracking-tight">
                    {group.name}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/50">
                    {count} products
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

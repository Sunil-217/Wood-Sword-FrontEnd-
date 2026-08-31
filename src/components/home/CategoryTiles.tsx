import Link from "next/link";
import { categoriesInGroup, groups, productsByGroup } from "@/lib/catalog";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";
import { TiltCard } from "@/components/fx/TiltCard";
import { SectionHeading } from "./SectionHeading";

export function CategoryTiles() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Shop by sport"
        title="Fourteen sports, one store"
        subtitle="From willow to wicket-keeping, racquets to running shoes."
        href="/shop"
        linkLabel="Browse all"
      />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {groups.map((g, i) => {
          const leaves = categoriesInGroup(g.slug);
          const count = productsByGroup(g.slug).length;
          const href =
            leaves.length === 1
              ? `/shop?category=${leaves[0].slug}`
              : `/shop?group=${g.slug}`;
          return (
            <TiltCard
              key={g.slug}
              maxTilt={5}
              className={i === 0 ? "col-span-2 row-span-2" : ""}
            >
              <Link
                href={href}
                className={`group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-line/8 p-4 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-900/10 ${
                  i === 0 ? "min-h-56 lg:min-h-full" : "min-h-40"
                }`}
              >
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                  <ProductArt art={g.art} accent={g.accent} label={g.name} className="h-full w-full" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent" />
                <span className="sheen" aria-hidden />

                {/* live product count */}
                <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white/85 backdrop-blur-sm">
                  {count} items
                </span>

                <div className="relative">
                  <h3 className="font-display text-lg font-bold text-white drop-shadow-sm">
                    {g.name}
                  </h3>
                  {i === 0 && (
                    <p className="mt-1 max-w-[16rem] text-sm text-white/80">{g.blurb}</p>
                  )}
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gold-300">
                    Shop now
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </TiltCard>
          );
        })}
      </div>
    </Container>
  );
}

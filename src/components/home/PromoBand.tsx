import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";

export function PromoBand() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Custom bats */}
        <div className="relative overflow-hidden rounded-3xl bg-brand-900 p-8 text-white sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gold-500/20 blur-2xl" />
          <div className="relative max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
              Made to order
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              Custom English willow bats
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-100/70">
              Pick your cleft, weight, profile and stickers. Our Meerut
              craftsmen build it by hand and knock it in before it ships.
            </p>
            <Link
              href="/shop?category=bats"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-brand-950 transition-transform hover:scale-[1.03]"
            >
              Start your build
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="pointer-events-none absolute -bottom-6 -right-4 w-40 rotate-[-14deg] opacity-90 sm:w-52">
            <ProductArt art="bat" accent="#e0a82e" className="aspect-square rounded-2xl" label="Custom bat" />
          </div>
        </div>

        {/* Protection bundle */}
        <div className="relative overflow-hidden rounded-3xl border border-brand-900/10 bg-white p-8 sm:p-10">
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-56 w-56 rounded-full bg-brand-500/10 blur-2xl" />
          <div className="relative max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">
              Save when you kit up
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-brand-950 sm:text-3xl">
              Protection bundles from ₹4,999
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-900/60">
              Helmet, gloves and pads matched and bundled — everything you need
              to face the quicks, for less than buying separately.
            </p>
            <Link
              href="/shop?category=helmets"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Shop protection
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="pointer-events-none absolute -bottom-4 -right-2 flex w-48 gap-1 sm:w-60">
            <div className="w-1/2 rotate-[8deg]">
              <ProductArt art="helmet" accent="#3b4252" className="aspect-square rounded-2xl" label="Helmet" />
            </div>
            <div className="w-1/2 -rotate-[6deg]">
              <ProductArt art="pads" accent="#2f6fb0" className="aspect-square rounded-2xl" label="Pads" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

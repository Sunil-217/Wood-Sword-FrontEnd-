"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/ProductGrid";
import { useWishlist } from "@/context/WishlistContext";
import { getProduct } from "@/lib/catalog";

export default function WishlistPage() {
  const { slugs, ready, clear } = useWishlist();
  const items = slugs.map(getProduct).filter((p) => p != null);

  if (!ready) {
    return (
      <Container className="py-16">
        <div className="skeleton mx-auto h-40 max-w-md rounded-2xl" />
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-20">
        <div className="mx-auto max-w-md text-center">
          <p className="font-display text-[clamp(2rem,7vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight text-transparent [-webkit-text-stroke:2px_color-mix(in_srgb,var(--color-ink)_22%,transparent)]">
            No gear
            <br />
            saved yet.
          </p>
          <div className="speed-dash mx-auto mt-6 w-fit" aria-hidden>
            <i />
          </div>
          <div className="mx-auto mt-8 flex h-20 w-20 items-center justify-center rounded-full bg-subtle text-ball-400">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 20.5l-1.45-1.32C5.4 14.5 2 11.4 2 7.6 2 4.8 4.2 2.7 7 2.7c1.55 0 3.04.72 4 1.86.96-1.14 2.45-1.86 4-1.86 2.8 0 5 2.1 5 4.9 0 3.8-3.4 6.9-8.55 11.58L12 20.5z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="mt-6 font-display text-xl font-bold text-ink">
            Saved gear
          </h1>
          <p className="mt-2 text-sm text-muted/55">
            Tap the heart on any product and it waits for you here.
          </p>
          <Link
            href="/shop"
            className="press mt-6 inline-flex items-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Return to sports
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 sm:py-10">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            {items.length} {items.length === 1 ? "piece" : "pieces"}
          </p>
          <h1 className="title-fluid mt-1 font-display font-extrabold uppercase tracking-tight text-ink">
            Saved gear
          </h1>
          <div className="speed-dash mt-3" aria-hidden>
            <i />
          </div>
        </div>
        <button
          onClick={clear}
          className="text-sm font-medium text-muted/50 transition-colors hover:text-ball-500"
        >
          Clear all
        </button>
      </div>

      <div className="mt-8">
        <ProductGrid products={items} spotlight />
      </div>
    </Container>
  );
}

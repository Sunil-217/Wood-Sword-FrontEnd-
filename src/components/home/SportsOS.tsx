"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";
import {
  categoriesInGroup,
  groups,
  productsByGroup,
} from "@/lib/catalog";

/**
 * Sports selector. One sport is active at a time; selecting it re-lights the
 * panel in that sport's accent and swaps in its real category and product
 * counts. Everything shown here is derived from the catalog — no invented
 * figures.
 */
export function SportsOS() {
  const [active, setActive] = useState(0);
  const group = groups[active];
  const leaves = categoriesInGroup(group.slug);
  const items = productsByGroup(group.slug);
  const featured = items.slice(0, 3);

  const index = String(active + 1).padStart(2, "0");
  const total = String(groups.length).padStart(2, "0");

  return (
    <section
      id="sports-os"
      aria-labelledby="sports-os-heading"
      style={{ scrollMarginTop: "5rem", "--sport": group.accent } as React.CSSProperties}
      className="relative overflow-hidden border-y border-line/10 bg-brand-950 text-white"
    >
      {/* accent wash — re-lights as the selection changes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 transition-[background] duration-[--duration-slow] ease-[--ease-emphasized]"
        style={{
          background:
            "radial-gradient(60rem 30rem at 15% 0%, color-mix(in oklab, var(--sport) 30%, transparent), transparent 70%)",
        }}
      />

      <Container className="relative py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="sports-os-heading"
              className="font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl"
            >
              Sports OS
            </h2>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
              Select your game
            </p>
          </div>
          <p className="font-display text-sm tabular-nums text-white/40">
            {index} <span className="text-white/25">/ {total}</span>
          </p>
        </div>

        {/* Selector rail */}
        <div
          role="tablist"
          aria-label="Sports"
          className="scrollbar-none -mx-4 mt-8 overflow-x-auto px-4 [scroll-snap-type:x_proximity]"
        >
          <div className="flex w-max gap-2">
            {groups.map((g, i) => {
              const on = i === active;
              return (
                <button
                  key={g.slug}
                  role="tab"
                  aria-selected={on}
                  aria-controls="sports-os-panel"
                  onClick={() => setActive(i)}
                  style={on ? { background: g.accent } : undefined}
                  className={`press min-h-11 whitespace-nowrap rounded-full px-5 py-2.5 [scroll-snap-align:center] text-sm font-semibold transition-[background-color,color,transform] duration-[--duration-fast] ease-[--ease-standard] ${
                    on
                      ? "scale-105 text-white"
                      : "bg-white/5 text-white/45 opacity-60 ring-1 ring-white/10 hover:bg-white/10 hover:text-white hover:opacity-100"
                  }`}
                >
                  {g.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active sport panel */}
        <div
          id="sports-os-panel"
          role="tabpanel"
          key={group.slug}
          className="animate-rise mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center"
        >
          <div>
            <h3 className="font-display text-5xl font-extrabold uppercase leading-none tracking-tight sm:text-6xl">
              {group.name}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              {group.blurb}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <Metric label="Products" value={items.length} />
              <Metric label="Categories" value={leaves.length} />
            </dl>

            <div className="mt-8 flex flex-wrap gap-2">
              {leaves.slice(0, 5).map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop?category=${c.slug}`}
                  className="press rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/70 ring-1 ring-white/10 transition-colors duration-[--duration-fast] hover:bg-white/12 hover:text-white"
                >
                  {c.name}
                </Link>
              ))}
            </div>

            <Link
              href={`/shop?group=${group.slug}`}
              className="press btn-shine mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg"
              style={{
                background: group.accent,
                boxShadow: `0 10px 30px -10px ${group.accent}`,
              }}
            >
              Browse {group.name.toLowerCase()}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Featured pieces from this sport */}
          <ul className="grid grid-cols-3 gap-3 sm:gap-4">
            {featured.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/product/${p.slug}`}
                  className="group block overflow-hidden rounded-2xl ring-1 ring-white/10 transition-transform duration-[--duration-normal] ease-[--ease-emphasized] hover:-translate-y-1"
                >
                  <ProductArt
                    art={p.art}
                    accent={p.accent}
                    image={p.image}
                    label={p.name}
                    sizes="(max-width: 1024px) 30vw, 16vw"
                    className="aspect-square w-full"
                  />
                  <span className="block bg-white/5 px-3 py-2.5">
                    <span className="block truncate text-[11px] font-semibold uppercase tracking-wide text-white/45">
                      {p.brand}
                    </span>
                    <span className="mt-0.5 block truncate text-xs font-medium text-white/85">
                      {p.name}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
        {label}
      </dt>
      <dd className="mt-1 font-display text-3xl font-bold tabular-nums text-white">
        {value}
      </dd>
    </div>
  );
}

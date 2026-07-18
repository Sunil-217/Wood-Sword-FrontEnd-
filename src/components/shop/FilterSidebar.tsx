"use client";

import Link from "next/link";
import { useState } from "react";
import { buildQuery, PRICE_BUCKETS, parseList, toggleInList } from "@/lib/filters";
import { categories } from "@/lib/catalog";

interface Props {
  params: Record<string, string>;
  sizeOptions: string[];
  handOptions: string[];
  categoryCounts: Record<string, number>;
}

export function FilterSidebar({ params, sizeOptions, handOptions, categoryCounts }: Props) {
  const [open, setOpen] = useState(false);

  const activeSizes = parseList(params.size);
  const activeHands = parseList(params.hand);
  const activeCount =
    (params.category ? 1 : 0) +
    (params.price ? 1 : 0) +
    activeSizes.length +
    activeHands.length;

  function hrefWith(mut: Record<string, string | undefined>): string {
    const merged: Record<string, string> = { ...params };
    for (const [k, v] of Object.entries(mut)) {
      if (!v) delete merged[k];
      else merged[k] = v;
    }
    return `/shop${buildQuery(merged)}`;
  }

  const clearHref = `/shop${buildQuery({
    ...(params.q ? { q: params.q } : {}),
    ...(params.sort ? { sort: params.sort } : {}),
  })}`;

  return (
    <div className="lg:sticky lg:top-24">
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="mb-4 flex w-full items-center justify-between rounded-xl border border-brand-900/12 bg-white px-4 py-3 text-sm font-semibold text-brand-900 lg:hidden"
      >
        <span className="flex items-center gap-2">
          <FilterIcon />
          Filters {activeCount > 0 && `(${activeCount})`}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={open ? "rotate-180" : ""}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className={`${open ? "block" : "hidden"} space-y-7 rounded-2xl border border-brand-900/8 bg-white p-5 lg:block`}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-brand-950">Filters</h2>
          {activeCount > 0 && (
            <Link href={clearHref} className="text-xs font-semibold text-ball-500 hover:underline">
              Clear all
            </Link>
          )}
        </div>

        {/* Category */}
        <FilterGroup title="Category">
          <ul className="space-y-1">
            {categories.map((c) => {
              const active = params.category === c.slug;
              const count = categoryCounts[c.slug] ?? 0;
              return (
                <li key={c.slug}>
                  <Link
                    href={hrefWith({ category: active ? undefined : c.slug, size: undefined, hand: undefined })}
                    className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                      active
                        ? "bg-brand-900 font-semibold text-white"
                        : "text-brand-900/80 hover:bg-brand-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="inline-block h-3 w-1 rounded-full" style={{ background: c.accent }} />
                      {c.name}
                    </span>
                    <span className={active ? "text-white/60" : "text-brand-900/40"}>{count}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </FilterGroup>

        {/* Price */}
        <FilterGroup title="Price">
          <div className="space-y-1.5">
            {PRICE_BUCKETS.map((b) => {
              const active = params.price === b.value;
              return (
                <Link
                  key={b.value}
                  href={hrefWith({ price: active ? undefined : b.value })}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                    active ? "text-brand-950" : "text-brand-900/75 hover:bg-brand-50"
                  }`}
                >
                  <span
                    className={`inline-flex h-4 w-4 items-center justify-center rounded-full border ${
                      active ? "border-brand-700 bg-brand-700" : "border-brand-900/30"
                    }`}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                  {b.label}
                </Link>
              );
            })}
          </div>
        </FilterGroup>

        {/* Size */}
        {sizeOptions.length > 0 && (
          <FilterGroup title="Size">
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((s) => {
                const active = activeSizes.includes(s);
                return (
                  <Link
                    key={s}
                    href={hrefWith({ size: toggleInList(params.size, s) })}
                    aria-pressed={active}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? "border-brand-900 bg-brand-900 text-white"
                        : "border-brand-900/15 text-brand-900/80 hover:border-brand-900/40"
                    }`}
                  >
                    {s}
                  </Link>
                );
              })}
            </div>
          </FilterGroup>
        )}

        {/* Hand */}
        {handOptions.length > 0 && (
          <FilterGroup title="Hand">
            <div className="flex flex-wrap gap-2">
              {handOptions.map((h) => {
                const active = activeHands.includes(h);
                return (
                  <Link
                    key={h}
                    href={hrefWith({ hand: toggleInList(params.hand, h) })}
                    aria-pressed={active}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? "border-brand-900 bg-brand-900 text-white"
                        : "border-brand-900/15 text-brand-900/80 hover:border-brand-900/40"
                    }`}
                  >
                    {h}
                  </Link>
                );
              })}
            </div>
          </FilterGroup>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-brand-900/50">
        {title}
      </h3>
      {children}
    </div>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

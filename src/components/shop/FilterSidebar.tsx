"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { buildQuery, PRICE_BUCKETS, parseList, toggleInList } from "@/lib/filters";
import { categoriesInGroup, categoryMap, groups } from "@/lib/catalog";
import type { CategorySlug } from "@/lib/types";

interface Props {
  params: Record<string, string>;
  sizeOptions: string[];
  handOptions: string[];
  categoryCounts: Record<string, number>;
}

export function FilterSidebar({ params, sizeOptions, handOptions, categoryCounts }: Props) {
  const [open, setOpen] = useState(false);

  // The group owning the active category (or the active group) is open by
  // default; `overrides` records the user's explicit open/close clicks so the
  // toggle always works, active group included.
  const activeGroup =
    params.group ??
    (params.category ? categoryMap[params.category as CategorySlug]?.group : undefined);
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});

  function toggleGroup(slug: string, defaultOpen: boolean) {
    setOverrides((prev) => ({ ...prev, [slug]: !(prev[slug] ?? defaultOpen) }));
  }

  // Navigating into a group re-opens it even if it was collapsed earlier.
  useEffect(() => {
    if (!activeGroup) return;
    setOverrides((prev) => {
      if (!(activeGroup in prev)) return prev;
      const next = { ...prev };
      delete next[activeGroup];
      return next;
    });
  }, [activeGroup]);

  const activeSizes = parseList(params.size);
  const activeHands = parseList(params.hand);
  const activeCount =
    (params.category ? 1 : 0) +
    (params.group ? 1 : 0) +
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
        className="mb-4 flex w-full items-center justify-between rounded-xl border border-line/12 bg-surface px-4 py-3 text-sm font-semibold text-ink lg:hidden"
      >
        <span className="flex items-center gap-2">
          <FilterIcon />
          Filters {activeCount > 0 && `(${activeCount})`}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={open ? "rotate-180" : ""}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className={`${open ? "block" : "hidden"} space-y-7 overscroll-contain rounded-2xl border border-line/8 bg-surface p-5 lg:block lg:max-h-[calc(100vh-7.5rem)] lg:overflow-y-auto`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-ink">Filters</h2>
          {activeCount > 0 && (
            <Link href={clearHref} className="text-xs font-semibold text-ball-500 hover:underline">
              Clear all
            </Link>
          )}
        </div>

        {/* Categories, grouped like the store menu */}
        <FilterGroup title="Category">
          <div className="space-y-4">
            {groups.map((g) => {
              const leaves = categoriesInGroup(g.slug);
              const groupActive = params.group === g.slug;
              const groupCount = leaves.reduce((n, c) => n + (categoryCounts[c.slug] ?? 0), 0);
              // Single-category groups render as one row
              if (leaves.length === 1) {
                const c = leaves[0];
                const active = params.category === c.slug;
                return (
                  <CategoryRow
                    key={g.slug}
                    href={hrefWith({
                      category: active ? undefined : c.slug,
                      group: undefined,
                      size: undefined,
                      hand: undefined,
                    })}
                    active={active}
                    accent={c.accent}
                    label={c.name}
                    count={categoryCounts[c.slug] ?? 0}
                  />
                );
              }
              const defaultOpen = g.slug === activeGroup;
              const isExpanded = overrides[g.slug] ?? defaultOpen;
              return (
                <div key={g.slug}>
                  {/* whole header is the dropdown toggle */}
                  <button
                    type="button"
                    onClick={() => toggleGroup(g.slug, defaultOpen)}
                    aria-expanded={isExpanded}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      groupActive
                        ? "bg-brand-900 text-white"
                        : "text-muted/50 hover:bg-subtle hover:text-muted/80"
                    }`}
                  >
                    {g.name}
                    <span className="flex items-center gap-2">
                      <span className={groupActive ? "text-white/60" : "text-muted/35"}>
                        {groupCount}
                      </span>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <ul className="mt-1 space-y-0.5 overflow-hidden">
                      {/* filter by the whole group */}
                      <li>
                        <CategoryRow
                          href={hrefWith({
                            group: groupActive ? undefined : g.slug,
                            category: undefined,
                            size: undefined,
                            hand: undefined,
                          })}
                          active={groupActive}
                          accent={g.accent}
                          label={`All ${g.name}`}
                          count={groupCount}
                          indent
                        />
                      </li>
                      {leaves.map((c) => {
                        const active = params.category === c.slug;
                        return (
                          <li key={c.slug}>
                            <CategoryRow
                              href={hrefWith({
                                category: active ? undefined : c.slug,
                                group: undefined,
                                size: undefined,
                                hand: undefined,
                              })}
                              active={active}
                              accent={c.accent}
                              label={c.name}
                              count={categoryCounts[c.slug] ?? 0}
                              indent
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
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
                    active ? "text-ink" : "text-muted/75 hover:bg-subtle"
                  }`}
                >
                  <span
                    className={`inline-flex h-4 w-4 items-center justify-center rounded-full border ${
                      active ? "border-brand-700 bg-brand-700" : "border-line/30"
                    }`}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-surface" />}
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
                        : "border-line/15 text-muted/80 hover:border-line/40"
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
                        : "border-line/15 text-muted/80 hover:border-line/40"
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

function CategoryRow({
  href,
  active,
  accent,
  label,
  count,
  indent = false,
}: {
  href: string;
  active: boolean;
  accent: string;
  label: string;
  count: number;
  indent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-lg py-1.5 pr-2.5 text-sm transition-colors ${
        indent ? "pl-4" : "pl-2.5"
      } ${
        active ? "bg-brand-900 font-semibold text-white" : "text-muted/80 hover:bg-subtle"
      }`}
    >
      <span className="flex items-center gap-2">
        <span className="inline-block h-3 w-1 rounded-full" style={{ background: accent }} />
        {label}
      </span>
      <span className={active ? "text-white/60" : "text-muted/40"}>{count}</span>
    </Link>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted/50">
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

import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/ProductGrid";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SortSelect } from "@/components/shop/SortSelect";
import { categories, categoryMap, groupMap, products } from "@/lib/catalog";
import {
  buildQuery,
  parseList,
  PRICE_BUCKETS,
  sortProducts,
  toggleInList,
  type SortKey,
} from "@/lib/filters";
import type { CategorySlug, GroupSlug } from "@/lib/types";

export const metadata: Metadata = {
  title: "Shop cricket gear",
};

type SP = Record<string, string | string[] | undefined>;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;

  // normalise into a flat string map for URL building
  const params: Record<string, string> = {};
  for (const [k, v] of Object.entries(sp)) {
    if (v == null) continue;
    params[k] = Array.isArray(v) ? v.join(",") : v;
  }

  const category =
    params.category && params.category in categoryMap
      ? (params.category as CategorySlug)
      : undefined;
  const group =
    !category && params.group && params.group in groupMap
      ? (params.group as GroupSlug)
      : undefined;
  const q = params.q?.trim().toLowerCase();
  const price = params.price;
  const sizes = parseList(params.size);
  const hands = parseList(params.hand);
  const sort = (params.sort as SortKey) || "featured";

  const bucket = PRICE_BUCKETS.find((b) => b.value === price);

  // Base set = search + price (used for category counts + facets)
  const base = products.filter((p) => {
    if (q) {
      const hay =
        `${p.name} ${p.brand} ${p.tagline} ${p.description} ${categoryMap[p.category].name} ${groupMap[categoryMap[p.category].group].name}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (bucket && !bucket.test(p.price)) return false;
    return true;
  });

  const categoryCounts: Record<string, number> = {};
  for (const c of categories) {
    categoryCounts[c.slug] = base.filter((p) => p.category === c.slug).length;
  }

  const inScope = category
    ? base.filter((p) => p.category === category)
    : group
      ? base.filter((p) => categoryMap[p.category].group === group)
      : base;

  // Facets from the scoped set (stable regardless of size/hand picks)
  const sizeOptions = uniq(inScope.flatMap((p) => p.sizes));
  const handOptions = uniq(inScope.flatMap((p) => p.hands ?? []));

  let list = inScope;
  if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
  if (hands.length) list = list.filter((p) => (p.hands ?? []).some((h) => hands.includes(h)));
  list = sortProducts(list, sort);

  const heading = category
    ? categoryMap[category].name
    : group
      ? groupMap[group].name
      : q
        ? `Results for “${params.q}”`
        : "All gear";
  const blurb = category
    ? categoryMap[category].blurb
    : group
      ? groupMap[group].blurb
      : "Every piece of kit, in one place.";

  // active filter chips (removal links, computed server-side)
  const chips: { label: string; href: string }[] = [];
  if (category) {
    chips.push({
      label: categoryMap[category].name,
      href: `/shop${buildQuery(without(params, "category", "size", "hand"))}`,
    });
  }
  if (group) {
    chips.push({
      label: groupMap[group].name,
      href: `/shop${buildQuery(without(params, "group", "size", "hand"))}`,
    });
  }
  if (bucket) {
    chips.push({ label: bucket.label, href: `/shop${buildQuery(without(params, "price"))}` });
  }
  for (const s of sizes) {
    chips.push({
      label: s,
      href: `/shop${buildQuery({ ...params, size: toggleInList(params.size, s) })}`,
    });
  }
  for (const h of hands) {
    chips.push({
      label: h,
      href: `/shop${buildQuery({ ...params, hand: toggleInList(params.hand, h) })}`,
    });
  }

  return (
    <Container className="py-8 sm:py-10">
      {/* Breadcrumb + header */}
      <nav className="flex items-center gap-1.5 text-xs text-brand-900/50">
        <Link href="/" className="hover:text-brand-700">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-brand-700">Shop</Link>
        {category && (
          <>
            <span>/</span>
            <Link
              href={`/shop?group=${categoryMap[category].group}`}
              className="hover:text-brand-700"
            >
              {groupMap[categoryMap[category].group].name}
            </Link>
            <span>/</span>
            <span className="text-brand-900/80">{categoryMap[category].name}</span>
          </>
        )}
        {group && (
          <>
            <span>/</span>
            <span className="text-brand-900/80">{groupMap[group].name}</span>
          </>
        )}
      </nav>

      <div className="mt-3">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
          {heading}
        </h1>
        <p className="mt-1.5 text-sm text-brand-900/55">{blurb}</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[270px_1fr]">
        <aside>
          <FilterSidebar
            params={params}
            sizeOptions={sizeOptions}
            handOptions={handOptions}
            categoryCounts={categoryCounts}
          />
        </aside>

        <div>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-900/8 pb-4">
            <p className="text-sm text-brand-900/60">
              <span className="font-semibold text-brand-950">{list.length}</span>{" "}
              {list.length === 1 ? "product" : "products"}
            </p>
            <SortSelect params={params} />
          </div>

          {/* Active chips */}
          {chips.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {chips.map((chip) => (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-800 ring-1 ring-brand-900/8 transition-colors hover:bg-brand-100"
                >
                  {chip.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </Link>
              ))}
            </div>
          )}

          {/* Results */}
          {list.length > 0 ? (
            <div className="mt-6">
              <ProductGrid products={list} />
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-900/15 bg-white/60 px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-500">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-brand-950">No gear matches those filters</h3>
              <p className="mt-1.5 max-w-xs text-sm text-brand-900/55">
                Try widening your price range or clearing a filter or two.
              </p>
              <Link
                href="/shop"
                className="mt-5 rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                Reset filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

function uniq(arr: string[]): string[] {
  return Array.from(new Set(arr));
}

function without(params: Record<string, string>, ...keys: string[]): Record<string, string> {
  const copy = { ...params };
  for (const k of keys) delete copy[k];
  return copy;
}

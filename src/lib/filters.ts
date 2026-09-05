import type { Badge, Product } from "./types";

const BADGE_RANK: Record<Badge, number> = {
  Bestseller: 0,
  Pro: 1,
  New: 2,
  Sale: 3,
};

export type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

export const PRICE_BUCKETS: { value: string; label: string; test: (p: number) => boolean }[] = [
  { value: "0-1000", label: "Under ₹1,000", test: (p) => p < 1000 },
  { value: "1000-2500", label: "₹1,000 – ₹2,500", test: (p) => p >= 1000 && p < 2500 },
  { value: "2500-5000", label: "₹2,500 – ₹5,000", test: (p) => p >= 2500 && p < 5000 },
  { value: "5000-15000", label: "₹5,000 – ₹15,000", test: (p) => p >= 5000 && p < 15000 },
  { value: "15000+", label: "₹15,000 & above", test: (p) => p >= 15000 },
];

export interface PriceFilter {
  value: string;
  label: string;
  test: (p: number) => boolean;
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function adHoc(value: string): PriceFilter | undefined {
  const open = value.match(/^(\d+)\+$/);
  if (open) {
    const min = Number(open[1]);
    return { value, label: `${inr(min)} & above`, test: (p) => p >= min };
  }

  const range = value.match(/^(\d+)-(\d+)$/);
  if (!range) return undefined;
  const min = Number(range[1]);
  const max = Number(range[2]);
  if (max <= min) return undefined;
  return {
    value,
    label: min === 0 ? `Under ${inr(max)}` : `${inr(min)} – ${inr(max)}`,
    test: (p) => p >= min && p <= max,
  };
}

/** Bounded so a stream of junk ?price= values can't grow it without limit. */
const filterCache = new Map<string, PriceFilter | undefined>();

/**
 * Resolve a ?price= value. Named sidebar buckets are matched first; anything
 * else is read as an ad-hoc "min-max" or "min+" budget, which is what lets a
 * shopper carry a budget typed into Oneup Assist ("under 5000") through to the
 * shop instead of having it silently dropped on arrival. A value nobody can
 * parse narrows nothing rather than hiding the whole catalog.
 *
 * Results are cached so the same query string always yields the same object,
 * keeping it usable as a render-stable dependency.
 */
export function priceFilter(value: string | undefined): PriceFilter | undefined {
  if (!value) return undefined;
  const named = PRICE_BUCKETS.find((b) => b.value === value);
  if (named) return named;
  if (!filterCache.has(value)) {
    if (filterCache.size > 50) filterCache.clear();
    filterCache.set(value, adHoc(value));
  }
  return filterCache.get(value);
}

/** Normalise a searchParams value into an array (supports comma lists). */
export function parseList(v: string | string[] | undefined): string[] {
  if (!v) return [];
  const raw = Array.isArray(v) ? v.join(",") : v;
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function firstValue(v: string | string[] | undefined): string | undefined {
  if (!v) return undefined;
  return Array.isArray(v) ? v[0] : v;
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "newest":
      return copy.sort(
        (a, b) => Number(b.badge === "New") - Number(a.badge === "New") || b.price - a.price,
      );
    case "featured":
    default:
      return copy.sort((a, b) => {
        const ra = a.badge ? BADGE_RANK[a.badge] : 9;
        const rb = b.badge ? BADGE_RANK[b.badge] : 9;
        return ra - rb || b.price - a.price;
      });
  }
}

/** Build a query string from a params map, dropping empty values. */
export function buildQuery(params: Record<string, string>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) sp.set(k, v);
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

/** Toggle a value inside a comma-list param, returning the new list string. */
export function toggleInList(current: string | undefined, value: string): string {
  const list = parseList(current);
  const next = list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
  return next.join(",");
}

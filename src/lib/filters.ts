import type { Product } from "./types";

export type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

export const PRICE_BUCKETS: { value: string; label: string; test: (p: number) => boolean }[] = [
  { value: "0-1000", label: "Under ₹1,000", test: (p) => p < 1000 },
  { value: "1000-2500", label: "₹1,000 – ₹2,500", test: (p) => p >= 1000 && p < 2500 },
  { value: "2500-5000", label: "₹2,500 – ₹5,000", test: (p) => p >= 2500 && p < 5000 },
  { value: "5000-15000", label: "₹5,000 – ₹15,000", test: (p) => p >= 5000 && p < 15000 },
  { value: "15000+", label: "₹15,000 & above", test: (p) => p >= 15000 },
];

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
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "newest":
      return copy.sort(
        (a, b) => Number(b.badge === "New") - Number(a.badge === "New") || b.reviews - a.reviews,
      );
    case "featured":
    default:
      return copy.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
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

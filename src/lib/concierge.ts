import {
  categories,
  categoryMap,
  groupMap,
  groups,
  products,
} from "./catalog";
import type { Product } from "./types";

/**
 * Query understanding for the ONEUP assistant.
 *
 * This is a deterministic parser over the real catalog — it reads a budget,
 * a sport and a product type out of the sentence and returns actual matching
 * products. It is not a language model, and it never invents a product.
 *
 * `answer()` is the seam a hosted model would slot into later: swap the body
 * for an API call that returns the same ConciergeResult shape and every
 * caller keeps working.
 */

export interface ConciergeResult {
  /** One line describing what was understood, shown above the results. */
  summary: string;
  products: Product[];
  /** Deep link to the same set on the shop page, when one is expressible. */
  href?: string;
  /** Set when nothing in the sentence was recognised. */
  unmatched?: boolean;
}

/** "under 5000", "below ₹3,000", "under 5k" → 5000 */
function parseBudget(q: string): number | undefined {
  const m = q.match(
    /(?:under|below|less than|upto|up to|within|max)\s*₹?\s*([\d,]+)\s*(k)?/i,
  );
  if (!m) return undefined;
  const n = Number(m[1].replace(/,/g, ""));
  if (!Number.isFinite(n) || n <= 0) return undefined;
  return m[2] ? n * 1000 : n;
}

function matchGroup(q: string) {
  return groups.find((g) => {
    const name = g.name.toLowerCase();
    // "football" shouldn't also match "table tennis" via a shared word.
    return q.includes(name) || (name === "table tennis" && /\btt\b/.test(q));
  });
}

function matchCategory(q: string) {
  // Longest name first so "batting gloves" beats "gloves".
  return [...categories]
    .sort((a, b) => b.name.length - a.name.length)
    .find((c) => q.includes(c.name.toLowerCase()));
}

const SYNONYMS: [RegExp, string][] = [
  [/\brack?ets?\b|\bracquets?\b/, "racquets"],
  [/\bshuttles?\b|\bcorks?\b/, "shuttlecocks"],
  [/\bbats?\b/, "bats"],
  [/\bshoes?\b|\bfootwear\b|\btrainers?\b/, "shoes"],
  [/\bkit ?bags?\b|\bbags?\b/, "kit bags"],
  [/\bhelmets?\b/, "helmets"],
  [/\bpads?\b|\bleg ?guards?\b/, "batting pads"],
  [/\bgloves?\b/, "gloves"],
  [/\bmats?\b|\byoga\b/, "yoga"],
];

export function answer(rawQuery: string): ConciergeResult {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return { summary: "", products: [] };

  const budget = parseBudget(q);
  const group = matchGroup(q);
  let category = matchCategory(q);

  if (!category) {
    for (const [re, name] of SYNONYMS) {
      if (re.test(q)) {
        category = categories.find(
          (c) =>
            c.name.toLowerCase() === name &&
            (!group || c.group === group.slug),
        );
        if (category) break;
      }
    }
  }

  let list = products.filter((p) => p.inStock);
  const bits: string[] = [];

  if (category) {
    list = list.filter((p) => p.category === category.slug);
    bits.push(categoryMap[category.slug].name.toLowerCase());
  } else if (group) {
    list = list.filter((p) => categoryMap[p.category].group === group.slug);
    bits.push(group.name.toLowerCase());
  }

  if (budget) {
    list = list.filter((p) => p.price <= budget);
    bits.push(`under ₹${budget.toLocaleString("en-IN")}`);
  }

  // Nothing structured recognised — fall back to a plain text match.
  if (!category && !group && !budget) {
    const words = q.split(/\s+/).filter((w) => w.length > 2);
    if (words.length === 0) return { summary: "", products: [] };
    const scored = products
      .filter((p) => p.inStock)
      .map((p) => {
        const hay =
          `${p.name} ${p.brand} ${categoryMap[p.category].name} ${groupMap[categoryMap[p.category].group].name}`.toLowerCase();
        return { p, score: words.filter((w) => hay.includes(w)).length };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || a.p.price - b.p.price);

    if (scored.length === 0) {
      return {
        summary: `Nothing in the catalog matches “${rawQuery.trim()}”.`,
        products: [],
        unmatched: true,
      };
    }
    return {
      summary: `Matches for “${rawQuery.trim()}”`,
      products: scored.slice(0, 6).map((x) => x.p),
    };
  }

  list.sort((a, b) => a.price - b.price);

  const params = new URLSearchParams();
  if (category) params.set("category", category.slug);
  else if (group) params.set("group", group.slug);
  if (budget) params.set("price", `0-${budget}`);

  return {
    summary: list.length
      ? `${list.length} ${bits.join(" ")} in stock`
      : `No ${bits.join(" ")} in stock right now`,
    products: list.slice(0, 6),
    href: `/shop?${params.toString()}`,
  };
}

/** Starter prompts, built from sports that actually have stock. */
export function samplePrompts(): string[] {
  const withStock = groups.filter((g) =>
    products.some((p) => categoryMap[p.category].group === g.slug && p.inStock),
  );
  const badminton = withStock.find((g) => g.slug === "badminton");
  const cricket = withStock.find((g) => g.slug === "cricket");
  const out: string[] = [];
  if (badminton) out.push("Badminton racquet under ₹5000");
  if (cricket) out.push("Cricket bat under ₹15000");
  out.push("Running shoes");
  return out;
}

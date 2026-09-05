import {
  categories,
  categoryMap,
  groupMap,
  groups,
  products as staticProducts,
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

/**
 * Category names are group-relative: "Balls" means cricket balls, and there is
 * a separate "TT Balls". So once a sport is known, only that sport's
 * categories are eligible — otherwise "table tennis balls" matches the cricket
 * "Balls" category and the shopper is shown the wrong sport entirely.
 */
function poolFor(group?: (typeof groups)[number]) {
  return group ? categories.filter((c) => c.group === group.slug) : categories;
}

/** Words that only one category in the pool uses, so they identify it. */
function distinctiveWords(pool: typeof categories) {
  const counts = new Map<string, number>();
  for (const c of pool) {
    for (const w of new Set(nameWords(c.name))) {
      counts.set(w, (counts.get(w) ?? 0) + 1);
    }
  }
  return counts;
}

function nameWords(name: string): string[] {
  return name
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((w) => w.length > 2 && w !== "and");
}

function matchCategory(q: string, group?: (typeof groups)[number]) {
  const pool = poolFor(group);

  // Longest name first so "batting gloves" beats "gloves".
  const byName = [...pool]
    .sort((a, b) => b.name.length - a.name.length)
    .find((c) => q.includes(c.name.toLowerCase()));
  if (byName) return byName;

  // Otherwise identify by a word only one category in the pool uses, which is
  // what lets "running shoes" reach Running & Jogging without "shoes" (shared
  // by five categories) dragging in the rest.
  const counts = distinctiveWords(pool);
  const hits = pool.filter((c) =>
    nameWords(c.name).some(
      (w) => counts.get(w) === 1 && new RegExp(`\\b${w}\\b`).test(q),
    ),
  );
  return hits.length === 1 ? hits[0] : undefined;
}

/** True when the category name already tells you which sport it belongs to. */
function namesItsSport(c: (typeof categories)[number]): boolean {
  const groupName = groupMap[c.group].name.toLowerCase();
  const words = nameWords(c.name);
  if (nameWords(groupName).some((w) => words.includes(w))) return true;
  // "TT Balls" carries the sport as initials.
  const initials = groupName.split(/[^a-z]+/).map((w) => w[0]).join("");
  return initials.length > 1 && c.name.toLowerCase().startsWith(initials);
}

/** Label for the summary line: "balls" alone would not say which sport. */
function categoryLabel(c: (typeof categories)[number]): string {
  const name = c.name.toLowerCase();
  return namesItsSport(c)
    ? name
    : `${groupMap[c.group].name.toLowerCase()} ${name}`;
}

/**
 * Slang and plurals the catalog does not use as category names. A value is
 * matched against category names first; when it only narrows things to a
 * sport (there is no single "shoes" category) it selects the group instead.
 */
const SYNONYMS: [RegExp, string][] = [
  [/\brack?ets?\b|\bracquets?\b/, "racquets"],
  [/\bshuttles?\b|\bcorks?\b/, "shuttlecocks"],
  [/\bleg ?guards?\b/, "batting pads"],
  [/\bkit ?bags?\b/, "kit bags"],
  [/\bhelmets?\b/, "helmets"],
  [/\bmats?\b|\byoga\b/, "yoga"],
  [/\bfootwear\b|\btrainers?\b|\bshoes?\b/, "shoes"],
  [/\bkeeping\b|\bwicket ?keep\w*\b/, "wk gloves"],
];

/**
 * @param catalog the live catalog. Defaults to the seed list so tests and any
 *   server-side caller still work, but the UI passes what the shop is actually
 *   showing — otherwise Assist can quote a price the store has changed or
 *   offer a product it has withdrawn.
 */
export function answer(
  rawQuery: string,
  catalog: Product[] = staticProducts,
): ConciergeResult {
  const products = catalog;
  const q = rawQuery.trim().toLowerCase();
  if (!q) return { summary: "", products: [] };

  const budget = parseBudget(q);
  let group = matchGroup(q);
  let category = matchCategory(q, group);

  if (!category) {
    for (const [re, name] of SYNONYMS) {
      if (!re.test(q)) continue;
      const pool = poolFor(group).filter((c) =>
        c.name.toLowerCase().includes(name),
      );
      if (pool.length === 1) {
        category = pool[0];
        break;
      }
      // The word names a sport rather than a single category — "shoes",
      // with no sport given, is every shoe in the store.
      const asGroup = groups.find((g) => g.name.toLowerCase() === name);
      if (!group && asGroup) {
        group = asGroup;
        break;
      }
    }
  }

  let list = products.filter((p) => p.inStock);
  const bits: string[] = [];

  if (category) {
    list = list.filter((p) => p.category === category.slug);
    bits.push(categoryLabel(category));
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
      summary:
        scored.length > 6
          ? `${scored.length} matches for “${rawQuery.trim()}” — closest first`
          : `Matches for “${rawQuery.trim()}”`,
      products: scored.slice(0, 6).map((x) => x.p),
      // Without this the shopper sees six results and no way to the rest.
      href: `/shop?q=${encodeURIComponent(rawQuery.trim())}`,
    };
  }

  list.sort((a, b) => a.price - b.price);

  const params = new URLSearchParams();
  if (category) params.set("category", category.slug);
  else if (group) params.set("group", group.slug);
  if (budget) params.set("price", `0-${budget}`);

  return {
    summary: list.length
      ? `${list.length} ${bits.join(" ")}`
      : `Nothing matches ${bits.join(" ")}`,
    products: list.slice(0, 6),
    href: `/shop?${params.toString()}`,
  };
}

/** Starter prompts, built from sports that actually have stock. */
export function samplePrompts(): string[] {
  const withStock = groups.filter((g) =>
    staticProducts.some(
      (p) => categoryMap[p.category].group === g.slug && p.inStock,
    ),
  );
  const badminton = withStock.find((g) => g.slug === "badminton");
  const cricket = withStock.find((g) => g.slug === "cricket");
  const out: string[] = [];
  if (badminton) out.push("Badminton racquet under ₹5000");
  if (cricket) out.push("Cricket bat under ₹15000");
  out.push("Running shoes");
  return out;
}

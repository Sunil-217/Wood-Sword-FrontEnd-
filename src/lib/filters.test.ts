import { describe, expect, it } from "vitest";
import { buildQuery, parseList, priceFilter, sortProducts, toggleInList } from "./filters";
import { products } from "./catalog";

describe("sorting", () => {
  it("orders by price ascending and descending", () => {
    const asc = sortProducts(products, "price-asc").map((p) => p.price);
    const desc = sortProducts(products, "price-desc").map((p) => p.price);

    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
  });

  it("does not mutate the list it is given", () => {
    const before = products.map((p) => p.id);
    sortProducts(products, "price-desc");
    expect(products.map((p) => p.id)).toEqual(before);
  });

  it("puts flagged products first under featured", () => {
    const sorted = sortProducts(products, "featured");
    const firstUnbadged = sorted.findIndex((p) => !p.badge);
    const lastBadged = sorted.map((p) => !!p.badge).lastIndexOf(true);

    expect(firstUnbadged).toBeGreaterThan(lastBadged - 1);
  });

  it("leads with New under newest", () => {
    const sorted = sortProducts(products, "newest");
    expect(sorted[0].badge).toBe("New");
  });
});

describe("query params", () => {
  it("round-trips a multi-value list", () => {
    expect(parseList("Men's,Harrow")).toEqual(["Men's", "Harrow"]);
    expect(parseList(undefined)).toEqual([]);
    expect(parseList("")).toEqual([]);
  });

  it("adds and removes a value from a list", () => {
    expect(toggleInList(undefined, "Men's")).toBe("Men's");
    expect(toggleInList("Men's", "Harrow")).toBe("Men's,Harrow");
    expect(toggleInList("Men's,Harrow", "Men's")).toBe("Harrow");
    expect(toggleInList("Men's", "Men's")).toBe("");
  });

  it("drops empty params when building a query string", () => {
    expect(buildQuery({ group: "cricket" })).toContain("group=cricket");
    expect(buildQuery({})).toBe("");
  });
});

describe("price filtering", () => {
  it("keeps the named sidebar buckets", () => {
    expect(priceFilter("0-1000")!.test(999)).toBe(true);
    expect(priceFilter("0-1000")!.test(1000)).toBe(false);
    expect(priceFilter("15000+")!.test(20000)).toBe(true);
  });

  it("reads an ad-hoc budget so Oneup Assist links keep their limit", () => {
    const f = priceFilter("0-5000")!;
    expect(f.test(5000)).toBe(true);
    expect(f.test(5001)).toBe(false);
    expect(f.label).toMatch(/under/i);
  });

  it("ignores a malformed or inverted range rather than hiding everything", () => {
    expect(priceFilter("abc")).toBeUndefined();
    expect(priceFilter("5000-1000")).toBeUndefined();
    expect(priceFilter(undefined)).toBeUndefined();
  });

  it("returns the same object for the same value, so memo deps stay stable", () => {
    expect(priceFilter("0-5000")).toBe(priceFilter("0-5000"));
  });
});

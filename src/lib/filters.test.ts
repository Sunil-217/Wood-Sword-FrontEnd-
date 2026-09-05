import { describe, expect, it } from "vitest";
import { buildQuery, parseList, sortProducts, toggleInList } from "./filters";
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

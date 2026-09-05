import { describe, expect, it } from "vitest";
import { answer, samplePrompts } from "./concierge";
import { categoryMap, products } from "./catalog";

describe("concierge query parsing", () => {
  it("reads sport, product type and budget out of one sentence", () => {
    const res = answer("badminton racquet under 5000");

    expect(res.products.length).toBeGreaterThan(0);
    expect(res.summary).toMatch(/racquets/i);
    for (const p of res.products) {
      expect(p.price).toBeLessThanOrEqual(5000);
      expect(categoryMap[p.category].name).toBe("Racquets");
    }
  });

  it("honours a budget written with a comma or k suffix", () => {
    for (const q of ["cricket bat under ₹15,000", "cricket bat under 15k"]) {
      const res = answer(q);
      expect(res.products.length).toBeGreaterThan(0);
      for (const p of res.products) expect(p.price).toBeLessThanOrEqual(15000);
    }
  });

  it("returns only real catalog products", () => {
    const ids = new Set(products.map((p) => p.id));
    for (const q of ["helmet", "yonex", "cricket bat", "running shoes"]) {
      for (const p of answer(q).products) expect(ids.has(p.id)).toBe(true);
    }
  });

  it("says nothing matches rather than padding with unrelated products", () => {
    const res = answer("zzzqqq nonsense that matches nothing");

    expect(res.products).toHaveLength(0);
    expect(res.unmatched).toBe(true);
    expect(res.summary).toMatch(/nothing/i);
  });

  it("treats an empty or whitespace query as no query", () => {
    expect(answer("").products).toHaveLength(0);
    expect(answer("   ").products).toHaveLength(0);
  });

  it("handles a very long natural-language query without throwing", () => {
    const long =
      "I am looking for a really good badminton racquet under 5000 " +
      "for my nephew who plays every weekend ".repeat(40);

    const res = answer(long);
    expect(Array.isArray(res.products)).toBe(true);
    expect(typeof res.summary).toBe("string");
  });

  it("only ever offers in-stock products", () => {
    for (const q of ["cricket", "badminton racquet", "shoes"]) {
      for (const p of answer(q).products) expect(p.inStock).toBe(true);
    }
  });

  it("builds a shop link that matches the parsed filters", () => {
    const res = answer("badminton racquet under 5000");
    expect(res.href).toContain("category=badminton-racquets");
    expect(res.href).toContain("price=0-5000");
  });

  it("offers starter prompts that actually return products", () => {
    const prompts = samplePrompts();
    expect(prompts.length).toBeGreaterThan(0);
    for (const p of prompts) {
      expect(answer(p).products.length).toBeGreaterThan(0);
    }
  });
});

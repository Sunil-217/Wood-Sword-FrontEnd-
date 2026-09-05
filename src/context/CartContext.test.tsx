import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CartProvider, makeLineId, useCart } from "./CartContext";
import type { CartLine } from "@/lib/types";

const STORAGE_KEY = "oneup-cart-v1";

function line(overrides: Partial<CartLine> = {}): CartLine {
  return {
    id: "bat::Mens",
    productId: "sg-klr-ultimate",
    slug: "sg-klr-ultimate",
    name: "SG KLR ULTIMATE",
    brand: "SG",
    art: "bat",
    accent: "#c8901c",
    price: 27999,
    qty: 1,
    ...overrides,
  };
}

function mount() {
  return renderHook(() => useCart(), {
    wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
  });
}

describe("cart", () => {
  it("adds a product and reflects it in count and subtotal", () => {
    const { result } = mount();
    act(() => result.current.addLine(line({ qty: 2 })));

    expect(result.current.lines).toHaveLength(1);
    expect(result.current.count).toBe(2);
    expect(result.current.subtotal).toBe(55998);
  });

  it("removes a product", () => {
    const { result } = mount();
    act(() => result.current.addLine(line()));
    act(() => result.current.remove("bat::Mens"));

    expect(result.current.lines).toHaveLength(0);
    expect(result.current.subtotal).toBe(0);
  });

  it("increases and decreases quantity", () => {
    const { result } = mount();
    act(() => result.current.addLine(line()));

    act(() => result.current.setQty("bat::Mens", 4));
    expect(result.current.count).toBe(4);

    act(() => result.current.setQty("bat::Mens", 2));
    expect(result.current.count).toBe(2);
  });

  it("removes the line when quantity drops below one", () => {
    const { result } = mount();
    act(() => result.current.addLine(line()));
    act(() => result.current.setQty("bat::Mens", 0));

    expect(result.current.lines).toHaveLength(0);
  });

  // Regression: Math.max(1, NaN) produced NaN, which the "qty > 0" filter
  // then dropped — the line disappeared with no user action.
  it("ignores a non-finite quantity instead of losing the line", () => {
    const { result } = mount();
    act(() => result.current.addLine(line({ qty: 3 })));

    act(() => result.current.setQty("bat::Mens", Number.NaN));
    expect(result.current.lines).toHaveLength(1);
    expect(result.current.count).toBe(3);

    act(() => result.current.setQty("bat::Mens", Number.POSITIVE_INFINITY));
    expect(result.current.lines).toHaveLength(1);
    expect(Number.isFinite(result.current.count)).toBe(true);
  });

  it("caps quantity at 99", () => {
    const { result } = mount();
    act(() => result.current.addLine(line()));
    act(() => result.current.setQty("bat::Mens", 5000));

    expect(result.current.count).toBe(99);
  });

  it("merges a repeated add onto one line rather than duplicating it", () => {
    const { result } = mount();
    act(() => result.current.addLine(line({ qty: 1 })));
    act(() => result.current.addLine(line({ qty: 1 })));
    act(() => result.current.addLine(line({ qty: 1 })));

    expect(result.current.lines).toHaveLength(1);
    expect(result.current.count).toBe(3);
  });

  it("keeps different variants of the same product apart", () => {
    const { result } = mount();
    const mens = makeLineId("sg-klr-ultimate", { size: "Men's" });
    const harrow = makeLineId("sg-klr-ultimate", { size: "Harrow" });

    act(() => result.current.addLine(line({ id: mens, size: "Men's" })));
    act(() => result.current.addLine(line({ id: harrow, size: "Harrow" })));

    expect(result.current.lines).toHaveLength(2);
  });

  it("sanitises a corrupted stored cart instead of discarding or crashing", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        line({ id: "dup", qty: 2 }),
        line({ id: "dup", qty: 3 }), // duplicate id
        line({ id: "nan-price", price: Number.NaN }),
        line({ id: "huge", qty: 99999 }),
        { id: "missing-fields" },
        "not an object",
        null,
      ]),
    );

    const { result } = mount();
    const ids = result.current.lines.map((l) => l.id);

    expect(ids).toContain("dup");
    expect(ids).not.toContain("nan-price");
    expect(ids).not.toContain("missing-fields");
    expect(result.current.lines.find((l) => l.id === "dup")?.qty).toBe(5);
    expect(result.current.lines.find((l) => l.id === "huge")?.qty).toBe(99);
  });

  it("never reports a non-finite total", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([line({ id: "ok" }), line({ id: "bad", price: Number.NaN })]),
    );

    const { result } = mount();
    expect(Number.isFinite(result.current.subtotal)).toBe(true);
    expect(result.current.subtotal).toBe(27999);
  });

  it("survives malformed JSON in storage", () => {
    localStorage.setItem(STORAGE_KEY, "{ not json");
    const { result } = mount();

    expect(result.current.lines).toEqual([]);
    expect(result.current.subtotal).toBe(0);
  });

  it("reprices a line without touching its quantity", () => {
    const { result } = mount();
    act(() => result.current.addLine(line({ qty: 2 })));
    act(() => result.current.repriceLine("bat::Mens", 24999));

    expect(result.current.lines[0].price).toBe(24999);
    expect(result.current.lines[0].qty).toBe(2);
    expect(result.current.subtotal).toBe(49998);
  });

  it("refuses a non-finite reprice", () => {
    const { result } = mount();
    act(() => result.current.addLine(line()));
    act(() => result.current.repriceLine("bat::Mens", Number.NaN));

    expect(result.current.lines[0].price).toBe(27999);
  });

  it("persists across a remount", () => {
    const first = mount();
    act(() => first.result.current.addLine(line({ qty: 2 })));
    first.unmount();

    const second = mount();
    expect(second.result.current.count).toBe(2);
  });

  it("clears the cart", () => {
    const { result } = mount();
    act(() => result.current.addLine(line()));
    act(() => result.current.clear());

    expect(result.current.lines).toHaveLength(0);
  });
});

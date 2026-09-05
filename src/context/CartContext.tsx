"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { CartLine } from "@/lib/types";

const STORAGE_KEY = "oneup-cart-v1";

/** A shopper can't sensibly want more than this, and it stops absurd totals. */
const MAX_QTY = 99;

/**
 * Storage is user-writable and survives across deploys, so treat whatever
 * comes back as untrusted: keep the lines that still make sense and drop the
 * rest rather than letting a NaN price poison the total.
 */
function sanitizeLines(input: unknown): CartLine[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  const out: CartLine[] = [];

  for (const raw of input) {
    if (!raw || typeof raw !== "object") continue;
    const l = raw as Partial<CartLine>;
    if (typeof l.id !== "string" || !l.id) continue;
    if (typeof l.productId !== "string" || typeof l.slug !== "string") continue;
    if (!Number.isFinite(l.price) || (l.price as number) < 0) continue;

    const qty = Math.min(MAX_QTY, Math.max(1, Math.round(Number(l.qty))));
    if (!Number.isFinite(qty)) continue;

    // A duplicated id would show the same line twice and double-count it.
    if (seen.has(l.id)) {
      const prev = out.find((x) => x.id === l.id)!;
      prev.qty = Math.min(MAX_QTY, prev.qty + qty);
      continue;
    }
    seen.add(l.id);
    out.push({ ...(l as CartLine), qty });
  }
  return out;
}

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; line: CartLine }
  | { type: "setQty"; id: string; qty: number }
  | { type: "remove"; id: string }
  | { type: "reprice"; id: string; price: number }
  | { type: "clear" };

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return sanitizeLines(action.lines);
    case "add": {
      const incoming = Math.min(
        MAX_QTY,
        Math.max(1, Math.round(Number(action.line.qty) || 1)),
      );
      const existing = state.find((l) => l.id === action.line.id);
      if (existing) {
        // Rapid repeat clicks stack on one line instead of duplicating it.
        return state.map((l) =>
          l.id === action.line.id
            ? { ...l, qty: Math.min(MAX_QTY, l.qty + incoming) }
            : l,
        );
      }
      return [...state, { ...action.line, qty: incoming }];
    }
    case "setQty": {
      // A non-finite quantity used to fall through the filter below and
      // silently delete the line. Ignore it instead — removal is explicit.
      const n = Math.round(Number(action.qty));
      if (!Number.isFinite(n)) return state;
      if (n < 1) return state.filter((l) => l.id !== action.id);
      const qty = Math.min(MAX_QTY, n);
      return state.map((l) => (l.id === action.id ? { ...l, qty } : l));
    }
    case "remove":
      return state.filter((l) => l.id !== action.id);
    case "reprice":
      if (!Number.isFinite(action.price) || action.price < 0) return state;
      return state.map((l) =>
        l.id === action.id ? { ...l, price: action.price } : l,
      );
    case "clear":
      return [];
    default:
      return state;
  }
}

interface CartApi {
  lines: CartLine[];
  count: number;
  subtotal: number;
  ready: boolean;
  addLine: (line: CartLine) => void;
  /** Replace a line's stored price after the catalog moves. */
  repriceLine: (id: string, price: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartApi | null>(null);

export function makeLineId(
  productId: string,
  opts: { size?: string; color?: string; hand?: string },
): string {
  return [productId, opts.size, opts.color, opts.hand]
    .filter(Boolean)
    .join("::");
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [ready, setReady] = useState(false);

  // hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", lines: JSON.parse(raw) });
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  // persist on change (after hydration)
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage may be unavailable */
    }
  }, [lines, ready]);

  const addLine = useCallback((line: CartLine) => dispatch({ type: "add", line }), []);
  const setQty = useCallback(
    (id: string, qty: number) => dispatch({ type: "setQty", id, qty }),
    [],
  );
  const repriceLine = useCallback(
    (id: string, price: number) => dispatch({ type: "reprice", id, price }),
    [],
  );
  const remove = useCallback((id: string) => dispatch({ type: "remove", id }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () =>
      lines.reduce((n, l) => {
        const line = l.qty * l.price;
        return n + (Number.isFinite(line) ? line : 0);
      }, 0),
    [lines],
  );

  const value = useMemo<CartApi>(
    () => ({ lines, count, subtotal, ready, addLine, setQty, repriceLine, remove, clear }),
    [lines, count, subtotal, ready, addLine, setQty, repriceLine, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Product } from "@/lib/types";

interface QuickViewApi {
  product: Product | null;
  open: (product: Product) => void;
  close: () => void;
}

const QuickViewContext = createContext<QuickViewApi | null>(null);

export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);
  const open = useCallback((p: Product) => setProduct(p), []);
  const close = useCallback(() => setProduct(null), []);
  const value = useMemo<QuickViewApi>(() => ({ product, open, close }), [product, open, close]);
  return <QuickViewContext.Provider value={value}>{children}</QuickViewContext.Provider>;
}

export function useQuickView(): QuickViewApi {
  const ctx = useContext(QuickViewContext);
  if (!ctx) throw new Error("useQuickView must be used within <QuickViewProvider>");
  return ctx;
}

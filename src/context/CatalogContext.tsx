"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { categoryMap, products as baseProducts } from "@/lib/catalog";
import type { Badge, CategorySlug, Product } from "@/lib/types";

const STORAGE_KEY = "mmsports-catalog-v1";

/** Admin-editable fields layered over a base product. */
export type Override = Partial<
  Pick<Product, "name" | "price" | "mrp" | "badge" | "inStock" | "tagline">
> & { deleted?: boolean };

interface Persisted {
  overrides: Record<string, Override>;
  added: Product[];
}

export interface NewProductInput {
  name: string;
  category: CategorySlug;
  price: number;
  mrp?: number;
  badge?: Badge;
  inStock: boolean;
  tagline: string;
}

interface CatalogApi {
  products: Product[];
  ready: boolean;
  edited: boolean;
  getBySlug: (slug: string) => Product | undefined;
  getById: (id: string) => Product | undefined;
  updateProduct: (id: string, patch: Override) => void;
  addProduct: (input: NewProductInput) => void;
  deleteProduct: (id: string) => void;
  resetAll: () => void;
}

const CatalogContext = createContext<CatalogApi | null>(null);

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[().']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, Override>>({});
  const [added, setAdded] = useState<Product[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw) as Persisted;
        setOverrides(p.overrides ?? {});
        setAdded(p.added ?? []);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ overrides, added }));
    } catch {
      /* ignore */
    }
  }, [overrides, added, ready]);

  const products = useMemo<Product[]>(() => {
    const merged = baseProducts
      .filter((p) => !overrides[p.id]?.deleted)
      .map((p) => (overrides[p.id] ? { ...p, ...stripMeta(overrides[p.id]) } : p));
    return [...added, ...merged];
  }, [overrides, added]);

  const getBySlug = useCallback((slug: string) => products.find((p) => p.slug === slug), [products]);
  const getById = useCallback((id: string) => products.find((p) => p.id === id), [products]);

  const updateProduct = useCallback((id: string, patch: Override) => {
    // If it's an admin-added product, patch it in place; else store an override.
    setAdded((prev) => {
      if (!prev.some((p) => p.id === id)) return prev;
      return prev.map((p) => (p.id === id ? { ...p, ...stripMeta(patch) } : p));
    });
    setOverrides((prev) => {
      if (added.some((p) => p.id === id)) return prev;
      return { ...prev, [id]: { ...prev[id], ...patch } };
    });
  }, [added]);

  const addProduct = useCallback((input: NewProductInput) => {
    const base = slugify(input.name) || "product";
    const suffix = Math.floor(1000 + Math.random() * 9000);
    const id = `${base}-${suffix}`;
    const cat = catFor(input.category);
    const product: Product = {
      id,
      slug: id,
      name: input.name,
      brand: "MM Sports",
      category: input.category,
      art: cat.art,
      price: input.price,
      mrp: input.mrp,
      rating: 4.5,
      reviews: 0,
      accent: cat.accent,
      colors: ["Standard"],
      sizes: ["One Size"],
      badge: input.badge,
      tagline: input.tagline || "Newly added by admin",
      description: input.tagline || "Product added from the admin dashboard.",
      features: ["Added via admin", "Demo product"],
      inStock: input.inStock,
    };
    setAdded((prev) => [product, ...prev]);
  }, []);

  const deleteProduct = useCallback((id: string) => {
    if (added.some((p) => p.id === id)) {
      setAdded((prev) => prev.filter((p) => p.id !== id));
    } else {
      setOverrides((prev) => ({ ...prev, [id]: { ...prev[id], deleted: true } }));
    }
  }, [added]);

  const resetAll = useCallback(() => {
    setOverrides({});
    setAdded([]);
  }, []);

  const edited = Object.keys(overrides).length > 0 || added.length > 0;

  const value = useMemo<CatalogApi>(
    () => ({
      products,
      ready,
      edited,
      getBySlug,
      getById,
      updateProduct,
      addProduct,
      deleteProduct,
      resetAll,
    }),
    [products, ready, edited, getBySlug, getById, updateProduct, addProduct, deleteProduct, resetAll],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

/** Drop the control-only `deleted` flag before spreading onto a product. */
function stripMeta(o: Override): Omit<Override, "deleted"> {
  const { deleted, ...rest } = o;
  void deleted;
  return rest;
}

function catFor(slug: CategorySlug) {
  return categoryMap[slug];
}

export function useCatalog(): CatalogApi {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within <CatalogProvider>");
  return ctx;
}

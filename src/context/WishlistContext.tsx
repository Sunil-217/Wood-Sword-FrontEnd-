"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCatalog } from "./CatalogContext";

const STORAGE_KEY = "oneup-wishlist-v1";

/**
 * localStorage is user-writable, so treat whatever comes back as untrusted:
 * anything that isn't an array of non-empty strings is discarded, and repeats
 * are collapsed so the same product can't occupy two grid cells.
 */
function sanitizeSlugs(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  for (const v of input) {
    if (typeof v === "string" && v.trim()) seen.add(v);
  }
  return [...seen];
}

interface WishlistApi {
  slugs: string[];
  count: number;
  ready: boolean;
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const WishlistContext = createContext<WishlistApi | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const { getBySlug, ready: catalogReady } = useCatalog();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSlugs(sanitizeSlugs(JSON.parse(raw)));
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  // Saves whose product has left the catalog are hidden rather than deleted:
  // the header badge must never count items the wishlist page can't show, but
  // a product the shop restores should come back with its save intact.
  const liveSlugs = useMemo(
    () => (catalogReady ? slugs.filter((s) => getBySlug(s)) : slugs),
    [slugs, catalogReady, getBySlug],
  );

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      /* storage may be unavailable */
    }
  }, [slugs, ready]);

  const has = useCallback((slug: string) => liveSlugs.includes(slug), [liveSlugs]);
  const toggle = useCallback(
    (slug: string) =>
      setSlugs((prev) =>
        prev.includes(slug) ? prev.filter((s) => s !== slug) : [slug, ...prev],
      ),
    [],
  );
  const remove = useCallback(
    (slug: string) => setSlugs((prev) => prev.filter((s) => s !== slug)),
    [],
  );
  const clear = useCallback(() => setSlugs([]), []);

  const value = useMemo<WishlistApi>(
    () => ({ slugs: liveSlugs, count: liveSlugs.length, ready, has, toggle, remove, clear }),
    [liveSlugs, ready, has, toggle, remove, clear],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistApi {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within <WishlistProvider>");
  return ctx;
}

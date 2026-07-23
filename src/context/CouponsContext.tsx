"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "mmsports-coupons-v1";
const APPLIED_KEY = "mmsports-coupon-applied";

export type CouponType = "percent" | "flat" | "freeship";

export interface Coupon {
  code: string;
  type: CouponType;
  value: number; // percent (0-100) or flat ₹; ignored for freeship
  active: boolean;
}

const SEED: Coupon[] = [
  { code: "MM10", type: "percent", value: 10, active: true },
  { code: "FLAT500", type: "flat", value: 500, active: true },
  { code: "FREESHIP", type: "freeship", value: 0, active: true },
];

export interface CouponResult {
  code: string | null;
  discount: number;
  freeShipping: boolean;
}

interface CouponsApi {
  coupons: Coupon[];
  ready: boolean;
  applied: Coupon | null;
  apply: (code: string) => { ok: boolean; error?: string };
  clearApplied: () => void;
  resultFor: (subtotal: number) => CouponResult;
  // admin
  upsert: (coupon: Coupon, originalCode?: string) => void;
  remove: (code: string) => void;
  toggle: (code: string) => void;
}

const CouponsContext = createContext<CouponsApi | null>(null);

function labelFor(c: Coupon): string {
  if (c.type === "percent") return `${c.value}% off`;
  if (c.type === "flat") return `₹${c.value} off`;
  return "Free shipping";
}
export { labelFor as couponLabel };

export function CouponsProvider({ children }: { children: React.ReactNode }) {
  const [coupons, setCoupons] = useState<Coupon[]>(SEED);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCoupons(JSON.parse(raw));
      const a = localStorage.getItem(APPLIED_KEY);
      if (a) setAppliedCode(a);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(coupons));
    } catch {
      /* ignore */
    }
  }, [coupons, ready]);

  useEffect(() => {
    if (!ready) return;
    try {
      if (appliedCode) localStorage.setItem(APPLIED_KEY, appliedCode);
      else localStorage.removeItem(APPLIED_KEY);
    } catch {
      /* ignore */
    }
  }, [appliedCode, ready]);

  const applied = useMemo(
    () => coupons.find((c) => c.code === appliedCode && c.active) ?? null,
    [coupons, appliedCode],
  );

  const apply = useCallback(
    (raw: string) => {
      const code = raw.trim().toUpperCase();
      if (!code) return { ok: false, error: "Enter a code." };
      const found = coupons.find((c) => c.code.toUpperCase() === code);
      if (!found || !found.active) return { ok: false, error: "Invalid or expired code." };
      setAppliedCode(found.code);
      return { ok: true };
    },
    [coupons],
  );

  const clearApplied = useCallback(() => setAppliedCode(null), []);

  const resultFor = useCallback(
    (subtotal: number): CouponResult => {
      if (!applied) return { code: null, discount: 0, freeShipping: false };
      if (applied.type === "percent")
        return { code: applied.code, discount: Math.round((subtotal * applied.value) / 100), freeShipping: false };
      if (applied.type === "flat")
        return { code: applied.code, discount: Math.min(subtotal, applied.value), freeShipping: false };
      return { code: applied.code, discount: 0, freeShipping: true };
    },
    [applied],
  );

  const upsert = useCallback((coupon: Coupon, originalCode?: string) => {
    const code = coupon.code.trim().toUpperCase();
    setCoupons((prev) => {
      const next = prev.filter((c) => c.code !== (originalCode ?? code));
      return [{ ...coupon, code }, ...next];
    });
  }, []);

  const remove = useCallback((code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    setAppliedCode((a) => (a === code ? null : a));
  }, []);

  const toggle = useCallback((code: string) => {
    setCoupons((prev) => prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c)));
  }, []);

  const value = useMemo<CouponsApi>(
    () => ({ coupons, ready, applied, apply, clearApplied, resultFor, upsert, remove, toggle }),
    [coupons, ready, applied, apply, clearApplied, resultFor, upsert, remove, toggle],
  );

  return <CouponsContext.Provider value={value}>{children}</CouponsContext.Provider>;
}

export function useCoupons(): CouponsApi {
  const ctx = useContext(CouponsContext);
  if (!ctx) throw new Error("useCoupons must be used within <CouponsProvider>");
  return ctx;
}

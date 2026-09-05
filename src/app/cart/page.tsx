"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { CartSkeleton } from "@/components/ui/Skeleton";
import { ProductArt } from "@/components/ProductArt";
import { useCart } from "@/context/CartContext";
import { useCatalog } from "@/context/CatalogContext";
import { LineNotice } from "@/components/cart/LineNotice";
import { useCoupons, couponLabel } from "@/context/CouponsContext";
import { inr } from "@/lib/format";
import {
  FREE_SHIPPING_OVER as FREE_SHIPPING,
  STANDARD_FEE as SHIPPING_FEE,
} from "@/lib/shipping";

export default function CartPage() {
  const { lines, subtotal, count, setQty, remove, repriceLine, clear, ready } = useCart();
  const { getById, ready: catalogReady } = useCatalog();
  const { applied, apply, clearApplied, resultFor } = useCoupons();
  const [code, setCode] = useState("");
  const [codeErr, setCodeErr] = useState<string | null>(null);

  if (!ready) {
    return (
      <Container className="py-16">
        <CartSkeleton />
      </Container>
    );
  }

  if (count === 0) {
    return (
      <Container className="py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-subtle text-brand-400">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
              <path d="M6 8h12l-1 12H7L6 8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-ink">Your bag is empty</h1>
          <p className="mt-2 text-sm text-muted/55">
            Looks like you haven&apos;t added any gear yet. Let&apos;s fix that.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white press transition-colors"
          >
            Start shopping
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </Container>
    );
  }

  const coupon = resultFor(subtotal);
  const freeShippingHit = subtotal >= FREE_SHIPPING || coupon.freeShipping;
  const shipping = freeShippingHit ? 0 : SHIPPING_FEE;
  const remaining = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);
  const total = Math.max(0, subtotal - coupon.discount + shipping);

  function applyCode(e: React.FormEvent) {
    e.preventDefault();
    const res = apply(code);
    if (!res.ok) setCodeErr(res.error ?? "Invalid code");
    else {
      setCodeErr(null);
      setCode("");
    }
  }

  return (
    <Container className="py-8 sm:py-10">
      <div className="flex items-end justify-between">
        <h1 className="title-fluid font-display font-extrabold tracking-tight text-ink">
          Your bag
        </h1>
        <button onClick={clear} className="text-sm font-medium text-muted/50 hover:text-ball-500">
          Clear bag
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Line items */}
        <div className="space-y-4">
          {/* Free shipping progress */}
          <div className="rounded-2xl border border-line/8 bg-surface p-4">
            {freeShippingHit ? (
              <p className="flex items-center gap-2 text-sm font-medium text-accent">
                <span className="text-gold-500">✦</span> You&apos;ve unlocked free shipping!
              </p>
            ) : (
              <p className="text-sm text-muted/70">
                Add <span className="font-semibold text-ink">{inr(remaining)}</span> more for{" "}
                <span className="font-semibold">free shipping</span>
              </p>
            )}
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-brand-900/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-gold-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ul className="divide-y divide-line/8 overflow-hidden rounded-2xl border border-line/8 bg-surface">
            {lines.map((line) => {
              // The bag stores its own copy of name and price, so compare it
              // with the live catalog rather than trusting the snapshot.
              const live = catalogReady ? getById(line.productId) : undefined;
              const withdrawn = catalogReady && !live;
              const repriced =
                !!live && Number.isFinite(live.price) && live.price !== line.price;

              return (
              <li key={line.id} className="p-4">
                {withdrawn && (
                  <LineNotice kind="unavailable" onResolve={() => remove(line.id)} />
                )}
                {repriced && (
                  <LineNotice
                    kind="reprice"
                    currentPrice={inr(live.price)}
                    onResolve={() => repriceLine(line.id, live.price)}
                  />
                )}
                <div className="flex gap-4">
                <Link
                  href={`/product/${line.slug}`}
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line/8 sm:h-24 sm:w-24"
                >
                  <ProductArt art={line.art} accent={line.accent} image={line.image} label={line.name} className="h-full w-full" />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                        {line.brand}
                      </p>
                      <Link
                        href={`/product/${line.slug}`}
                        className="font-display text-sm font-semibold text-ink hover:underline"
                      >
                        {line.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-muted/55">
                        {[line.color, line.hand, line.size].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(line.id)}
                      className="text-muted/35 transition-colors hover:text-ball-500"
                      aria-label={`Remove ${line.name}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-2">
                    <div className="inline-flex items-center rounded-full border border-line/15">
                      <button
                        onClick={() => setQty(line.id, line.qty - 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-subtle"
                        aria-label="Decrease quantity"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
                      </button>
                      <span className="w-7 text-center text-sm font-semibold tabular-nums">{line.qty}</span>
                      <button
                        onClick={() => setQty(line.id, line.qty + 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-subtle"
                        aria-label="Increase quantity"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
                      </button>
                    </div>
                    <p className="font-display text-base font-bold text-ink">
                      {inr(line.price * line.qty)}
                    </p>
                  </div>
                </div>
                </div>
              </li>
              );
            })}
          </ul>

          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-2xl bg-brand-950 p-6 text-white shadow-xl shadow-brand-950/20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-brand-500), var(--color-gold-500), transparent)",
              }}
            />
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Order summary
            </h2>

            {/* Promo code */}
            <div className="mt-4">
              {applied ? (
                <div className="flex items-center justify-between gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5">
                  <span className="flex items-center gap-2 text-sm">
                    <span className="rounded bg-brand-500 px-1.5 py-0.5 text-[11px] font-bold text-white">
                      {applied.code}
                    </span>
                    <span className="font-medium text-gold-400">{couponLabel(applied)} applied</span>
                  </span>
                  <button onClick={clearApplied} className="text-xs font-semibold text-ball-500 hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={applyCode} className="flex gap-2">
                  <input
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.toUpperCase());
                      setCodeErr(null);
                    }}
                    placeholder="Promo code"
                    className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm uppercase tracking-wide text-white outline-none placeholder:text-white/35 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25"
                  />
                  <button
                    type="submit"
                    className="press shrink-0 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/20"
                  >
                    Apply
                  </button>
                </form>
              )}
              {codeErr && <p className="mt-1.5 text-xs text-ball-600">{codeErr}</p>}
              {!applied && (
                <p className="mt-1.5 text-[11px] text-white/35">Try ONEUP10, FLAT500 or FREESHIP</p>
              )}
            </div>

            <dl className="mt-5 space-y-3.5 text-sm">
              <HudRow label="Items">{count}</HudRow>
              <HudRow label="Subtotal">{inr(subtotal)}</HudRow>
              {coupon.discount > 0 && (
                <HudRow label={`Discount · ${applied?.code}`} tone="accent">
                  −{inr(coupon.discount)}
                </HudRow>
              )}
              <HudRow label="Delivery" tone={shipping === 0 ? "accent" : undefined}>
                {shipping === 0 ? "Free" : inr(shipping)}
              </HudRow>

              <div className="!mt-5 border-t border-white/12 pt-4">
                <div className="flex items-baseline justify-between">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                    Total
                  </dt>
                  <dd className="font-display text-3xl font-extrabold tabular-nums text-white">
                    {inr(total)}
                  </dd>
                </div>
              </div>
            </dl>

            <Link
              href="/checkout"
              className="press btn-shine mt-6 block w-full rounded-full bg-brand-500 px-6 py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-500/30 transition-shadow hover:shadow-xl hover:shadow-brand-500/40"
            >
              Proceed to checkout
            </Link>
            <p className="mt-3 text-center text-[11px] text-white/40">
              Free delivery over ₹2,000 · easy 7-day returns
            </p>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/40">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              Secure, encrypted checkout
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

function HudRow({
  label,
  tone,
  children,
}: {
  label: string;
  tone?: "accent";
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
        {label}
      </dt>
      <dd
        className={`font-display text-base font-bold tabular-nums ${
          tone === "accent" ? "text-gold-400" : "text-white"
        }`}
      >
        {children}
      </dd>
    </div>
  );
}

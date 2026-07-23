"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";
import { useCart } from "@/context/CartContext";
import { useCoupons, couponLabel } from "@/context/CouponsContext";
import { inr } from "@/lib/format";

const FREE_SHIPPING = 2000;
const SHIPPING_FEE = 99;

export default function CartPage() {
  const { lines, subtotal, count, setQty, remove, clear, ready } = useCart();
  const { applied, apply, clearApplied, resultFor } = useCoupons();
  const [code, setCode] = useState("");
  const [codeErr, setCodeErr] = useState<string | null>(null);

  if (!ready) {
    return (
      <Container className="py-16">
        <div className="skeleton mx-auto h-40 max-w-md rounded-2xl" />
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
            {lines.map((line) => (
              <li key={line.id} className="flex gap-4 p-4">
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
              </li>
            ))}
          </ul>

          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line/8 bg-surface p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-ink">Order summary</h2>

            {/* Promo code */}
            <div className="mt-4">
              {applied ? (
                <div className="flex items-center justify-between gap-2 rounded-xl border border-brand-600/30 bg-brand-50 px-3 py-2.5">
                  <span className="flex items-center gap-2 text-sm">
                    <span className="rounded bg-brand-900 px-1.5 py-0.5 text-[11px] font-bold text-white">
                      {applied.code}
                    </span>
                    <span className="font-medium text-accent">{couponLabel(applied)} applied</span>
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
                    className="min-w-0 flex-1 rounded-xl border border-line/15 bg-surface px-3 py-2.5 text-sm uppercase tracking-wide outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  />
                  <button
                    type="submit"
                    className="press shrink-0 rounded-xl bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                  >
                    Apply
                  </button>
                </form>
              )}
              {codeErr && <p className="mt-1.5 text-xs text-ball-600">{codeErr}</p>}
              {!applied && (
                <p className="mt-1.5 text-[11px] text-muted/45">Try MM10, FLAT500 or FREESHIP</p>
              )}
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-muted/70">
                <dt>Subtotal ({count} {count === 1 ? "item" : "items"})</dt>
                <dd className="font-medium text-ink">{inr(subtotal)}</dd>
              </div>
              {coupon.discount > 0 && (
                <div className="flex justify-between text-accent">
                  <dt>Discount ({applied?.code})</dt>
                  <dd className="font-medium">−{inr(coupon.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between text-muted/70">
                <dt>Shipping</dt>
                <dd className="font-medium text-ink">
                  {shipping === 0 ? <span className="text-accent">Free</span> : inr(shipping)}
                </dd>
              </div>
              <div className="my-2 h-px bg-brand-900/8" />
              <div className="flex items-baseline justify-between">
                <dt className="font-display text-base font-bold text-ink">Total</dt>
                <dd className="font-display text-xl font-extrabold text-ink">{inr(total)}</dd>
              </div>
            </dl>

            <Link
              href="/checkout"
              className="press mt-6 block w-full rounded-full bg-brand-900 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand-900/15 transition-colors hover:bg-brand-800"
            >
              Checkout · {inr(total)}
            </Link>
            <p className="mt-3 text-center text-[11px] text-muted/45">
              Demo storefront — no payment is taken.
            </p>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted/50">
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

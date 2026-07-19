"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";
import { useCart } from "@/context/CartContext";
import { inr } from "@/lib/format";

const FREE_SHIPPING = 2000;
const SHIPPING_FEE = 99;

export default function CartPage() {
  const { lines, subtotal, count, setQty, remove, clear, ready } = useCart();
  const [placed, setPlaced] = useState(false);

  if (!ready) {
    return (
      <Container className="py-16">
        <div className="mx-auto h-40 max-w-md animate-pulse rounded-2xl bg-brand-900/5" />
      </Container>
    );
  }

  if (placed) {
    return (
      <Container className="py-20">
        <div className="mx-auto max-w-md rounded-3xl border border-brand-900/8 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold text-brand-950">Order placed!</h1>
          <p className="mt-2 text-sm text-brand-900/60">
            Thanks for the (pretend) order — this is a demo storefront, so no
            payment was taken and nothing will ship.
          </p>
          <Link
            href="/shop"
            className="mt-6 press inline-block rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Keep shopping
          </Link>
        </div>
      </Container>
    );
  }

  if (count === 0) {
    return (
      <Container className="py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-400">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
              <path d="M6 8h12l-1 12H7L6 8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-brand-950">Your bag is empty</h1>
          <p className="mt-2 text-sm text-brand-900/55">
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

  const freeShippingHit = subtotal >= FREE_SHIPPING;
  const shipping = freeShippingHit ? 0 : SHIPPING_FEE;
  const remaining = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);
  const total = subtotal + shipping;

  return (
    <Container className="py-8 sm:py-10">
      <div className="flex items-end justify-between">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
          Your bag
        </h1>
        <button onClick={clear} className="text-sm font-medium text-brand-900/50 hover:text-ball-500">
          Clear bag
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Line items */}
        <div className="space-y-4">
          {/* Free shipping progress */}
          <div className="rounded-2xl border border-brand-900/8 bg-white p-4">
            {freeShippingHit ? (
              <p className="flex items-center gap-2 text-sm font-medium text-brand-700">
                <span className="text-gold-500">✦</span> You&apos;ve unlocked free shipping!
              </p>
            ) : (
              <p className="text-sm text-brand-900/70">
                Add <span className="font-semibold text-brand-950">{inr(remaining)}</span> more for{" "}
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

          <ul className="divide-y divide-brand-900/8 overflow-hidden rounded-2xl border border-brand-900/8 bg-white">
            {lines.map((line) => (
              <li key={line.id} className="flex gap-4 p-4">
                <Link
                  href={`/product/${line.slug}`}
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-brand-900/8 sm:h-24 sm:w-24"
                >
                  <ProductArt art={line.art} accent={line.accent} label={line.name} className="h-full w-full" />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-500">
                        {line.brand}
                      </p>
                      <Link
                        href={`/product/${line.slug}`}
                        className="font-display text-sm font-semibold text-brand-950 hover:underline"
                      >
                        {line.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-brand-900/55">
                        {[line.color, line.hand, line.size].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(line.id)}
                      className="text-brand-900/35 transition-colors hover:text-ball-500"
                      aria-label={`Remove ${line.name}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-2">
                    <div className="inline-flex items-center rounded-full border border-brand-900/15">
                      <button
                        onClick={() => setQty(line.id, line.qty - 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-brand-900 hover:bg-brand-50"
                        aria-label="Decrease quantity"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
                      </button>
                      <span className="w-7 text-center text-sm font-semibold tabular-nums">{line.qty}</span>
                      <button
                        onClick={() => setQty(line.id, line.qty + 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-brand-900 hover:bg-brand-50"
                        aria-label="Increase quantity"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
                      </button>
                    </div>
                    <p className="font-display text-base font-bold text-brand-950">
                      {inr(line.price * line.qty)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-brand-900/8 bg-white p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-brand-950">Order summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-brand-900/70">
                <dt>Subtotal ({count} {count === 1 ? "item" : "items"})</dt>
                <dd className="font-medium text-brand-950">{inr(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-brand-900/70">
                <dt>Shipping</dt>
                <dd className="font-medium text-brand-950">
                  {shipping === 0 ? <span className="text-brand-600">Free</span> : inr(shipping)}
                </dd>
              </div>
              <div className="my-2 h-px bg-brand-900/8" />
              <div className="flex items-baseline justify-between">
                <dt className="font-display text-base font-bold text-brand-950">Total</dt>
                <dd className="font-display text-xl font-extrabold text-brand-950">{inr(total)}</dd>
              </div>
            </dl>

            <button
              onClick={() => {
                setPlaced(true);
                clear();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mt-6 w-full rounded-full bg-brand-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/15 transition-all hover:bg-brand-800"
            >
              Checkout · {inr(total)}
            </button>
            <p className="mt-3 text-center text-[11px] text-brand-900/45">
              Demo storefront — no payment is taken.
            </p>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-brand-900/50">
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

"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrdersContext";
import { useCoupons } from "@/context/CouponsContext";
import { useAuth } from "@/context/AuthContext";
import { inr } from "@/lib/format";

const FREE_SHIPPING = 2000;
const STANDARD_FEE = 99;
const EXPRESS_FEE = 149;

type Ship = "standard" | "express";
type Pay = "cod" | "upi" | "card";

export default function CheckoutPage() {
  const { lines, subtotal, count, clear, ready } = useCart();
  const { addOrder } = useOrders();
  const { applied, resultFor, clearApplied } = useCoupons();
  const { user } = useAuth();
  const [ship, setShip] = useState<Ship>("standard");
  const [pay, setPay] = useState<Pay>("cod");
  const [placed, setPlaced] = useState<string | null>(null);

  if (!ready) {
    return (
      <Container className="py-16">
        <div className="skeleton mx-auto h-48 max-w-2xl rounded-2xl" />
      </Container>
    );
  }

  // ---- Order confirmation ----
  if (placed) {
    return (
      <Container className="py-20">
        <div className="mx-auto max-w-lg rounded-3xl border border-line/8 bg-surface p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-accent">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold text-ink">Order confirmed!</h1>
          <p className="mt-2 text-sm text-muted/60">
            Thanks for shopping with MM Sports. Your order number is{" "}
            <span className="font-semibold text-ink">{placed}</span>.
          </p>
          <p className="mt-1 text-xs text-muted/45">
            Demo storefront — no payment was taken and nothing will ship.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/orders" className="press rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800">
              View your orders
            </Link>
            <Link href="/shop" className="press rounded-full border border-line/15 bg-surface px-6 py-3 text-sm font-semibold text-ink hover:bg-subtle">
              Keep shopping
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  // ---- Empty guard ----
  if (count === 0) {
    return (
      <Container className="py-20">
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-display text-2xl font-bold text-ink">Your bag is empty</h1>
          <p className="mt-2 text-sm text-muted/55">Add some gear before checking out.</p>
          <Link href="/shop" className="press mt-6 inline-block rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800">
            Start shopping
          </Link>
        </div>
      </Container>
    );
  }

  const coupon = resultFor(subtotal);
  const freeShip = subtotal >= FREE_SHIPPING || coupon.freeShipping;
  const shippingBase = freeShip ? 0 : STANDARD_FEE;
  const shipping = ship === "express" ? EXPRESS_FEE : shippingBase;
  const total = Math.max(0, subtotal - coupon.discount + shipping);

  function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const address = [get("address"), get("city"), get("state"), get("pincode")]
      .filter(Boolean)
      .join(", ");
    const order = addOrder({
      email: user?.email || get("email"),
      name: get("name"),
      address,
      items: lines,
      subtotal,
      discount: coupon.discount,
      coupon: coupon.code,
      shipping,
      total,
      shippingMethod: ship === "express" ? "Express (1–2 days)" : "Standard (3–5 days)",
      paymentMethod: pay === "cod" ? "Cash on Delivery" : pay === "upi" ? "UPI" : "Card",
    });
    clear();
    clearApplied();
    setPlaced(order.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Container className="py-8 sm:py-10">
      <nav className="flex items-center gap-1.5 text-xs text-muted/50">
        <Link href="/cart" className="hover:text-accent">Bag</Link>
        <span>/</span>
        <span className="text-muted/80">Checkout</span>
      </nav>
      <h1 className="title-fluid mt-3 font-display font-extrabold tracking-tight text-ink">
        Checkout
      </h1>
      <div className="seam-stitch mt-3 w-16" aria-hidden />

      <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* form column */}
        <div className="space-y-6">
          <Section title="Contact details">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Full name" name="name" autoComplete="name" />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
              <div className="sm:col-span-2">
                <Field label="Email" name="email" type="email" autoComplete="email" />
              </div>
            </div>
          </Section>

          <Section title="Shipping address">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Address" name="address" autoComplete="street-address" />
              </div>
              <Field label="City" name="city" autoComplete="address-level2" />
              <Field label="State" name="state" autoComplete="address-level1" />
              <Field label="PIN code" name="pincode" autoComplete="postal-code" />
            </div>
          </Section>

          <Section title="Shipping method">
            <div className="space-y-2.5">
              <Choice
                checked={ship === "standard"}
                onChange={() => setShip("standard")}
                title="Standard"
                sub={subtotal >= FREE_SHIPPING ? "3–5 days · Free" : `3–5 days · ${inr(STANDARD_FEE)}`}
              />
              <Choice
                checked={ship === "express"}
                onChange={() => setShip("express")}
                title="Express"
                sub={`1–2 days · ${inr(EXPRESS_FEE)}`}
              />
            </div>
          </Section>

          <Section title="Payment">
            <div className="space-y-2.5">
              <Choice checked={pay === "cod"} onChange={() => setPay("cod")} title="Cash on Delivery" sub="Pay when it arrives" />
              <Choice checked={pay === "upi"} onChange={() => setPay("upi")} title="UPI" sub="Demo — no real payment" />
              <Choice checked={pay === "card"} onChange={() => setPay("card")} title="Card" sub="Demo — no real payment" />
            </div>
            <p className="mt-3 text-xs text-muted/45">
              This is a demo store. No payment is processed and no card details are collected.
            </p>
          </Section>
        </div>

        {/* summary column */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line/8 bg-surface p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-ink">Your order</h2>
            <ul className="mt-4 space-y-3">
              {lines.map((line) => (
                <li key={line.id} className="flex items-center gap-3">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-line/8">
                    <ProductArt art={line.art} accent={line.accent} image={line.image} label={line.name} className="h-full w-full" />
                    <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-900 px-1 text-[10px] font-bold text-white">
                      {line.qty}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-ink">{line.name}</span>
                    <span className="block truncate text-xs text-muted/50">
                      {[line.color, line.hand, line.size].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-ink">{inr(line.price * line.qty)}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-2.5 border-t border-line/8 pt-4 text-sm">
              <div className="flex justify-between text-muted/70">
                <dt>Subtotal ({count})</dt>
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
              <div className="flex items-baseline justify-between border-t border-line/8 pt-3">
                <dt className="font-display text-base font-bold text-ink">Total</dt>
                <dd className="font-display text-xl font-extrabold text-ink">{inr(total)}</dd>
              </div>
            </dl>

            <button
              type="submit"
              className="press mt-6 w-full rounded-full bg-brand-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/15 transition-colors hover:bg-brand-800"
            >
              Place order · {inr(total)}
            </button>
            <Link href="/cart" className="mt-3 block text-center text-xs font-medium text-muted/55 hover:text-ink">
              ← Back to bag
            </Link>
          </div>
        </div>
      </form>
    </Container>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line/8 bg-surface p-5 sm:p-6">
      <h2 className="mb-4 font-display text-base font-bold text-ink">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted/60">{label}</span>
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-line/15 bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      />
    </label>
  );
}

function Choice({
  checked,
  onChange,
  title,
  sub,
}: {
  checked: boolean;
  onChange: () => void;
  title: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
        checked ? "border-brand-700 bg-subtle" : "border-line/15 hover:border-line/30"
      }`}
    >
      <span
        className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          checked ? "border-brand-700 bg-brand-700" : "border-line/30"
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-surface" />}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-semibold text-ink">{title}</span>
        <span className="block text-xs text-muted/50">{sub}</span>
      </span>
    </button>
  );
}

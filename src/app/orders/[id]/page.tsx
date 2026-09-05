"use client";

import Link from "next/link";
import { use } from "react";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";
import { ErrorState } from "@/components/ui/ErrorState";
import { OrderDetailSkeleton } from "@/components/ui/Skeleton";
import { useOrders } from "@/context/OrdersContext";
import { inr } from "@/lib/format";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { orders, ready } = useOrders();

  if (!ready) {
    return (
      <Container className="py-8 sm:py-12">
        <OrderDetailSkeleton />
      </Container>
    );
  }

  const order = orders.find((o) => o.id === decodeURIComponent(id));

  if (!order) {
    return (
      <Container className="py-8">
        <ErrorState
          title="Order not found"
          description="This order may have been removed, or it was placed in a different browser."
          backHref="/orders"
          backLabel="Return to orders"
        />
      </Container>
    );
  }

  const placed = new Date(order.createdAt);

  return (
    <Container className="py-8 sm:py-12">
      <nav className="flex items-center gap-1.5 text-xs text-muted/50">
        <Link href="/account" className="hover:text-accent">
          Account
        </Link>
        <span aria-hidden>/</span>
        <Link href="/orders" className="hover:text-accent">
          Orders
        </Link>
        <span aria-hidden>/</span>
        <span className="text-muted/80">{order.id}</span>
      </nav>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
        Order {order.id}
      </p>
      <h1 className="title-fluid mt-1 font-display font-extrabold uppercase tracking-tight text-ink">
        {order.items.length} {order.items.length === 1 ? "item" : "items"}
      </h1>
      <p className="mt-2 text-sm text-muted/55">
        Placed{" "}
        <time dateTime={order.createdAt}>
          {placed.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
        {/* Items */}
        <section aria-label="Items in this order">
          <ul className="space-y-3">
            {order.items.map((line) => (
              <li
                key={line.id}
                className="flex gap-4 rounded-2xl border border-line/8 bg-surface p-4"
              >
                <Link
                  href={`/product/${line.slug}`}
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line/8"
                >
                  <ProductArt
                    art={line.art}
                    accent={line.accent}
                    image={line.image}
                    label={line.name}
                    sizes="80px"
                    className="h-full w-full"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                    {line.brand}
                  </p>
                  <Link
                    href={`/product/${line.slug}`}
                    className="font-display text-sm font-semibold text-ink hover:underline"
                  >
                    {line.name}
                  </Link>
                  {[line.color, line.hand, line.size].filter(Boolean).length > 0 && (
                    <p className="mt-0.5 text-xs text-muted/55">
                      {[line.color, line.hand, line.size].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-muted/60">
                    Qty {line.qty} · {inr(line.price)} each
                  </p>
                </div>
                <p className="shrink-0 font-display text-sm font-bold tabular-nums text-ink">
                  {inr(line.price * line.qty)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Detail title="Shipping address">
              <p className="whitespace-pre-line">{order.name}</p>
              <p className="whitespace-pre-line">{order.address}</p>
            </Detail>
            <Detail title="Payment">
              <p>{order.paymentMethod}</p>
              <p className="mt-1 text-muted/50">{order.shippingMethod}</p>
            </Detail>
          </div>

          {/* Fulfilment is not connected, so no progress bar is drawn. */}
          <div className="mt-4 rounded-2xl border border-line/8 bg-subtle p-5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted/50">
              Tracking
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted/65">
              Order tracking will appear here once orders are connected to the
              store. For now, call{" "}
              <a href="tel:+918056126269" className="font-semibold text-accent">
                +91 80561 26269
              </a>{" "}
              to confirm this order.
            </p>
          </div>
        </section>

        {/* Totals */}
        <aside className="relative overflow-hidden rounded-2xl bg-brand-950 p-6 text-white lg:sticky lg:top-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-brand-500), var(--color-gold-500), transparent)",
            }}
          />
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Summary
          </h2>
          <dl className="mt-5 space-y-3.5 text-sm">
            <Row label="Subtotal">{inr(order.subtotal)}</Row>
            {order.discount > 0 && (
              <Row label={`Discount${order.coupon ? ` · ${order.coupon}` : ""}`} tone="accent">
                −{inr(order.discount)}
              </Row>
            )}
            <Row label="Delivery" tone={order.shipping === 0 ? "accent" : undefined}>
              {order.shipping === 0 ? "Free" : inr(order.shipping)}
            </Row>
            <div className="!mt-5 border-t border-white/12 pt-4">
              <div className="flex items-baseline justify-between">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                  Total
                </dt>
                <dd className="font-display text-3xl font-extrabold tabular-nums text-white">
                  {inr(order.total)}
                </dd>
              </div>
            </div>
          </dl>

          <Link
            href="/orders"
            className="press mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/20"
          >
            All orders
          </Link>
        </aside>
      </div>
    </Container>
  );
}

function Detail({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line/8 bg-surface p-5">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted/50">
        {title}
      </h2>
      <div className="mt-2 text-sm leading-relaxed text-ink">{children}</div>
    </div>
  );
}

function Row({
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

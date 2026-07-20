"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";
import { useOrders, type Order, type OrderStatus } from "@/context/OrdersContext";
import { useAuth } from "@/context/AuthContext";
import { inr } from "@/lib/format";

const STATUS_STYLES: Record<OrderStatus, string> = {
  Pending: "bg-gold-500/15 text-gold-700",
  Packed: "bg-brand-100 text-accent",
  Shipped: "bg-brand-600/15 text-accent",
  Delivered: "bg-brand-600 text-white",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function OrdersPage() {
  const { orders, ready, ordersFor } = useOrders();
  const { user, ready: authReady } = useAuth();

  if (!ready || !authReady) {
    return (
      <Container className="py-16">
        <div className="skeleton mx-auto h-48 max-w-2xl rounded-2xl" />
      </Container>
    );
  }

  const list = user ? ordersFor(user.email) : orders;

  if (list.length === 0) {
    return (
      <Container className="py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-subtle text-brand-400">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
              <path d="M5 7l1.5 12h11L19 7M4 7h16M9 10v6M15 10v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-ink">No orders yet</h1>
          <p className="mt-2 text-sm text-muted/55">
            When you place an order it&apos;ll show up here.
          </p>
          <Link href="/shop" className="press mt-6 inline-block rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800">
            Start shopping
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 sm:py-10">
      <h1 className="title-fluid font-display font-extrabold tracking-tight text-ink">
        Your orders
      </h1>
      <div className="seam-stitch mt-3 w-16" aria-hidden />
      <p className="mt-2 text-sm text-muted/55">
        {list.length} {list.length === 1 ? "order" : "orders"}
        {user ? ` · ${user.email}` : ""}
      </p>

      <div className="mt-8 space-y-4">
        {list.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </Container>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line/8 bg-surface shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/8 bg-brand-50/50 px-5 py-3.5">
        <div>
          <p className="font-display text-sm font-bold text-ink">{order.id}</p>
          <p className="text-xs text-muted/50">
            Placed {formatDate(order.createdAt)} · {order.items.length}{" "}
            {order.items.length === 1 ? "item" : "items"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          <span className="font-display text-base font-bold text-ink">{inr(order.total)}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 px-5 py-4">
        {order.items.map((line) => (
          <div key={line.id} className="flex items-center gap-3">
            <span className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-line/8">
              <ProductArt art={line.art} accent={line.accent} label={line.name} className="h-full w-full" />
            </span>
            <span className="min-w-0">
              <span className="block max-w-[180px] truncate text-sm font-medium text-ink">{line.name}</span>
              <span className="block text-xs text-muted/50">Qty {line.qty}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-line/8 px-5 py-3 text-xs text-muted/55">
        Shipping to {order.address || "—"} · {order.shippingMethod} · {order.paymentMethod}
      </div>
    </div>
  );
}

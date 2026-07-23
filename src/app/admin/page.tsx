"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";
import { useAuth } from "@/context/AuthContext";
import { useCatalog, type NewProductInput, type Override } from "@/context/CatalogContext";
import { useOrders, ORDER_STATUSES, type Order, type OrderStatus } from "@/context/OrdersContext";
import { useCoupons, couponLabel, type CouponType } from "@/context/CouponsContext";
import { categories, categoryMap } from "@/lib/catalog";
import { inr } from "@/lib/format";
import type { Badge, CategorySlug, Product } from "@/lib/types";

const BADGES: (Badge | "None")[] = ["None", "New", "Bestseller", "Sale", "Pro"];

type Editing =
  | { mode: "add" }
  | { mode: "edit"; product: Product }
  | null;

export default function AdminPage() {
  const { isAdmin, ready, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !isAdmin) router.replace("/login?next=/admin");
  }, [ready, isAdmin, router]);

  if (!ready) {
    return (
      <Container className="py-16">
        <div className="skeleton mx-auto h-96 max-w-5xl rounded-2xl" />
      </Container>
    );
  }
  if (!isAdmin) return null;

  return <Dashboard email={user!.email} onLogout={logout} />;
}

function Dashboard({ email, onLogout }: { email: string; onLogout: () => void }) {
  const { products, edited, updateProduct, addProduct, deleteProduct, resetAll } = useCatalog();
  const { orders, updateStatus } = useOrders();
  const couponsApi = useCoupons();
  const router = useRouter();
  const [tab, setTab] = useState<"products" | "orders" | "coupons">("products");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"all" | CategorySlug>("all");
  const [editing, setEditing] = useState<Editing>(null);

  const stats = useMemo(() => {
    const value = products.reduce((n, p) => n + p.price, 0);
    const inStock = products.filter((p) => p.inStock).length;
    return {
      total: products.length,
      inStock,
      outOfStock: products.length - inStock,
      categories: new Set(products.map((p) => p.category)).size,
      value,
    };
  }, [products]);

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return products
      .filter((p) => (cat === "all" ? true : p.category === cat))
      .filter((p) => (query ? p.name.toLowerCase().includes(query) : true));
  }, [products, q, cat]);

  return (
    <Container className="py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
            <span className="inline-flex h-2 w-2 rounded-full bg-brand-500" />
            Admin
          </p>
          <h1 className="title-fluid font-display font-extrabold tracking-tight text-ink">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted/55">Signed in as {email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="press rounded-full border border-line/15 bg-surface px-4 py-2 text-sm font-semibold text-ink hover:bg-subtle"
          >
            View store
          </Link>
          <button
            onClick={() => {
              onLogout();
              router.push("/");
            }}
            className="press rounded-full bg-brand-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        <Stat label="Products" value={String(stats.total)} />
        <Stat label="In stock" value={String(stats.inStock)} tone="good" />
        <Stat label="Out of stock" value={String(stats.outOfStock)} tone={stats.outOfStock ? "bad" : "muted"} />
        <Stat label="Categories" value={String(stats.categories)} />
        <Stat label="Catalog value" value={inr(stats.value)} />
      </div>

      {edited && (
        <p className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-gold-500/10 px-4 py-2.5 text-sm text-ink">
          <span className="font-semibold">Live edits active.</span>
          Your changes show on the storefront (saved in this browser).
          <button onClick={resetAll} className="font-semibold text-ball-600 hover:underline">
            Reset to defaults
          </button>
        </p>
      )}

      {/* Tabs */}
      <div className="mt-6 inline-flex rounded-full border border-line/10 bg-subtle p-1">
        {(["products", "orders", "coupons"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`press rounded-full px-4 py-2 text-sm font-semibold capitalize transition-colors ${
              tab === t ? "bg-brand-900 text-white" : "text-muted/60 hover:text-ink"
            }`}
          >
            {t}
            {t === "orders" && orders.length > 0 && (
              <span className={`ml-1.5 ${tab === t ? "text-white/60" : "text-muted/40"}`}>
                {orders.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === "orders" && <OrdersPanel orders={orders} updateStatus={updateStatus} />}
      {tab === "coupons" && <CouponsPanel api={couponsApi} />}

      {tab === "products" && (
      <>
      {/* Toolbar */}
      <div className="mt-6 flex flex-wrap items-center gap-3 border-b border-line/8 pb-4">
        <div className="flex flex-1 items-center rounded-full bg-subtle ring-1 ring-line/5 focus-within:ring-brand-500/40">
          <span className="pl-3 text-muted/40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="w-full bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted/40"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as "all" | CategorySlug)}
          className="cursor-pointer rounded-full border border-line/15 bg-surface py-2 pl-3.5 pr-8 text-sm font-medium text-ink outline-none hover:border-line/30"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => setEditing({ mode: "add" })}
          className="press inline-flex items-center gap-1.5 rounded-full bg-brand-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
          Add product
        </button>
      </div>

      {/* Table */}
      <p className="mt-4 text-sm text-muted/55">
        <span className="font-semibold text-ink">{rows.length}</span>{" "}
        {rows.length === 1 ? "product" : "products"}
      </p>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-line/8 bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-line/8 text-xs uppercase tracking-wider text-muted/45">
              <th className="px-4 py-3 font-semibold">Product</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Badge</th>
              <th className="px-4 py-3 font-semibold">Stock</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-b border-line/6 last:border-0 hover:bg-brand-50/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-line/8">
                      <ProductArt art={p.art} accent={p.accent} image={p.image} label={p.name} className="h-full w-full" />
                    </span>
                    <span className="min-w-0">
                      <span className="block max-w-[220px] truncate font-medium text-ink">{p.name}</span>
                      <span className="block text-xs text-muted/45">{p.brand}</span>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted/70">{categoryMap[p.category].name}</td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-ink">{inr(p.price)}</span>
                  {p.mrp && <span className="ml-1 text-xs text-muted/40 line-through">{inr(p.mrp)}</span>}
                </td>
                <td className="px-4 py-3">
                  {p.badge ? (
                    <span className="rounded-full bg-subtle px-2 py-0.5 text-xs font-semibold text-accent">{p.badge}</span>
                  ) : (
                    <span className="text-xs text-muted/30">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                    className={`inline-flex h-6 w-11 items-center rounded-full px-0.5 transition-colors ${
                      p.inStock ? "justify-end bg-brand-600" : "justify-start bg-brand-900/15"
                    }`}
                    aria-label={p.inStock ? "Mark out of stock" : "Mark in stock"}
                    aria-pressed={p.inStock}
                  >
                    <span className="h-5 w-5 rounded-full bg-surface shadow-sm" />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => setEditing({ mode: "edit", product: p })}
                      className="press rounded-lg p-2 text-accent hover:bg-subtle"
                      aria-label={`Edit ${p.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M4 20h4L18 10l-4-4L4 16v4zM14 6l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete “${p.name}”? This hides it from the store.`)) deleteProduct(p.id);
                      }}
                      className="press rounded-lg p-2 text-ball-500 hover:bg-ball-500/10"
                      aria-label={`Delete ${p.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted/45">
                  No products match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </>
      )}

      {editing && (
        <ProductDialog
          editing={editing}
          onClose={() => setEditing(null)}
          onSaveEdit={(id, patch) => {
            updateProduct(id, patch);
            setEditing(null);
          }}
          onSaveNew={(input) => {
            addProduct(input);
            setEditing(null);
          }}
        />
      )}
    </Container>
  );
}

function OrdersPanel({
  orders,
  updateStatus,
}: {
  orders: Order[];
  updateStatus: (id: string, status: OrderStatus) => void;
}) {
  const revenue = orders.reduce((n, o) => n + o.total, 0);
  const pending = orders.filter((o) => o.status !== "Delivered").length;

  if (orders.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-line/15 bg-white/60 px-6 py-16 text-center">
        <h3 className="font-display text-lg font-bold text-ink">No orders yet</h3>
        <p className="mt-1.5 text-sm text-muted/55">
          Orders placed at checkout will appear here for you to manage.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        <Stat label="Orders" value={String(orders.length)} />
        <Stat label="Revenue" value={inr(revenue)} />
        <Stat label="To fulfil" value={String(pending)} tone={pending ? "bad" : "good"} />
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-line/8 bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-line/8 text-xs uppercase tracking-wider text-muted/45">
              <th className="px-4 py-3 font-semibold">Order</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Items</th>
              <th className="px-4 py-3 font-semibold">Total</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-line/6 last:border-0 hover:bg-brand-50/40">
                <td className="px-4 py-3 font-semibold text-ink">{o.id}</td>
                <td className="px-4 py-3 text-muted/60">
                  {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </td>
                <td className="px-4 py-3">
                  <span className="block max-w-[180px] truncate text-ink">{o.name || "—"}</span>
                  <span className="block max-w-[180px] truncate text-xs text-muted/50">{o.email}</span>
                </td>
                <td className="px-4 py-3 text-muted/70">{o.items.reduce((n, l) => n + l.qty, 0)}</td>
                <td className="px-4 py-3 font-semibold text-ink">{inr(o.total)}</td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
                    className="cursor-pointer rounded-full border border-line/15 bg-surface py-1.5 pl-3 pr-7 text-xs font-semibold text-ink outline-none hover:border-line/30"
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function CouponsPanel({ api }: { api: ReturnType<typeof useCoupons> }) {
  const { coupons, upsert, remove, toggle } = api;
  const [code, setCode] = useState("");
  const [type, setType] = useState<CouponType>("percent");
  const [value, setValue] = useState("10");

  function add(e: React.FormEvent) {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (!c) return;
    upsert({ code: c, type, value: Math.max(0, Number(value) || 0), active: true });
    setCode("");
    setValue(type === "percent" ? "10" : "500");
  }

  return (
    <>
      <form onSubmit={add} className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-line/8 bg-surface p-4">
        <label className="flex-1 min-w-[140px]">
          <span className="mb-1 block text-xs font-medium text-muted/60">Code</span>
          <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="SUMMER20" className={inputCls} />
        </label>
        <label>
          <span className="mb-1 block text-xs font-medium text-muted/60">Type</span>
          <select value={type} onChange={(e) => setType(e.target.value as CouponType)} className={inputCls}>
            <option value="percent">% off</option>
            <option value="flat">₹ flat off</option>
            <option value="freeship">Free shipping</option>
          </select>
        </label>
        {type !== "freeship" && (
          <label className="w-28">
            <span className="mb-1 block text-xs font-medium text-muted/60">{type === "percent" ? "Percent" : "Amount ₹"}</span>
            <input type="number" min={0} value={value} onChange={(e) => setValue(e.target.value)} className={inputCls} />
          </label>
        )}
        <button type="submit" className="press rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800">
          Add coupon
        </button>
      </form>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-line/8 bg-surface">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-line/8 text-xs uppercase tracking-wider text-muted/45">
              <th className="px-4 py-3 font-semibold">Code</th>
              <th className="px-4 py-3 font-semibold">Discount</th>
              <th className="px-4 py-3 font-semibold">Active</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.code} className="border-b border-line/6 last:border-0 hover:bg-subtle/40">
                <td className="px-4 py-3">
                  <span className="rounded bg-brand-900 px-2 py-1 font-mono text-xs font-bold text-white">{c.code}</span>
                </td>
                <td className="px-4 py-3 text-muted/70">{couponLabel(c)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggle(c.code)}
                    aria-pressed={c.active}
                    className={`inline-flex h-6 w-11 items-center rounded-full px-0.5 transition-colors ${c.active ? "justify-end bg-brand-600" : "justify-start bg-brand-900/15"}`}
                  >
                    <span className="h-5 w-5 rounded-full bg-surface shadow-sm" />
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => remove(c.code)}
                    className="press rounded-lg p-2 text-ball-500 hover:bg-ball-500/10"
                    aria-label={`Delete ${c.code}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted/45">No coupons yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Stat({
  label,
  value,
  tone = "muted",
}: {
  label: string;
  value: string;
  tone?: "muted" | "good" | "bad";
}) {
  const toneCls =
    tone === "good" ? "text-accent" : tone === "bad" ? "text-ball-600" : "text-ink";
  return (
    <div className="rounded-2xl border border-line/8 bg-surface p-4 shadow-sm">
      <p className={`font-display text-2xl font-bold ${toneCls}`}>{value}</p>
      <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-muted/45">{label}</p>
    </div>
  );
}

function ProductDialog({
  editing,
  onClose,
  onSaveEdit,
  onSaveNew,
}: {
  editing: Exclude<Editing, null>;
  onClose: () => void;
  onSaveEdit: (id: string, patch: Override) => void;
  onSaveNew: (input: NewProductInput) => void;
}) {
  const isEdit = editing.mode === "edit";
  const p = isEdit ? editing.product : null;

  const [name, setName] = useState(p?.name ?? "");
  const [category, setCategory] = useState<CategorySlug>(p?.category ?? categories[0].slug);
  const [price, setPrice] = useState(String(p?.price ?? ""));
  const [mrp, setMrp] = useState(p?.mrp ? String(p.mrp) : "");
  const [badge, setBadge] = useState<Badge | "None">(p?.badge ?? "None");
  const [inStock, setInStock] = useState(p?.inStock ?? true);
  const [tagline, setTagline] = useState(p?.tagline ?? "");
  const [image, setImage] = useState<string | undefined>(p?.image);
  const [imgBusy, setImgBusy] = useState(false);

  async function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgBusy(true);
    try {
      setImage(await downscaleImage(file, 640, 0.72));
    } catch {
      /* ignore */
    }
    setImgBusy(false);
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    const priceNum = Math.max(0, Math.round(Number(price) || 0));
    const mrpNum = mrp ? Math.max(0, Math.round(Number(mrp))) : undefined;
    const badgeVal = badge === "None" ? undefined : badge;
    if (isEdit && p) {
      onSaveEdit(p.id, {
        name: name.trim(),
        price: priceNum,
        mrp: mrpNum,
        badge: badgeVal,
        inStock,
        tagline: tagline.trim(),
        image,
      });
    } else {
      onSaveNew({
        name: name.trim() || "Untitled product",
        category,
        price: priceNum,
        mrp: mrpNum,
        badge: badgeVal,
        inStock,
        tagline: tagline.trim(),
        image,
      });
    }
  }

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-950/50 backdrop-blur-[2px]" onClick={onClose} />
      <form
        onSubmit={save}
        className="animate-toast-in relative w-full max-w-lg overflow-hidden rounded-2xl bg-surface shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-line/8 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-ink">
            {isEdit ? "Edit product" : "Add product"}
          </h2>
          <button type="button" onClick={onClose} className="press rounded-lg p-1.5 text-muted/50 hover:bg-subtle" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5">
          <Field label="Product name">
            <input value={name} onChange={(e) => setName(e.target.value)} required className={inputCls} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategorySlug)}
                disabled={isEdit}
                className={`${inputCls} ${isEdit ? "cursor-not-allowed opacity-60" : ""}`}
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Badge">
              <select value={badge} onChange={(e) => setBadge(e.target.value as Badge | "None")} className={inputCls}>
                {BADGES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </Field>
            <Field label="Price (₹)">
              <input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} required className={inputCls} />
            </Field>
            <Field label="MRP (₹, optional)">
              <input type="number" min={0} value={mrp} onChange={(e) => setMrp(e.target.value)} className={inputCls} />
            </Field>
          </div>

          <Field label="Tagline">
            <input value={tagline} onChange={(e) => setTagline(e.target.value)} className={inputCls} placeholder="Short one-line description" />
          </Field>

          {/* Product photo */}
          <div>
            <span className="mb-1 block text-xs font-medium text-muted/60">Product photo</span>
            <div className="flex items-center gap-3">
              <span className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-line/10 bg-subtle">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt="preview" className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-[10px] text-muted/45">SVG art</span>
                )}
              </span>
              <div className="flex flex-1 flex-wrap gap-2">
                <label className="press cursor-pointer rounded-full border border-line/15 bg-surface px-4 py-2 text-sm font-semibold text-ink hover:bg-subtle">
                  {imgBusy ? "Processing…" : image ? "Change photo" : "Upload photo"}
                  <input type="file" accept="image/*" onChange={onPickImage} className="hidden" />
                </label>
                {image && (
                  <button
                    type="button"
                    onClick={() => setImage(undefined)}
                    className="press rounded-full px-3 py-2 text-sm font-semibold text-ball-500 hover:bg-ball-500/10"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            <p className="mt-1.5 text-[11px] text-muted/45">Auto-resized to ~640px and saved in this browser.</p>
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-line/12 px-4 py-3">
            <button
              type="button"
              onClick={() => setInStock((v) => !v)}
              className={`inline-flex h-6 w-11 items-center rounded-full px-0.5 transition-colors ${inStock ? "justify-end bg-brand-600" : "justify-start bg-brand-900/15"}`}
              aria-pressed={inStock}
            >
              <span className="h-5 w-5 rounded-full bg-surface shadow-sm" />
            </button>
            <span className="text-sm font-medium text-ink">
              {inStock ? "In stock" : "Out of stock"}
            </span>
          </label>
        </div>

        <div className="flex justify-end gap-2 border-t border-line/8 px-6 py-4">
          <button type="button" onClick={onClose} className="press rounded-full border border-line/15 bg-surface px-5 py-2.5 text-sm font-semibold text-ink hover:bg-subtle">
            Cancel
          </button>
          <button type="submit" className="press rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800">
            {isEdit ? "Save changes" : "Add product"}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-line/15 bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted/60">{label}</span>
      {children}
    </label>
  );
}

/** Read a File, downscale it to `max` px on the long edge, return a JPEG data URL. */
function downscaleImage(file: File, max: number, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read failed"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode failed"));
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("no ctx"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Field } from "@/app/login/page";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrdersContext";
import { useWishlist } from "@/context/WishlistContext";
import { AUTH_BACKEND_CONFIGURED, isValidPhone } from "@/lib/services/auth";

export default function AccountPage() {
  const { user, ready, updateProfile, logout } = useAuth();
  const router = useRouter();
  const { orders, ordersFor } = useOrders();
  const { count: savedCount } = useWishlist();

  useEffect(() => {
    if (ready && !user) router.replace("/login?next=/account");
  }, [ready, user, router]);

  if (!ready) {
    return (
      <Container className="py-16">
        <div className="skeleton mx-auto h-72 max-w-3xl rounded-2xl" />
      </Container>
    );
  }
  if (!user) return null;

  const myOrders = ordersFor(user.email);

  return (
    <Container className="py-8 sm:py-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
        Your account
      </p>
      <h1 className="title-fluid mt-1 font-display font-extrabold uppercase tracking-tight text-ink">
        {user.name || user.email}
      </h1>
      <div className="speed-dash mt-3" aria-hidden>
        <i />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
        <ProfileCard user={user} onSave={updateProfile} />

        <aside className="space-y-3">
          <SummaryLink
            href="/orders"
            label="Orders"
            value={`${myOrders.length || orders.length}`}
          />
          <SummaryLink href="/wishlist" label="Saved gear" value={`${savedCount}`} />
          <SummaryLink href="/cart" label="Your bag" value="Open" />

          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="press min-h-12 w-full rounded-2xl border border-line/12 px-5 py-3 text-sm font-semibold text-ball-600 transition-colors hover:bg-ball-500/10"
          >
            Sign out
          </button>
        </aside>
      </div>
    </Container>
  );
}

function ProfileCard({
  user,
  onSave,
}: {
  user: { email: string; name?: string; phone?: string };
  onSave: (patch: { name?: string; phone?: string }) => void;
}) {
  const [name, setName] = useState(user.name ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [saved, setSaved] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Enter your name.";
    if (phone.trim() && !isValidPhone(phone))
      errs.phone = "Enter a 10-digit Indian mobile number.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onSave({ name: name.trim(), phone: phone.trim() || undefined });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-2xl border border-line/8 bg-surface p-6 shadow-sm sm:p-8"
    >
      <h2 className="font-display text-lg font-bold text-ink">Profile</h2>

      <div className="mt-5 space-y-4">
        <Field id="acct-name" label="Full name" autoComplete="name" value={name} onChange={setName} error={errors.name} />
        <Field id="acct-phone" label="Mobile number" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={setPhone} error={errors.phone} />

        <div>
          <label htmlFor="acct-email" className="block text-xs font-medium text-muted/60">
            Email
          </label>
          <input
            id="acct-email"
            value={user.email}
            readOnly
            aria-describedby="acct-email-note"
            className="mt-1 min-h-12 w-full cursor-not-allowed rounded-xl border border-line/12 bg-subtle px-3.5 py-2.5 text-sm text-muted/70"
          />
          <p id="acct-email-note" className="mt-1.5 text-xs text-muted/45">
            Changing your email needs an account server.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className={`press min-h-12 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors duration-[--duration-normal] ${
            saved ? "bg-brand-600" : "bg-brand-500"
          }`}
        >
          {saved ? "Saved on this device" : "Save changes"}
        </button>
        <p aria-live="polite" className="sr-only">
          {saved ? "Profile saved on this device." : ""}
        </p>
      </div>

      {!AUTH_BACKEND_CONFIGURED && (
        <p className="mt-5 rounded-xl bg-subtle px-4 py-3 text-xs leading-relaxed text-muted/60">
          These details are stored in this browser only. They aren&apos;t sent
          to the store and won&apos;t follow you to another device.
        </p>
      )}
    </form>
  );
}

function SummaryLink({
  href,
  label,
  value,
}: {
  href: string;
  label: string;
  value: string;
}) {
  return (
    <Link
      href={href}
      className="press flex min-h-16 items-center justify-between rounded-2xl border border-line/8 bg-surface px-5 py-4 shadow-sm transition-colors hover:bg-subtle"
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted/50">
        {label}
      </span>
      <span className="font-display text-xl font-bold tabular-nums text-ink">
        {value}
      </span>
    </Link>
  );
}

"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ShieldMark } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = login(email, password);
    if (!res.ok) {
      setError(res.error ?? "Login failed.");
      return;
    }
    setError(null);
    // Admins go to the dashboard; customers to where they came from.
    const dest = email.trim().toLowerCase() === "dhoniacademy@gmail.com" ? "/admin" : next;
    router.push(dest);
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-6 flex flex-col items-center text-center">
        <ShieldMark className="h-12 w-auto" />
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">Sign in to MM Sports</h1>
        <p className="mt-1.5 text-sm text-muted/55">
          Access your bag, wishlist and orders.
        </p>
      </div>

      <form onSubmit={submit} className="rounded-2xl border border-line/8 bg-surface p-6 shadow-sm sm:p-8">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted/60">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            placeholder="you@email.com"
            className="w-full rounded-xl border border-line/15 bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-1 block text-xs font-medium text-muted/60">Password</span>
          <div className="flex items-center rounded-xl border border-line/15 bg-surface pr-2 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
            <input
              type={show ? "text" : "password"}
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              placeholder="••••••••"
              className="w-full rounded-xl bg-transparent px-3.5 py-2.5 text-sm outline-none"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="press rounded-lg px-2 py-1 text-xs font-semibold text-accent"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        {error && (
          <p className="mt-3 flex items-center gap-2 rounded-lg bg-ball-500/10 px-3 py-2 text-sm text-ball-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 7.5v5M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="press mt-5 w-full rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-900/15 transition-colors hover:bg-brand-800"
        >
          Sign in
        </button>

        <p className="mt-4 text-center text-xs text-muted/45">
          Demo store — any email + a 6+ character password signs you in as a customer.
        </p>
      </form>

      <p className="mt-5 text-center text-sm text-muted/55">
        <Link href="/shop" className="font-semibold text-accent hover:underline">
          ← Continue shopping
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Container className="py-16 sm:py-24">
      <Suspense fallback={<div className="skeleton mx-auto h-96 max-w-md rounded-2xl" />}>
        <LoginForm />
      </Suspense>
    </Container>
  );
}

"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Container } from "@/components/ui/Container";
import { WordMark } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { AUTH_BACKEND_CONFIGURED, isValidEmail } from "@/lib/services/auth";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <SignIn />
    </Suspense>
  );
}

/** Accepts only a relative, same-origin path; anything else falls back. */
export function safeNext(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/account";
  return raw;
}

function SignIn() {
  const { signIn } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  // ?next= is attacker-supplied. Only same-origin paths are followed, so a
  // crafted link can't bounce a signed-in shopper off to another site.
  const next = safeNext(params.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [busy, setBusy] = useState(false);

  function validate() {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "Enter your email address.";
    else if (!isValidEmail(email)) e.email = "That doesn't look like an email address.";
    if (!password) e.password = "Enter your password.";
    return e;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setBusy(true);
    try {
      const res = await signIn(email, password);
      if (res.ok) router.push(next);
      else setErrors({ [res.field ?? "email"]: res.error });
    } catch {
      // A network failure must not leave the button stuck on "Signing in…".
      setErrors({ email: "Couldn't sign in just now. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Container className="py-10 sm:py-16">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <WordMark className="h-9 w-auto" />
          <h1 className="mt-6 font-display text-2xl font-bold text-ink">
            Sign in
          </h1>
          <p className="mt-1.5 text-sm text-muted/55">
            Keep your bag and saved gear together on this device.
          </p>
        </div>

        {!AUTH_BACKEND_CONFIGURED && (
          <p className="mb-5 rounded-xl bg-subtle px-4 py-3 text-xs leading-relaxed text-muted/65">
            Accounts aren&apos;t connected to a server yet, so nothing is
            verified and your details stay in this browser. Don&apos;t enter a
            password you use elsewhere.
          </p>
        )}

        <form
          onSubmit={submit}
          noValidate
          className="rounded-2xl border border-line/8 bg-surface p-6 shadow-sm sm:p-8"
        >
          <Field
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={setEmail}
            error={errors.email}
          />

          <div className="mt-4">
            <Field
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={setPassword}
              error={errors.password}
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted/70">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 accent-[var(--color-brand-500)]"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-accent hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="press btn-shine mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted/60">
          New here?{" "}
          <Link href="/register" className="font-semibold text-accent hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </Container>
  );
}

export function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
  hint,
  inputMode,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
  hint?: React.ReactNode;
  inputMode?: "text" | "tel" | "email" | "numeric";
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-muted/60">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 min-h-12 w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors ${
          error
            ? "border-ball-500 focus:ring-2 focus:ring-ball-500/25"
            : "border-line/15 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        }`}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-ball-600">
          {error}
        </p>
      ) : hint ? (
        <div id={`${id}-hint`} className="mt-1.5">
          {hint}
        </div>
      ) : null}
    </div>
  );
}

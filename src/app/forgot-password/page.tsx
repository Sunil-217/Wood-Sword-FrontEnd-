"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { WordMark } from "@/components/Logo";
import { Field } from "@/app/login/page";
import { authService, isValidEmail } from "@/lib/services/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [notice, setNotice] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setNotice(undefined);
    if (!email.trim()) return setError("Enter your email address.");
    if (!isValidEmail(email)) return setError("That doesn't look like an email address.");
    setError(undefined);

    setBusy(true);
    const res = await authService.requestPasswordReset(email);
    setBusy(false);
    // No backend can send a link, so the service says so rather than
    // claiming an email is on its way.
    if (res.ok) setNotice("Check your inbox for the reset link.");
    else setError(res.error);
  }

  return (
    <Container className="py-10 sm:py-16">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <WordMark className="h-9 w-auto" />
          <h1 className="mt-6 font-display text-2xl font-bold text-ink">
            Reset your password
          </h1>
          <p className="mt-1.5 text-sm text-muted/55">
            We&apos;ll send a link to the email on your account.
          </p>
        </div>

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
            onChange={(v) => {
              setEmail(v);
              setError(undefined);
            }}
            error={error}
          />

          {notice && (
            <p role="status" className="mt-3 rounded-xl bg-subtle px-4 py-3 text-sm text-ink">
              {notice}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="press btn-shine mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 disabled:opacity-60"
          >
            {busy ? "Sending…" : "Send reset link"}
          </button>

          <p className="mt-4 text-center text-xs text-muted/50">
            Or call{" "}
            <a href="tel:+918056126269" className="font-semibold text-accent">
              +91 80561 26269
            </a>{" "}
            — we&apos;re open every day, 11 AM to 9 PM.
          </p>
        </form>

        <p className="mt-6 text-center text-sm text-muted/60">
          <Link href="/login" className="font-semibold text-accent hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </Container>
  );
}

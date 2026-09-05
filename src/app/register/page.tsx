"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { WordMark } from "@/components/Logo";
import { Field } from "@/app/login/page";
import { useAuth } from "@/context/AuthContext";
import {
  AUTH_BACKEND_CONFIGURED,
  isValidEmail,
  isValidPhone,
  passwordStrength,
} from "@/lib/services/auth";

type Errors = Partial<
  Record<"name" | "email" | "phone" | "password" | "confirm", string>
>;

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);

  const strength = passwordStrength(password);

  function validate(): Errors {
    const e: Errors = {};
    if (!name.trim()) e.name = "Enter your name.";
    if (!email.trim()) e.email = "Enter your email address.";
    else if (!isValidEmail(email)) e.email = "That doesn't look like an email address.";
    if (!phone.trim()) e.phone = "Enter your mobile number.";
    else if (!isValidPhone(phone)) e.phone = "Enter a 10-digit Indian mobile number.";
    if (!password) e.password = "Choose a password.";
    else if (strength.problems.length > 0)
      e.password = `Password needs ${strength.problems.join(", ")}.`;
    if (confirm !== password) e.confirm = "Passwords don't match.";
    return e;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setBusy(true);
    try {
      const res = await register({ name, email, phone, password });
      if (res.ok) router.push("/account");
      else setErrors({ [res.field ?? "email"]: res.error });
    } catch {
      setErrors({ email: "Couldn't create the account just now. Please try again." });
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
            Create an account
          </h1>
          <p className="mt-1.5 text-sm text-muted/55">
            Keep your bag, saved gear and orders together.
          </p>
        </div>

        {!AUTH_BACKEND_CONFIGURED && (
          <p className="mb-5 rounded-xl bg-subtle px-4 py-3 text-xs leading-relaxed text-muted/65">
            Accounts aren&apos;t connected to a server yet. Your details stay in
            this browser and no account is created with the store — don&apos;t
            enter a password you use elsewhere.
          </p>
        )}

        <form
          onSubmit={submit}
          noValidate
          className="space-y-4 rounded-2xl border border-line/8 bg-surface p-6 shadow-sm sm:p-8"
        >
          <Field id="name" label="Full name" autoComplete="name" value={name} onChange={setName} error={errors.name} />
          <Field id="email" label="Email" type="email" autoComplete="email" value={email} onChange={setEmail} error={errors.email} />
          <Field id="phone" label="Mobile number" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={setPhone} error={errors.phone} />

          <Field
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={setPassword}
            error={errors.password}
            hint={
              password ? (
                <div>
                  <div className="flex gap-1" aria-hidden>
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors duration-[--duration-fast] ${
                          i < strength.score
                            ? strength.score >= 4
                              ? "bg-brand-500"
                              : strength.score === 3
                                ? "bg-gold-500"
                                : "bg-ball-500"
                            : "bg-line/15"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-muted/55" aria-live="polite">
                    {strength.label}
                    {strength.problems.length > 0 &&
                      ` — add ${strength.problems.join(", ")}`}
                  </p>
                </div>
              ) : undefined
            }
          />

          <Field id="confirm" label="Confirm password" type="password" autoComplete="new-password" value={confirm} onChange={setConfirm} error={errors.confirm} />

          <button
            type="submit"
            disabled={busy}
            className="press btn-shine flex min-h-12 w-full items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 disabled:opacity-60"
          >
            {busy ? "Creating…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted/60">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </Container>
  );
}

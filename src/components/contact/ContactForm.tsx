"use client";

import { useState } from "react";

export const SUPPORT_EMAIL = "support@oneupsports.in";

export function ContactForm() {
  const [handedOff, setHandedOff] = useState(false);

  // There is no message server behind this form. Rather than accept the text
  // and quietly drop it, it composes the same message in the shopper's own
  // email client — a real delivery path they can see and send.
  function handOff(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      "",
      get("message"),
    ].join("\n");
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      get("subject") || "Website enquiry",
    )}&body=${encodeURIComponent(body)}`;
    setHandedOff(true);
  }

  return (
      <div className="mx-auto mt-6 max-w-2xl rounded-3xl border border-line/8 bg-surface p-6 shadow-sm sm:p-8">
        {handedOff ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-accent">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </div>
            <h2 className="mt-4 font-display text-xl font-bold text-ink">
              Your email app should be open
            </h2>
            <p className="mt-2 text-sm text-muted/60">
              We&apos;ve filled in the message for you — press send there and it
              reaches the store. Nothing has been sent yet from this page.
            </p>
            <p className="mt-3 text-sm text-muted/60">
              Nothing happened? Write to{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-accent underline-offset-4 hover:underline">
                {SUPPORT_EMAIL}
              </a>{" "}
              or WhatsApp{" "}
              <a href="https://wa.me/918056126269" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline-offset-4 hover:underline">
                +91 80561 26269
              </a>
              .
            </p>
            <button
              onClick={() => setHandedOff(false)}
              className="press mt-5 min-h-11 rounded-full border border-line/15 bg-surface px-5 py-2.5 text-sm font-semibold text-ink hover:bg-subtle"
            >
              Back to the form
            </button>
          </div>
        ) : (
          <form onSubmit={handOff}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name">
                <input name="name" required autoComplete="name" className={inputCls} />
              </Field>
              <Field label="Email">
                <input name="email" required type="email" autoComplete="email" className={inputCls} />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Subject">
                <input name="subject" required className={inputCls} />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Message">
                <textarea name="message" required rows={5} className={`${inputCls} resize-none`} />
              </Field>
            </div>
            <button
              type="submit"
              className="press mt-5 min-h-12 w-full rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-900/15 transition-colors hover:bg-brand-800 sm:w-auto"
            >
              Write this message
            </button>
            <p className="mt-3 text-xs leading-relaxed text-muted/55">
              This opens the message in your own email app so you can send it —
              the site has no mail server of its own.
            </p>
          </form>
        )}
      </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-line/15 bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-left">
      <span className="mb-1 block text-xs font-medium text-muted/60">{label}</span>
      {children}
    </label>
  );
}

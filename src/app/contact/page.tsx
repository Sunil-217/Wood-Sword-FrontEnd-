"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

const SUPPORT_EMAIL = "support@oneupsports.in";

const CONTACTS = [
  {
    title: "WhatsApp",
    value: "+91 80561 26269",
    href: "https://wa.me/918056126269",
    external: true,
    sub: "MON–SUN, 11:00 AM – 09:00 PM",
    icon: <path d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.6-3.2A8 8 0 0 1 4 12z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />,
  },
  {
    title: "Email",
    value: SUPPORT_EMAIL,
    href: `mailto:${SUPPORT_EMAIL}`,
    sub: "Straight to the store team",
    icon: <><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" /></>,
  },
  {
    title: "Store",
    value: "No.37, Ramachandra Road, Chromepet",
    href: "https://maps.google.com/?q=No.37+Ramachandra+Road+Chromepet+Chennai+600044",
    external: true,
    sub: "Nehru Nagar, Chennai 600 044",
    icon: <><path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.7" /></>,
  },
];

export default function ContactPage() {
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
    <Container className="py-10 sm:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="title-fluid font-display font-extrabold tracking-tight text-ink">
          Get in touch
        </h1>
        <div className="seam-stitch mx-auto mt-3 w-16" aria-hidden />
        <p className="mt-2 text-sm text-muted/60">
          Questions about sizing, stringing, a custom bat or an order? We&apos;re
          here to help — call, WhatsApp or walk in.
        </p>
      </div>

      {/* Contact cards */}
      <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
        {CONTACTS.map((c) => (
          <a
            key={c.title}
            href={c.href}
            {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="press block rounded-2xl border border-line/8 bg-surface p-5 text-center shadow-sm transition-colors hover:bg-subtle">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-subtle text-accent">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">{c.icon}</svg>
            </span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted/45">{c.title}</p>
            <p className="mt-0.5 text-sm font-semibold text-ink">{c.value}</p>
            <p className="text-xs text-muted/50">{c.sub}</p>
          </a>
        ))}
      </div>

      {/* Form */}
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
    </Container>
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

"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

const CONTACTS = [
  {
    title: "WhatsApp",
    value: "+91 98765 43210",
    sub: "7 days a week, 9am–9pm",
    icon: <path d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.6-3.2A8 8 0 0 1 4 12z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />,
  },
  {
    title: "Email",
    value: "hello@mmsports.example",
    sub: "We reply within a day",
    icon: <><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" /></>,
  },
  {
    title: "Workshop",
    value: "Sports Complex Rd, Meerut",
    sub: "Uttar Pradesh, India",
    icon: <><path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.7" /></>,
  },
];

export default function ContactPage() {
  const [done, setDone] = useState(false);

  return (
    <Container className="py-10 sm:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="title-fluid font-display font-extrabold tracking-tight text-brand-950">
          Get in touch
        </h1>
        <div className="seam-stitch mx-auto mt-3 w-16" aria-hidden />
        <p className="mt-2 text-sm text-brand-900/60">
          Questions about sizing, a custom bat, or an order? We&apos;re here to help.
        </p>
      </div>

      {/* Contact cards */}
      <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
        {CONTACTS.map((c) => (
          <div key={c.title} className="rounded-2xl border border-brand-900/8 bg-white p-5 text-center shadow-sm">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">{c.icon}</svg>
            </span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-900/45">{c.title}</p>
            <p className="mt-0.5 text-sm font-semibold text-brand-950">{c.value}</p>
            <p className="text-xs text-brand-900/50">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="mx-auto mt-6 max-w-2xl rounded-3xl border border-brand-900/8 bg-white p-6 shadow-sm sm:p-8">
        {done ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="mt-4 font-display text-xl font-bold text-brand-950">Message sent!</h2>
            <p className="mt-2 text-sm text-brand-900/60">
              Thanks for reaching out — we&apos;ll get back to you soon. (Demo — no message is actually sent.)
            </p>
            <button
              onClick={() => setDone(false)}
              className="press mt-5 rounded-full border border-brand-900/15 bg-white px-5 py-2.5 text-sm font-semibold text-brand-900 hover:bg-brand-50"
            >
              Send another
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name">
                <input required autoComplete="name" className={inputCls} />
              </Field>
              <Field label="Email">
                <input required type="email" autoComplete="email" className={inputCls} />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Subject">
                <input required className={inputCls} />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Message">
                <textarea required rows={5} className={`${inputCls} resize-none`} />
              </Field>
            </div>
            <button
              type="submit"
              className="press mt-5 w-full rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-900/15 transition-colors hover:bg-brand-800 sm:w-auto"
            >
              Send message
            </button>
          </form>
        )}
      </div>
    </Container>
  );
}

const inputCls =
  "w-full rounded-xl border border-brand-900/15 bg-white px-3.5 py-2.5 text-sm text-brand-950 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-left">
      <span className="mb-1 block text-xs font-medium text-brand-900/60">{label}</span>
      {children}
    </label>
  );
}

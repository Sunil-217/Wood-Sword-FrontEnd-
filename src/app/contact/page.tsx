import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm, SUPPORT_EMAIL } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact the store",
  description:
    "Reach Oneup Sports in Chromepet, Chennai — WhatsApp, email or walk in for sizing, stringing and custom bat advice.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Oneup Sports",
    description:
      "WhatsApp, email or visit the counter at No.37 Ramachandra Road, Chromepet, Chennai.",
    url: "/contact",
  },
};

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

      <ContactForm />
    </Container>
  );
}

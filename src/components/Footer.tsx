import Link from "next/link";
import { categoriesInGroup, groups } from "@/lib/catalog";
import { Container } from "./ui/Container";
import { WordMark } from "./Logo";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100076878750874",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/oneupsportsstore/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919043884205",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3zm0 1.8a7.2 7.2 0 1 1-3.7 13.4l-.4-.2-2.6.7.7-2.5-.3-.4A7.2 7.2 0 0 1 12 4.8zm-2.6 3.5c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.3 3.8 2.1.9 2.6.7 3 .7.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3l-1.7-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a5.9 5.9 0 0 1-3-2.6c-.2-.3 0-.4.1-.6l.6-.7c.1-.2.1-.4 0-.5L10 8.6c-.1-.3-.3-.3-.6-.3z" />
      </svg>
    ),
  },
];

export function Footer() {
  const groupHref = (slug: string) => {
    const leaves = categoriesInGroup(slug as (typeof groups)[number]["slug"]);
    return leaves.length === 1
      ? `/shop?category=${leaves[0].slug}`
      : `/shop?group=${slug}`;
  };

  const cols = [
    {
      title: "Shop",
      links: [
        { label: "All gear", href: "/shop" },
        { label: "Deals", href: "/shop?deals=1" },
        { label: "New arrivals", href: "/shop?sort=newest" },
        { label: "Your orders", href: "/orders" },
        { label: "Wishlist", href: "/wishlist" },
      ],
    },
    {
      title: "Sports",
      links: groups
        .slice(0, 7)
        .map((g) => ({ label: g.name, href: groupHref(g.slug) })),
    },
    {
      title: "Company",
      links: [
        { label: "About us", href: "/about" },
        { label: "Contact us", href: "/contact" },
        { label: "Knocking-in service", href: "/shop?category=cricket-bats" },
      ],
    },
  ];

  return (
    <footer
      style={{ viewTransitionName: "site-footer" }}
      className="relative mt-24 overflow-hidden bg-brand-950 text-brand-100"
    >
      {/* red-to-orange edge */}
      <div
        aria-hidden
        className="h-1"
        style={{
          background:
            "linear-gradient(90deg, var(--color-brand-500), var(--color-gold-500))",
        }}
      />

      {/* Closing statement */}
      <Container className="relative pb-4 pt-16 sm:pt-20">
        <p className="font-display text-[clamp(2.25rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-white">
          Play harder.
          <br />
          Move faster.
          <br />
          <span className="bg-gradient-to-r from-brand-400 to-gold-500 bg-clip-text text-transparent">
            Go Oneup.
          </span>
        </p>
      </Container>

      <Container className="relative pb-14 pt-12">
        <div className="grid gap-10 border-t border-white/10 pt-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <WordMark className="h-8 w-auto" />
            <address className="mt-5 space-y-1.5 text-sm not-italic leading-relaxed text-brand-100/60">
              <p>
                No.37, Ramachandra Road, Nehru Nagar, Chromepet,
                Chennai&nbsp;600&nbsp;044
              </p>
              <p>
                <a href="tel:+918056126269" className="transition-colors hover:text-white">
                  +91 80561 26269
                </a>
                {" · "}
                <a href="tel:+919043884205" className="transition-colors hover:text-white">
                  +91 90438 84205
                </a>
              </p>
              <p>
                <a
                  href="mailto:support@oneupsports.in"
                  className="transition-colors hover:text-white"
                >
                  support@oneupsports.in
                </a>
              </p>
              <p>MON–SUN · 11:00&nbsp;AM – 09:00&nbsp;PM</p>
            </address>

            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="press inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-brand-100/70 ring-1 ring-white/10 transition-colors duration-[--duration-fast] hover:bg-brand-500 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400/90">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-brand-100/65 transition-colors duration-[--duration-fast] hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-brand-100/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Oneup Sports. All rights reserved.</p>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>Secure checkout</span>
            <span aria-hidden>·</span>
            <span>UPI</span>
            <span aria-hidden>·</span>
            <span>Visa</span>
            <span aria-hidden>·</span>
            <span>Mastercard</span>
            <span aria-hidden>·</span>
            <span>RuPay</span>
            <span aria-hidden>·</span>
            <span>Net Banking</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

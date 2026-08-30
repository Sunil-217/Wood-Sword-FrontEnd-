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
    return leaves.length === 1 ? `/shop?category=${leaves[0].slug}` : `/shop?group=${slug}`;
  };
  const cols = [
    {
      title: "Shop",
      links: groups.slice(0, 4).map((g) => ({
        label: g.name,
        href: groupHref(g.slug),
      })),
    },
    {
      title: "More",
      links: [
        ...groups.slice(4).map((g) => ({
          label: g.name,
          href: groupHref(g.slug),
        })),
        { label: "All Gear", href: "/shop" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About us", href: "/about" },
        { label: "Contact us", href: "/contact" },
        { label: "Your Orders", href: "/orders" },
        { label: "Knocking-in Service", href: "/shop?category=cricket-bats" },
      ],
    },
  ];

  return (
    <footer className="mt-24 bg-brand-950 text-brand-100">
      {/* boundary rope along the top edge */}
      <div
        aria-hidden
        className="h-1.5"
        style={{
          background:
            "repeating-linear-gradient(-55deg, #e0a82e 0 6px, #a37014 6px 12px)",
          opacity: 0.7,
        }}
      />
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <WordMark className="h-9 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-100/60">
              Exclusive sports store in Chennai — cricket, badminton, football,
              table tennis, fitness and leisure gear. Worldwide shipping available.
            </p>
            <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-brand-100/60">
              <p>No.37, Ramachandra Road, Nehru Nagar, Chromepet, Chennai&nbsp;600&nbsp;044</p>
              <p>+91 80561 26269 · +91 90438 84205</p>
              <p>support@oneupsports.in · MON–SUN 11:00&nbsp;AM–09:00&nbsp;PM</p>
            </address>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="press inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-brand-100/70 ring-1 ring-white/10 transition-colors hover:bg-brand-500 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400/90">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-brand-100/70 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-brand-100/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Oneup Sports. All rights reserved.</p>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>Secure checkout</span>
            <span>·</span>
            <span>UPI</span>
            <span>·</span>
            <span>Visa</span>
            <span>·</span>
            <span>Mastercard</span>
            <span>·</span>
            <span>RuPay</span>
            <span>·</span>
            <span>Net Banking</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

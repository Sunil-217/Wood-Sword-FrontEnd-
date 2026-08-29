import Link from "next/link";
import { categoriesInGroup, groups } from "@/lib/catalog";
import { Container } from "./ui/Container";
import { ShieldMark } from "./Logo";

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
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center rounded-lg bg-surface p-1 shadow-sm">
                <ShieldMark className="h-8 w-auto" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                ONEUP<span className="text-ball-400"> SPORTS</span>
              </span>
            </div>
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
              {["Facebook", "Instagram", "WhatsApp"].map((s) => (
                <span
                  key={s}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-xs font-semibold text-brand-100/70 ring-1 ring-white/10"
                >
                  {s[0]}
                </span>
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
          <p>© {new Date().getFullYear()} Oneup Sports. Demo store — sample data.</p>
          <p className="flex items-center gap-4">
            <span>Secure checkout</span>
            <span>·</span>
            <span>Made for every sport</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

import Link from "next/link";
import { categories } from "@/lib/catalog";
import { Container } from "./ui/Container";

export function Footer() {
  const cols = [
    {
      title: "Shop",
      links: categories.slice(0, 5).map((c) => ({
        label: c.name,
        href: `/shop?category=${c.slug}`,
      })),
    },
    {
      title: "More",
      links: [
        ...categories.slice(5).map((c) => ({
          label: c.name,
          href: `/shop?category=${c.slug}`,
        })),
        { label: "All Gear", href: "/shop" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Shipping & Returns", href: "/shop" },
        { label: "Knocking-in Service", href: "/shop?category=bats" },
        { label: "Size Guide", href: "/shop" },
        { label: "Contact us", href: "/shop" },
      ],
    },
  ];

  return (
    <footer className="mt-24 bg-brand-950 text-brand-100">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="10.6" y="3" width="2.8" height="15" rx="1.4" fill="#f0c14e" transform="rotate(-32 12 12)" />
                  <rect x="10.6" y="6" width="2.8" height="12" rx="1.4" fill="#ffffff" transform="rotate(32 12 12)" />
                  <circle cx="17" cy="6.4" r="2.3" fill="#f0c14e" />
                </svg>
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                WOOD<span className="text-gold-400">SWORD</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-100/60">
              Pro-grade cricket equipment, crafted in Meerut and shipped across
              India. Gear built to be played — not just admired.
            </p>
            <div className="mt-5 flex gap-3">
              {["Instagram", "YouTube", "X"].map((s) => (
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
          <p>© {new Date().getFullYear()} Woodsword Cricket. Demo store — sample data.</p>
          <p className="flex items-center gap-4">
            <span>Secure checkout</span>
            <span>·</span>
            <span>Made for cricketers</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

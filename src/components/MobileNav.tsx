"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

/**
 * Bottom navigation for touch devices. Five large targets, always
 * reachable with a thumb, with the cart and wishlist counts surfaced.
 * Hidden from lg upwards, where the header nav takes over.
 */
export function MobileNav() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const { count: wishCount, ready: wishReady } = useWishlist();

  // The cart page has its own primary action; a duplicate bar gets in the way.
  if (pathname === "/checkout") return null;

  const items = [
    { href: "/", label: "Home", icon: <HomeIcon />, badge: 0 },
    { href: "/shop", label: "Shop", icon: <GridIcon />, badge: 0 },
    {
      href: "/wishlist",
      label: "Saved",
      icon: <HeartIcon />,
      badge: wishReady ? wishCount : 0,
    },
    {
      href: "/cart",
      label: "Bag",
      icon: <BagIcon />,
      badge: ready ? count : 0,
    },
    { href: "/orders", label: "Orders", icon: <BoxIcon />, badge: 0 },
  ];

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-line/10 bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="flex">
        {items.map((it) => {
          const active =
            it.href === "/" ? pathname === "/" : pathname.startsWith(it.href);
          return (
            <li key={it.href} className="flex-1">
              <Link
                href={it.href}
                id={it.href === "/cart" ? "cart-icon-mobile" : undefined}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-14 flex-col items-center justify-center gap-1 py-2 text-[10px] font-semibold transition-colors duration-[--duration-fast] ${
                  active ? "text-accent" : "text-muted/55"
                }`}
              >
                <span className="relative">
                  {it.icon}
                  {it.badge > 0 && (
                    <span
                      key={it.badge}
                      className="animate-pop absolute -right-2 -top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white"
                    >
                      {it.badge}
                    </span>
                  )}
                </span>
                {it.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-5 top-0 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-gold-500"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20.5l-1.45-1.32C5.4 14.5 2 11.4 2 7.6 2 4.8 4.2 2.7 7 2.7c1.55 0 3.04.72 4 1.86.96-1.14 2.45-1.86 4-1.86 2.8 0 5 2.1 5 4.9 0 3.8-3.4 6.9-8.55 11.58z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 8h12l-1 12H7L6 8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function BoxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 8.5 12 5l8 3.5v7L12 19l-8-3.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M4 8.5 12 12l8-3.5M12 12v7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

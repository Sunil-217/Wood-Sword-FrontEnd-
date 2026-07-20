"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categoriesInGroup, groups } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "./Logo";
import { SearchBox } from "./SearchBox";
import { AccountMenu } from "./AccountMenu";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { count, ready } = useCart();
  const { count: wishCount, ready: wishReady } = useWishlist();
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Safety net: close the drawer on any route change (incl. back/forward)
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);
  useEffect(() => {
    const onPop = () => setMobileOpen(false);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Lock body scroll + close on Escape while the drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  function closeDrawer() {
    setMobileOpen(false);
  }

  const multiGroups = groups.filter((g) => categoriesInGroup(g.slug).length > 1);
  const singleGroups = groups.filter((g) => categoriesInGroup(g.slug).length === 1);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled
          ? "glass border-brand-900/10 shadow-sm shadow-brand-900/5"
          : "border-transparent bg-white"
      }`}
    >
      <div className="container-page flex h-16 items-center gap-4">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="-ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-900 transition-colors hover:bg-brand-50 lg:hidden"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <MenuIcon />
        </button>

        <Logo />

        {/* Desktop nav */}
        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          <NavLink href="/" active={pathname === "/"}>
            Home
          </NavLink>
          <div className="group relative">
            <button className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-brand-900 transition-colors hover:bg-brand-50">
              Shop
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 transition-transform group-hover:rotate-180">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Mega dropdown, grouped like the store */}
            <div className="invisible absolute left-0 top-full w-[640px] origin-top translate-y-3 scale-[0.98] pt-2 opacity-0 transition-all duration-300 [transition-timing-function:var(--ease-spring)] group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
              <div className="rounded-2xl border border-brand-900/10 bg-white p-5 shadow-xl shadow-brand-900/10">
                <div className="grid grid-cols-4 gap-5">
                  {multiGroups.map((g) => (
                    <div key={g.slug}>
                      <Link
                        href={`/shop?group=${g.slug}`}
                        className="text-xs font-semibold uppercase tracking-wider text-brand-500 hover:text-brand-700"
                      >
                        {g.name}
                      </Link>
                      <ul className="mt-2.5 space-y-1.5">
                        {categoriesInGroup(g.slug).map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/shop?category=${c.slug}`}
                              className="flex items-center gap-2 text-sm text-brand-900/75 transition-colors hover:text-brand-950"
                            >
                              <span className="inline-block h-3 w-1 rounded-full" style={{ background: c.accent }} />
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-brand-900/8 pt-4">
                  {singleGroups.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/shop?category=${categoriesInGroup(g.slug)[0].slug}`}
                      className="rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-800 transition-colors hover:bg-brand-100"
                    >
                      {g.name}
                    </Link>
                  ))}
                  <Link
                    href="/shop"
                    className="ml-auto rounded-full bg-brand-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-800"
                  >
                    All gear →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <NavLink href="/shop?group=bats">Bats</NavLink>
          <NavLink href="/shop?group=protection">Protection</NavLink>
          <NavLink href="/shop?group=wicket-keeping">Keeping</NavLink>
          <NavLink href="/shop">All Gear</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          {/* Search (desktop) with autocomplete */}
          <div className="hidden md:block">
            <SearchBox />
          </div>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-900 transition-colors hover:bg-brand-50"
            aria-label="Open wishlist"
          >
            <HeartIcon />
            {wishReady && wishCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ball-500 px-1 text-[11px] font-bold text-white">
                {wishCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-900 transition-colors hover:bg-brand-50"
            aria-label="Open bag"
          >
            <BagIcon />
            {ready && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-[11px] font-bold text-brand-950">
                {count}
              </span>
            )}
          </Link>

          {/* Account */}
          <AccountMenu />
        </div>
      </div>

      {/* ---------------- Mobile drawer ---------------- */}
      <div
        className={`fixed inset-0 z-[90] lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          onClick={closeDrawer}
          className={`absolute inset-0 bg-brand-950/45 backdrop-blur-[2px] transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-500 [transition-timing-function:var(--ease-spring)] ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close */}
          <div className="flex items-center justify-between px-5 pb-2 pt-5">
            <button
              onClick={closeDrawer}
              aria-label="Close menu"
              className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-950 transition-colors hover:bg-brand-50"
            >
              <CloseIcon />
            </button>
            <Logo onNavigate={closeDrawer} className="scale-90" />
          </div>

          {/* Search with autocomplete */}
          <div className="px-5 pb-4 pt-2">
            <SearchBox variant="mobile" onNavigate={closeDrawer} />
          </div>

          {/* Nav list — items cascade in when the drawer opens */}
          <nav className="flex-1 overflow-y-auto px-5">
            <ul key={mobileOpen ? "open" : "closed"}>
              <li
                className={`border-b border-brand-900/8 ${mobileOpen ? "drawer-cascade" : ""}`}
                style={{ "--i": 0 } as React.CSSProperties}
              >
                <Link
                  href="/"
                  onClick={closeDrawer}
                  className="block py-4 text-[17px] font-medium text-brand-950"
                >
                  Home
                </Link>
              </li>

              {/* Accordion per group, like the reference store */}
              {multiGroups.map((g, gi) => {
                const isOpen = openGroup === g.slug;
                return (
                  <li
                    key={g.slug}
                    className={`border-b border-brand-900/8 ${mobileOpen ? "drawer-cascade" : ""}`}
                    style={{ "--i": gi + 1 } as React.CSSProperties}
                  >
                    <button
                      onClick={() => setOpenGroup(isOpen ? null : g.slug)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between py-4 text-left text-[17px] font-medium text-brand-950"
                    >
                      {g.name}
                      <span aria-hidden>{isOpen ? <MinusIcon /> : <PlusIcon />}</span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <ul className="overflow-hidden">
                        {categoriesInGroup(g.slug).map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/shop?category=${c.slug}`}
                              onClick={closeDrawer}
                              className="flex items-center gap-2.5 py-3 pl-7 text-[15px] text-brand-900/85 transition-colors hover:text-brand-950"
                            >
                              <span
                                className="inline-block h-3.5 w-1 rounded-full"
                                style={{ background: c.accent }}
                              />
                              {c.name}
                            </Link>
                          </li>
                        ))}
                        <li className="pb-3">
                          <Link
                            href={`/shop?group=${g.slug}`}
                            onClick={closeDrawer}
                            className="flex items-center gap-1.5 py-3 pl-7 text-[15px] font-semibold text-brand-700"
                          >
                            All {g.name.toLowerCase()}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                );
              })}

              {/* Single-category groups are plain rows */}
              {singleGroups.map((g, si) => (
                <li
                  key={g.slug}
                  className={`border-b border-brand-900/8 ${mobileOpen ? "drawer-cascade" : ""}`}
                  style={{ "--i": multiGroups.length + 1 + si } as React.CSSProperties}
                >
                  <Link
                    href={`/shop?category=${categoriesInGroup(g.slug)[0].slug}`}
                    onClick={closeDrawer}
                    className="block py-4 text-[17px] font-medium text-brand-950"
                  >
                    {g.name}
                  </Link>
                </li>
              ))}

              <li
                className={`border-b border-brand-900/8 ${mobileOpen ? "drawer-cascade" : ""}`}
                style={{ "--i": multiGroups.length + singleGroups.length + 1 } as React.CSSProperties}
              >
                <Link
                  href="/wishlist"
                  onClick={closeDrawer}
                  className="flex items-center justify-between py-4 text-[17px] font-medium text-brand-950"
                >
                  Wishlist
                  {wishReady && wishCount > 0 && (
                    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-ball-500 px-1.5 text-xs font-bold text-white">
                      {wishCount}
                    </span>
                  )}
                </Link>
              </li>
              <li
                className={`border-b border-brand-900/8 ${mobileOpen ? "drawer-cascade" : ""}`}
                style={{ "--i": multiGroups.length + singleGroups.length + 2 } as React.CSSProperties}
              >
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="flex items-center justify-between py-4 text-[17px] font-medium text-brand-950"
                >
                  Your Bag
                  {ready && count > 0 && (
                    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-gold-500 px-1.5 text-xs font-bold text-brand-950">
                      {count}
                    </span>
                  )}
                </Link>
              </li>

              {isAdmin && (
                <li className="border-b border-brand-900/8">
                  <Link
                    href="/admin"
                    onClick={closeDrawer}
                    className="flex items-center justify-between py-4 text-[17px] font-medium text-brand-950"
                  >
                    Admin Dashboard
                    <span className="rounded-full bg-gold-500/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-gold-700">
                      Admin
                    </span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Drawer footer — account */}
          <div className="border-t border-brand-900/8 px-5 py-4">
            {user ? (
              <div className="flex items-center justify-between gap-3">
                <span className="min-w-0">
                  <span className="block text-[11px] text-brand-900/45">Signed in</span>
                  <span className="block truncate text-sm font-semibold text-brand-950">{user.email}</span>
                </span>
                <button
                  onClick={() => {
                    logout();
                    closeDrawer();
                  }}
                  className="press shrink-0 rounded-full border border-brand-900/15 px-4 py-2 text-sm font-semibold text-ball-600 hover:bg-ball-500/10"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={closeDrawer}
                className="press flex items-center justify-center gap-2 rounded-full bg-brand-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group/nav relative rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-brand-950 ${
        active ? "font-semibold text-brand-950" : "text-brand-900"
      }`}
    >
      {children}
      {/* animated underline — stays lit on the current page */}
      <span
        aria-hidden
        className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-gold-500 transition-transform duration-300 [transition-timing-function:var(--ease-spring)] ${
          active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
        }`}
      />
    </Link>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 20.5l-1.45-1.32C5.4 14.5 2 11.4 2 7.6 2 4.8 4.2 2.7 7 2.7c1.55 0 3.04.72 4 1.86.96-1.14 2.45-1.86 4-1.86 2.8 0 5 2.1 5 4.9 0 3.8-3.4 6.9-8.55 11.58L12 20.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
      <path d="M6 8h12l-1 12H7L6 8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function MinusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

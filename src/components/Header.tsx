"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { Logo } from "./Logo";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { count, ready } = useCart();

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

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    closeDrawer();
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-brand-900/10 bg-white/85 backdrop-blur-lg"
          : "border-transparent bg-white"
      }`}
    >
      <div className="container-page flex h-16 items-center gap-4">
        {/* Mobile hamburger (left, like a native app drawer) */}
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
          <div className="group relative">
            <button className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-brand-900 transition-colors hover:bg-brand-50">
              Shop
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 transition-transform group-hover:rotate-180">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Mega dropdown */}
            <div className="invisible absolute left-0 top-full w-[520px] translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-1 rounded-2xl border border-brand-900/10 bg-white p-3 shadow-xl shadow-brand-900/10">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/shop?category=${c.slug}`}
                    className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-brand-50"
                  >
                    <span
                      className="mt-0.5 inline-block h-8 w-1.5 shrink-0 rounded-full"
                      style={{ background: c.accent }}
                    />
                    <span>
                      <span className="block text-sm font-semibold text-brand-950">{c.name}</span>
                      <span className="block text-xs text-brand-900/50">{c.blurb}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <NavLink href="/shop?category=bats">Bats</NavLink>
          <NavLink href="/shop?category=batting-gloves">Protection</NavLink>
          <NavLink href="/shop">All Gear</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Search (desktop) */}
          <form onSubmit={submitSearch} className="hidden md:block">
            <div className="flex items-center rounded-full bg-brand-50 ring-1 ring-brand-900/5 focus-within:ring-brand-500/40">
              <span className="pl-3 text-brand-900/40">
                <SearchIcon />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search gear…"
                className="w-40 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-brand-900/40 lg:w-52"
              />
            </div>
          </form>

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
          className={`absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
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

          {/* Search */}
          <form onSubmit={submitSearch} className="px-5 pb-4 pt-2">
            <div className="flex items-center rounded-full bg-brand-50 ring-1 ring-brand-900/5 focus-within:ring-brand-500/40">
              <span className="pl-3 text-brand-900/40">
                <SearchIcon />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search gear…"
                className="w-full bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-brand-900/40"
              />
            </div>
          </form>

          {/* Nav list */}
          <nav className="flex-1 overflow-y-auto px-5">
            <ul>
              <li className="border-b border-brand-900/8">
                <Link
                  href="/"
                  onClick={closeDrawer}
                  className="block py-4 text-[17px] font-medium text-brand-950"
                >
                  Home
                </Link>
              </li>

              {/* Accordion: Shop by Category */}
              <li className="border-b border-brand-900/8">
                <button
                  onClick={() => setCatsOpen((v) => !v)}
                  aria-expanded={catsOpen}
                  className="flex w-full items-center justify-between py-4 text-left text-[17px] font-medium text-brand-950"
                >
                  Cricket Gear
                  <span className="text-brand-950" aria-hidden>
                    {catsOpen ? <MinusIcon /> : <PlusIcon />}
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    catsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <ul className="overflow-hidden">
                    {categories.map((c) => (
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
                        href="/shop"
                        onClick={closeDrawer}
                        className="flex items-center gap-1.5 py-3 pl-7 text-[15px] font-semibold text-brand-700"
                      >
                        View all gear
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="border-b border-brand-900/8">
                <Link
                  href="/shop?category=bats"
                  onClick={closeDrawer}
                  className="block py-4 text-[17px] font-medium text-brand-950"
                >
                  Bats
                </Link>
              </li>
              <li className="border-b border-brand-900/8">
                <Link
                  href="/shop?category=batting-gloves"
                  onClick={closeDrawer}
                  className="block py-4 text-[17px] font-medium text-brand-950"
                >
                  Protection
                </Link>
              </li>
              <li className="border-b border-brand-900/8">
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
            </ul>
          </nav>

          {/* Drawer footer */}
          <div className="border-t border-brand-900/8 px-5 py-4">
            <p className="text-xs text-brand-900/50">
              Free shipping over ₹2,000 · WhatsApp support 7 days a week
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full px-3 py-2 text-sm font-medium text-brand-900 transition-colors hover:bg-brand-50"
    >
      {children}
    </Link>
  );
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

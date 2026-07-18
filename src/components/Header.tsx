"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { Logo } from "./Logo";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { count, ready } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setMobileOpen(false);
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
          {/* Search */}
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

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-900 transition-colors hover:bg-brand-50 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-brand-900/10 bg-white lg:hidden">
          <div className="container-page space-y-4 py-4">
            <form onSubmit={submitSearch}>
              <div className="flex items-center rounded-full bg-brand-50 ring-1 ring-brand-900/5">
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
            <div className="grid grid-cols-2 gap-1.5">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop?category=${c.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-brand-50/60 px-3 py-2.5 text-sm font-medium text-brand-900"
                >
                  <span className="inline-block h-4 w-1.5 rounded-full" style={{ background: c.accent }} />
                  {c.name}
                </Link>
              ))}
            </div>
            <Link
              href="/shop"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl bg-brand-900 py-3 text-center text-sm font-semibold text-white"
            >
              Shop all gear
            </Link>
          </div>
        </div>
      )}
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

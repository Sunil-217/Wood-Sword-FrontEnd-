"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { categoriesInGroup, groups } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "./Logo";
import { CommandPalette } from "./CommandPalette";
import { AccountMenu } from "./AccountMenu";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollProgress } from "./ScrollProgress";

/** Categories shown per group in the desktop mega menu before "+N more". */
const MEGA_LEAF_LIMIT = 6;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement | null>(null);
  const megaBtnRef = useRef<HTMLButtonElement | null>(null);
  const megaCloseTimer = useRef<number | undefined>(undefined);
  // Opened by a click rather than by hovering, so the pointer leaving must
  // not take it away again.
  const megaPinned = useRef(false);
  const pathname = usePathname();
  const { count, ready } = useCart();
  const { count: wishCount, ready: wishReady } = useWishlist();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Safety net: close the drawer on any route change (incl. back/forward)
  useEffect(() => {
    setMobileOpen(false);
    megaPinned.current = false;
    setMegaOpen(false);
  }, [pathname]);

  // The mega menu is a disclosure, not a hover-only panel: it has to close on
  // Escape and on a click elsewhere, and Escape returns focus to its button.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      closeMega();
      megaBtnRef.current?.focus();
    };
    const onDown = (e: MouseEvent) => {
      if (!megaRef.current?.contains(e.target as Node)) closeMega();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [megaOpen]);

  useEffect(() => () => window.clearTimeout(megaCloseTimer.current), []);

  function openMega() {
    window.clearTimeout(megaCloseTimer.current);
    setMegaOpen(true);
  }
  function closeMega() {
    window.clearTimeout(megaCloseTimer.current);
    megaPinned.current = false;
    setMegaOpen(false);
  }
  /**
   * Hover opens the panel; a click keeps it open rather than undoing the hover
   * that just opened it. A click on an already-pinned panel closes it, which
   * is also the path a touch or keyboard user takes.
   */
  function toggleMega() {
    if (megaOpen && megaPinned.current) return closeMega();
    megaPinned.current = true;
    openMega();
  }
  // Pointer travel from the button to the panel crosses a gap; a short grace
  // period stops the menu flickering shut on the way.
  function scheduleMegaClose() {
    if (megaPinned.current) return;
    window.clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  }
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
      style={{ viewTransitionName: "site-header" }}
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow,height] duration-[--duration-normal] ease-[--ease-emphasized] ${
        scrolled
          ? "glass border-line/10 shadow-lg shadow-brand-950/10"
          : "border-transparent bg-surface"
      }`}
    >
      <ScrollProgress />
      <div
        className={`container-page flex items-center gap-4 transition-[height] duration-[--duration-normal] ease-[--ease-emphasized] ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="-ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-subtle lg:hidden"
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
          <div
            ref={megaRef}
            className="relative"
            onMouseEnter={openMega}
            onMouseLeave={scheduleMegaClose}
          >
            <button
              ref={megaBtnRef}
              type="button"
              aria-expanded={megaOpen}
              aria-controls="sports-mega-menu"
              onClick={toggleMega}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-ink transition-colors duration-[--duration-fast] hover:bg-subtle ${
                megaOpen ? "bg-subtle" : ""
              }`}
            >
              Sports
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`mt-0.5 transition-transform ${megaOpen ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Mega dropdown, grouped like the store. Hidden rather than merely
                invisible so it neither widens the page nor sits in the tab
                order while closed. Width is clamped because the panel is
                anchored to the trigger, not the viewport. */}
            <div
              id="sports-mega-menu"
              hidden={!megaOpen}
              className="absolute left-0 top-full w-[min(820px,calc(100vw-17rem))] origin-top pt-2"
            >
              <div className="animate-mega rounded-2xl border border-line/10 bg-surface p-5 shadow-xl shadow-brand-900/10">
                <div className="grid grid-cols-5 gap-x-5 gap-y-6">
                  {multiGroups.map((g) => {
                    const leaves = categoriesInGroup(g.slug);
                    const shown = leaves.slice(0, MEGA_LEAF_LIMIT);
                    const rest = leaves.length - shown.length;
                    return (
                      <div key={g.slug}>
                        <Link
                          href={`/shop?group=${g.slug}`}
                          className="text-xs font-semibold uppercase tracking-wider text-accent hover:text-accent"
                        >
                          {g.name}
                        </Link>
                        <ul className="mt-2.5 space-y-1.5">
                          {shown.map((c) => (
                            <li key={c.slug}>
                              <Link
                                href={`/shop?category=${c.slug}`}
                                className="flex items-center gap-2 text-sm text-muted/75 transition-colors hover:text-ink"
                              >
                                <span className="inline-block h-3 w-1 rounded-full" style={{ background: c.accent }} />
                                {c.name}
                              </Link>
                            </li>
                          ))}
                          {rest > 0 && (
                            <li>
                              <Link
                                href={`/shop?group=${g.slug}`}
                                className="pl-3 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
                              >
                                +{rest} more
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-line/8 pt-4">
                  {singleGroups.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/shop?category=${categoriesInGroup(g.slug)[0].slug}`}
                      className="rounded-full bg-subtle px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-brand-100"
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
          {/* Reading the query string is what tells Deals apart from any
              other /shop view; Suspense keeps the rest of the header in the
              prerendered HTML. */}
          <Suspense fallback={<NavLink href="/shop?deals=1">Deals</NavLink>}>
            <DealsNavLink />
          </Suspense>
          <NavLink href="/about" active={pathname === "/about"}>
            Brand
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          {/* Command palette trigger — Ctrl/Cmd+K or "/" */}
          <CommandPalette />

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-subtle lg:inline-flex"
            aria-label="Open wishlist"
          >
            <HeartIcon />
            {wishReady && wishCount > 0 && (
              <span
                key={wishCount}
                className="animate-pop absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ball-500 px-1 text-[11px] font-bold text-white"
              >
                {wishCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            id="cart-icon"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-subtle lg:inline-flex"
            aria-label="Open bag"
          >
            <BagIcon />
            {ready && count > 0 && (
              <span
                key={count}
                className="animate-pop absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-[11px] font-bold text-ink"
              >
                {count}
              </span>
            )}
          </Link>

          {/* Theme */}
          <ThemeToggle />

          {/* Account */}
          <AccountMenu />
        </div>
      </div>

      {/* ---------------- Mobile drawer ---------------- */}
      <div
        className={`fixed inset-0 z-[90] lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        inert={!mobileOpen}
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
          className={`absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-surface shadow-2xl transition-transform duration-500 [transition-timing-function:var(--ease-spring)] ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close */}
          <div className="flex items-center justify-between px-5 pb-2 pt-5">
            <button
              onClick={closeDrawer}
              aria-label="Close menu"
              className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-subtle"
            >
              <CloseIcon />
            </button>
            <Logo onNavigate={closeDrawer} className="scale-90" />
          </div>

          {/* Search with autocomplete */}


          {/* Nav list — items cascade in when the drawer opens */}
          <nav className="flex-1 overflow-y-auto px-5">
            <ul key={mobileOpen ? "open" : "closed"}>
              <li
                className={`border-b border-line/8 ${mobileOpen ? "drawer-cascade" : ""}`}
                style={{ "--i": 0 } as React.CSSProperties}
              >
                <Link
                  href="/"
                  onClick={closeDrawer}
                  className="block py-4 text-[17px] font-medium text-ink"
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
                    className={`border-b border-line/8 ${mobileOpen ? "drawer-cascade" : ""}`}
                    style={{ "--i": gi + 1 } as React.CSSProperties}
                  >
                    <button
                      onClick={() => setOpenGroup(isOpen ? null : g.slug)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between py-4 text-left text-[17px] font-medium text-ink"
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
                              className="flex items-center gap-2.5 py-3 pl-7 text-[15px] text-muted/85 transition-colors hover:text-ink"
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
                            className="flex items-center gap-1.5 py-3 pl-7 text-[15px] font-semibold text-accent"
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
                  className={`border-b border-line/8 ${mobileOpen ? "drawer-cascade" : ""}`}
                  style={{ "--i": multiGroups.length + 1 + si } as React.CSSProperties}
                >
                  <Link
                    href={`/shop?category=${categoriesInGroup(g.slug)[0].slug}`}
                    onClick={closeDrawer}
                    className="block py-4 text-[17px] font-medium text-ink"
                  >
                    {g.name}
                  </Link>
                </li>
              ))}

              <li
                className={`border-b border-line/8 ${mobileOpen ? "drawer-cascade" : ""}`}
                style={{ "--i": multiGroups.length + singleGroups.length + 1 } as React.CSSProperties}
              >
                <Link
                  href="/wishlist"
                  onClick={closeDrawer}
                  className="flex items-center justify-between py-4 text-[17px] font-medium text-ink"
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
                className={`border-b border-line/8 ${mobileOpen ? "drawer-cascade" : ""}`}
                style={{ "--i": multiGroups.length + singleGroups.length + 2 } as React.CSSProperties}
              >
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="flex items-center justify-between py-4 text-[17px] font-medium text-ink"
                >
                  Your Bag
                  {ready && count > 0 && (
                    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-gold-500 px-1.5 text-xs font-bold text-ink">
                      {count}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Drawer footer — account */}
          <div className="border-t border-line/8 px-5 py-4">
            {user ? (
              <div className="flex items-center justify-between gap-3">
                <span className="min-w-0">
                  <span className="block text-[11px] text-muted/45">Signed in</span>
                  <span className="block truncate text-sm font-semibold text-ink">{user.email}</span>
                </span>
                <button
                  onClick={() => {
                    logout();
                    closeDrawer();
                  }}
                  className="press shrink-0 rounded-full border border-line/15 px-4 py-2 text-sm font-semibold text-ball-600 hover:bg-ball-500/10"
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

function DealsNavLink() {
  const pathname = usePathname();
  const params = useSearchParams();
  return (
    <NavLink
      href="/shop?deals=1"
      active={pathname === "/shop" && params.get("deals") === "1"}
    >
      Deals
    </NavLink>
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
      className={`group/nav relative rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-ink ${
        active ? "font-semibold text-ink" : "text-ink"
      }`}
    >
      {children}
      {/* animated underline — stays lit on the current page */}
      <span
        aria-hidden
        className={`absolute inset-x-3 -bottom-0.5 h-[3px] origin-left -skew-x-[24deg] rounded-full bg-gradient-to-r from-brand-500 to-gold-500 transition-transform duration-300 [transition-timing-function:var(--ease-spring)] ${
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

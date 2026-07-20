"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export function AccountMenu() {
  const { user, isAdmin, ready, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    function onDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  // Logged out (or still hydrating): a plain link to sign in.
  if (!ready || !user) {
    return (
      <Link
        href="/login"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-900 transition-colors hover:bg-brand-50"
        aria-label="Sign in"
      >
        <UserIcon />
      </Link>
    );
  }

  const initial = user.email[0]?.toUpperCase() ?? "U";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Account menu"
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-900 text-sm font-bold text-white transition-transform press"
      >
        {initial}
        {isAdmin && (
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-gold-500" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-xl shadow-brand-900/10">
          <div className="border-b border-brand-900/8 px-4 py-3">
            <p className="text-xs text-brand-900/50">Signed in as</p>
            <p className="truncate text-sm font-semibold text-brand-950">{user.email}</p>
            {isAdmin && (
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-gold-500/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-gold-700">
                Admin
              </span>
            )}
          </div>
          <div className="p-1.5">
            {isAdmin && (
              <MenuLink href="/admin" onClick={() => setOpen(false)}>
                <GaugeIcon />
                Admin Dashboard
              </MenuLink>
            )}
            <MenuLink href="/wishlist" onClick={() => setOpen(false)}>
              <HeartIcon />
              Wishlist
            </MenuLink>
            <MenuLink href="/cart" onClick={() => setOpen(false)}>
              <BagIcon />
              Your Bag
            </MenuLink>
            <button
              onClick={() => {
                logout();
                setOpen(false);
                router.push("/");
              }}
              className="mt-0.5 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ball-600 transition-colors hover:bg-ball-500/10"
            >
              <LogoutIcon />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-900 transition-colors hover:bg-brand-50"
    >
      {children}
    </Link>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function GaugeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M4 13a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 13l4-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M12 20l-1.3-1.2C6 14.5 3 11.7 3 8.4 3 6 4.9 4 7.3 4c1.4 0 2.7.65 3.7 1.7C11.9 4.65 13.3 4 14.7 4 17.1 4 19 6 19 8.4c0 3.3-3 6.1-7.7 10.4L12 20z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M6 8h12l-1 12H7L6 8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M15 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3M10 12h9M16 8l3 4-3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

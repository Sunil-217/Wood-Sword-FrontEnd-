"use client";

import { useId, useState } from "react";
import type { Product } from "@/lib/types";

/**
 * Product information as an accordion.
 *
 * Only sections with real content are rendered — the store holds no
 * specification data, so there is no Specifications panel to open.
 */
export function ProductInfo({ product }: { product: Product }) {
  const sections = [
    {
      id: "details",
      title: "Details",
      body: (
        <>
          <p className="text-sm leading-relaxed text-muted/70">
            {product.description}
          </p>
          {product.features.length > 0 && (
            <ul className="mt-4 space-y-2.5">
              {product.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-muted/80"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-accent">
                    <CheckIcon />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          )}
        </>
      ),
    },
    {
      id: "delivery",
      title: "Delivery",
      body: (
        <ul className="space-y-2 text-sm text-muted/70">
          <li>Free delivery on orders over ₹2,000.</li>
          <li>Cash on Delivery available across India.</li>
          <li>GST invoice on request.</li>
          <li>
            Collect in store: No.37, Ramachandra Road, Chromepet, Chennai —
            open every day, 11:00 AM to 9:00 PM.
          </li>
        </ul>
      ),
    },
    {
      id: "returns",
      title: "Returns",
      body: (
        <p className="text-sm leading-relaxed text-muted/70">
          Seven days to return an unused item in its original packaging. Call{" "}
          <a href="tel:+918056126269" className="font-semibold text-accent">
            +91 80561 26269
          </a>{" "}
          or message us on WhatsApp to arrange it.
        </p>
      ),
    },
  ];

  return (
    <div className="mt-8 divide-y divide-line/10 border-y border-line/10">
      {sections.map((s, i) => (
        <Panel key={s.id} title={s.title} defaultOpen={i === 0}>
          {s.body}
        </Panel>
      ))}
    </div>
  );
}

function Panel({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div>
      <h2>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left"
        >
          <span className="font-display text-base font-bold text-ink">
            {title}
          </span>
          <span
            aria-hidden
            className={`shrink-0 text-muted/45 transition-transform duration-[--duration-normal] ease-[--ease-emphasized] ${
              open ? "rotate-45" : ""
            }`}
          >
            <PlusIcon />
          </span>
        </button>
      </h2>
      <div
        id={`${id}-panel`}
        role="region"
        aria-label={title}
        hidden={!open}
        className="pb-6"
      >
        {children}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

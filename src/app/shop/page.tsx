import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopView } from "@/components/shop/ShopView";

export const metadata: Metadata = {
  title: "Shop all sports gear",
  description:
    "Browse cricket, badminton, football, table tennis, shoes, fitness, swimming, skating and leisure gear from Oneup Sports.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopView />
    </Suspense>
  );
}

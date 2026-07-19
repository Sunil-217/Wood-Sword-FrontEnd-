import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/Toaster";
import { BackToTop } from "@/components/BackToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://woodsword.example.com"),
  title: {
    default: "Woodsword Cricket — Pro-grade cricket equipment",
    template: "%s · Woodsword Cricket",
  },
  description:
    "Shop pro-grade cricket bats, batting gloves, pads, helmets and more. Hand-crafted quality, factory-direct pricing, free shipping across India above ₹2000.",
  openGraph: {
    title: "Woodsword Cricket — Pro-grade cricket equipment",
    description:
      "Pro-grade cricket bats, gloves, pads and helmets. Hand-crafted in Meerut, shipped factory-direct across India.",
    type: "website",
    siteName: "Woodsword Cricket",
  },
};

export const viewport = {
  themeColor: "#0a2016",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-sand-50 text-brand-950">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
          <BackToTop />
        </CartProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { CatalogProvider } from "@/context/CatalogContext";
import { OrdersProvider } from "@/context/OrdersContext";
import { ReviewsProvider } from "@/context/ReviewsContext";
import { CouponsProvider } from "@/context/CouponsContext";
import { QuickViewProvider } from "@/context/QuickViewContext";
import { QuickViewModal } from "@/components/QuickViewModal";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/Toaster";
import { BackToTop } from "@/components/BackToTop";
import { SITE_URL } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Oneup Sports — One stop shop for all your sporting requirements",
    template: "%s · Oneup Sports",
  },
  description:
    "Chennai's exclusive sports store. Cricket, badminton, football, table tennis, fitness, swimming, skating and leisure gear from Yonex, SG, SS, Shrey, Li-Ning, Adidas and more — worldwide shipping available.",
  openGraph: {
    title: "Oneup Sports — One stop shop for all your sporting requirements",
    description:
      "Exclusive sports store in Chromepet, Chennai. Cricket, badminton, football, table tennis, fitness and leisure gear — worldwide shipping available.",
    type: "website",
    siteName: "Oneup Sports",
  },
};

export const viewport = {
  themeColor: "#26070c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-page text-ink">
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem('oneup-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}else if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}`}
        </Script>
        <AuthProvider>
          <CatalogProvider>
            <OrdersProvider>
              <ReviewsProvider>
                <CouponsProvider>
                  <CartProvider>
                    <WishlistProvider>
                      <QuickViewProvider>
                        <AnnouncementBar />
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                        <Toaster />
                        <BackToTop />
                        <QuickViewModal />
                      </QuickViewProvider>
                    </WishlistProvider>
                  </CartProvider>
                </CouponsProvider>
              </ReviewsProvider>
            </OrdersProvider>
          </CatalogProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

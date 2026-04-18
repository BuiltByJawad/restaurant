import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL("https://foodflow.com.bd"),
  title: {
    default: "FoodFlow — Restaurant Ordering SaaS for Bangladesh",
    template: "%s | FoodFlow",
  },
  description:
    "FoodFlow powers restaurants across Bangladesh with online ordering, menu management, and SSLCommerz payments. Start your free trial today.",
  keywords: [
    "restaurant ordering system Bangladesh",
    "online food ordering Bangladesh",
    "restaurant management software",
    "SSLCommerz payment",
    "bKash restaurant payment",
    "Dhaka restaurant POS",
    "food delivery Bangladesh",
    "restaurant SaaS Bangladesh",
  ],
  authors: [{ name: "FoodFlow" }],
  creator: "FoodFlow",
  publisher: "FoodFlow",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "bn_BD",
    siteName: "FoodFlow",
    title: "FoodFlow — Restaurant Ordering SaaS for Bangladesh",
    description:
      "Power your restaurant with online ordering, real-time dashboard, and SSLCommerz payments.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FoodFlow — Restaurant Ordering SaaS for Bangladesh",
    description:
      "Power your restaurant with online ordering, real-time dashboard, and SSLCommerz payments.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

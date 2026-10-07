import type { Metadata } from "next";
import { Inter, Ubuntu } from "next/font/google";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { MobileTabBar } from "@/components/mobile-tab-bar/MobileTabBar";
import { RentalProvider } from "@/components/rental-context/RentalProvider";
import { SavedProvider } from "@/components/saved-context/SavedProvider";
import { getProducts } from "@/lib/products";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rent gaming gadgets in Bangalore | Zero Deposit Rentals | SharePal",
  description:
    "Rent PS5, Xbox, Oculus VR and racing wheels in Bangalore with zero deposit. Free delivery, sanitised and insured.",
  openGraph: {
    title: "Rent gaming gadgets in Bangalore | SharePal",
    description:
      "Rent PS5, Xbox, Oculus VR and racing wheels in Bangalore with zero deposit.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const products = getProducts();

  return (
    <html lang="en" className={`${inter.variable} ${ubuntu.variable}`}>
      <body className="flex min-h-dvh flex-col bg-page font-sans text-ink antialiased">
        <RentalProvider products={products}>
          <SavedProvider products={products}>
            <Header />
            {children}
            <Footer />
            <MobileTabBar />
          </SavedProvider>
        </RentalProvider>
      </body>
    </html>
  );
}

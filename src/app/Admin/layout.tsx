import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { TopNav } from "./_components/topnav";
import { Footer } from "./_components/footer";
import { CartProvider } from "../context/CartContext";

export const metadata: Metadata = {
  title: "Lcarpio's Flower Shop",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <CartProvider>
      <div className="relative min-h-screen">
        <TopNav />
        {children}
        <Footer />
      </div>
    </CartProvider>
  );
}

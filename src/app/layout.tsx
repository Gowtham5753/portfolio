import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import ButterflyScene from "@/components/ButterflyScene";
import Butterflies from "@/components/Butterflies";
import ArchOverlay from "@/components/ArchOverlay";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gowtham Raju Thokala | AI Engineer",
  description: "Portfolio of Gowtham Raju Thokala — AI Engineer specializing in Full-Stack Development, Machine Learning, and Next-Gen Interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white transition-colors duration-300">
        <ThemeProvider>
          <ArchOverlay />
          <ButterflyScene />
          <SmoothScroll>
            <CustomCursor />
            <Navigation />
            <Butterflies />
            <div className="grain-overlay"></div>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}


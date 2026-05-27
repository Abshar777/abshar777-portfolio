import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";
import SmoothScroll from "@/components/smoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


const mondwest = localFont({
  src: "./fonts/PPMondwest-Regular.otf",
  variable: "--font-mondwest",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${mondwest.variable}`}>
      <body><>
      <SmoothScroll/>
      {children}</></body>
    </html>
  );
}

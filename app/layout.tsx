import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"
import Head from 'next/head';
import ConvexClerkProvider from "./providers/ConvexClerkProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcaster",
  description: "Generated your podcast using AI",
  icons: {
    icon: ["/icons/logo.svg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><ConvexClerkProvider>{children}</ConvexClerkProvider></body>
    </html>
  );
}

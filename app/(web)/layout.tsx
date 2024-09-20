import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";
import getPageMetaData from "@/lib/getPageMetaData";
import Script from "next/script";
import Raptive from "@/components/page/Raptive";
import AdBlockRecovery from "@/components/page/AdBlockRecovery";
import GoogleAnalytics from "@/components/page/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });
const title = "ScreenIdle";
const description = "Guess the movie!";
const pageUrl = process.env.BASE_URL ?? '';



export const metadata: Metadata = getPageMetaData(title, description, pageUrl);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Raptive />
      </head>
      <body className={`${inter.className}`}>
        <Navbar />
        {children}
        <Footer />
        <AdBlockRecovery />
        <Script src="/scripts/clarity.js" strategy="afterInteractive"></Script>
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.GTAG || ''} />
      </body>
    </html>
  );
}




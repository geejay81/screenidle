import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/page/Navbar";
import ConsentManagementPlatform from "@/components/client-apps/ConsentManagementPlatform";
import Footer from "@/components/page/Footer";
import getPageMetaData from "@/lib/getPageMetaData";

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
      <body className={`flex flex-col min-h-screen bg-screenidle-link text-white ${inter.className}`}>
        <Navbar />
        {children}
        <Footer />
        <ConsentManagementPlatform GA_MEASUREMENT_ID={process.env.GTAG || ''} />
      </body>
    </html>
  );
}




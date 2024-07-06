import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/page/Navbar";
import ConsentManagementPlatform from "@/components/client-apps/ConsentManagementPlatform";
import Footer from "@/components/page/Footer";

const inter = Inter({ subsets: ["latin"] });
const title = "ScreenIdle";
const description = "Guess the movie!";

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: `/favicon.ico`,
    apple: `/apple-touch-icon.png`,
  },
  manifest: '/site.webmanifest',
  openGraph: {
    url: process.env.BASE_URL,
    type: 'website',
    title,
    description,
    images: [
      `/facebook-link-image.png`
    ]
  },
  twitter: {
    title,
    description,
    images: [
      `/twitter-shared-link.png`
    ],
    card: "summary_large_image"
  }
};

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

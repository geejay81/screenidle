import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/page/Navbar";
import ConsentManagementPlatform from "@/components/client-apps/ConsentManagementPlatform";

const inter = Inter({ subsets: ["latin"] });
const title = "ScreenIdle";
const description = "Guess the movie!";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      `${process.env.BASE_URL}/facebook-link-image.png`
    ]
  },
  twitter: {
    title,
    description,
    images: [
      `${process.env.BASE_URL}/twitter-shared-link.png`
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
      <body className={`bg-screenidle-link text-white ${inter.className}`}>
        <Navbar />
        {children}
        <ConsentManagementPlatform GA_MEASUREMENT_ID={process.env.GTAG || ''} />
      </body>
    </html>
  );
}

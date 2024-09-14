import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/page/Navbar";
import ConsentManagementPlatform from "@/components/client-apps/ConsentManagementPlatform";
import Footer from "@/components/page/Footer";
import getPageMetaData from "@/lib/getPageMetaData";
import Script from "next/script";

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
        <meta name="google-adsense-account" content="ca-pub-9824524266019448"></meta>
      </head>
      <body className={`${inter.className}`}>
        <Navbar />
        {children}
        <Footer />
        <Script src="/scripts/clarity.js" strategy="afterInteractive"></Script>
        <ConsentManagementPlatform GA_MEASUREMENT_ID={process.env.GTAG || ''} />
        <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
        <script>{`
          window.googletag = window.googletag || {cmd: []};
          googletag.cmd.push(function() {
            googletag.defineSlot(
              '/18190176,23123829744/MCM_Validation',
              [1, 1],
              'div-gpt-ad-1614955491295-0'
            ).addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });`}
        </script>
        <div id="div-gpt-ad-1614955491295-0">
          <script>{`
            googletag.cmd.push(function() {
              if (googletag.pubads().isInitialLoadDisabled()) {
                googletag.display('div-gpt-ad-1614955491295-0');
                googletag.refresh('div-gpt-ad-1614955491295-0');
              } else {
                googletag.display('div-gpt-ad-1614955491295-0');
              }
            });`}
          </script>
        </div>
      </body>
    </html>
  );
}




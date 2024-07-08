import { Metadata } from "next";

const getPageMetaData = (
  title: string, 
  description: string, 
  pageUrl: string): Metadata => {

  const baseUrl = `${process.env.BASE_URL}`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    icons: {
      icon: `/favicon.ico`,
      apple: `/apple-touch-icon.png`,
    },
    manifest: `${baseUrl}site.webmanifest`,
    openGraph: {
      url: pageUrl,
      type: 'website',
      title,
      description,
      images: `/facebook-link-image.png`,
      siteName: 'ScreenIdle'
    },
    twitter: {
      title,
      description,
      images: `/twitter-shared-link.png`,
      card: "summary_large_image",
      creator: '@screenidlegame'
    }
  }
}

export default getPageMetaData;
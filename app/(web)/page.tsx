import { headings, logo } from "@/ui/fonts";
import Link from "next/link";
import { FaQuoteLeft, FaUnderline } from "react-icons/fa";
import { FaClapperboard, FaPlay } from "react-icons/fa6";

export const revalidate = 86400;

export default async function Home() {

  return (
    <main className="home-section">
      <div className="home-container">
        <h1 className={`home-header ${logo.className} `}>
          <FaClapperboard className="inline" />
          <span>ScreenIdle</span>
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/posters" className={`home-cta ${headings.className} m-4`}>
            <FaPlay className="inline" />
            <span>Play Today&apos;s Movie Poster Game</span>
          </Link>
          <Link href="/taglines" className={`home-cta ${headings.className} m-4`}>
            <FaQuoteLeft className="inline" />
            <span>Play Today&apos;s Movie Tagline Game</span>
          </Link>
          <Link href="/blank-buster" className={`home-cta ${headings.className} m-4`}>
            <FaUnderline className="inline" />
            <span>Play Today&apos;s Movie Blank Buster</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

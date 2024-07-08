import { logo } from "@/ui/fonts";
import Link from "next/link";
import { FaClapperboard } from "react-icons/fa6";

export default async function Home() {

  return (
    <main className="home-section">
      <div className="home-container">
        <h1 className={`home-header ${logo.className} `}>
          <FaClapperboard className="inline" />
          <span>ScreenIdle</span>
        </h1>
        <Link href="/posters" className="home-cta">
          Guess Today&apos;s Movie Poster</Link>
      </div>
    </main>
  );
}

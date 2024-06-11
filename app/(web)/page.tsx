import { logo } from "@/ui/fonts";
import Link from "next/link";
import { FaClapperboard } from "react-icons/fa6";

export default async function Home() {

  return (
    <main className="grow bg-popidle-banner-bg text-popidle-banner-text">
      <div className="container mx-auto max-w-screen-lg p-6 py-32 space-y-8 md:space-y-16 flex flex-col items-center justify-evenly">
        <h1 className={`text-4xl font-bold md:text-8xl ${logo.className} space-x-1 border-2 border-white p-8 rounded-lg`}>
          <FaClapperboard className="inline" />
          <span>ScreenIdle</span>
        </h1>
        <Link href="/posters" className="text-lg bg-screenidle-success text-screenidle-link p-4 rounded-lg">
          Guess Today&apos;s Movie Poster</Link>
      </div>
    </main>
  );
}

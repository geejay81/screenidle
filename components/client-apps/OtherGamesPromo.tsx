"use client"

import { headings } from "@/ui/fonts";
import Link from "next/link";

export default function OtherGamesPromo({currentGame}: {currentGame: string}) {
    return (
        <div className="w-full p-4 mb-4 bg-screenidle-warning text-screenidle-link space-y-4 rounded-lg">
            <h2 className={`font-bold text-2xl ${headings.className}`}>More ScreenIdle</h2>
            {currentGame != 'posters' && <p>Can you guess the movie from the pixelated poster? <Link href={'/posters'} className="font-bold">Play poster game!</Link></p>}
            {currentGame != 'taglines' && <p>Can you guess the movie from the tagline? <Link href={'/taglines'} className="font-bold">Play tagline game!</Link></p>}
            {currentGame != 'blank-buster' && <p>Fill in the blanks to complete the movie title. <Link href={'/blank-buster'} className="font-bold">Play blank buster game!</Link></p>}
        </div>
    )
}
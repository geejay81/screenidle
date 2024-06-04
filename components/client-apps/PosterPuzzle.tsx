"use client"

import { Movie } from "@/types/Movie"
import PixelatedImage from "./PixelatedImage"
import { useState } from "react"
import { Guess } from "@/types/Guess"
import Combobox from "./Combobox"

type PosterPuzzleProps = {
    movie: Movie
}

export default function PosterPuzzle({movie}: PosterPuzzleProps) {

    const levels = [40, 24, 16, 8, 4, 2];

    let initialGuesses: Guess[] = [];
    let initialPixelSize = levels[0];
    let initialGameMode = 'loading';

    const [selectedItem, setSelectedItem] = useState<string>('');
    const [pixelSize, setPixelSize] = useState(initialPixelSize);
    const [guesses, setGuesses] = useState(initialGuesses);
    const [gameMode, setGameMode] = useState(initialGameMode);

    const handleGuess = () => {
        setPixelSize(pixelSize - 1)
    }

    return (
        <>
            <div>
                <PixelatedImage imageUrl={movie.poster} pixelSize={pixelSize} />
                <div className="w-full">
                    <Combobox selectedItem={selectedItem} setSelectedItem={setSelectedItem} srcUrl="/api/movies" />
                </div>
                <button onClick={handleGuess} className="w-full p-2 border border-black mt-2">
                    Guess
                </button>
            </div>
        </>
    )
}
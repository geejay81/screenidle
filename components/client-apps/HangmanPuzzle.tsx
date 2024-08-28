"use client"

import { Movie } from "@/types/Movie"
import HangmanBoard from "./HangmanBoard"
import { useState } from "react"
import Keyboard from "./Keyboard"
import LifeBar from "./LifeBar"

type HangmanPuzzleProps = {
    movie: Movie
}
export default function HangmanPuzzle({movie}: HangmanPuzzleProps) {
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);

    const initialLives = 6;
    
    const handleGuess = (letter: string) => {

        if (movie.title.toUpperCase().indexOf(letter) === -1) {
            setWrongGuesses((prevWrongGuesses: string[]) => {
                return [...prevWrongGuesses, letter]
            })
        }

        setGuessedLetters((previosGuessedLetters: string[]) => {
            return [...previosGuessedLetters, letter];
        })
    }

    const PlayMode = () => (
        <div className="space-y-8">
            <HangmanBoard answer={movie.title} guessedLetters={guessedLetters} />
            <LifeBar lives={initialLives} livesUsed={wrongGuesses.length} />
            <Keyboard handleGuess={handleGuess} guessedLetters={guessedLetters} wrongGuesses={wrongGuesses} />
        </div>
    )
    
    return (
        <PlayMode />
    )
}
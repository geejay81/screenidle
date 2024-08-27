"use client"

import { Movie } from "@/types/Movie"
import HangmanBoard from "./HangmanBoard"
import { useState } from "react"
import Keyboard from "./Keyboard"

type HangmanPuzzleProps = {
    movie: Movie
}
export default function HangmanPuzzle({movie}: HangmanPuzzleProps) {
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
    
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
    
    return (
        <>
            <HangmanBoard answer={movie.title} guessedLetters={guessedLetters} />
            <Keyboard handleGuess={handleGuess} />
        </>
    )
}
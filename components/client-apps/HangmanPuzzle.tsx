"use client"

import { Movie } from "@/types/Movie"
import HangmanBoard from "./HangmanBoard"
import { useState } from "react"
import Keyboard from "./Keyboard"
import LifeBar from "./LifeBar"
import { headings } from "@/ui/fonts"
import PixelatedImage from "./PixelatedImage"

type HangmanPuzzleProps = {
    movie: Movie
}
export default function HangmanPuzzle({movie}: HangmanPuzzleProps) {
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const initialLives = 6;
    const livesRemaining = initialLives - wrongGuesses.length;
    
    let gameMode = 'play';

    if (livesRemaining === 0) {
        gameMode = 'lost';
    }

    let answer = '';
    
    movie.title.toUpperCase().split('').map((letter, index) => {
        answer += !guessedLetters.includes(letter) && alphabet.indexOf(letter) > -1 ? '_' : letter
    })

    if (answer === movie.title.toUpperCase()) {
        gameMode = 'won';
    }
    
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
            <HangmanBoard answer={movie.title} guessedLetters={guessedLetters} alphabet={alphabet} />
            <LifeBar lives={initialLives} livesUsed={wrongGuesses.length} />
            <Keyboard handleGuess={handleGuess} guessedLetters={guessedLetters} wrongGuesses={wrongGuesses} />
        </div>
    )

    const LostMode = () => (
        <div className="space-y-8">
            <PixelatedImage imageUrl={movie.poster} pixelSize={1} />
            <div className="bg-screenidle-danger text-screenidle-link space-y-4 p-4 rounded-md">
                <h2 className={`font-bold text-2xl ${headings.className}`}>Game Over!</h2>
                <p>The answer was <span className="font-bold">{movie.title}</span></p>
            </div>
            <LifeBar lives={initialLives} livesUsed={wrongGuesses.length} />
        </div>
    )

    const WonMode = () => (
        <div className="space-y-8">
            <PixelatedImage imageUrl={movie.poster} pixelSize={1} />
            <div className="bg-screenidle-success text-screenidle-link space-y-4 p-4 rounded-md">
                <h2 className={`font-bold text-2xl ${headings.className}`}>Winner!</h2>
                <p>You new the answer was <span className="font-bold">{movie.title}</span></p>
            </div>
            <LifeBar lives={initialLives} livesUsed={wrongGuesses.length} />
        </div>
    )

    switch (gameMode) {
        case 'won': return <WonMode />
        case 'lost': return <LostMode />
        default: return <PlayMode />
    }
}
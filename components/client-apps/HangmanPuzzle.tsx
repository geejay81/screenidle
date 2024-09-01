"use client"

import { Movie } from "@/types/Movie"
import HangmanBoard from "./HangmanBoard"
import { useState } from "react"
import Keyboard from "./Keyboard"
import LifeBar from "./LifeBar"
import { headings } from "@/ui/fonts"

interface HangmanPuzzleProps {
    movie: Movie
}

interface ResultMessageProps {
    heading: string;
    bgColor: string;
    children: React.ReactNode;
}

interface ResultModeProps {
    children: React.ReactNode
}

interface PosterImageProps {
    imageUrl: string,
    alt: string
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
            <Keyboard handleGuess={handleGuess} guessedLetters={guessedLetters} />
        </div>
    )

    const LostMode = () => (
        <ResultMode>
            <ResultMessage heading="Game Over!" bgColor="bg-screenidle-danger">
                <p>Bad luck. The answer to this puzzle was <span className="font-bold">{movie.title}</span>.</p>
            </ResultMessage>
        </ResultMode>
    )

    const WonMode = () => (
        <ResultMode>
            <ResultMessage heading="Winner!" bgColor="bg-screenidle-success">
                <p>Congatulations! You knew that the answer was <span className="font-bold">{movie.title}</span>.</p>
            </ResultMessage>
        </ResultMode>
    )

    const ResultMode = ({children}: ResultModeProps) => {
        return (
            <div className="grid md:grid-cols-2 gap-4 md:gap-8 mt-0">
                <div className="space-y-4 mt-0">
                    <PosterImage imageUrl={movie.poster} alt={`${movie.title} poster`} />
                </div>
                <div className="space-y-4 mt-0">
                    <LifeBar lives={initialLives} livesUsed={wrongGuesses.length} color="danger" />
                    {children}
                </div>
                <div>
                    <p>Poster images provided by <a href="https://www.themoviedb.org" className="font-semibold">TMDB</a>.</p>
                </div>
            </div>
        )
    }

    switch (gameMode) {
        case 'won': return <WonMode />
        case 'lost': return <LostMode />
        default: return <PlayMode />
    }
}

const ResultMessage = ({heading, bgColor, children} : ResultMessageProps) => {
    return (
        <div className={`${bgColor} text-screenidle-link space-y-4 p-4 rounded-md`} role="alert">
            <h2 className={`font-bold text-2xl ${headings.className}`}>{heading}</h2>
            {children}
        </div>
    )
}

const PosterImage = ({imageUrl, alt}: PosterImageProps) => {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={alt} className="mx-auto border-2 border-white pixelated-image-canvas" />        
    )
}
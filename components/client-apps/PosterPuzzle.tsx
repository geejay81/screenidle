"use client"

import { Movie } from "@/types/Movie"
import PixelatedImage from "./PixelatedImage"
import { useReducer } from "react"
import Combobox from "./Combobox"
import { GameState } from "@/types/GameState"
import { gameStateReducer, levels } from "../reducers/game-state-reducer"
import ScoreBoard from "./ScoreBoard"
import PreviousAnswers from "./PreviousAnswers"
import { buttons, headings } from "@/ui/fonts"

type PosterPuzzleProps = {
    movie: Movie
}

export default function PosterPuzzle({movie}: PosterPuzzleProps) {

    const initialGameState: GameState = {
        selectedItem: '',
        guesses: [],
        gameMode: 'play',
        pixelSize: levels[0],
        answer: `${movie.title} (${movie.year})`
    }

    const [state, dispatch] = useReducer(gameStateReducer, initialGameState);

    const handleGuess = () => dispatch({ type: 'SET_NEW_GUESS' });

    const PlayMode = () => (
        <>
            <div className="space-y-4">
                <PixelatedImage imageUrl={movie.poster} pixelSize={state.pixelSize} />
                <ScoreBoard guesses={state.guesses} />
                <div className="w-full">
                    <Combobox 
                        selectedItem={state.selectedItem} 
                        dispatch={dispatch} 
                        srcUrl="/api/movies" />
                </div>
                <button 
                    onClick={handleGuess} 
                    className={`w-full p-4 bg-screenidle-success text-screenidle-link font-bold border border-black mt-2 ${buttons.className}`}>
                    Guess
                </button>
                <PreviousAnswers guesses={state.guesses} />
            </div>
        </>
    )

    const WonMode = () => (
        <>
            <div className="w-full p-4 mb-4 bg-screenidle-success text-screenidle-link space-y-4 rounded-xl">
                <h2 className={`font-bold text-2xl ${headings.className}`}>You won!</h2>
                <p>You knew that the answer was {state.answer}.</p>
                <div className="w-full p-4 bg-screenidle-link rounded-lg">
                    <ScoreBoard guesses={state.guesses} />
                </div>
                <PreviousAnswers guesses={state.guesses} />
            </div>
        </>
    )

    const LostMode = () => (
        <>
            <div className="w-full p-4 mb-4 bg-screenidle-danger text-screenidle-link rounded-lg">
                <h2 className={`font-bold text-2xl ${headings.className}`}>You lost!</h2>
                <p>The answer that you were looking for was {state.answer}.</p>
                <div className="w-full p-4 bg-screenidle-link rounded-lg">
                    <ScoreBoard guesses={state.guesses} />
                </div>
                <PreviousAnswers guesses={state.guesses} />
            </div>
        </>
    )

    switch (state.gameMode) {
        case 'play': return <PlayMode />
        case 'won': return <WonMode />
        case 'lost': return <LostMode />
    }
}
"use client"

import { Movie } from "@/types/Movie"
import PixelatedImage from "./PixelatedImage"
import { useReducer } from "react"
import Combobox from "./Combobox"
import { GameState } from "@/types/GameState"
import { gameStateReducer, levels } from "../reducers/game-state-reducer"
import ScoreBoard from "./ScoreBoard"
import PreviousAnswers from "./PreviousAnswers"

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
            <div>
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
                    className="w-full p-4 bg-slate-700 text-white border border-black mt-2">
                    Guess
                </button>
                <PreviousAnswers guesses={state.guesses} />
            </div>
        </>
    )

    switch (state.gameMode) {
        case 'play': return <PlayMode />
        case 'won': return <h1>You won!</h1>
        case 'lost': return <h1>You lost!</h1>
    }
}
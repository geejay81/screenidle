"use client"

import { Movie } from "@/types/Movie"
import PixelatedImage from "./PixelatedImage"
import { useReducer, useState } from "react"
import { Guess } from "@/types/Guess"
import Combobox from "./Combobox"

type PosterPuzzleProps = {
    movie: Movie
}

type GameState = {
    selectedItem: string;
    guesses: Guess[];
    gameMode: string;
    pixelSize: number;
    answer: string
}

const levels = [40, 24, 16, 8, 4, 2];

const gameStateReducer = (state: GameState, action: any): GameState => {

    switch (action.type) {
        case 'SET_SELECTED_ITEM':
            return { ...state, selectedItem: action.payload }
        case 'SET_NEW_GUESS':
            console.log(state.selectedItem);
            const result = state.selectedItem?.length ?? 0 == 0
                ? 'skipped'
                : state.selectedItem == state.answer ? 'correct' : 'incorrect';
            const latestGuess: Guess = { result, answer: state.selectedItem };
            const guesses = [ ...state.guesses , latestGuess ];
            let gameMode = 'play';
            if (result == 'correct') {
                gameMode = 'won';
            } else if (guesses.length == 6) {
                gameMode = 'lost';
            }
            const pixelSize = gameMode == 'play'
                ? levels[guesses.length - 1]
                : state.pixelSize;
            return { ...state, gameMode, pixelSize, guesses }
        default: return state;
    }
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

    const handleGuess = () => {
        console.log('test');
        dispatch({ type: 'SET_NEW_GUESS' });
    }

    const PlayMode = () => (
        <>
            <div>
                <PixelatedImage imageUrl={movie.poster} pixelSize={state.pixelSize} />
                <div className="w-full">
                    <Combobox selectedItem={state.selectedItem} dispatch={dispatch} srcUrl="/api/movies" />
                </div>
                <button onClick={handleGuess} className="w-full p-2 border border-black mt-2">
                    Guess
                </button>
                <ul>
                    {state.guesses.map((guess: Guess, index: number) => (
                        <li key={index}>{`${guess.answer} - ${guess.result}`}</li>
                    ))}
                </ul>
            </div>
        </>
    )

    switch (state.gameMode) {
        case 'play': return <PlayMode />
        case 'won': return <h1>You won!</h1>
        case 'lost': return <h1>You lost!</h1>
    }
}
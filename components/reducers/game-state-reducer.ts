"use client"

import { GameState } from "@/types/GameState";
import { Guess } from "@/types/Guess";
import { Movie } from "@/types/Movie";
import { getGameState, setGameState } from "../client-lib/state-manager";

export const levels = [40, 30, 24, 16, 8, 4];

export const gameStateInitialiser = (movie: Movie): GameState => {

    const savedGameState = getGameState();

    const guesses = (movie.gameId === savedGameState?.puzzleNumber)
        ? savedGameState.guesses
        : [];

    return {
        gameId: movie.gameId,
        selectedItem: '',
        guesses: guesses,
        gameMode: 'play',
        pixelSize: levels[guesses.length],
        answer: `${movie.title} (${movie.year})`
    };
}

export const gameStateReducer = (state: GameState, action: any): GameState => {

    switch (action.type) {
        case 'SET_SELECTED_ITEM':
            return { ...state, selectedItem: action.payload }
        case 'PLAY_GUESS':
            const result = (state.selectedItem!.length ?? 0) == 0
                ? 'skipped'
                : state.selectedItem == state.answer ? 'correct' : 'incorrect';
            const latestGuess: Guess = { result, answer: state.selectedItem };
            const guesses = [ ...state.guesses , latestGuess ];
            let gameMode = 'play';
            if (result == 'correct') {
                gameMode = 'won';
            } else if (guesses.length == levels.length) {
                gameMode = 'lost';
            }
            const pixelSize = gameMode == 'play'
                ? levels[guesses.length]
                : state.pixelSize;
            if (gameMode == "play") {
                document.getElementById('search-field')?.focus();
            }
            setGameState(state.gameId, guesses);
            return { ...state, gameMode, pixelSize, guesses, selectedItem: '' }
        default: return state;
    }
}

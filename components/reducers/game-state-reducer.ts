"use client"

import { GameState } from "@/types/GameState";
import { Guess } from "@/types/Guess";
import { Movie } from "@/types/Movie";
import { getGameState, setGameState, setHistoryState } from "../client-lib/state-manager";

export const levels = [40, 30, 24, 16, 8, 4];

type gameStateInitialiserProps = {
    movie: Movie,
    isDailyGame: boolean
}

export const gameStateInitialiser = (inits: gameStateInitialiserProps): GameState => {

    const savedGameState = getGameState();

    const guesses = (inits.isDailyGame && inits.movie.gameId === savedGameState?.puzzleNumber)
        ? savedGameState.guesses
        : [];

    let gameMode = 'play';

    if (guesses.map((guess: Guess) => guess.result).includes('correct')) {
        gameMode = 'won';
    } else if (guesses.length == levels.length) {
        gameMode = 'lost';
    }

    const pixelSize = ['won','lost'].includes(gameMode)
        ? 1
        : levels[guesses.length];

    return {
        gameId: inits.movie.gameId,
        isDailyGame: inits.isDailyGame,
        selectedItem: '',
        guesses,
        gameMode,
        pixelSize,
        answer: `${inits.movie.title} (${inits.movie.year})`
    };
}

export const gameStateReducer = (state: GameState, action: any): GameState => {

    switch (action.type) {
        case 'SET_DAILY_PLAY':
            return { ...state, isDailyGame: action.payload }
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
                : gameMode !== 'loading' ? 1 : state.pixelSize;

            if (state.isDailyGame) setGameState(state.gameId, guesses);
            
            if (gameMode == "play") {
                document.getElementById('search-field')?.focus();
            } else if (state.isDailyGame && ['won', 'lost'].includes(gameMode)) {
                setHistoryState(gameMode, guesses, state.gameId);
            }
            
            return { ...state, gameMode, pixelSize, guesses, selectedItem: '' }
        default: return state;
    }
}

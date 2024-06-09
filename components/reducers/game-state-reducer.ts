"use client"

import { GameState } from "@/types/GameState";
import { Guess } from "@/types/Guess";

export const levels = [40, 24, 16, 8, 4, 2];

export const gameStateReducer = (state: GameState, action: any): GameState => {

    switch (action.type) {
        case 'SET_SELECTED_ITEM':
            return { ...state, selectedItem: action.payload }
        case 'SET_NEW_GUESS':
            const result = (state.selectedItem!.length ?? 0) == 0
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
                ? levels[guesses.length]
                : state.pixelSize;
            if (gameMode == "play") {
                document.getElementById('search-field')?.focus();
            }
            return { ...state, gameMode, pixelSize, guesses, selectedItem: '' }
        default: return state;
    }
}

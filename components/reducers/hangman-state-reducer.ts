"use client"

import { GameTypes } from "@/types/GameTypes";
import { Movie } from "@/types/Movie"
import { getGameState, setHangmanGameState } from "../client-lib/state-manager";

export interface hangmanState {
    gameId: number;
    guessedLetters: string[];
    wrongGuesses: string[];
    movie: Movie
    gameMode: string;
    isDailyGame: boolean;
    gameType: GameTypes;
}

interface hangmanStateInitialiserProps {
    movie: Movie,
    gameType: GameTypes;
    isDailyGame: boolean;
}

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const calculateGameMode = (movie: Movie, guessedLetters: string[], wrongGuesses: string[]) => {
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

    return gameMode;
}

export const hangmanStateInitialiser = (inits: hangmanStateInitialiserProps): hangmanState => {
    
    let guessedLetters: string[] = [];
    let wrongGuesses: string[] = [];

    if (inits.isDailyGame) {
        const savedGameState = getGameState(inits.gameType);

        if (savedGameState && savedGameState.puzzleNumber === inits.movie.gameId) {
            guessedLetters = savedGameState.guessedLetters;
            wrongGuesses = savedGameState.wrongGuesses;
        }
    }

    return {
        gameId: inits.movie.gameId,
        guessedLetters,
        wrongGuesses,
        movie: inits.movie,
        gameMode: calculateGameMode(inits.movie, guessedLetters, wrongGuesses),
        gameType: inits.gameType,
        isDailyGame: inits.isDailyGame
    }
}

export const hangmanStateReducer = (state: hangmanState, action: any): hangmanState => {
    
    switch (action.type) {
        case "GUESS_LETTER":
            const guess = action.payload;

            if (state.guessedLetters.includes(guess)) return state;

            const guessedLetters = [...state.guessedLetters, guess];

            const wrongGuesses = state.movie.title.toUpperCase().indexOf(guess) === -1
                ? [...state.wrongGuesses, guess]
                : [...state.wrongGuesses];

            const newState = {
                ...state,
                guessedLetters,
                wrongGuesses,
                gameMode: calculateGameMode(state.movie, guessedLetters, wrongGuesses)
            };

            if (state.isDailyGame) {

                // update guessedLetters and wrongGuesses to localStorage
                setHangmanGameState(state.gameId, guessedLetters, wrongGuesses, state.gameType);

                // if game is over, update game history to localStorage

            }

            return newState;
        default: return state;
    }
}
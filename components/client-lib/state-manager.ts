"use client"

import { GameTypes } from "@/types/GameTypes";
import { Guess } from "@/types/Guess";
import { HangmanState } from "@/types/HangmanState";
import { HistoryState, IGuessHistory, IHistoryState } from "@/types/History";
import { State } from "@/types/State";

const getGameStateKey = (gameType: GameTypes) => {
  switch (gameType) {
    case GameTypes.Tagline: return 'streetidle-taglines-state'
    case GameTypes.MovieHangman: return 'screenidle-movie-blanks-state'
    default: return 'streetidle-movie-state';
  }
}

const getHistoryStateKey = (gameType: GameTypes) => {
  switch (gameType) {
    case GameTypes.Tagline: return 'streetidle-taglines-history';
    case GameTypes.MovieHangman: return 'screenidle-movie-blanks-history';
    default: return 'streetidle-history';
  }
}

export function setGameState(gameId: number, guesses: Guess[], gameType: GameTypes): void {
  if (typeof window !== "undefined" && window.localStorage) {

    const gameStateKey = getGameStateKey(gameType);

    let state = new State();
    state.puzzleNumber = gameId;
    state.guesses = guesses;
    localStorage.setItem(gameStateKey, JSON.stringify(state));
  }
}

export function setHangmanGameState(gameId: number, guessedLetters: string[], wrongGuesses: string[], gameType: GameTypes): void {
  if (typeof window !== "undefined" && window.localStorage) {

    const gameStateKey = getGameStateKey(gameType);

    let state = new HangmanState();
    state.puzzleNumber = gameId;
    state.guessedLetters = guessedLetters;
    state.wrongGuesses = wrongGuesses;
    localStorage.setItem(gameStateKey, JSON.stringify(state));
  }
}

export function setHistoryState(gameResult: string, guesses: Guess[] | string[], gameId: number, gameType: GameTypes) {
  
  if (typeof window !== "undefined" && window.localStorage) {  

    const historyStateKey = getHistoryStateKey(gameType);
    const guessesOrLivesLeft = gameType === GameTypes.MovieHangman
      ? 6 - guesses.length
      : guesses.length;

    let currentHistory: IHistoryState = getHistoryState(gameType);
    currentHistory.gamesPlayed = currentHistory.gamesPlayed + 1;
    currentHistory.gamesWon = currentHistory.gamesWon + (gameResult === 'won' ? 1: 0);
    currentHistory.winPercentage = (currentHistory.gamesWon / currentHistory.gamesPlayed) * 100.00;
    if (
      currentHistory.previousGame !== 0 && 
      currentHistory.previousGame !== (gameId - 1)) {
        currentHistory.currentStreak = 0;
    }
    currentHistory.currentStreak = gameResult === 'won' 
      ? currentHistory.currentStreak + 1
      : 0;
    currentHistory.maxStreak = currentHistory.currentStreak > currentHistory.maxStreak
      ? currentHistory.currentStreak
      : currentHistory.maxStreak;
    if (gameResult === 'won') {
      switch (guessesOrLivesLeft) {
        case 1:
          currentHistory.guesses.one = currentHistory.guesses.one + 1;
          break;
        case 2:
          currentHistory.guesses.two = currentHistory.guesses.two + 1;
          break;
        case 3:
          currentHistory.guesses.three = currentHistory.guesses.three + 1;
          break;
        case 4:
          currentHistory.guesses.four = currentHistory.guesses.four + 1;
          break;
        case 5:
          currentHistory.guesses.five = currentHistory.guesses.five + 1;
          break;
        case 6:
          currentHistory.guesses.six = currentHistory.guesses.six + 1;
          break;
      }
    } else {
      currentHistory.guesses.fail = currentHistory.guesses.fail + 1;
    }
    currentHistory.averageGuesses = calculateAverageGuesses(currentHistory.guesses, currentHistory.gamesPlayed, gameType);
    currentHistory.previousGame = gameId;
    localStorage.setItem(historyStateKey, JSON.stringify(currentHistory));
  }
}

function calculateAverageGuesses(guesses: IGuessHistory, gamesPlayed: number, gameType: GameTypes): number {
    const totalGuesses = 
      (guesses.one * 1) +
      (guesses.two * 2) +
      (guesses.three * 3) +
      (guesses.four * 4) +
      (guesses.five * 5) +
      (guesses.six * 6) +
      (guesses.fail * (gameType === GameTypes.MovieHangman ? 0 : 6));

    return Number((totalGuesses / gamesPlayed).toPrecision(3));
  }

export function getHistoryState(gameType: GameTypes) {
  if (typeof window !== "undefined" && window.localStorage) {
    const historyStateKey = getHistoryStateKey(gameType);
    const existingHistory = localStorage.getItem(historyStateKey);
    if (existingHistory !== null) {
      return Object.assign(new HistoryState(), JSON.parse(existingHistory));
    }
    return new HistoryState();
  }
}

export function getGameState(gameType: GameTypes) {
  // TODO: if adding additional hangman type games, this will need to be updated.
  if (typeof window !== "undefined" && window.localStorage) {
    const gameStateKey = getGameStateKey(gameType);
    const existingState = localStorage.getItem(gameStateKey);
    if (existingState !== null) {

      console.log(existingState);

      return gameType === GameTypes.MovieHangman
        ? Object.assign(new HangmanState(), JSON.parse(existingState))
        : Object.assign(new State(), JSON.parse(existingState));
    }
      

    return gameType === GameTypes.MovieHangman
      ? new HangmanState()
      : new State();
  }
}
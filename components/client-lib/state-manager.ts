"use client"

import { Guess } from "@/types/Guess";
import { HistoryState, IGuessHistory, IHistoryState } from "@/types/History";
import { State } from "@/types/State";

const historyStateKey = 'streetidle-history';
const gameStateKey = 'streetidle-movie-state';

export function setGameState(gameId: number, guesses: Guess[]): void {
    if (typeof window !== "undefined" && window.localStorage) {
      let state = new State();
      state.puzzleNumber = gameId;
      state.guesses = guesses;
      localStorage.setItem(gameStateKey, JSON.stringify(state));
    }
  }

export function setHistoryState(gameResult: string, guesses: Guess[], gameId: number) {
  
  if (typeof window !== "undefined" && window.localStorage) {  
    let currentHistory: IHistoryState = getHistoryState();
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
      switch (guesses.length) {
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
    currentHistory.averageGuesses = calculateAverageGuesses(currentHistory.guesses, currentHistory.gamesPlayed);
    currentHistory.previousGame = gameId;
    console.log(currentHistory);
    localStorage.setItem(historyStateKey, JSON.stringify(currentHistory));
  }
}

function calculateAverageGuesses(guesses: IGuessHistory, gamesPlayed: number): number {
    const totalGuesses = 
      (guesses.one * 1) +
      (guesses.two * 2) +
      (guesses.three * 3) +
      (guesses.four * 4) +
      (guesses.five * 5) +
      (guesses.six * 6) +
      (guesses.fail * 6);

    return Number((totalGuesses / gamesPlayed).toPrecision(3));
  }

export function getHistoryState() {
  if (typeof window !== "undefined" && window.localStorage) {
    const existingHistory = localStorage.getItem(historyStateKey);
    if (existingHistory !== null) {
      const history = Object.assign(new HistoryState(), JSON.parse(existingHistory));

      if (history.previousGame > 10) return history;
    }
    return new HistoryState();
  }
}

export function getGameState() {
  if (typeof window !== "undefined" && window.localStorage) {
    const existingState = localStorage.getItem(gameStateKey);
    if (existingState !== null) 
      return Object.assign(new State(), JSON.parse(existingState));
    return new State();
  }
}
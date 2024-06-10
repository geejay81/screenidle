export interface IGuessHistory {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
    six: number;
    fail: number;
}

export interface IHistoryState {
    previousGame: number;
    currentStreak: number;
    maxStreak: number;
    guesses: IGuessHistory;
    winPercentage: number;
    gamesPlayed: number;
    gamesWon: number;
    averageGuesses: number;
}

export class GuessHistory implements IGuessHistory {
    one: number = 0;
    two: number = 0;
    three: number = 0;
    four: number = 0;
    five: number = 0;
    six: number = 0;
    fail: number = 0;
}

export class HistoryState implements IHistoryState {
    previousGame: number = 0;
    currentStreak: number = 0;
    maxStreak: number = 0;
    guesses: IGuessHistory = new GuessHistory();
    winPercentage: number = 0;
    gamesPlayed: number = 0;
    gamesWon: number = 0;
    averageGuesses: number = 0;
}

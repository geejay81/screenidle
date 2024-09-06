export interface IHangmanState {
    puzzleNumber: number;
    guessedLetters: string[];
    wrongGuesses: string[];
};

export class HangmanState implements IHangmanState {
    puzzleNumber: number = 0;
    guessedLetters: string[] = [];
    wrongGuesses: string[] = [];
}
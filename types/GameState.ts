import { Guess } from "./Guess";

export type GameState = {
    gameId: number;
    selectedItem: string;
    guesses: Guess[];
    gameMode: string;
    pixelSize: number;
    answer: string
}
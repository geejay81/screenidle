import { Guess } from "./Guess";

export type GameState = {
    selectedItem: string;
    guesses: Guess[];
    gameMode: string;
    pixelSize: number;
    answer: string
}
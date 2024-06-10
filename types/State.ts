import { Guess } from "./Guess";

export interface IState {
    puzzleNumber: number,
    guesses: Guess[]
};

export class State implements IState {
    puzzleNumber: number = 0;
    guesses: Guess[] = [];
}
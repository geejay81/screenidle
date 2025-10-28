"use client"

import { Guess } from "@/types/Guess"
import { FaSquare, FaSquareCheck, FaSquareXmark } from "react-icons/fa6"

type ScoreBoardProps = {
    guesses: Guess[]
}

const guessIcon = (guess: Guess | null, index: number) => {
    switch (guess?.result) {
        case "skipped":
            return <FaSquareXmark key={index} className="text-slate-200 text-4xl" />
        case "correct":
            return <FaSquareCheck key={index} className="text-screenidle-success text-4xl"  />
        case "incorrect":
            return <FaSquareXmark key={index} className="text-screenidle-danger text-4xl"  />
        default:
            return <FaSquare key={index} className="text-slate-200 text-4xl" />
    }
}

export default function ScoreBoard({guesses}: ScoreBoardProps) {
    const start = guesses.length;
    const stop = 5;
    const blankArray = Array.from({ length: (stop - start) + 1 }, (value, index) => start + index);

    return (
        <div className="w-full text-center space-x-2 flex flex-row justify-center">
            {guesses && guesses.map((guess, index) => guessIcon(guess,index))}
            {guesses && blankArray.map((blankGuess, index) => guessIcon(null,blankGuess))}
        </div>
    );
}
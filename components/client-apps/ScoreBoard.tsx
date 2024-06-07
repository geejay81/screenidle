"use client"

import { Guess } from "@/types/Guess"
import { FaSquareCheck, FaSquareXmark } from "react-icons/fa6"

type ScoreBoardProps = {
    guesses: Guess[]
}

const guessIcon = (guess: Guess, index: number) => {
    switch (guess.result) {
        case "skipped":
            return <FaSquareXmark key={index} className="text-slate-500 text-xl border border-white" />
        case "correct":
            return <FaSquareCheck key={index} className="text-green-500 text-xl border border-white"  />
        case "incorrect":
            return <FaSquareXmark key={index} className="text-red-500 text-xl border border-white"  />
    }
}

export default function ScoreBoard({guesses}: ScoreBoardProps) {
    return (
        <div className="w-full text-center space-x-2 flex flex-row items-center">
            {guesses && guesses.map((guess, index) => guessIcon(guess,index))}
        </div>
    );
}
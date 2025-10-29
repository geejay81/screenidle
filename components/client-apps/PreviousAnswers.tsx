"use client"

import { Guess } from "@/types/Guess";
import { headings } from "@/ui/fonts";
import { FaSquare, FaTimes } from "react-icons/fa";
import { FaCheck, FaMinus, FaSquareCheck, FaSquareXmark } from "react-icons/fa6";

type PreviousAnswersProps = {
    guesses: Guess[]
}

export default function PreviousAnswers({ guesses }: PreviousAnswersProps) {
    const getResultIcon = (result: string) => {
        switch (result) {
            case "skipped":
                return <FaSquareXmark className="text-slate-200 text-2xl" />
            case "correct":
                return <FaSquareCheck className="text-screenidle-success text-2xl" />
            case "incorrect":
                return <FaSquareXmark className="text-screenidle-danger text-2xl" />
            default:
                return <FaSquare className="text-slate-200 text-2xl" />
        }
    }
    return <>
        {guesses.length > 0 && (
            <div className="mt-2">
                <h2 className={`py-2 font-bold text-lg ${headings.className}`}>
                    Previous guesses
                </h2>
                <ol className="space-y-2">
                    {guesses.slice(-6).map((guess: Guess, index: number) => (
                        <li
                            key={index}
                            className="flex items-center justify-between p-3 bg-[color:rgb(200,100,255,0.125)] border-0 rounded-lg shadow-sm"
                        >
                            <span className="font-medium">{guess.answer && guess.answer.length > 0 ? guess.answer : "(Skipped)"}{guess.result === 'skipped' || <i className="sr-only">{guess.result}</i>}</span>
                            <span>{getResultIcon(guess.result)}</span>
                        </li>
                    ))}
                </ol>
            </div>
        )}
    </>
}
"use client"

import { mono } from "@/ui/fonts";

type HangmanBoardProps = {
    answer: string;
    guessedLetters: string[];
    alphabet: string
}

export default function HangmanBoard({answer, guessedLetters, alphabet}: HangmanBoardProps) {

    return (
        <div className={`tracking-widest text-3xl md:text-5xl w-full text-center ${mono.className}`}>
        {answer.toUpperCase().split('').map((letter, index) => (
            <span key={index} className="letter">
                {!guessedLetters.includes(letter) && alphabet.indexOf(letter) > -1 ? '_' : letter}
            </span>
        ))}
        </div>
    )
}
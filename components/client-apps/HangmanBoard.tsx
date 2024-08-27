"use client"

type HangmanBoardProps = {
    answer: string,
    guessedLetters: string[]
}

export default function HangmanBoard({answer, guessedLetters}: HangmanBoardProps) {
    
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return (
        <div className="word tracking-widest text-5xl">
        {answer.toUpperCase().split('').map((letter, index) => (
            <span key={index} className="letter">
                {!guessedLetters.includes(letter) && alphabet.indexOf(letter) > -1 ? '_' : letter}
            </span>
        ))}
        </div>
    )
}
"use client"

import { useEffect } from "react";

interface KeyboardProps {
    handleGuess: (key: string) => void;
    guessedLetters: string[];
}

export default function Keyboard({handleGuess, guessedLetters}: KeyboardProps) {
    
    const rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            const key = e.key.toLocaleUpperCase();

            if (key.length === 1 && key >= 'A' && key <= 'Z') {
                handleGuess(key);
            }
        }

        window.addEventListener('keyup', listener);

        return () => {
            window.removeEventListener('keyup', listener);
        }
    },[handleGuess])
    
    return (
        <div id="keyboard" className="max-w-lg m-auto">
            {rows.map((row: string, index: number) => (
                <div className="keyboard-row" key={index}>
                    {index === 2 && <span className="keyboard-spacer"></span>}
                    {row.toUpperCase().split('').map((key: string) => (
                        <button key={key} className=""
                            onClick={() => handleGuess(key)}
                            disabled={guessedLetters.includes(key)}>{key}</button>
                    ))}
                    {index === 2 && <span className="keyboard-spacer"></span>}
                </div>
            ))}
        </div>
    )
}
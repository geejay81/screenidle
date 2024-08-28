type KeyboardProps = {
    handleGuess: (key: string) => void;
    guessedLetters: string[]
    wrongGuesses: string[]
}

export default function Keyboard({handleGuess, guessedLetters, wrongGuesses}: KeyboardProps) {
    
    const row1Letters = 'QWERTYUIOP';
    const row2Letters = 'ASDFGHJKL';
    const row3Letters = 'ZXCVBNM';

    const rows = [row1Letters, row2Letters, row3Letters];
    
    return (
        <div id="keyboard" className="space-y-1 w-full text-center text-sm md:text-lg bg-screenidle-link m-0 p-1">
            {rows.map((row: string, index: number) => (
                <div className="space-x-1" key={index}>
                    {row.toUpperCase().split('').map((key: string) => (
                        <button key={key} className="font-bold py-2 px-1.5 md:px-3 md:py2 bg-screenidle-warning text-black disabled:bg-slate-400 text-sm md:text-lg"
                            onClick={() => handleGuess(key)}
                            disabled={guessedLetters.includes(key)}>{key}</button>
                    ))}
                </div>
            ))}
        </div>
    )
}
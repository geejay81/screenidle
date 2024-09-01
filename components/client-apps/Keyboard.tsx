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
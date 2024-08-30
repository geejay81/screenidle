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
        <div id="keyboard">
            {rows.map((row: string, index: number) => (
                <div  className="keyboard-row" key={index}>
                    {row.toUpperCase().split('').map((key: string) => (
                        <button key={key} className=""
                            onClick={() => handleGuess(key)}
                            disabled={guessedLetters.includes(key)}>{key}</button>
                    ))}
                </div>
            ))}
        </div>
    )
}
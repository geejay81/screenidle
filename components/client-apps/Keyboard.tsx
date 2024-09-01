interface KeyboardProps {
    handleGuess: (key: string) => void;
    guessedLetters: string[];
}

export default function Keyboard({handleGuess, guessedLetters}: KeyboardProps) {
    
    const rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
    
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
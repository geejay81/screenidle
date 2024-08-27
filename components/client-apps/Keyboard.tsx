type KeyboardProps = {
    handleGuess: (key: string) => void
}

export default function Keyboard({handleGuess}: KeyboardProps) {
    
    const row1Letters = 'QWERTYUIOP';
    const row2Letters = 'ASDFGHJKL';
    const row3Letters = 'ZXCVBNM';

    const rows = [row1Letters, row2Letters, row3Letters];
    
    return (
        <div id="keyboard" className="space-y-2">
            {rows.map((row: string, index: number) => (
                <div className="space-x-2" key={index}>
                    {row.toUpperCase().split('').map((key: string) => (
                        <button key={key} className="font-bold py-2 px-3 bg-screenidle-warning text-black"
                            onClick={() => handleGuess(key)}>{key}</button>
                    ))}
                </div>
            ))}
        </div>
    )
}
import { Guess } from "@/types/Guess";
import { headings } from "@/ui/fonts";

type PreviousAnswersProps = {
    guesses: Guess[]
}

export default function PreviousAnswers({guesses}: PreviousAnswersProps) {
    return (
        <>
            {guesses.length > 0 && 
                <div className="mt-2">
                <h2 className={`py-2 font-bold text-lg ${headings.className}`}>Previous guesses</h2>
                <ol className="list-inside list-decimal">
                    {guesses.map((guess: Guess, index: number) => (
                        <li className="py-2 border-b border-slate-200" key={index}>{`${guess.answer} - ${guess.result}`}</li>
                    ))}
                </ol>
            </div>
            }
        </>
    )
}
import { FaHeart, FaRegHeart } from "react-icons/fa";

type LifeBarProps = {
    lives: number,
    livesUsed: number
}

export default function LifeBar({lives, livesUsed}: LifeBarProps) {

    const livesRemaining = lives - livesUsed;
    const displayArray = Array.from({ length: lives}, (value, index) => index);
    let displayLives: any[] = [];
    for (var i = 0; i < lives; i++) {
        if (i < livesRemaining) {
            <FaHeart key={i} />
        } else {
            <FaRegHeart key={i} />
        }
    }

    return (
        <div className="w-full text-center text-2xl space-x-2 flex flex-row justify-center text-screenidle-danger">
            {displayArray.map((idx: number) => idx < livesRemaining ? <FaHeart key={idx} /> : <FaRegHeart key={idx} />)}
        </div>
    );
}
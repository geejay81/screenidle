"use client"

import { Movie } from "@/types/Movie"
import PixelatedImage from "./PixelatedImage"
import { useReducer } from "react"
import Combobox from "./Combobox"
import { gameStateInitialiser, gameStateReducer } from "../reducers/game-state-reducer"
import ScoreBoard from "./ScoreBoard"
import PreviousAnswers from "./PreviousAnswers"
import { buttons, headings } from "@/ui/fonts"
import { createShareablePuzzzleBoard, shareContent } from "../client-lib/social-sharer"
import { FaShareNodes } from "react-icons/fa6"

type PosterPuzzleProps = {
    movie: Movie,
    isDailyGame: boolean
}

export default function PosterPuzzle({movie, isDailyGame}: PosterPuzzleProps) {

    const [state, dispatch] = useReducer(gameStateReducer, {movie, isDailyGame}, gameStateInitialiser);

    const handleGuess = () => dispatch({ type: 'PLAY_GUESS' });

    const handleShare = (e: React.MouseEvent<HTMLElement>) => {
        e.persist();

        const url = window.location.href;
        const hashtags = `#ScreenIdle #${movie.gameId} @popidlegame`;
        const resultEmojiBoard = createShareablePuzzzleBoard(state.guesses);

        const textToShare = `${resultEmojiBoard}\n\n${hashtags}`;

        const shareData: ShareData = {
            title: 'ScreenIdle',
            text: textToShare,
            url: url
        };

        shareContent(shareData);
    }

    const PlayMode = () => (
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mt-0">
            <div className="space-y-4 mt-0">
                <PixelatedImage imageUrl={movie.poster} pixelSize={state.pixelSize} />
                <ScoreBoard guesses={state.guesses} />
            </div>
            <div className="space-y-4 mt-0">
                <div className="w-full">
                    <Combobox 
                        selectedItem={state.selectedItem} 
                        dispatch={dispatch} 
                        srcUrl="/api/movies" />
                </div>
                <button 
                    onClick={handleGuess} 
                    className={`w-full p-4 bg-screenidle-success text-screenidle-link font-bold border border-black mt-2 ${buttons.className}`}>
                    Guess
                </button>
                <PreviousAnswers guesses={state.guesses} /> 
            </div>
        </div>
    )

    const WonMode = () => (
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <div className="w-full p-4 mb-4 bg-screenidle-success text-screenidle-link space-y-4 rounded-xl">
                <h2 className={`font-bold text-2xl ${headings.className}`}>You won!</h2>
                <p>You knew that the answer was <b>{movie.title}</b>.</p>
                <div className="w-full p-4 bg-screenidle-link rounded-lg">
                    <ScoreBoard guesses={state.guesses} />
                </div>
                <button
                    className={`bg-screenidle-success text-xl text-screenidle-link border-2 border-screenidle-link p-4 rounded-lg w-full flex flex-row space-x-2 items-center justify-center ${headings.className}`}
                    type="button" onClick={handleShare}>
                        <FaShareNodes className="inline" /><span>Share</span>
                </button>
            </div>
            <PreviousAnswers guesses={state.guesses} />
        </div>
    )

    const LostMode = () => (
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <div className="w-full p-4 mb-4 bg-screenidle-danger text-screenidle-link space-y-4 rounded-xl">
                <h2 className={`font-bold text-2xl ${headings.className}`}>You lost!</h2>
                <p>The answer that you were looking for was <b>{movie.title}</b>.</p>
                <div className="w-full p-4 bg-screenidle-link rounded-lg">
                    <ScoreBoard guesses={state.guesses} />
                </div>
                <button
                    className={`bg-screenidle-danger text-xl text-screenidle-link border-2 border-screenidle-link p-4 rounded-lg w-full flex flex-row space-x-2 items-center justify-center ${headings.className}`}
                    type="button" onClick={handleShare}>
                    <FaShareNodes className="inline" /><span>Share</span>
                </button>
            </div>
            <PreviousAnswers guesses={state.guesses} />
        </div>
    )

    const LoadingMode = () => (
        <p>Loading puzzle ...</p>
    )

    switch (state.gameMode) {
        case 'loading': return <LoadingMode />
        case 'play': return <PlayMode />
        case 'won': return <WonMode />
        case 'lost': return <LostMode />
        default: return <LoadingMode />
    }
}
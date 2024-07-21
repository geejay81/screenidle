"use client"

import { Movie } from "@/types/Movie"
import { useEffect, useReducer, useState } from "react"
import Combobox from "./Combobox"
import { gameStateInitialiser, gameStateReducer } from "../reducers/game-state-reducer"
import ScoreBoard from "./ScoreBoard"
import PreviousAnswers from "./PreviousAnswers"
import { buttons, headings } from "@/ui/fonts"
import { createShareablePuzzzleBoard, shareContent } from "../client-lib/social-sharer"
import { FaPlay, FaShareNodes } from "react-icons/fa6"
import GameHistory from "./GameHistory"
import { GameTypes } from "@/types/GameTypes"

type TaglinePuzzleProps = {
    movie: Movie,
    isDailyGame: boolean
}

export default function TaglinePuzzle({movie, isDailyGame}: TaglinePuzzleProps) {

    const [state, dispatch] = useReducer(gameStateReducer, {movie, gameType: GameTypes.Tagline, isDailyGame}, gameStateInitialiser);
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/movies')
            .then((res) => res.json())
            .then((data) => {
            setOptions(data.movies.map((movie: any) => movie.value));
            })
    },[]);

    const handleGuess = () => dispatch({ type: 'PLAY_GUESS' });

    const handleShare = (e: React.MouseEvent<HTMLElement>) => {
        e.persist();

        const url = window.location.href;
        const numberOfTurns = state.guesses?.length ?? 0;
        const text = `ScreenIdle Taglines #${movie.gameId} ${numberOfTurns}/6`;
        const hashtags = `#ScreenIdle #ScreenIdleTaglines #FilmTwitter #Framed @screenidlegame`;
        const resultEmojiBoard = createShareablePuzzzleBoard(state.guesses);

        const textToShare = `${text}\n\n${resultEmojiBoard}\n\n${hashtags}`;

        const shareData: ShareData = {
            title: 'ScreenIdle',
            text: textToShare,
            url: url
        };

        shareContent(shareData);
    }

    const PlayMode = () => (
        <>
            <div className="w-full">
                <Combobox 
                    selectedItem={state.selectedItem} 
                    dispatch={dispatch} 
                    options={options} />
            </div>
            <button 
                onClick={handleGuess} 
                className={`w-full flex flex-row space-x-2 items-center justify-center p-4 text-xl bg-screenidle-success text-screenidle-link font-bold border border-black mt-2 ${buttons.className}`}>
                <FaPlay className="inline" /><span>Guess</span>
            </button>
        </>
    )

    const WonMode = () => (
        <>
            <div className="w-full p-4 mb-4 bg-screenidle-success text-screenidle-link space-y-4 rounded-lg">
                <h2 className={`font-bold text-2xl ${headings.className}`}>You won!</h2>
                <p>You knew that the answer was <b>{movie.title}</b>.</p>
                <button
                    className={`bg-screenidle-success text-xl text-screenidle-link border-2 border-screenidle-link p-4 rounded-lg w-full flex flex-row space-x-2 items-center justify-center ${headings.className}`}
                    type="button" onClick={handleShare}>
                        <FaShareNodes className="inline" /><span>Share result</span>
                </button>
            </div>
            {state.isDailyGame && <GameHistory gameType={GameTypes.Tagline} />}
        </>
    )

    const LostMode = () => (
        <>
            <div className="w-full p-4 mb-4 bg-screenidle-danger text-screenidle-link space-y-4 rounded-lg">
                <h2 className={`font-bold text-2xl ${headings.className}`}>You lost!</h2>
                <p>The answer that you were looking for was <b>{movie.title}</b>.</p>
                <button
                    className={`bg-screenidle-danger text-xl text-screenidle-link border-2 border-screenidle-link p-4 rounded-lg w-full flex flex-row space-x-2 items-center justify-center ${headings.className}`}
                    type="button" onClick={handleShare}>
                    <FaShareNodes className="inline" /><span>Share result</span>
                </button>
            </div>
            {state.isDailyGame && <GameHistory gameType={GameTypes.Tagline} />}
        </>
    )

    const LoadingMode = () => (
        <p>Loading puzzle ...</p>
    )

    const displayMode = () => {
        switch (state.gameMode) {
            case 'loading': return <LoadingMode />
            case 'play': return <PlayMode />
            case 'won': return <WonMode />
            case 'lost': return <LostMode />
            default: return <LoadingMode />
        }
    }

    return (
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mt-0">
            <div className="space-y-4 mt-0">
                <p className="text-2xl p-4 md:p-10 md:text-5xl font-bold italic border-2 border-slate-200 rounded-md">{movie.tagline}</p>
                <ScoreBoard guesses={state.guesses} />
            </div>
            <div className="space-y-4 mt-0">
                {displayMode()}
                <PreviousAnswers guesses={state.guesses} /> 
            </div>
        </div>
    )
}
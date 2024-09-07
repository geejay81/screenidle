"use client"

import { Movie } from "@/types/Movie"
import HangmanBoard from "./HangmanBoard"
import { useReducer } from "react"
import Keyboard from "./Keyboard"
import LifeBar from "./LifeBar"
import { headings } from "@/ui/fonts"
import { GameTypes } from "@/types/GameTypes"
import { alphabet, hangmanStateInitialiser, hangmanStateReducer, initialLives } from "../reducers/hangman-state-reducer"
import GameHistory from "./GameHistory"
import { FaShareNodes } from "react-icons/fa6"
import { createShareableLivesBoard, shareContent } from "../client-lib/social-sharer"
import OtherGamesPromo from "./OtherGamesPromo"

interface HangmanPuzzleProps {
    movie: Movie,
    isDailyGame: boolean
}

interface ResultMessageProps {
    heading: string;
    bgColor: string;
    children: React.ReactNode;
    handleShare: () => void;
}

interface ResultModeProps {
    children: React.ReactNode
}

interface PosterImageProps {
    imageUrl: string,
    alt: string
}

export default function HangmanPuzzle({movie, isDailyGame}: HangmanPuzzleProps) {
    
    const [state, dispatch] = useReducer(hangmanStateReducer, { movie, gameType: GameTypes.MovieHangman, isDailyGame }, hangmanStateInitialiser);
    
    const handleGuess = (letter: string) => {
        dispatch({ type: 'GUESS_LETTER', payload: letter});
    }

    const handleShare = () => {

        const url = window.location.href;
        const livesRemaining = 6 - (state.wrongGuesses.length ?? 0);
        const text = `ScreenIdle Movie Title Blank Buster #${movie.gameId} ${livesRemaining}/6 lives remaining`;
        const hashtags = `#ScreenIdle #FilmTwitter #Framed @screenidlegame`;
        const resultEmojiBoard = createShareableLivesBoard(state.wrongGuesses, initialLives);

        const textToShare = `${text}\n\n${resultEmojiBoard}\n\n${hashtags}`;

        const shareData: ShareData = {
            title: 'ScreenIdle',
            text: textToShare,
            url: url
        };

        shareContent(shareData);
    }

    const PlayMode = () => (
        <div className="space-y-8">
            <HangmanBoard answer={movie.title} guessedLetters={state.guessedLetters} alphabet={alphabet} />
            <LifeBar lives={initialLives} livesUsed={state.wrongGuesses.length} />
            <Keyboard handleGuess={handleGuess} guessedLetters={state.guessedLetters} />
        </div>
    )

    const LostMode = () => (
        <ResultMode>
            <ResultMessage heading="Game Over!" bgColor="bg-screenidle-danger" handleShare={handleShare}>
                <p>Bad luck. The answer to this puzzle was <span className="font-bold">{movie.title}</span>.</p>
            </ResultMessage>
            {state.isDailyGame && <GameHistory gameType={GameTypes.MovieHangman} />}
        </ResultMode>
    )

    const WonMode = () => (
        <ResultMode>
            <ResultMessage heading="Winner!" bgColor="bg-screenidle-success" handleShare={handleShare}>
                <p>Congatulations! You knew that the answer was <span className="font-bold">{movie.title}</span>.</p>
            </ResultMessage>
            {state.isDailyGame && <GameHistory gameType={GameTypes.MovieHangman} />}
        </ResultMode>
    )

    const ResultMode = ({children}: ResultModeProps) => {
        return (
            <div className="grid md:grid-cols-2 gap-4 md:gap-8 mt-0">
                <div className="space-y-4 mt-0">
                    <PosterImage imageUrl={movie.poster} alt={`${movie.title} poster`} />
                </div>
                <div className="space-y-4 mt-0">
                    <LifeBar lives={initialLives} livesUsed={state.wrongGuesses.length} color="danger" />
                    {children}
                    <OtherGamesPromo currentGame="blank-buster" />
                </div>
                <div>
                    <p>Poster images provided by <a href="https://www.themoviedb.org" className="font-semibold">TMDB</a>.</p>
                </div>
            </div>
        )
    }

    switch (state.gameMode) {
        case 'play': return <PlayMode />
        case 'won': return <WonMode />
        case 'lost': return <LostMode />
        default: return <p>Loading ...</p>
    }
}

const ResultMessage = ({heading, bgColor, children, handleShare} : ResultMessageProps) => {
    return (
        <div className={`${bgColor} text-screenidle-link space-y-4 p-4 rounded-md`} role="alert">
            <h2 className={`font-bold text-2xl ${headings.className}`}>{heading}</h2>
            {children}
            <button
                className={`${bgColor} text-xl text-screenidle-link border-2 border-screenidle-link p-4 rounded-lg w-full flex flex-row space-x-2 items-center justify-center ${headings.className}`}
                type="button" onClick={handleShare}>
                    <FaShareNodes className="inline" /><span>Share result</span>
            </button>
        </div>
    )
}

const PosterImage = ({imageUrl, alt}: PosterImageProps) => {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={alt} className="mx-auto border-2 border-white pixelated-image-canvas" />        
    )
}
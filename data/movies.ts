import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import gameConfig from "./config/game-config";
import { Movie } from "@/types/Movie";
import taglines from '@/data/taglines.json';
import { hangmanMoviesIds } from './hangman-movies';

const currentPuzzleId = () => {    
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const startDate = new Date(process.env.START_DATE ?? '2022-05-22');
    const today = new Date();
    return Math.floor((today.getTime() - startDate.getTime()) / _MS_PER_DAY) + 1;
}

const currentTaglinePuzzleId = () => {    
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const startDate = new Date(process.env.TAGLINE_START_DATE ?? '2024-07-22');
    const today = new Date();
    return Math.floor((today.getTime() - startDate.getTime()) / _MS_PER_DAY) + 1;
}

const currentMovieHangmanPuzzleId = () => {    
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const startDate = new Date(process.env.MOVIE_HANGMAN_START_DATE ?? '2024-09-07');
    const today = new Date();
    return Math.floor((today.getTime() - startDate.getTime()) / _MS_PER_DAY) + 1;
}

const getGamePeriod = () => {
    switch (gameConfig.gameIdentifier) {
        case "1970s": return [1970,1979];
        case "1980s": return [1980,1989];
        case "1990s": return [1990,1999];
        case "2000s": return [2000,2009];
        default: return [1900,2050];
    }
}

const filteredResponseQueryOptions = {
    next: { revalidate: Number(process.env.REVALIDATE_CACHE_SECONDS) }
}

export async function getCurrentMovie() {
    const currentPuzzleDate = currentPuzzleId();

    return await getMovie(currentPuzzleDate);
}

export async function getCurrentTaglineMovie() {
    const currentPuzzleDate = currentTaglinePuzzleId();

    return await getTaglineMovie(currentPuzzleDate);
}

export async function getCurrentMovieHangmanMovie() {
    const currentPuzzleDate = currentMovieHangmanPuzzleId();

    return await getMovieHangmanMovie(currentPuzzleDate);
}

export async function getMovie(gameId: number) {

    const currentPuzzleDate = currentPuzzleId();

    if (gameId > currentPuzzleDate) return null;

    const alMovies = await getAllMovies();

    const selectedMovies =  alMovies.filter((movie: Movie) => movie.gameId == gameId);

    if (selectedMovies === null || selectedMovies.length === 0) return null;

    return selectedMovies[0];
}

export async function getTaglineMovie(gameId: number) {

    const currentPuzzleDate = currentTaglinePuzzleId();

    if (gameId > currentPuzzleDate) return null;

    const _id = taglines[gameId - 1]._id;

    const alMovies = await getAllMovies();

    const selectedMovies =  alMovies.filter((movie: Movie) => movie._id == _id);

    if (selectedMovies === null || selectedMovies.length === 0) return null;

    var result = {...selectedMovies[0], gameId}

    return result;
}

export async function getMovieHangmanMovie(gameId: number) {

    const currentPuzzleDate = currentMovieHangmanPuzzleId();

    if (gameId > currentPuzzleDate) return null;

    const _id = hangmanMoviesIds[currentPuzzleDate - 1];

    const alMovies = await getAllMovies();

    const selectedMovies =  alMovies.filter((movie: Movie) => movie._id == _id);

    if (selectedMovies === null || selectedMovies.length === 0) return null;

    var result = {...selectedMovies[0], gameId}

    return result;
}

export async function getCurrentTaglinePuzzleNumber() {

    return currentTaglinePuzzleId();
}

export async function getCurrentMovieHangmanPuzzleNumber() {

    return currentMovieHangmanPuzzleId();
}

export async function getHistoricalMovies() {
    
    const currentPuzzleDate = currentPuzzleId();
    const allMovies = await getAllMovies();

    return allMovies
        .filter((movie: Movie) => (
            movie.gameId !== null && movie.gameId < currentPuzzleDate))
        .sort((a: Movie, b: Movie) => a.gameId - b.gameId);
}

export async function getAllMovies() {

    const [gameStartYear, gameEndYear] = getGamePeriod();

    return createClient(clientConfig).fetch(
        groq`*[_type == "movie" && year >= ${gameStartYear} && year <= ${gameEndYear}]{
            _id,
            "gameId": ${gameConfig.gameDatabaseRecordId},
            title,
            year,
            imdbId,
            tmdbId,
            "poster": poster.asset->url,
            tagline
        } | order(title)`,
        {},
        filteredResponseQueryOptions
    );
}

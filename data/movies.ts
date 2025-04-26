import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import gameConfig from "./config/game-config";
import { Movie } from "@/types/Movie";

// #region Caching

const filteredResponseQueryOptions = {
    next: { revalidate: Number(process.env.REVALIDATE_CACHE_SECONDS) }
}

// #endregion

// #region Decade Game Periods

const getGamePeriod = () => {
    switch (gameConfig.gameIdentifier) {
        case "1970s": return [1970,1979];
        case "1980s": return [1980,1989];
        case "1990s": return [1990,1999];
        case "2000s": return [2000,2009];
        default: return [1900,2050];
    }
}

// #endregion

// #region Get Current Puzzle Id

const currentPostersPuzzleId = () => {    
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

export async function getCurrentTaglinePuzzleNumber() {

    return currentTaglinePuzzleId();
}

export async function getCurrentMovieHangmanPuzzleNumber() {

    return currentMovieHangmanPuzzleId();
}

// #endregion

// #region Get Current Movie Game

export async function getCurrentPostersMovie() {
    const currentPuzzleDate = currentPostersPuzzleId();

    return await getPostersMovie(currentPuzzleDate);
}

export async function getCurrentTaglineMovie() {
    const currentPuzzleDate = currentTaglinePuzzleId();

    return await getTaglineMovie(currentPuzzleDate);
}

export async function getCurrentMovieHangmanMovie() {
    const currentPuzzleDate = currentMovieHangmanPuzzleId();

    return await getMovieHangmanMovie(currentPuzzleDate);
}

// #endregion

// #region Get Individual Movies Functions

async function getMovieOfType(gameId: number, currentGameId: number, gameType: string) {

    if (gameId > currentGameId) return null;

    const alMovies = await getAllMoviesOfType(gameType);

    const selectedMovies =  alMovies.filter((movie: Movie) => movie.gameId == gameId);

    if (selectedMovies === null || selectedMovies.length === 0) return null;

    return selectedMovies[0];
}

export async function getPostersMovie(gameId: number) {

    const currentPuzzleDate = currentPostersPuzzleId();

    return await getMovieOfType(gameId, currentPuzzleDate, "posters");
}

export async function getTaglineMovie(gameId: number) {

    const currentPuzzleDate = currentTaglinePuzzleId();

    return await getMovieOfType(gameId, currentPuzzleDate, "taglines");
}

export async function getMovieHangmanMovie(gameId: number) {

    const currentPuzzleDate = currentMovieHangmanPuzzleId();

    return await getMovieOfType(gameId, currentPuzzleDate, "blankbuster");
}

// #endregion

// #region Get Historical Movies

async function getHistoricalMovies(gameType: string, getCurrentGameFn: () => number) {

    const currentGameId = getCurrentGameFn();

    const allMovies = await getAllMoviesOfType(gameType);

    return allMovies
        .filter((movie: Movie) => (
            movie.gameId !== null && movie.gameId < currentGameId))
        .sort((a: Movie, b: Movie) => a.gameId - b.gameId);
} 

export async function getHistoricalPosterMovies() {

    return getHistoricalMovies("posters", currentPostersPuzzleId);
}

export async function getHistoricalTaglinesMovies() {
    
    return getHistoricalMovies("taglines", currentTaglinePuzzleId);
}

export async function getHistoricalHangmanMovies() {
    
    return getHistoricalMovies("blankbuster", currentMovieHangmanPuzzleId);
}

// #endregion

// #region All Movie Lists

export async function getAllMoviesOfType(gameType: string) {
    const allMovies = await getAllMovies();

    if (!["posters", "taglines", "blankbuster"].includes(gameType)) {
        return [];
    }

    return allMovies
        .flatMap((record: any) =>
        (record.gameAppearances || []).map((game: any) => ({
            gameType: game.gameType,
            _id: record._id,
            gameId: game.gameNumber,
            imdbId: record.imdbId,
            poster: record.poster,
            title: record.title,
            year: record.year,
            tmdbId: record.tmdbId,
            tagline: record.tagline
        }))).filter((game: any) => game.gameType === gameType);
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
            tagline,
            gameAppearances
        } | order(title)`,
        {},
        filteredResponseQueryOptions
    );
}

// #endregion

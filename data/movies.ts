import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import gameConfig from "./config/game-config";


const currentPuzzleId = () => {    
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const startDate = new Date(process.env.START_DATE ?? '2022-05-22');
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

// export async function getCurrentAlbum() {
//     const currentPuzzleDate = currentPuzzleId();

//     return await getAlbum(currentPuzzleDate);
// }

// export async function getAlbum(gameId: number) {

//     const currentPuzzleDate = currentPuzzleId();

//     if (gameId > currentPuzzleDate) return null;

//     const allAlbums = await getAllAlbums();

//     const selectedAlbums =  allAlbums.filter((album: Album) => album.gameId == gameId);

//     if (selectedAlbums === null || selectedAlbums.length === 0) return null;

//     return selectedAlbums[0];
// }

// export async function getHistoricAlbums() {
    
//     const currentPuzzleDate = currentPuzzleId();
//     const allAlbums = await getAllAlbums();

//     return allAlbums
//         .filter((album: Album) => (
//             album.gameId !== null && album.gameId < currentPuzzleDate))
//         .sort((a: Album, b: Album) => a.gameId - b.gameId);
// }

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
            "poster": poster.asset->url
        } | order(title)`,
        {},
        filteredResponseQueryOptions
    );
}
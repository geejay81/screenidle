import { getHistoricalMovies } from "@/data/movies"
import { Movie } from "@/types/Movie";

export default async function PosterHistoryPage() {

    const movies = await getHistoricalMovies();

    const HistoryList = () => (
        <ul>
            {movies.map((movie: Movie) => (
                <li key={movie.gameId}>
                    
                </li>
            ))}
        </ul>
    )


    return (
        <>
            <h1>Previous poster puzzles</h1>
            {movies && movies.length > 0
                ? <HistoryList />
                : <p>There are no previous games to play at the moment. Check back tomorrow.</p>
            }
        </>
    )
}
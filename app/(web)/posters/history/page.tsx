import Header from "@/components/page/Header";
import { getHistoricalMovies } from "@/data/movies"
import { Movie } from "@/types/Movie";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 0;

export const metadata: Metadata = {
    title: "Previous movie poster puzzles",
    description: "Play the ScreenIdle filmography!"
}

export default async function PosterHistoryPage() {

    const movies = await getHistoricalMovies();
    const showHistory = movies && movies.length > 0;

    return (
        <>
            <Header title={'Previous movie poster puzzles'} />
            <main className="grow max-w-md p-4 mx-auto md:max-w-screen-lg md:px-8">
                {showHistory
                ?
                    <ul className="list-none m-0">
                    {movies && movies.map((movie: Movie) => (
                        <li key={movie.gameId} 
                            className="mr-4 my-2 float-left">
                            <Link 
                                href={`/posters/history/${movie.gameId}`}
                                className="bg-screenidle-warning text-screenidle-link px-5 py-4 rounded-lg inline-block"
                                >{movie.gameId}</Link></li>
                    ))}
                    </ul>
                :
                    <p>There are no games to play at the moment, but check back tomorrow to play the first.</p>
                }
            </main>
        </>
        
        
    )
}
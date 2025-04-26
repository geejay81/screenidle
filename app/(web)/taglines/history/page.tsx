import Header from "@/components/page/Header";
import { getCurrentTaglineMovie, getCurrentTaglinePuzzleNumber, getHistoricalTaglinesMovies } from "@/data/movies"
import getPageMetaData from "@/lib/getPageMetaData";
import { Movie } from "@/types/Movie";
import { Metadata } from "next";
import Link from "next/link";

const title = "Previous movie tagline puzzles";
const description = "Play the ScreenIdle Taglines filmography!";
const pageUrl = `${process.env.BASE_URL}taglines/history`;

export const metadata: Metadata = getPageMetaData(title, description, pageUrl);

export default async function TaglineHistoryPage() {

    const movies = await getHistoricalTaglinesMovies();
    const showHistory = movies && movies.length > 0;

    return (
        <>
            <Header title={'Previous movie tagline puzzles'} />
            <main className="grow">
                <div className="max-w-md p-4 mx-auto md:max-w-screen-lg md:px-8">
                {showHistory
                ?
                    <ul className="list-none m-0">
                    {movies.map((game: Movie) => (
                        <li key={game.gameId} 
                            className="mr-4 my-2 inline-flex">
                            <Link 
                                href={`/taglines/history/${game.gameId}`}
                                className="bg-screenidle-warning text-screenidle-link px-5 py-4 rounded-lg inline-block"
                                prefetch={false}
                                >{game.gameId}</Link></li>
                    ))}
                    </ul>
                :
                    <p>There are no games to play at the moment, but check back tomorrow to play the first.</p>
                }
                </div>
            </main>
        </>   
    )
}
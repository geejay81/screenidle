import Header from "@/components/page/Header";
import { getHistoricalHangmanMovies } from "@/data/movies"
import getPageMetaData from "@/lib/getPageMetaData";
import { Metadata } from "next";
import Link from "next/link";

const title = "Previous movie blank buster puzzles";
const description = "Play the ScreenIdle movie blank buster filmography!";
const pageUrl = `${process.env.BASE_URL}blank-buster/history`;

export const metadata: Metadata = getPageMetaData(title, description, pageUrl);

export default async function BlankBusterHistoryPage() {

    const movies = await getHistoricalHangmanMovies();
    const showHistory = movies && movies.length > 0;

    return (
        <>
            <Header title={title} />
            <main className="grow">
                <div className="max-w-md p-4 mx-auto md:max-w-screen-lg md:px-8">
                {showHistory
                ?
                    <ul className="list-none m-0">
                    {movies.map((game: any) => (
                        <li key={game.gameId} 
                            className="mr-4 my-2 inline-flex">
                            <Link 
                                href={`/blank-buster/history/${game.gameId}`}
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
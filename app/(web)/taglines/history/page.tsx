import Header from "@/components/page/Header";
import { getCurrentTaglineMovie, getCurrentTaglinePuzzleNumber } from "@/data/movies"
import getPageMetaData from "@/lib/getPageMetaData";
import { Metadata } from "next";
import Link from "next/link";

const title = "Previous movie tagline puzzles";
const description = "Play the ScreenIdle Taglines filmography!";
const pageUrl = `${process.env.BASE_URL}taglines/history`;

export const metadata: Metadata = getPageMetaData(title, description, pageUrl);

export default async function TaglineHistoryPage() {

    const latestTaglineMovieId = await getCurrentTaglinePuzzleNumber();
    const games = Array.from({ length: latestTaglineMovieId - 1 }, (_, i) => i + 1);
    const showHistory = latestTaglineMovieId && latestTaglineMovieId > 1;

    return (
        <>
            <Header title={'Previous movie poster puzzles'} />
            <main className="grow">
                <div className="max-w-md p-4 mx-auto md:max-w-screen-lg md:px-8">
                {showHistory
                ?
                    <ul className="list-none m-0">
                    {games.map((game: number) => (
                        <li key={game} 
                            className="mr-4 my-2 inline-flex">
                            <Link 
                                href={`/taglines/history/${game}`}
                                className="bg-screenidle-warning text-screenidle-link px-5 py-4 rounded-lg inline-block"
                                prefetch={false}
                                >{game}</Link></li>
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
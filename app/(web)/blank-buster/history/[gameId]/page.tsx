import HangmanPuzzle from "@/components/client-apps/HangmanPuzzle";
import Header from "@/components/page/Header";
import { getMovieHangmanMovie } from "@/data/movies";
import getPageMetaData from "@/lib/getPageMetaData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type HangmanIdPageProps = {
    params: { gameId: number }
}

export async function generateMetadata({ params }: HangmanIdPageProps): Promise<Metadata> {

    const title = `Movie title blank buster, game #${params.gameId}`;
    const description = "Can you fill in the blanks on this movie?"
    const pageUrl = `${process.env.BASE_URL}/blank-buster/${params.gameId}`;

    return getPageMetaData(title, description, pageUrl);
}

export default async function BlankBusterIdPage({ params }: HangmanIdPageProps) {

    const movie = await getMovieHangmanMovie(params.gameId);

    if (!movie) return notFound();

    return (
        <>
            <Header title={`Movie title blank buster, game #${params.gameId}`} />
            <main className="grow">
                <div className="max-w-md p-4 mx-auto md:max-w-screen-lg md:px-8">
                    <HangmanPuzzle movie={movie} isDailyGame={false} />
                </div>
            </main>
        </>
    );
}
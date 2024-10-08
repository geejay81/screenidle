import TaglinePuzzle from "@/components/client-apps/TaglinePuzzle";
import Header from "@/components/page/Header";
import { getCurrentTaglineMovie, getTaglineMovie } from "@/data/movies";
import getPageMetaData from "@/lib/getPageMetaData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type TaglinesIdPageProps = {
    params: { gameId: number }
}

export async function generateMetadata({ params }: TaglinesIdPageProps): Promise<Metadata> {

    const title = `Guess the movie tagline, game #${params.gameId}`;
    const description = "Can you guess this previous movie from the tagline?"
    const pageUrl = `${process.env.BASE_URL}/taglines/${params.gameId}`;

    return getPageMetaData(title, description, pageUrl);
}

export async function generateStaticParams() {

    const latestMovieTaglineMovieId = await getCurrentTaglineMovie();
    return Array.from({ length: latestMovieTaglineMovieId - 1 }, (_, i) => i + 1)
        .map((id: number) => { gameId: id.toString() });
}

export default async function TaglinesIdPage({ params }: TaglinesIdPageProps) {

    const movie = await getTaglineMovie(params.gameId);

    if (!movie) return notFound();

    return (
        <>
            <Header title={`Guess the movie tagline, game #${params.gameId}`} />
            <main className="grow">
                <div className="max-w-md p-4 mx-auto md:max-w-screen-lg md:px-8">
                    <TaglinePuzzle movie={movie} isDailyGame={false} />
                </div>
            </main>
        </>
    );
}
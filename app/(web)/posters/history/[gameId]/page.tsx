import PosterPuzzle from "@/components/client-apps/PosterPuzzle";
import Header from "@/components/page/Header";
import { getHistoricalMovies, getMovie } from "@/data/movies";
import getPageMetaData from "@/lib/getPageMetaData";
import { Movie } from "@/types/Movie";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type PostersIdPageProps = {
    params: { gameId: number }
}

export const revalidate = 86400;

export async function generateMetadata({ params }: PostersIdPageProps): Promise<Metadata> {

  const title = `Guess the movie poster, game #${params.gameId}`;
  const description = "Can you guess this previous movie from the pixelated poster?"
  const pageUrl = `${process.env.BASE_URL}/posters/${params.gameId}`;

  return getPageMetaData(title, description, pageUrl);
}

export async function generateStaticParams() {

  const movies = await getHistoricalMovies();

  const result = [];

  for (let i = 0; i < movies.length; i++) {
    result.push({ gameId: movies[i].gameId.toString() });
  }
  
  return result;
}

export default async function PostersIdPage({params}: PostersIdPageProps) {

    const movie = await getMovie(params.gameId);

    if (!movie) return notFound();
  
    return (
      <>
        <Header title={`Guess the movie poster, game #${params.gameId}`} />
        <main className="grow">
          <div className="max-w-md p-4 mx-auto md:max-w-screen-lg md:px-8">
            <PosterPuzzle movie={movie} isDailyGame={false} />
          </div>
        </main>
      </>
    );
}
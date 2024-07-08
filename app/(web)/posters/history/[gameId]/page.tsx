import PosterPuzzle from "@/components/client-apps/PosterPuzzle";
import Header from "@/components/page/Header";
import { getMovie } from "@/data/movies";
import getPageMetaData from "@/lib/getPageMetaData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type PostersIdPageProps = {
    params: { gameId: number }
}

export async function generateMetadata({ params }: PostersIdPageProps): Promise<Metadata> {

  const title = `Guess the movie, game #${params.gameId}`;
  const description = "Can you guess this previous movie from the pixelated poster?"
  const pageUrl = `${process.env.BASE_URL}/posters/${params.gameId}`;

  return getPageMetaData(title, description, pageUrl);
}

export default async function PostersIdPage({params}: PostersIdPageProps) {

    const movie = await getMovie(params.gameId);

    if (!movie) return notFound();
  
    return (
      <>
        <Header title={'Guess the previous movie poster'} />
        <main className="grow">
          <div className="max-w-md p-4 mx-auto md:max-w-screen-lg md:px-8">
            <PosterPuzzle movie={movie} isDailyGame={false} />
          </div>
        </main>
      </>
    );
}
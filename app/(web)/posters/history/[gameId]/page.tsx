import PosterPuzzle from "@/components/client-apps/PosterPuzzle";
import Header from "@/components/page/Header";
import { getMovie } from "@/data/movies";
import { Metadata } from "next";
import { notFound } from "next/navigation";
export const revalidate = 600;

type PostersIdPageProps = {
    params: { gameId: number }
}

export async function generateMetadata({ params }: PostersIdPageProps): Promise<Metadata> {
    return {
      title: `Guess the movie, game #${params.gameId}`,
      description: "Can you guess this previous movie from the pixelated poster?"
    }
  }

export default async function PostersIdPage({params}: PostersIdPageProps) {

    const movie = await getMovie(params.gameId);

    if (!movie) return notFound();
  
    return (
      <main className="grow max-w-md p-4 mx-auto">
        <Header title={'Guess the previous movie poster'} />
        <PosterPuzzle movie={movie} isDailyGame={false} />
      </main>
    );
}
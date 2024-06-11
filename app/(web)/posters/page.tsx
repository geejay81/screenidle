import PosterPuzzle from "@/components/client-apps/PosterPuzzle";
import Header from "@/components/page/Header";
import { getCurrentMovie } from "@/data/movies";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Guess the movie poster",
  description: "Can you guess the movie from the pixelated image of the poster?"
}

export default async function PostersPage() {
    const movie = await getCurrentMovie();

    if (!movie) return notFound();
  
    return (
      <main className="grow max-w-md p-4 mx-auto">
        <Header title={'Guess the movie poster'} />
        <PosterPuzzle movie={movie} isDailyGame={true} />
      </main>
    );
}
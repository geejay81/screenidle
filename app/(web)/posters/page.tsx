import PosterPuzzle from "@/components/client-apps/PosterPuzzle";
import Header from "@/components/page/Header";
import { getCurrentMovie } from "@/data/movies";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Guess the movie poster",
  description: "Can you guess the movie from the pixelated image of the poster?"
}

export default async function PostersPage() {
    const movie = await getCurrentMovie();

    if (!movie) return notFound();
  
    return (
      <>
        <Header title={'Guess the movie poster'} />
        <main className="grow max-w-md p-4 mx-auto md:max-w-screen-lg md:px-8">
          <PosterPuzzle movie={movie} isDailyGame={true} />
        </main>
      </>
      
    );
}
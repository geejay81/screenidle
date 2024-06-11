import PosterPuzzle from "@/components/client-apps/PosterPuzzle";
import { getCurrentMovie } from "@/data/movies";
import { notFound } from "next/navigation";

export default async function PostersPage() {
    const movie = await getCurrentMovie();

    if (!movie) return notFound();
  
    return (
      <main className="max-w-md p-4 mx-auto">
        <PosterPuzzle movie={movie} isDailyGame={true} />
      </main>
    );
}
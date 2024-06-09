import PosterPuzzle from "@/components/client-apps/PosterPuzzle";
import { getMovie } from "@/data/movies";
import { notFound } from "next/navigation";

export default async function PostersPage() {
    const movie = await getMovie(1);

    if (!movie) return notFound();
  
    return (
      <main className="max-w-md p-4 mx-auto">
        <PosterPuzzle movie={movie} />
      </main>
    );
}
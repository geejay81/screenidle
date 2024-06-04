import PosterPuzzle from "@/components/client-apps/PosterPuzzle";
import { getMovie } from "@/data/movies";

export default async function Home() {
  const movie = await getMovie(1);

  return (
    <main className="max-w-md p-4 mx-auto">
      <PosterPuzzle movie={movie} />
    </main>
  );
}

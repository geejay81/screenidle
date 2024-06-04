import PosterPuzzle from "@/components/client-apps/PosterPuzzle";
import { getMovie } from "@/data/movies";

export default async function PostersPage() {

    const movie = await getMovie(1);

    return <PosterPuzzle movie={movie} />
}
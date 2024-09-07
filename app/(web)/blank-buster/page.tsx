import HangmanPuzzle from "@/components/client-apps/HangmanPuzzle";
import Header from "@/components/page/Header";
import { getCurrentMovieHangmanMovie } from "@/data/movies";
import getPageMetaData from "@/lib/getPageMetaData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const title = "Movie title blank buster";
const description = "Fill the blanks in the movie title?";
const pageUrl = `${process.env.BASE_URL}blank-buster`;

export const metadata: Metadata = getPageMetaData(title, description, pageUrl);

export default async function FillThePage() {
    const movie = await getCurrentMovieHangmanMovie();

    if (!movie) return notFound();
  
    return (
      <>
        <Header title={title} />
        <main className="grow">
          <div className="max-w-md p-4 mx-auto md:max-w-screen-lg md:px-8">
            <HangmanPuzzle movie={movie} isDailyGame={true} />
          </div>
        </main>
      </>
    );
}
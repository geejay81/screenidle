import PosterPuzzle from "@/components/client-apps/PosterPuzzle";
import Header from "@/components/page/Header";
import { getCurrentPostersMovie } from "@/data/movies";
import getPageMetaData from "@/lib/getPageMetaData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const title = "Guess today's movie poster";
const description = "Can you guess the movie from today's pixelated image of the poster?";
const pageUrl = `${process.env.BASE_URL}posters`;

export const metadata: Metadata = getPageMetaData(title, description, pageUrl);

export default async function PostersPage() {
    const movie = await getCurrentPostersMovie();

    if (!movie) return notFound();
  
    return (
      <>
        <Header title={'Guess the movie poster'} />
        <main className="grow">
          <div className="max-w-md p-4 mx-auto md:max-w-screen-lg md:px-8">
            <PosterPuzzle movie={movie} isDailyGame={true} />
          </div>
        </main>
      </>
    );
}
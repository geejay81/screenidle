import PosterPuzzle from "@/components/client-apps/PosterPuzzle";
import Header from "@/components/page/Header";
import { getCurrentMovie } from "@/data/movies";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const title = "Guess today's movie poster";
const description = "Can you guess the movie from today's pixelated image of the poster?";
const pageUrl = `${process.env.BASE_URL}posters`;

export const metadata: Metadata = {
  metadataBase: new URL(pageUrl),
  title,
  description,
  openGraph: {
    url: pageUrl,
    title,
    description
  },
  twitter: {
    title,
    description
  }
}

export default async function PostersPage() {
    const movie = await getCurrentMovie();

    if (!movie) return notFound();
  
    return (
      <>
        <Header title={'Guess the movie poster'} />
        <main>
          <div className="grow max-w-md p-4 mx-auto md:max-w-screen-lg md:px-8">
            <PosterPuzzle movie={movie} isDailyGame={true} />
          </div>
        </main>
      </>
      
    );
}
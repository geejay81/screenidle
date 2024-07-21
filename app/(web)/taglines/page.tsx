import TaglinePuzzle from "@/components/client-apps/TaglinePuzzle";
import Header from "@/components/page/Header";
import { getCurrentTaglineMovie } from "@/data/movies";
import getPageMetaData from "@/lib/getPageMetaData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const title = "Guess today's movie tagline";
const description = "Can you guess the movie from today's tagline?";
const pageUrl = `${process.env.BASE_URL}taglines`;

export const metadata: Metadata = getPageMetaData(title, description, pageUrl);

export default async function TaglinesPage() {
    const movie = await getCurrentTaglineMovie();

    if (!movie) return notFound();
  
    return (
      <>
        <Header title={title} />
        <main className="grow">
          <div className="max-w-md p-4 mx-auto md:max-w-screen-lg md:px-8">
            <TaglinePuzzle movie={movie} isDailyGame={true} />
          </div>
        </main>
      </>
    );
}
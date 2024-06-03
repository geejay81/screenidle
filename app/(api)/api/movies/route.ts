import { getAllMovies } from '@/data/movies'
import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {

    const movies = await getAllMovies();

    // TODO: handle errors here.

    const result = movies.map((movie: any) => (
        {
            id: `${movie._id}`,
            value: `${movie.title} (${movie.year})`
        }
    ));
    return NextResponse.json({ movies: result })
}
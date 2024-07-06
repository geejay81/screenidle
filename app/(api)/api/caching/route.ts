import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
 
export async function GET(request: NextRequest) {

    try {

        const { nextUrl, headers } = request;
        const { searchParams } = nextUrl;

        if (headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}` &&
            searchParams.get('key') !== `${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, {
                status: 401 })
        }
        
        revalidatePath('/(api)/api/movies', 'page');
        revalidatePath('/(web)/posters', 'page');
        revalidatePath('/(web)/posters/history', 'page');
        return NextResponse.json({ revalidated: true, now: Date.now() });

    } catch {

        return NextResponse.json({
            revalidated: false,
            now: Date.now(),
            message: 'error revalidating data',
        });
    }
}
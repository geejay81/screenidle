import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = "force-dynamic"
 
export async function GET(request: NextRequest) {

    try {

        if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, {
                status: 401 })
        }
        
        revalidatePath('/(api)/api/movies', 'page');
        revalidatePath('/(web)/posters', 'page');
        revalidatePath('/(web)/posters/history', 'page');
        return NextResponse.json({ revalidated: true, now: Date.now() });

    } catch (err) {

        let errorMessage = 'error revalidating data';
        
        if (err instanceof Error) {
            errorMessage = `error revalidating data: ${err.message}`
        }
            
        return NextResponse.json({
            revalidated: false,
            now: Date.now(),
            message: errorMessage,
        });
    }
}
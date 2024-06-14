import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
 
export async function GET(request: NextRequest) {

    try {

        if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, {
                status: 401 })
        }
        
        revalidatePath('/', 'layout');
        return NextResponse.json({ revalidated: true, now: Date.now() });

    } catch {

        return NextResponse.json({
            revalidated: false,
            now: Date.now(),
            message: 'error revalidating data',
        });
    }
}
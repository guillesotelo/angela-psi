export const dynamic = 'force-dynamic' // Force dynamic rendering for this route

import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { retryWithDelay } from 'src/helpers'

const API_URL = process.env.NEXT_PUBLIC_API_URL
export async function GET(request: NextRequest) {
    try {        
        const slug = request.nextUrl.searchParams.get('slug')
        const res = await retryWithDelay(() => axios.get(`${API_URL}/api/psiService/getBySlug`, { params: { slug } }), 5, 100)
        return NextResponse.json(res.data)
    } catch (err: any) {
        console.error("Next API Error: ", err)
        return NextResponse.json({ error: err.code }, { status: err.status })
    }
}
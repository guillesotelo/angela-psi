export const dynamic = 'force-dynamic' // Force dynamic rendering for this route

import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { retryWithDelay } from 'src/helpers'

const API_URL = process.env.NEXT_PUBLIC_API_URL
export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const res = await retryWithDelay(() => axios.post(`${API_URL}/api/booking/create`, data), 5, 100)
        return NextResponse.json(res.data)
    } catch (err: any) {
        console.error("Next API Error: ", err)
        return NextResponse.json({ error: err.code }, { status: err.status })
    }
}
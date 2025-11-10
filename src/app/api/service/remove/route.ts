export const dynamic = 'force-dynamic' // Force dynamic rendering for this route

import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { retryWithDelay } from 'src/helpers'
import { getToken } from '../../(helpers)'
import { revalidatePath } from 'next/cache'

const API_URL = process.env.NEXT_PUBLIC_API_URL
export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const token = await getToken(request)
        const headers = { Authorization: `Bearer ${token}` }
        const res = await retryWithDelay(() => axios.post(`${API_URL}/api/psiService/remove`, data, { headers }), 5, 100)
        revalidatePath('/')
        
        return NextResponse.json(res.data)
    } catch (err: any) {
        console.error("Next API Error: ", err)
        return NextResponse.json({ error: err.code }, { status: err.status })
    }
}
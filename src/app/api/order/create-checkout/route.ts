import { NextRequest, NextResponse } from 'next/server'
import { SERVICES } from 'src/constants/services'
import { createSlug } from 'src/helpers'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic' // Force dynamic rendering for this route

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    // apiVersion: '2025-05-28.basil',
})

export async function POST(request: NextRequest) {
    try {
        const { orderId, slug, quantity } = await request.json()

        const service = SERVICES.map(s => ({ ...s, slug: createSlug(s.title) })).find(s => s.slug === slug)
        if (!service) return NextResponse.json('Service or slug not found')

        try {
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                line_items: [
                    {
                        price_data: {
                            currency: 'eur',
                            product_data: {
                                name: service?.title || 'ÁNGELA SANGUINO GARCÍA - PSICÓLOGA CLÍNICA',
                                description: service?.description || '',
                                images: service?.image ? [service.image] : [],
                            },
                            unit_amount: Math.round(Number(service?.priceEUR) * 100), // Cents
                        },
                        quantity: quantity || 1,
                    },
                ],
                success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/confirmation?order=${orderId}`,
                cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/canceled`,
                client_reference_id: orderId,
            })
            return NextResponse.json({ url: session.url })
        } catch (err: any) {
            console.error("Next API Error: ", err)
            return NextResponse.json({ error: err.code }, { status: err.status })
        }
    } catch (err: any) {
        console.error("Next API Error: ", err)
        return NextResponse.json({ error: err.code }, { status: err.status })
    }
}
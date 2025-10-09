import { NextRequest, NextResponse } from 'next/server'
import { getOrderById, getServiceById } from 'src/services'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic' // Force dynamic rendering for this route

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    // apiVersion: '2025-05-28.basil',
})

export async function POST(request: NextRequest) {
    try {
        const { orderId, _id, quantity, voluntary, country } = await request.json()

        const service = await getServiceById(_id)
        const booking = await getOrderById(orderId)

        if (!service || !service._id) return NextResponse.json('Service not found')
        let discountApplies = false

        // Discount by country & all
        if (country && service.discountsApply) {
            discountApplies = service.discountsApply.toLowerCase().includes(country.toLowerCase())
                || service.discountsApply.toLowerCase().includes('todos')
        }

        const amount = Math.round(Number(service?.priceEUR) * 100)
        let unit_amount = service.discounts && discountApplies ?
            Number(service?.priceEUR) * (100 - Number(service.discounts.replace('%', ''))) / 100 : amount
        const voluntary_amount = voluntary ? Math.round(Number(voluntary || 5) * 100) : 5

        // Discount on 1st ever session checker
        if (service.title.toLowerCase().includes('primera consulta')) {
            if (booking.hasBookedBefore) {
                return NextResponse.json(
                    { error: 'Ya se registró una consulta con descuento. Por favor elegir Consulta Individual' },
                    { status: 400 }
                )
            }
        }

        // Discount on 2nd hour
        if (service.discounts.includes('50% en la segunda hora') && quantity === 2) {
            unit_amount = Number(service?.priceEUR) * quantity * .75
        }

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
                            unit_amount: unit_amount || voluntary_amount
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
            return NextResponse.json({ error: 'Ocurrió un error generando el cobro. Intenta nuevamente' }, { status: 400 })
        }
    } catch (err: any) {
        console.error("Next API Error: ", err)
        return NextResponse.json({ error: 'Ocurrió un error generando el cobro. Intenta nuevamente' }, { status: 400 })
    }
}
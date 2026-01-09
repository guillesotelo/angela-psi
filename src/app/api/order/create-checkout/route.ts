import { NextRequest, NextResponse } from 'next/server'
import { getOrderById, getServiceById } from 'src/services'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic' // Force dynamic rendering for this route

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    // apiVersion: '2025-05-28.basil',
})


export async function POST(request: NextRequest) {
    try {
        const { orderId, _id, quantity, voluntary, country, colombianResident } =
            await request.json()

        const service = await getServiceById(_id)
        const booking = await getOrderById(orderId)

        if (!service || !service._id) {
            return NextResponse.json("Service not found", { status: 404 })
        }

        // Discount by country & all
        let discountApplies = false
        if (country && service.discountsApply) {
            discountApplies =
                service.discountsApply.toLowerCase().includes(country.toLowerCase()) ||
                service.discountsApply.toLowerCase().includes("todos")
        }

        const qty = Number(quantity || 1)

        // Stripe needs integer cents
        const baseUnitCents = Math.round(Number(service.priceEUR) * 100)

        // Start from base total (in cents)
        let totalCents = baseUnitCents * qty

        // Voluntary amount (if it’s meant to be the price when service price is missing)
        const voluntaryCents = voluntary ? Math.round(Number(voluntary) * 100) : 0

        // Discount on 1st ever session checker
        if (service.title?.toLowerCase().includes("primera consulta")) {
            if (booking?.hasBookedBefore) {
                return NextResponse.json(
                    {
                        error:
                            "Ya se registró una consulta con descuento. Por favor elegir Consulta Individual",
                    },
                    { status: 400 }
                )
            }
        }

        //  40% off for Colombian residents (pay 60%)
        if (colombianResident) {
            totalCents = Math.round(totalCents * 0.6)
        }

        // Country % discount (only if not Colombian resident, to match your client behavior)
        if (!colombianResident && service.discounts && discountApplies) {
            // supports values like "20%" (ignores non-numeric)
            const percent = Number(String(service.discounts).replace("%", ""))
            if (!Number.isNaN(percent) && percent > 0) {
                totalCents = Math.round((totalCents * (100 - percent)) / 100)
            }
        }

        // Discount on 2nd hour
        if (
            service.discounts?.includes("50% en la segunda hora") &&
            qty > 1
        ) {
            // Recompute using the special rule from scratch in cents
            let secondHourTotalCents: number
            if (qty > 2) {
                // All regular price but one (the second hour)
                secondHourTotalCents =
                    baseUnitCents * (qty - 1) + Math.round(baseUnitCents * 0.5)
            } else {
                // One regular price + 50% on the second
                secondHourTotalCents =
                    baseUnitCents + Math.round(baseUnitCents * 0.5)
            }

            totalCents = secondHourTotalCents

            // Apply Colombian resident discount to this special total too (matches your client intent)
            if (colombianResident) {
                totalCents = Math.round(totalCents * 0.6)
            }

            // Optionally also apply country % discount here (only if not Colombian resident)
            if (!colombianResident && service.discounts && discountApplies) {
                const percent = Number(String(service.discounts).replace("%", ""))
                if (!Number.isNaN(percent) && percent > 0) {
                    totalCents = Math.round((totalCents * (100 - percent)) / 100)
                }
            }
        }

        // Fallbacks (avoid 0)
        const finalCents = totalCents || voluntaryCents || 500

        try {
            const session = await stripe.checkout.sessions.create({
                mode: "payment",
                line_items: [
                    {
                        price_data: {
                            currency: "eur",
                            product_data: {
                                name:
                                    service?.title ||
                                    "ÁNGELA SANGUINO GARCÍA - PSICÓLOGA CLÍNICA",
                                description: service?.description || "",
                                images: service?.image ? [service.image] : [],
                            },
                            unit_amount: finalCents, //  integer cents
                        },
                        quantity: 1, //  total already includes qty calculation
                    },
                ],
                success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/confirmation?order=${orderId}`,
                cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/canceled`,
                client_reference_id: orderId,
            })

            return NextResponse.json({ url: session.url })
        } catch (err: any) {
            console.error("Next API Error: ", err)
            return NextResponse.json(
                { error: "Ocurrió un error generando el cobro. Intenta nuevamente" },
                { status: 400 }
            )
        }
    } catch (err: any) {
        console.error("Next API Error: ", err)
        return NextResponse.json(
            { error: "Ocurrió un error generando el cobro. Intenta nuevamente" },
            { status: 400 }
        )
    }
}
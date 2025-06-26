import type { NextApiRequest, NextApiResponse } from 'next';
import { SERVICES } from 'src/constants/services';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-05-28.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.setHeader('Allow', 'POST').status(405).end('Method Not Allowed');
    }

    const { orderId, slug, quantity } = req.body;

    if (!orderId || typeof orderId !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid clientId' });
    }

    const service = SERVICES.find(s => s.slug === slug)
    if (!service) res.status(400).json('Service or slug not found')

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
        });

        return res.status(200).json({ url: session.url });
    } catch (err: any) {
        console.error('Error al crear la sesión de Stripe:', err.message);
        return res.status(500).json({ error: 'No se pudo crear la sesión de Stripe' });
    }
}

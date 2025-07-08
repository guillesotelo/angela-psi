import axios from 'axios';
import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import { retryWithDelay } from 'src/helpers';
import Stripe from 'stripe';
const API_URL = process.env.NEXT_PUBLIC_API_URL

export const config = {
    api: {
        bodyParser: false,
    },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-05-28.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        console.log('\n\nSTRIPE_WEBHOOK_SECRET', process.env.STRIPE_WEBHOOK_SECRET)
        return res.status(405).send('Method Not Allowed');
    }



    const sig = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
        const rawBody = await buffer(req);
        event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (err: any) {
        console.error('Webhook error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Payment received for client ID: ${session.client_reference_id}`);
        await retryWithDelay(() => axios.post(`${API_URL}/api/booking/update`, { _id: session.client_reference_id, isPaid: true }), 5, 100)
    }

    res.status(200).json({ received: true });
}

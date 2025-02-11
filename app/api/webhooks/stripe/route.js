import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import stripeService from '@/lib/service/stripe_service';

export async function POST(request) {
    try {
        const body = await request.text();
        const signature = headers().get('stripe-signature');

        if (!signature) {
            return NextResponse.json(
                { error: 'Missing stripe signature' },
                { status: 400 }
            );
        }

        const event = stripeService.constructWebhookEvent(body, signature);
        await stripeService.handleWebhookEvent(event);

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
}; 
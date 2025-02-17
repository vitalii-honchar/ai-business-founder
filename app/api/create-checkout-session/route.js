import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/dbServer';
import stripeService from '@/lib/service/stripe_service';

export async function POST(request) {
    try {
        const user = await getUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { plan, currentPlan } = await request.json();

        const session = await stripeService.createCheckoutSession({
            user,
            plan,
            currentPlan,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error('Stripe session creation error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create checkout session' },
            { status: 500 }
        );
    }
} 
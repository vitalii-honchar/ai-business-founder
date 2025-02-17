class CheckoutApi {

    async createCheckoutSession(plan, currentPlan) {
        const response = await fetch('/api/checkout/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plan,
                currentPlan,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create checkout session');
        }

        return await response.json();
    }

    async verifyCheckoutSession(sessionId) {
        const response = await fetch('/api/checkout/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId }),
        });

        if (!response.ok) {
            throw new Error('Failed to verify checkout session');
        }

        return await response.json();
    }
}

const checkoutApi = new CheckoutApi();
export default checkoutApi;
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
}

const checkoutApi = new CheckoutApi();
export default checkoutApi;
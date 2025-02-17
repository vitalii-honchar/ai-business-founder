import stripeService from '@/lib/service/stripe_service';

async function verifyPayment(sessionId) {
    try {
        const session = await stripeService.verifyCheckoutSession(sessionId);
        return {
            status: session.payment_status === 'paid' ? 'success' : 'error',
            message: session.payment_status !== 'paid' ? 'Payment is incomplete' : null
        };
    } catch (error) {
        console.error('Payment verification error:', error);
        return {
            status: 'error',
            message: 'Failed to verify payment. Please contact support if the issue persists.'
        };
    }
}

function PaymentVerificationResult({ status, message }) {
    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4">
                <h2 className="text-2xl font-bold text-gray-600">Verifying Payment...</h2>
                <p className="text-gray-600">Please wait while we verify your payment.</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4">
                <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
                <p className="text-gray-600">Your subscription is now active. You can start using the application.</p>
                <a 
                    href="/"
                    className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Go to Dashboard
                </a>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <h2 className="text-2xl font-bold text-red-600">Payment Verification Failed</h2>
            <p className="text-gray-600">{message}</p>
            <a 
                href="/application/user-profile/subscription"
                className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
                Return to Subscription Page
            </a>
        </div>
    );
}

export default async function PaymentVerification({ sessionId }) {
    const verificationResult = await verifyPayment(sessionId);
    return <PaymentVerificationResult {...verificationResult} />;
} 
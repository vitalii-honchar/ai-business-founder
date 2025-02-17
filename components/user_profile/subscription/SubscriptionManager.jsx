'use client';

import { useState } from 'react';
import ErrorMessageComponent from '@/components/common/ErrorMessageComponent';
import InfoMessageComponent from '@/components/common/InfoMessageComponent';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import CurrentSubscription from './CurrentSubscription';
import AvailablePlans from './AvailablePlans';
import { UserProfile } from '@/lib/domain/user_profile';
import { useRouter } from 'next/navigation';
import checkoutApi from '@/lib/client/api/checkout_api';
import SubscriptionPlanSelector from './SubscriptionPlanSelector';

export default function SubscriptionManager({ userProfileObj, message }) {
    const userProfile = new UserProfile(userProfileObj);
    const [showPlans, setShowPlans] = useState(userProfile?.subscriptionPlan?.isNew || true);
    const [info, setInfo] = useState(message || '');

    return (
        <div className="relative">
            <div className="max-w-7xl mx-auto">
                <InfoMessageComponent message={info} className="mb-6" />

                {!showPlans ? (
                    <CurrentSubscription 
                        userProfile={userProfile} 
                        onUpgrade={() => setShowPlans(true)} 
                    />
                ) : (
                    <SubscriptionPlanSelector
                        userProfile={userProfile}
                        onBack={() => setShowPlans(false)}
                    />
                )}
            </div>
        </div>
    );
}
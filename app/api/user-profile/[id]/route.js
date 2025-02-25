import { NextResponse } from 'next/server';
import userProfileService from '@/lib/service/user_profile_service';
import { SubscriptionStatus, SubscriptionPlan, UserProfile } from '@/lib/domain/user_profile';
import { loggerWithUserId } from '@/lib/logger';

const validateSubscriptionPlan = (plan) => {
    const validPlans = Object.values(SubscriptionPlan);
    if (!plan || !validPlans.includes(plan)) {
        return {
            isValid: false,
            error: `Invalid subscription plan. Must be one of: ${validPlans.join(', ')}`
        };
    }
    return { isValid: true };
};

export async function GET(request, { params }) {
    const { id } = await params;
    const log = loggerWithUserId(id);

    try {
        log.info('Handling get user profile request');

        const userProfile = await userProfileService.getUserProfile(id);
        
        if (!userProfile) {
            log.warn('User profile not found');
            return NextResponse.json(
                { error: 'User profile not found' },
                { status: 404 }
            );
        }

        const response = {
            usage: userProfile.usage.toObject(),
            limits: {
                maxProjects: userProfile.maxProjects,
                maxValidationsPerProject: userProfile.maxValidationsPerProject
            },
            subscription: {
                plan: userProfile.subscriptionPlan,
                status: userProfile.subscriptionStatus
            }
        };

        log.info({ profile: response }, 'User profile retrieved successfully');
        return NextResponse.json(response);

    } catch (error) {
        log.error({ error: error.message }, 'Error retrieving user profile');
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request, { params }) {
    const { id } = await params;
    const log = loggerWithUserId(id);

    try {    
        log.info('Handling create user profile request');
        
        const body = await request.json();
        
        const validation = validateSubscriptionPlan(body.subscription_plan);
        if (!validation.isValid) {
            log.warn({ plan: body.subscription_plan }, 'Invalid subscription plan provided');
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            );
        }

        const profileData = {
            subscription_plan: body.subscription_plan,
            subscription_status: SubscriptionStatus.NEW
        };

        const userProfile = await userProfileService.createUserProfile(id, profileData);
        
        log.info({ profile: userProfile }, 'User profile created successfully');
        return NextResponse.json(userProfile, { status: 201 });

    } catch (error) {
        log.error({ error: error.message }, 'Error creating user profile');
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const log = loggerWithUserId(id);

    try {
        log.info('Handling update user profile request');
        
        const body = await request.json();
        
        const validation = validateSubscriptionPlan(body.subscription_plan);
        if (!validation.isValid) {
            log.warn({ plan: body.subscription_plan }, 'Invalid subscription plan provided');
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            );
        }

        const profileData = {
            subscription_plan: body.subscription_plan,
        };

        const userProfile = await userProfileService.updateUserProfile(params.id, profileData);
        
        log.info({ profile: userProfile }, 'User profile updated successfully');
        return NextResponse.json(userProfile, { status: 200 });

    } catch (error) {
        log.error({ error: error.message }, 'Error updating user profile');
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

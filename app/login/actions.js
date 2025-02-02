'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/db/dbServer'
import logger from '@/lib/logger'

export async function login(formData) {
    const supabase = await createClient()
    const email = formData.get('email')

    logger.info({ email }, 'Login attempt')

    const data = {
        email,
        password: formData.get('password'),
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        logger.error({ email, error: error.message }, 'Login failed')
        const errorMessage = encodeURIComponent('Invalid email or password');
        redirect(`/login?error=${errorMessage}`);
    }

    logger.info({ email }, 'Login successful')
    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData) {
    const supabase = await createClient()
    const email = formData.get('email')

    logger.info({ email }, 'Signup attempt')

    const data = {
        email,
        password: formData.get('password'),
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_API_URL}/login?info=${encodeURIComponent('Account confirmed. Please sign in.')}`,
        },
    }

    if (data.email === "" || data.password === "") {
        logger.warn({ email }, 'Signup failed - missing required fields')
        const errorMessage = encodeURIComponent('Email and password are required');
        redirect(`/login?error=${errorMessage}`);
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        logger.error({ email, error: error.message }, 'Signup failed')
        redirect('/error')
    }

    logger.info({ email }, 'Signup successful - awaiting email confirmation')
    const infoMessage = encodeURIComponent('Account created. Please confirm your email and sign in.');
    redirect(`/login?info=${infoMessage}`);
}

export async function resetPassword(formData) {
    const supabase = await createClient()
    const email = formData.get('email')

    logger.info({ email }, 'Password reset attempt')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/login?operation=reset`,
    })

    if (error) {
        logger.error({ email, error: error.message }, 'Password reset failed')
        const errorMessage = encodeURIComponent('Failed to send reset password email');
        redirect(`/login?error=${errorMessage}`);
    }

    logger.info({ email }, 'Password reset email sent')
    const infoMessage = encodeURIComponent('If an account exists with this email, you will receive a password reset link.');
    redirect(`/login?info=${infoMessage}`);
}

export async function updatePassword(formData) {
    const supabase = await createClient()
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    const code = formData.get('code')

    if (!code) {
        logger.error('Missing reset password code')
        const errorMessage = encodeURIComponent('Invalid password reset link');
        redirect(`/login?error=${errorMessage}`);
    }

    if (password !== confirmPassword) {
        const errorMessage = encodeURIComponent('Passwords do not match');
        redirect(`/login?error=${errorMessage}&operation=reset&code=${code}`);
    }

    logger.info('Password update attempt')

    // Then update the password
    const { error: updateError } = await supabase.auth.updateUser({
        password: password
    })

    if (updateError) {
        logger.error({ error: updateError.message }, 'Password update failed')
        const errorMessage = encodeURIComponent('Failed to update password');
        redirect(`/login?error=${errorMessage}&operation=reset&code=${code}`);
    }

    logger.info('Password updated successfully')
    const infoMessage = encodeURIComponent('Password has been updated successfully. Please login with your new password.');
    redirect(`/login?info=${infoMessage}`);
}
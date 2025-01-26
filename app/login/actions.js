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
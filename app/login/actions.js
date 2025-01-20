'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/db/dbServer'

export async function login(formData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    console.log("data", data)
    console.log("error", error)

    if (error) {
        const errorMessage = encodeURIComponent('Invalid email or password');
        redirect(`/login?error=${errorMessage}`);
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData) {
    const supabase = await createClient()
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
        options: {
            emailRedirectTo: `${process.env.BASE_URL}/login?info=${encodeURIComponent('Account confirmed. Please sign in.')}`,
        },
    }

    if (data.email === "" || data.password === "") {
        const errorMessage = encodeURIComponent('Email and password are required');
        redirect(`/login?error=${errorMessage}`);
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    const infoMessage = encodeURIComponent('Account created. Please confirm your email and sign in.');
    redirect(`/login?info=${infoMessage}`);
}
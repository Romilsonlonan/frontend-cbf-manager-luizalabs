'use server';

import { redirect } from "next/navigation";
import { register } from "@/lib/api";

export async function registerUserAction(formData: FormData) {
    const fullName = formData.get('full-name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const accountType = formData.get('account-type') as string;
    const profession = formData.get('profession') as string;

    console.log('Registering user:', { fullName, email, accountType, profession });

    try {
        await register({
            name: fullName,
            email: email,
            password: password,
            profession: profession,
            // Business Logic: New premium users start with a trial
            subscription_status: accountType === 'premium' ? 'premium_trial' : 'free'
        });
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }

    // Usamos window.location no cliente ou deixamos o componente redirecionar
    // Para Server Actions, o redirect() deve ser usado fora de blocos try/catch 
    // ou capturado especificamente, pois ele lança um erro interno do Next.js
}

export async function redirectToLogin() {
    redirect('/login');
}

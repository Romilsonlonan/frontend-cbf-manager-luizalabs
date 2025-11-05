'use server';

import { redirect } from "next/navigation";

export async function registerUserAction(formData: FormData) {
    const fullName = formData.get('full-name');
    const email = formData.get('email');
    const password = formData.get('password');
    const accountType = formData.get('account-type');

    console.log('Registering user:', { fullName, email, accountType, password });

    // Futuramente, aqui irá a lógica de salvar o usuário no banco
    // Por agora, apenas redirecionamos para a página de aprovação pendente.
    redirect('/pending-approval');
}

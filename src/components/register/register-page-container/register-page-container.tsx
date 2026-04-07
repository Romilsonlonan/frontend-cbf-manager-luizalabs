'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUserAction } from '@/app/actions';
import { AccountType } from '@/app/register/types';
import { useLoading } from '@/context/LoadingContext';
import { RegisterView } from '@/app/register/RegisterView';

export function RegisterPageContainer() {
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading();

  const handleSelectAccountType = (type: AccountType) => {
    setAccountType(type);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.currentTarget);
    try {
      startLoading();
      await registerUserAction(formData);
      router.push('/login');
    } catch (err: unknown) {
      console.error('Erro no registro:', err);
      if (err instanceof Error) {
        setError(err.message || 'Erro ao registrar');
      } else {
        setError('Erro ao registrar');
      }
    } finally {
      stopLoading();
    }
  };

  return (
    <RegisterView
      accountType={accountType}
      showPassword={showPassword}
      error={error}
      onSelectAccountType={handleSelectAccountType}
      onTogglePasswordVisibility={() => setShowPassword((prev) => !prev)}
      onSubmit={handleSubmit}
    />
  );
}

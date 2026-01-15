'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUserAction } from '@/app/actions';
import { RegisterView } from './RegisterView';
import { AccountType } from './types';
import { REGISTER_CONSTANTS } from './constants';

/**
 * PaginaRegistro (Container Component)
 * 
 * Responsibilities:
 * - State management (accountType, showPassword, error)
 * - Event handling (handleSelectAccountType, handleSubmit)
 * - Orchestrating the registration flow
 * - Business logic: Implementing Trial for Premium instead of immediate payment
 */
export default function PaginaRegistro() {
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSelectAccountType = (type: AccountType) => {
    setAccountType(type);
    // Business Decision: Premium users now get a Trial instead of being forced to pay immediately.
    // This improves conversion and UX.
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.currentTarget);
    try {
      await registerUserAction(formData);
      router.push('/login'); 
    } catch (err: any) {
      console.error('Erro no registro:', err);
      setError(err.message || REGISTER_CONSTANTS.ERROR_GENERIC);
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

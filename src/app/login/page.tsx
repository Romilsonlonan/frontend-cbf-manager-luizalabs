'use client';

import { Suspense } from 'react';
import { LoginPageContainer } from '@/components/login';

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginPageContainer />
    </Suspense>
  );
}

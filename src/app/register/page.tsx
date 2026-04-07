'use client';

import { Suspense } from 'react';
import { RegisterPageContainer } from '@/components/register';

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <RegisterPageContainer />
    </Suspense>
  );
}

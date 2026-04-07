'use client';

import React from 'react';
import { MailIcon, LockIcon } from 'lucide-react';
import {
  LoginContainer,
  LoginCard,
  LoginCardHeader,
  LoginForm,
  IconInput,
  PasswordInputWithToggle,
  ForgotPasswordLink,
  LoginErrorMessage,
  SubmitButton,
  RegisterFooter,
} from '../index';

interface LoginViewProps {
  // Form state
  email: string;
  senha: string;
  mostrarSenha: boolean;
  carregando: boolean;
  erro: string | null;
  
  // Forgot password state
  forgotEmail: string;
  forgotLoading: boolean;
  forgotError: string | null;
  forgotMessage: string | null;
  
  // Form handlers
  onEmailChange: (value: string) => void;
  onSenhaChange: (value: string) => void;
  onToggleSenhaVisibility: () => void;
  onSubmit: (e: React.FormEvent) => void;
  
  // Forgot password handlers
  onForgotEmailChange: (value: string) => void;
  onForgotSubmit: () => void;
}

export function LoginView({
  email,
  senha,
  mostrarSenha,
  carregando,
  erro,
  forgotEmail,
  forgotLoading,
  forgotError,
  forgotMessage,
  onEmailChange,
  onSenhaChange,
  onToggleSenhaVisibility,
  onSubmit,
  onForgotEmailChange,
  onForgotSubmit,
}: LoginViewProps) {
  return (
    <LoginContainer>
      <LoginCard>
        <LoginCardHeader
          logoSrc="https://i.ibb.co/HTNLMqjX/cbf2.png"
          logoAlt="Logo CBF"
          title="Acessar o painel"
        />
        <LoginForm onSubmit={onSubmit}>
          <IconInput
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            disabled={carregando}
            icon={MailIcon}
          />
          
          <PasswordInputWithToggle
            id="senha"
            value={senha}
            onChange={(e) => onSenhaChange(e.target.value)}
            required
            disabled={carregando}
            placeholder="••••••••"
            showPassword={mostrarSenha}
            onToggleVisibility={onToggleSenhaVisibility}
          />
          
          <ForgotPasswordLink
            email={forgotEmail}
            onEmailChange={onForgotEmailChange}
            onSubmit={onForgotSubmit}
            loading={forgotLoading}
            error={forgotError}
            successMessage={forgotMessage}
          />
          
          <LoginErrorMessage message={erro} />
          
          <SubmitButton disabled={carregando}>
            {carregando ? 'Carregando...' : 'Entrar'}
          </SubmitButton>
        </LoginForm>
        
        <RegisterFooter
          text="Não tem uma conta?"
          linkText="Cadastre-se"
          href="/register"
        />
      </LoginCard>
    </LoginContainer>
  );
}


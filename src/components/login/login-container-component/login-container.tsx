'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPassword, login, resetPassword } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLoading } from '@/context/LoadingContext';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { LoginView } from '../login-view/login-view';
import styles from './login-container.module.css';

const REGEX_SENHA = /^[A-Z][a-zA-Z0-9]{5,7}$/;

export function LoginContainer() {
  // Login form state
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotError, setForgotError] = useState('');

  // Reset password modal state
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = useMemo(() => searchParams.get('token'), [searchParams]);
  
  const { login: authLogin } = useAuth();
  const { startLoading, stopLoading } = useLoading();

  // Check for reset token in URL
  useEffect(() => {
    if (tokenFromUrl) {
      setResetToken(tokenFromUrl);
      setShowResetModal(true);
    }
  }, [tokenFromUrl]);

  // Forgot password handler
  const handleForgotPassword = async () => {
    setForgotLoading(true);
    setForgotMessage('');
    setForgotError('');

    try {
      const res = await forgotPassword(forgotEmail);
      setForgotMessage(res?.msg || 'Se o e-mail existir, enviaremos instruções.');
    } catch (e) {
      setForgotError(e instanceof Error ? e.message : 'Erro ao solicitar recuperação');
    } finally {
      setForgotLoading(false);
    }
  };

  // Reset password handler
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetMessage('');

    if (!REGEX_SENHA.test(newPassword)) {
      setResetError('Senha inválida. Use 6-8 caracteres, sem especiais, comece com maiúscula.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError('As senhas não conferem.');
      return;
    }

    setResetLoading(true);
    try {
      const res = await resetPassword(resetToken, newPassword);
      setResetMessage(res?.msg || 'Senha atualizada com sucesso');
      setTimeout(() => {
        setShowResetModal(false);
        router.replace('/login');
      }, 1500);
    } catch (err) {
      setResetError(err instanceof Error ? err.message : 'Erro ao redefinir senha');
    } finally {
      setResetLoading(false);
    }
  };

  // Login submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      const data = await login(email, senha, startLoading, stopLoading);
      if (data && data.access_token) {
        console.log('LoginPage: Login successful, updating auth context');
        authLogin(data.access_token);
        startLoading();
        setTimeout(() => {
          console.log('LoginPage: Forcing redirect to /home');
          router.push('/home');
        }, 500);
      } else {
        setErro('Resposta de login inválida: token não encontrado.');
      }
    } catch (error) {
      setErro('Email ou senha inválidos!');
      stopLoading();
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      {/* Reset Password Modal */}
      <Dialog open={showResetModal} onOpenChange={setShowResetModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redefinir senha</DialogTitle>
            <DialogDescription>
              Digite sua nova senha abaixo.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="newPassword">Nova senha</Label>
              <div className={styles.inputSenhaContainer}>
                <Input
                  id="newPassword"
                  type={mostrarNovaSenha ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Ex: Abcdef1"
                  disabled={resetLoading}
                  required
                  className={styles.inputSenha}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={styles.botaoMostrarSenha}
                  onClick={() => setMostrarNovaSenha((prev) => !prev)}
                  disabled={resetLoading}
                >
                  {mostrarNovaSenha ? (
                    <EyeIcon className={styles.iconeOlho} />
                  ) : (
                    <EyeOffIcon className={styles.iconeOlho} />
                  )}
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                Regra: 6 a 8 caracteres, sem especiais, começando com letra maiúscula.
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
              <div className={styles.inputSenhaContainer}>
                <Input
                  id="confirmPassword"
                  type={mostrarConfirmarSenha ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={resetLoading}
                  required
                  className={styles.inputSenha}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={styles.botaoMostrarSenha}
                  onClick={() => setMostrarConfirmarSenha((prev) => !prev)}
                  disabled={resetLoading}
                >
                  {mostrarConfirmarSenha ? (
                    <EyeIcon className={styles.iconeOlho} />
                  ) : (
                    <EyeOffIcon className={styles.iconeOlho} />
                  )}
                </Button>
              </div>
            </div>

            {resetError && <div className="text-sm text-red-600 text-center">{resetError}</div>}
            {resetMessage && (
              <div className="text-sm text-green-700 text-center">{resetMessage}</div>
            )}

            <DialogFooter>
              <Button type="submit" disabled={resetLoading}>
                {resetLoading ? 'Salvando...' : 'Atualizar senha'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Login View - Presentation Layer */}
      <LoginView
        // Form state
        email={email}
        senha={senha}
        mostrarSenha={mostrarSenha}
        carregando={carregando}
        erro={erro || null}
        
        // Forgot password state
        forgotEmail={forgotEmail}
        forgotLoading={forgotLoading}
        forgotError={forgotError || null}
        forgotMessage={forgotMessage || null}
        
        // Form handlers
        onEmailChange={setEmail}
        onSenhaChange={setSenha}
        onToggleSenhaVisibility={() => setMostrarSenha((prev) => !prev)}
        onSubmit={handleSubmit}
        
        // Forgot password handlers
        onForgotEmailChange={(newEmail: string) => {
          setForgotEmail(newEmail);
          setForgotMessage('');
          setForgotError('');
        }}
        onForgotSubmit={handleForgotPassword}
      />
    </>
  );
}

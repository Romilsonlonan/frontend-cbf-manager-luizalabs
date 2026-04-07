import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import styles from './forgot-password-link.module.css';

interface ForgotPasswordLinkProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  children?: React.ReactNode;
}

export function ForgotPasswordLink({
  email,
  onEmailChange,
  onSubmit,
  loading,
  error,
  successMessage,
  children,
}: ForgotPasswordLinkProps) {
  return (
    <div className={styles.linkContainer}>
      <Dialog>
        <DialogTrigger asChild>
          <button type="button" className={styles.link}>
            {children || 'Esqueceu sua senha?'}
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recuperação de senha</DialogTitle>
            <DialogDescription>
              Digite seu e-mail. Se ele existir, enviaremos instruções para redefinir sua senha.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2">
            <Label htmlFor="forgotEmail">E-mail</Label>
            <Input
              id="forgotEmail"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="seu@email.com"
              disabled={loading}
            />

            {error && (
              <div className="text-sm text-red-600 text-center">{error}</div>
            )}
            {successMessage && (
              <div className="text-sm text-green-700 text-center">{successMessage}</div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              onClick={onSubmit}
              disabled={loading || !email}
            >
              {loading ? 'Enviando...' : 'Enviar instruções'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

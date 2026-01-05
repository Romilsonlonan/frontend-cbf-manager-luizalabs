'use client';

import Link from "next/link"
import { useEffect, useState } from 'react';
import styles from '../login/login.module.css'; // Import the login styles
import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon, Plus, Users } from 'lucide-react';
import {
  AccountTypeSelection,
  RegisterContainer,
  RegisterCard,
  RegisterCardHeader,
  RegisterForm,
  EnhancedPasswordInput,
  RegisterFooter
} from '@/components/register';
import { PaymentModal } from '@/components/PaymentModal';
import { registerUserAction } from '@/app/actions';
import { clubs } from "@/lib/mock-data";
import { useRouter } from 'next/navigation'; // Import useRouter

export default function PaginaRegistro() {
  const [tipoConta, setTipoConta] = useState<'basic' | 'premium' | null>(null);
  const [modalPagamentoAberto, setModalPagamentoAberto] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false); // Added for password visibility
  const [erro, setErro] = useState(''); // Added for error message
  const [paymentCompleted, setPaymentCompleted] = useState(false); // New state for payment completion
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    // fetchClubs()  // 📡 Carrega clubes ao montar componente
  }, [])

  const handleSelecionarTipoConta = (tipo: 'basic' | 'premium') => {
    setTipoConta(tipo);
    if (tipo === 'premium') {
      setModalPagamentoAberto(true);
    }
  };

  const handlePaymentSuccess = () => {
    // After successful payment, proceed to registration form
    setModalPagamentoAberto(false); // Close modal
    // The form will now be displayed, and the user can proceed with registration
  };

  const handleSubmitRegistro = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro(''); // Clear previous errors

    const formData = new FormData(event.currentTarget);
    try {
      await registerUserAction(formData);
      router.push('/login'); // Redirect to login after successful registration
    } catch (error) {
      setErro('Erro ao registrar. Por favor, tente novamente.');
    }
  };

  if (!tipoConta) {
    return (
      <div className={styles.containerLogin}>
        <div className={styles.overlayEscuro} />
        <div className={styles.conteudoSobreposto}>
          <AccountTypeSelection onSelectAccountType={handleSelecionarTipoConta} />
        </div>
      </div>
    );
  }

  if (tipoConta === 'premium' && modalPagamentoAberto) {
    return (
      <div className={styles.containerLogin}>
        <div className={styles.overlayEscuro} />
        <div className={styles.conteudoSobreposto}>
          <PaymentModal
            isOpen={modalPagamentoAberto}
            onClose={() => setModalPagamentoAberto(false)}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.containerLogin}>
      <div className={styles.overlayEscuro} />
      <div className={styles.conteudoSobreposto}>
        {/* Mantém o conteúdo acima do overlay */}
        <RegisterContainer className={styles.conteudoSobreposto}>
          <RegisterCard className={styles.cardLogin}>
            <RegisterCardHeader
              title={`Cadastro de Usuário (${tipoConta === 'basic' ? 'Básico' : 'Premium'})`}
              logoSrc="https://i.ibb.co/HTNLMqjX/cbf2.png"
              logoAlt="Logo CBF"
              logoClassName={styles.logo}
              logoContainerClassName={styles.logoContainer}
              titleClassName={styles.titulo}
            />
            <CardContent>
              <RegisterForm onSubmit={handleSubmitRegistro} className={styles.formulario}>
                <div className={styles.campoFormulario}>
                  <Label htmlFor="nome-completo">Nome Completo</Label>
                  <Input
                    id="nome-completo"
                    name="full-name"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div className={styles.campoFormulario}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div className={styles.campoFormulario}>
                  <div className={styles.labelSenha}>
                    <Label htmlFor="senha">Senha</Label>
                  </div>
                  <EnhancedPasswordInput
                    id="senha"
                    name="password"
                    placeholder="Sua senha"
                    required
                    type={mostrarSenha ? 'text' : 'password'}
                    inputClassName={styles.inputSenha}
                    buttonClassName={styles.botaoMostrarSenha}
                    iconClassName={styles.iconeOlho}
                    onToggleVisibility={() => setMostrarSenha((prev) => !prev)}
                    mostrarSenha={mostrarSenha}
                  />
                </div>
                <input type="hidden" name="account-type" value={tipoConta} />
                {erro && (
                  <div className={styles.mensagemErro}>{erro}</div>
                )}
                <Button type="submit" className={styles.botaoSubmit}>
                  Criar Conta
                </Button>
              </RegisterForm>
              <RegisterFooter className={styles.rodape}>
                Já tem uma conta?{" "}
                <Link href="/login" className={styles.linkCadastro}>
                  Faça login
                </Link>
              </RegisterFooter>
            </CardContent>
          </RegisterCard>
          {tipoConta === 'premium' && (
            <PaymentModal
              isOpen={modalPagamentoAberto}
              onClose={() => setModalPagamentoAberto(false)}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}
        </RegisterContainer>
      </div>
    </div>
  )
}
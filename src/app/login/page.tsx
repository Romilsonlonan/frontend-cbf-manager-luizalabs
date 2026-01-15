'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLoading } from '@/context/LoadingContext';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import styles from './login.module.css';

export default function PaginaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const { startLoading, stopLoading } = useLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      const data = await login(email, senha, startLoading, stopLoading);
      if (data && data.access_token) {
        console.log('LoginPage: Login successful, updating auth context');
        authLogin(data.access_token);
        // O redirecionamento agora é feito pelo AuthGuard ou manualmente após o estado ser atualizado
        // Mas para garantir, vamos forçar o redirecionamento se o AuthGuard não o fizer
        setTimeout(() => {
          console.log('LoginPage: Forcing redirect to /home');
          router.push('/home');
        }, 500);
      } else {
        setErro('Resposta de login inválida: token não encontrado.');
      }
    } catch (error) {
      setErro('Email ou senha inválidos!');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.containerLogin}>
      <Card className={styles.cardLogin}>
        <CardHeader>
          <div className={styles.logoContainer}>
            <img
              src="https://i.ibb.co/HTNLMqjX/cbf2.png"
              alt="Logo CBF"
              className={styles.logo}
            />
          </div>
          <CardDescription className={styles.titulo}>
            Acessar o painel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className={styles.formulario}>
            <div className={styles.campoFormulario}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={carregando}
              />
            </div>
            <div className={styles.campoFormulario}>
              <div className={styles.labelSenha}>
                <Label htmlFor="senha">Senha</Label>
                <Link href="#" className={styles.linkEsqueceuSenha}>
                  Esqueceu sua senha?
                </Link>
              </div>
              <div className={styles.inputSenhaContainer}>
                <Input
                  id="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  disabled={carregando}
                  className={styles.inputSenha}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={styles.botaoMostrarSenha}
                  onClick={() => setMostrarSenha((prev) => !prev)}
                  disabled={carregando}
                >
                  {mostrarSenha ? (
                    <EyeIcon className={styles.iconeOlho} />
                  ) : (
                    <EyeOffIcon className={styles.iconeOlho} />
                  )}
                </Button>
              </div>
            </div>
            {erro && (
              <div className={styles.mensagemErro}>{erro}</div>
            )}
            <Button type="submit" className={styles.botaoSubmit} disabled={carregando}>
              {carregando ? 'Carregando...' : 'Entrar'}
            </Button>
          </form>
          <div className={styles.rodape}>
            Não tem uma conta?{" "}
            <Link href="/register" className={styles.linkCadastro}>
              Cadastre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

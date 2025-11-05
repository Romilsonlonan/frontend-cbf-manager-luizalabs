'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import styles from './AccountTypeSelection.module.css';

interface SelecaoTipoContaProps {
  onSelectAccountType: (tipo: 'basic' | 'premium') => void;
}

export function AccountTypeSelection({ onSelectAccountType }: SelecaoTipoContaProps) {
  return (
    <div className={styles.containerSelecao}>
      <div className={styles.gridPlanos}>
        {/* Card Conta Básica */}
        <Card className={styles.cardPlano}>
          <CardHeader className={styles.headerPlano}>
            <CardTitle className={styles.tituloPlano}>Básico</CardTitle>
            <CardDescription className={styles.descricaoPlano}>
              Ideal para novos usuários
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.conteudoPlano}>
            <ul className={styles.listaCaracteristicas}>
              <li className={styles.itemCaracteristica}>
                <CheckCircle2Icon className={styles.iconeCheck} />
                Acesso a funcionalidades essenciais
              </li>
              <li className={styles.itemCaracteristica}>
                <CheckCircle2Icon className={styles.iconeCheck} />
                Gerenciamento de até 5 athletes
              </li>
              <li className={styles.itemCaracteristica}>
                <XCircleIcon className={styles.iconeX} />
                Sem relatórios avançados
              </li>
              <li className={styles.itemCaracteristica}>
                <XCircleIcon className={styles.iconeX} />
                Suporte padrão
              </li>
            </ul>
            <Button onClick={() => onSelectAccountType('basic')} className={styles.botaoEscolher}>
              Escolher Plano Básico
            </Button>
          </CardContent>
        </Card>

        {/* Card Conta Premium */}
        <Card className={styles.cardPlano}>
          <CardHeader className={styles.headerPlano}>
            <CardTitle className={styles.tituloPlano}>Premium</CardTitle>
            <CardDescription className={styles.descricaoPlano}>
              Para gerenciamento completo
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.conteudoPlano}>
            <ul className={styles.listaCaracteristicas}>
              <li className={styles.itemCaracteristica}>
                <CheckCircle2Icon className={styles.iconeCheck} />
                Todas as funcionalidades
              </li>
              <li className={styles.itemCaracteristica}>
                <CheckCircle2Icon className={styles.iconeCheck} />
                Gerenciamento ilimitado de athletes
              </li>
              <li className={styles.itemCaracteristica}>
                <CheckCircle2Icon className={styles.iconeCheck} />
                Relatórios e estatísticas avançadas
              </li>
              <li className={styles.itemCaracteristica}>
                <CheckCircle2Icon className={styles.iconeCheck} />
                Suporte prioritário 24/7
              </li>
            </ul>
            <Button onClick={() => onSelectAccountType('premium')} className={styles.botaoEscolher}>
              Escolher Plano Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

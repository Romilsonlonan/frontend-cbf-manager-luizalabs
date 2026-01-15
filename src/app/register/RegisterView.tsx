'use client';

import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AccountTypeSelection,
  RegisterContainer,
  RegisterCard,
  RegisterCardHeader,
  RegisterForm,
  EnhancedPasswordInput,
  RegisterFooter
} from '@/components/register';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REGISTER_CONSTANTS, PROFESSIONS } from './constants';
import { RegisterViewProps } from './types';
import styles from '../login/login.module.css';

export const RegisterView: React.FC<RegisterViewProps> = ({
  accountType,
  showPassword,
  error,
  onSelectAccountType,
  onTogglePasswordVisibility,
  onSubmit,
}) => {
  if (!accountType) {
    return (
      <div className={styles.containerLogin}>
        <div className={styles.overlayEscuro} />
        <div className={styles.conteudoSobreposto}>
          <AccountTypeSelection onSelectAccountType={onSelectAccountType} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.containerLogin}>
      <div className={styles.overlayEscuro} />
      <div className={styles.conteudoSobreposto}>
        <RegisterContainer className={styles.conteudoSobreposto}>
          <RegisterCard className={styles.cardLogin}>
            <RegisterCardHeader
              title={accountType === 'basic' ? REGISTER_CONSTANTS.TITLE_BASIC : REGISTER_CONSTANTS.TITLE_PREMIUM}
              logoSrc={REGISTER_CONSTANTS.LOGO_SRC}
              logoAlt={REGISTER_CONSTANTS.LOGO_ALT}
              logoClassName={styles.logo}
              logoContainerClassName={styles.logoContainer}
              titleClassName={styles.titulo}
            />
            <CardContent>
              <RegisterForm onSubmit={onSubmit} className={styles.formulario}>
                <div className={styles.campoFormulario}>
                  <Label htmlFor="nome-completo">{REGISTER_CONSTANTS.LABEL_FULL_NAME}</Label>
                  <Input
                    id="nome-completo"
                    name="full-name"
                    placeholder={REGISTER_CONSTANTS.PLACEHOLDER_FULL_NAME}
                    required
                  />
                </div>
                <div className={styles.campoFormulario}>
                  <Label htmlFor="email">{REGISTER_CONSTANTS.LABEL_EMAIL}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={REGISTER_CONSTANTS.PLACEHOLDER_EMAIL}
                    required
                  />
                </div>
                <div className={styles.campoFormulario}>
                  <Label htmlFor="profession">{REGISTER_CONSTANTS.LABEL_PROFESSION}</Label>
                  <Select name="profession" required>
                    <SelectTrigger id="profession">
                      <SelectValue placeholder={REGISTER_CONSTANTS.PLACEHOLDER_PROFESSION} />
                    </SelectTrigger>
                    <SelectContent>
                      {PROFESSIONS.map((prof) => (
                        <SelectItem key={prof} value={prof}>{prof}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className={styles.campoFormulario}>
                  <div className={styles.labelSenha}>
                    <Label htmlFor="senha">{REGISTER_CONSTANTS.LABEL_PASSWORD}</Label>
                  </div>
                  <EnhancedPasswordInput
                    id="senha"
                    name="password"
                    placeholder={REGISTER_CONSTANTS.PLACEHOLDER_PASSWORD}
                    required
                    type={showPassword ? 'text' : 'password'}
                    inputClassName={styles.inputSenha}
                    buttonClassName={styles.botaoMostrarSenha}
                    iconClassName={styles.iconeOlho}
                    onToggleVisibility={onTogglePasswordVisibility}
                    mostrarSenha={showPassword}
                  />
                </div>
                <input type="hidden" name="account-type" value={accountType} />
                {error && (
                  <div className={styles.mensagemErro}>{error}</div>
                )}
                <Button type="submit" className={styles.botaoSubmit}>
                  {REGISTER_CONSTANTS.BUTTON_SUBMIT}
                </Button>
              </RegisterForm>
              <RegisterFooter className={styles.rodape}>
                {REGISTER_CONSTANTS.FOOTER_TEXT}{" "}
                <Link href="/login" className={styles.linkCadastro}>
                  {REGISTER_CONSTANTS.FOOTER_LINK_TEXT}
                </Link>
              </RegisterFooter>
            </CardContent>
          </RegisterCard>
        </RegisterContainer>
      </div>
    </div>
  );
};

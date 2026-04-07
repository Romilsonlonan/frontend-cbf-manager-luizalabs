'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Star, X, Zap, Shield, TrendingUp } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import styles from './TrialWelcomeModal.module.css';

interface TrialWelcomeModalProps {
  onUpgrade?: () => void;
}

export const TrialWelcomeModal: React.FC<TrialWelcomeModalProps> = ({ onUpgrade }) => {
  const { userPlan, trialDaysLeft, upgradeToPremium } = useSubscription();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log('TrialWelcomeModal: Checking plan...', userPlan);
    // Verifica se o usuário está no plano de teste e se já viu o aviso nesta sessão
    const hasSeenExpiryModal = sessionStorage.getItem('hasSeenExpiryModal');
    
    // Abre automaticamente se for premium_trial e não tiver visto nesta sessão
    if (userPlan === 'premium_trial' && !hasSeenExpiryModal) {
      console.log('TrialWelcomeModal: Opening modal automatically');
      setIsOpen(true);
      sessionStorage.setItem('hasSeenExpiryModal', 'true');
    }
  }, [userPlan]);

  const handleClose = () => setIsOpen(false);

  // Define o ícone e a cor baseado nos dias restantes
  const getExpiryStatus = () => {
    if (trialDaysLeft <= 1) {
      return { icon: AlertTriangle, color: 'text-white', bgColor: 'bg-red-600/40' };
    } else if (trialDaysLeft <= 3) {
      return { icon: Clock, color: 'text-white', bgColor: 'bg-orange-600/40' };
    }
    return { icon: Star, color: 'text-white', bgColor: 'bg-orange-400/40' };
  };

  const status = getExpiryStatus();
  const IconComponent = status.icon;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={styles.dialogContentExpiry} showCloseButton={false}>
        <button 
          onClick={handleClose}
          className={styles.closeButtonExpiry}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Fechar</span>
        </button>
        
        <div className={styles.containerExpiry}>
          <DialogHeader>
            <div className={styles.iconWrapperExpiry}>
              <div className={`${styles.iconContainerExpiry} ${status.bgColor} animate-bounce`}>
                <IconComponent className={`${styles.iconExpiry} ${status.color}`} />
              </div>
            </div>
            <DialogTitle className={styles.titleExpiry}>
              {trialDaysLeft <= 1 ? '⚠️ Atenção! Sua conta Premium expira hoje!' : 
               trialDaysLeft <= 3 ? '⏰ Seu acesso Premium está acabando!' : 
               '✨ Aviso de Expiração do Período Trial'}
            </DialogTitle>
            <DialogDescription className={styles.descriptionExpiry}>
              {trialDaysLeft <= 1 ? 'Não perca o acesso às ferramentas que impulsionam seu desempenho.' :
               trialDaysLeft <= 3 ? 'Garanta a continuidade do seu trabalho sem interrupções.' :
               'Seu período de teste premium está em andamento. Aproveite cada recurso!'}
            </DialogDescription>
          </DialogHeader>

          <div className={styles.contentBodyExpiry}>
            <div className={styles.expiryWarningCard}>
              <div className={styles.expiryInfo}>
                <Clock className={styles.clockIconExpiry} />
                <div>
                  <p className={styles.expiryText}>
                    {trialDaysLeft <= 1 ? 'Expira em poucas horas:' : 'Tempo restante de Premium:'}
                  </p>
                  <p className={styles.expirySubtext}>
                    {trialDaysLeft} {trialDaysLeft === 1 ? 'dia restante' : 'dias restantes'}
                  </p>
                </div>
              </div>
              <Badge className={`${styles.daysBadgeExpiry} shadow-lg`}>
                {trialDaysLeft} {trialDaysLeft === 1 ? 'DIA' : 'DIAS'}
              </Badge>
            </div>

            <div className={styles.featuresSectionExpiry}>
              <p className={styles.featuresTitleExpiry}>
                RECURSOS QUE VOCÊ PERDERÁ SE NÃO RENOVAR:
              </p>
              <div className={styles.featuresGrid}>
                <div className={styles.featureCard}>
                  <Zap className={styles.featureIcon} />
                  <span className="font-medium">Planos Nutricionais IA</span>
                </div>
                <div className={styles.featureCard}>
                  <TrendingUp className={styles.featureIcon} />
                  <span className="font-medium">Relatórios Avançados</span>
                </div>
                <div className={styles.featureCard}>
                  <Shield className={styles.featureIcon} />
                  <span className="font-medium">Gestão Ilimitada</span>
                </div>
                <div className={styles.featureCard}>
                  <Star className={styles.featureIcon} />
                  <span className="font-medium">Suporte VIP</span>
                </div>
              </div>
            </div>

            <div className={styles.urgencyMessage}>
              <AlertTriangle className="h-6 w-6 text-white" />
              <p className={styles.urgencyText}>
                {trialDaysLeft <= 1 ? 'Evite o bloqueio das suas funcionalidades agora mesmo!' :
                 'Mantenha seu nível profissional com o plano Premium.'}
              </p>
            </div>
          </div>

          <DialogFooter className={styles.footerExpiry}>
            <Button 
              variant="ghost" 
              onClick={handleClose}
              className={styles.ghostButtonExpiry}
            >
              Decidir Depois
            </Button>
            <Button 
              onClick={() => {
                if (onUpgrade) {
                  onUpgrade();
                } else {
                  upgradeToPremium();
                }
                handleClose();
              }}
              className={styles.primaryButtonExpiry}
            >
              {trialDaysLeft <= 3 ? 'RENOVAR AGORA' : 'ASSINAR PREMIUM'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
import { Clock, Star, CheckCircle2, X } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import styles from './TrialWelcomeModal.module.css';

interface TrialWelcomeModalProps {
  onUpgrade?: () => void;
}

export const TrialWelcomeModal: React.FC<TrialWelcomeModalProps> = ({ onUpgrade }) => {
  const { userPlan, trialDaysLeft, upgradeToPremium } = useSubscription();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Verifica se o usuário está no plano de teste e se já viu o aviso nesta sessão
    const hasSeenTrialModal = sessionStorage.getItem('hasSeenTrialModal');
    
    if (userPlan === 'premium_trial' && !hasSeenTrialModal) {
      setIsOpen(true);
      sessionStorage.setItem('hasSeenTrialModal', 'true');
    }
  }, [userPlan]);

  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={styles.dialogContent}>
        <button 
          onClick={handleClose}
          className={styles.closeButton}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Fechar</span>
        </button>
        
        <div className={styles.container}>
          <DialogHeader>
            <div className={styles.iconWrapper}>
              <div className={styles.iconContainer}>
                <Star className={styles.icon} />
              </div>
            </div>
            <DialogTitle className={styles.title}>
              Bem-vindo ao Premium Trial!
            </DialogTitle>
            <DialogDescription className={styles.description}>
              Você acaba de ganhar acesso total a todas as ferramentas do CBF Manager.
            </DialogDescription>
          </DialogHeader>

          <div className={styles.contentBody}>
            <div className={styles.trialInfoCard}>
              <Clock className={styles.clockIcon} />
              <div>
                <p className={styles.trialInfoText}>Seu período de teste começou</p>
                <p className={styles.trialInfoSubtext}>Você tem {trialDaysLeft} dias para explorar tudo.</p>
              </div>
              <Badge className={styles.daysBadge}>
                {trialDaysLeft} dias
              </Badge>
            </div>

            <div className={styles.featuresSection}>
              <p className={styles.featuresTitle}>O que você pode fazer agora:</p>
              <ul className={styles.featuresList}>
                <li className={styles.featureItem}>
                  <CheckCircle2 className={styles.checkIcon} />
                  Gerar planos nutricionais com IA ilimitados
                </li>
                <li className={styles.featureItem}>
                  <CheckCircle2 className={styles.checkIcon} />
                  Acessar relatórios avançados de desempenho
                </li>
                <li className={styles.featureItem}>
                  <CheckCircle2 className={styles.checkIcon} />
                  Gerenciar clubes e atletas sem limites
                </li>
              </ul>
            </div>
          </div>

          <DialogFooter className={styles.footer}>
            <Button 
              variant="ghost" 
              onClick={handleClose}
              className={styles.ghostButton}
            >
              Explorar Depois
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
              className={styles.primaryButton}
            >
              Assinar Agora
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

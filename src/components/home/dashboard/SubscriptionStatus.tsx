'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, ArrowUpCircle, X } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import styles from './SubscriptionStatus.module.css';

interface SubscriptionStatusProps {
  onUpgrade?: () => void;
}

export const SubscriptionStatus: React.FC<SubscriptionStatusProps> = ({ onUpgrade }) => {
  const { userPlan, trialDaysLeft, upgradeToPremium } = useSubscription();
  const [isDismissed, setIsDismissed] = useState(false);

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      upgradeToPremium();
    }
  };

  if (isDismissed) return null;

  if (userPlan === 'premium') {
    return (
      <Card className={styles.premiumCard}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>
            <Star className={styles.starIcon} />
            Plano Premium Ativo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={styles.textPremium}>
            Você tem acesso total a todos os recursos do CBF Manager.
          </p>
          <Badge className={styles.badgePremium}>
            Assinatura Ativa
          </Badge>
        </CardContent>
      </Card>
    );
  }

  if (userPlan === 'premium_trial') {
    return (
      <Card className={styles.trialCard}>
        <button 
          onClick={() => setIsDismissed(true)}
          className={styles.dismissButton}
        >
          <X className="h-4 w-4" />
        </button>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>
            <Clock className={styles.clockIcon} />
            Período de Teste Premium
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={styles.textTrial}>
            Você está aproveitando {trialDaysLeft} dias de acesso gratuito aos recursos Premium.
          </p>
          <div className={styles.trialFooter}>
            <Badge className={styles.badgeTrial}>
              {trialDaysLeft} dias restantes
            </Badge>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={handleUpgrade}
              className={styles.buttonTrial}
            >
              Assinar Agora
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={styles.freeCard}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitleFree}>
          <ArrowUpCircle className={styles.arrowIcon} />
          Migre para o Premium
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={styles.textFree}>
          Desbloqueie IA de Nutrição, relatórios avançados e clubes ilimitados.
        </p>
        <Button 
          variant="default" 
          size="sm" 
          onClick={handleUpgrade}
          className={styles.buttonFree}
        >
          Ver Planos
        </Button>
      </CardContent>
    </Card>
  );
};

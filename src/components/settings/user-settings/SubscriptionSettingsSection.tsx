'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, CheckCircle2, AlertTriangle, Zap, ShieldOff } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { PaymentModal } from '@/components/PaymentModal';
import styles from './UserSettingsPage.module.css';

export default function SubscriptionSettingsSection() {
  const { userPlan, trialDaysLeft } = useSubscription();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const isPremium = userPlan === 'premium';
  const isTrial = userPlan === 'premium_trial';

  return (
    <section className="mb-8">
      <Card className="border-orange-200 dark:border-orange-900/30 overflow-hidden">
        <CardHeader className="bg-orange-50/50 dark:bg-orange-950/10 border-b border-orange-100 dark:border-orange-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-xl">Assinatura e Plano</CardTitle>
            </div>
            <Badge 
              variant={isPremium ? "default" : isTrial ? "secondary" : "outline"}
              className={isPremium ? "bg-green-500 hover:bg-green-600" : isTrial ? "bg-orange-500 text-white" : ""}
            >
              {isPremium ? 'Premium Ativo' : isTrial ? 'Premium Trial' : 'Plano Gratuito'}
            </Badge>
          </div>
          <CardDescription>
            Gerencie seu plano e as funcionalidades exclusivas do CBF Manager.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Status Atual */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {isPremium ? 'Você é um membro Premium' : isTrial ? 'Você está no período de teste' : 'Você está no plano gratuito'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isPremium 
                    ? 'Aproveite acesso ilimitado a todas as ferramentas.' 
                    : isTrial 
                      ? `Seu acesso expira em ${trialDaysLeft} dias.` 
                      : 'Faça o upgrade para liberar todo o potencial do sistema.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {(isTrial || userPlan === 'free') && (
                  <Button 
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Ativar Premium
                  </Button>
                )}
                {(isPremium || isTrial) && (
                  <Button 
                    variant="outline" 
                    className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/20"
                    onClick={() => {
                      const action = isPremium ? 'cancelar sua assinatura' : 'encerrar seu período de teste';
                      if (confirm(`Tem certeza que deseja ${action}? Você voltará para o plano gratuito e perderá acesso aos recursos avançados.`)) {
                        alert('Solicitação processada. Sua conta será revertida para o plano gratuito.');
                        // Aqui entraria a chamada de API para desativar
                      }
                    }}
                  >
                    <ShieldOff className="mr-2 h-4 w-4" />
                    {isPremium ? 'Desativar Premium' : 'Encerrar Trial'}
                  </Button>
                )}
              </div>
            </div>

            {/* Benefícios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Planos Nutricionais com IA</p>
                  <p className="text-xs text-gray-500">Gere dietas personalizadas ilimitadas.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Relatórios de Desempenho</p>
                  <p className="text-xs text-gray-500">Análises profundas dos seus atletas.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Gestão de Clubes Ilimitada</p>
                  <p className="text-xs text-gray-500">Sem restrições de quantidade.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Suporte Prioritário</p>
                  <p className="text-xs text-gray-500">Atendimento VIP 24/7.</p>
                </div>
              </div>
            </div>

            {isTrial && trialDaysLeft <= 3 && (
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Seu período de teste está acabando. Ative o plano premium agora para não perder seus dados e acesso.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={() => {
          setIsPaymentModalOpen(false);
          window.location.reload();
        }}
      />
    </section>
  );
}

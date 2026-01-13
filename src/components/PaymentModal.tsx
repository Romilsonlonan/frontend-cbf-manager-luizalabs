'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from 'next/navigation';
import { createPaymentIntent, getCurrentUser } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLoading } from '@/context/LoadingContext';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void; // Add new prop for successful payment
}

export function PaymentModal({ isOpen, onClose, onPaymentSuccess }: PaymentModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'credit_card' | 'debit' | 'pix'>('credit_card');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'waiting_webhook' | 'success'>('idle');
  const { token, user, updateUser } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const router = useRouter();

  const handlePaymentSubmit = async () => {
    if (!token) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para realizar o pagamento.",
        variant: "destructive",
      });
      return;
    }

    setPaymentStatus('processing');
    try {
      // 1. Criar intenção de pagamento no servidor
      const { client_secret, payment_id } = await createPaymentIntent(token);
      console.log('Intenção de pagamento criada:', payment_id);

      // 2. Simular confirmação do pagamento (em um cenário real usaríamos stripe.confirmCardPayment)
      // Aqui simulamos que o pagamento foi confirmado no client-side
      setPaymentStatus('waiting_webhook');
      
      // 3. Simular chamada do webhook pelo gateway (apenas para demonstração)
      // Em produção, o Stripe chamaria nosso endpoint /webhooks/stripe
      await simulateWebhookCall(payment_id);

      // 4. Polling ou aguardar atualização do status do usuário
      await checkSubscriptionStatus();

    } catch (error: any) {
      console.error('Erro no pagamento:', error);
      toast({
        title: "Erro no pagamento",
        description: error.message || "Ocorreu um erro ao processar seu pagamento.",
        variant: "destructive",
      });
      setPaymentStatus('idle');
    }
  };

  const simulateWebhookCall = async (paymentId: string) => {
    // Simula o delay do webhook
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Chamada simulada ao nosso próprio endpoint de webhook (apenas para teste local)
    try {
      await fetch('http://localhost:8000/webhooks/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'stripe-signature': 'simulated_signature'
        },
        body: JSON.stringify({
          type: 'payment_intent.succeeded',
          data: {
            object: {
              id: paymentId,
              metadata: {
                user_id: user?.id
              }
            }
          }
        })
      });
    } catch (e) {
      console.warn('Falha ao simular chamada de webhook:', e);
    }
  };

  const checkSubscriptionStatus = async () => {
    let attempts = 0;
    const maxAttempts = 5;
    
    const poll = async () => {
      if (!token) return;
      
      try {
        const updatedUser = await getCurrentUser(token, () => {}, () => {});
        if (updatedUser.subscription_status === 'premium') {
          updateUser({ subscription_status: 'premium' });
          setPaymentStatus('success');
          toast({
            title: "Sucesso!",
            description: "Seu pagamento foi confirmado e sua conta agora é Premium!",
          });
          setTimeout(() => {
            onPaymentSuccess();
            onClose();
          }, 1500);
          return;
        }
      } catch (e) {
        console.error('Erro ao verificar status:', e);
      }
      
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(poll, 2000);
      } else {
        setPaymentStatus('idle');
        toast({
          title: "Aguardando confirmação",
          description: "Seu pagamento está sendo processado. O status será atualizado em breve.",
        });
        onClose();
      }
    };
    
    await poll();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center"> {/* Center the header content */}
          <DialogTitle className="text-center">Escolha sua Forma de Pagamento</DialogTitle> {/* Center the title */}
          <DialogDescription className="text-center">
            Selecione como você gostaria de pagar pela sua conta Premium.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup
            value={selectedPaymentMethod}
            onValueChange={(value: 'credit_card' | 'debit' | 'pix') => setSelectedPaymentMethod(value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="credit_card" id="r1" />
              <Label htmlFor="r1">Cartão de Crédito</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="debit" id="r2" />
              <Label htmlFor="r2">Cartão de Débito</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pix" id="r3" />
              <Label htmlFor="r3">PIX</Label>
            </div>
          </RadioGroup>

          {selectedPaymentMethod === 'credit_card' && (
            <div className="grid gap-2">
              <Label htmlFor="card-number">Número do Cartão</Label>
              <Input id="card-number" placeholder="XXXX XXXX XXXX XXXX" />
              <Label htmlFor="card-name">Nome no Cartão</Label>
              <Input id="card-name" placeholder="Nome Completo" />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="expiry-date">Validade</Label>
                  <Input id="expiry-date" placeholder="MM/AA" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="XXX" />
                </div>
              </div>
              <div className="flex justify-center mt-2 space-x-2">
                <img src="https://i.ibb.co/QjtYg4BK/elo.png" alt="Elo" className="h-8" />
                <img src="https://i.ibb.co/6JTcrZwC/master.png" alt="Mastercard" className="h-8" />
                <img src="https://i.ibb.co/gBVxB3m/visa.png" alt="Visa" className="h-8" />
              </div>
            </div>
          )}

          {selectedPaymentMethod === 'debit' && (
            <div className="grid gap-2">
              <Label htmlFor="debit-card-number">Número do Cartão de Débito</Label>
              <Input id="debit-card-number" placeholder="XXXX XXXX XXXX XXXX" />
              <Label htmlFor="debit-card-name">Nome no Cartão</Label>
              <Input id="debit-card-name" placeholder="Nome Completo" />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="debit-expiry-date">Validade</Label>
                  <Input id="debit-expiry-date" placeholder="MM/AA" />
                </div>
                <div>
                  <Label htmlFor="debit-cvv">CVV</Label>
                  <Input id="debit-cvv" placeholder="XXX" />
                </div>
              </div>
              <div className="flex justify-center mt-2 space-x-2">
                <img src="https://i.ibb.co/QjtYg4BK/elo.png" alt="Elo" className="h-8" />
                <img src="https://i.ibb.co/6JTcrZwC/master.png" alt="Mastercard" className="h-8" />
                <img src="https://i.ibb.co/gBVxB3m/visa.png" alt="Visa" className="h-8" />
              </div>
            </div>
          )}

          {selectedPaymentMethod === 'pix' && (
            <div className="grid gap-2 text-center">
              <p>Escaneie o QR Code abaixo para pagar com PIX.</p>
              <img src="https://i.ibb.co/27wdXQQs/qrcode.png" alt="QR Code PIX" className="mx-auto h-32 w-32" />
              <p className="text-sm text-gray-500">Ou copie e cole a chave PIX: <strong>cbfmanager@pix.com</strong></p>
            </div>
          )}
        </div>
        <Button 
          type="button" 
          onClick={handlePaymentSubmit} 
          disabled={paymentStatus !== 'idle'}
          className="w-full bg-black text-yellow-300 hover:bg-gray-800"
        >
          {paymentStatus === 'idle' && "Confirmar Pagamento"}
          {paymentStatus === 'processing' && (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          )}
          {paymentStatus === 'waiting_webhook' && (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Aguardando Confirmação...
            </>
          )}
          {paymentStatus === 'success' && "Pagamento Confirmado!"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

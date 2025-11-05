'use client';

import React, { useState } from 'react';
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

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void; // Add new prop for successful payment
}

export function PaymentModal({ isOpen, onClose, onPaymentSuccess }: PaymentModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'credit_card' | 'debit' | 'pix'>('credit_card');
  const router = useRouter();

  const handlePaymentSubmit = () => {
    // Here you would typically handle the payment processing
    // For this task, we'll just simulate success and call onPaymentSuccess
    onPaymentSuccess(); // Call the success callback
    onClose();
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
        <Button type="button" onClick={handlePaymentSubmit} className="w-full bg-black text-yellow-300 hover:bg-gray-800">
          Confirmar Pagamento
        </Button>
      </DialogContent>
    </Dialog>
  );
}

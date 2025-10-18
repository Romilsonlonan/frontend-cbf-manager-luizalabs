
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"

export default function RegisterPage() {

    async function registerUser() {
        'use server'
        // Futuramente, aqui irá a lógica de salvar o usuário no banco
        // Por agora, apenas redirecionamos para a página de aprovação pendente.
        redirect('/pending-approval')
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Cadastro de Usuário</CardTitle>
          <CardDescription>
            Preencha seus dados para criar uma conta. Seu acesso será liberado após aprovação do administrador.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={registerUser}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Nome Completo</Label>
                <Input id="full-name" placeholder="Seu nome" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" />
              </div>
              <Button type="submit" className="w-full">
                Criar Conta
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{" "}
            <Link href="/login" className="underline">
              Faça login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

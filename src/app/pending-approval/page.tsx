
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MailCheck } from "lucide-react"

export default function PendingApprovalPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <MailCheck className="w-16 h-16 text-primary" />
          </div>
          <CardTitle className="text-2xl">Cadastro Recebido!</CardTitle>
          <CardDescription>
            Sua solicitação de cadastro foi enviada com sucesso. Você receberá um e-mail assim que um administrador aprovar seu acesso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/login">Voltar para o Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

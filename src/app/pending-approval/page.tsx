
import Link from "next/link";
import { MailCheck } from "lucide-react";
import {
  PendingApprovalCard,
  PendingApprovalHeader,
  PendingApprovalIcon,
  PendingApprovalContent,
  PendingApprovalActions,
  PendingApprovalButton,
} from '@/components/pending-approval';

export default function PendingApprovalPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <PendingApprovalCard>
        <PendingApprovalHeader
          title="Cadastro Recebido!"
          description="Sua solicitação de cadastro foi enviada com sucesso. Você receberá um e-mail assim que um administrador aprovar seu acesso."
        />
        <PendingApprovalContent>
          <PendingApprovalIcon icon={MailCheck} />
          <PendingApprovalActions>
            <PendingApprovalButton href="/login">Voltar para o Login</PendingApprovalButton>
          </PendingApprovalActions>
        </PendingApprovalContent>
      </PendingApprovalCard>
    </div>
  );
}

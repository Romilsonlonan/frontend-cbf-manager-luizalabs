"use client"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import type { Athlete, ClubSimpleResponse as Club } from "@/lib/types"
import { NutritionalChatbot } from "./NutritionalChatbot"

type NutritionalPlanModalProps = {
  athletes: Athlete[];
  clubs: Club[];
  children: React.ReactNode;
}

export function NutritionalPlanModal({ athletes, clubs, children }: NutritionalPlanModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[94vw] lg:max-w-[1600px] h-[94vh] max-h-[94vh] p-0 border-none bg-transparent">
        <DialogTitle className="sr-only">Plano Nutricional e Chatbot</DialogTitle>
        <DialogDescription className="sr-only">
          Interface de chatbot para criação e gestão de planos nutricionais dos atletas.
        </DialogDescription>
        <NutritionalChatbot athletes={athletes} clubs={clubs} />
      </DialogContent>
    </Dialog>
  )
}

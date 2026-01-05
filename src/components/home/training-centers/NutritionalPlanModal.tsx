"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { Athlete } from "@/lib/types"
import { api } from "@/lib/api"

const formSchema = z.object({
  athleteId: z.string({ required_error: "Por favor, selecione um atleta." }),
  planDetails: z.string().min(10, { message: "Os detalhes do plano devem ter pelo menos 10 caracteres." }),
  nutritionistName: z.string().min(2, { message: "O nome do nutricionista é obrigatório." }),
  nutritionistId: z.string().min(4, { message: "O número de matrícula é obrigatório." }),
})

type NutritionalPlanModalProps = {
  athletes: Athlete[];
  children: React.ReactNode;
}

export function NutritionalPlanModal({ athletes, children }: NutritionalPlanModalProps) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      planDetails: "",
      nutritionistName: "",
      nutritionistId: "",
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para salvar o plano.",
        variant: "destructive",
      });
      return;
    }

    try {
      const selectedAthlete = athletes.find(a => a.id.toString() === values.athleteId);
      if (!selectedAthlete) return;

      const isGoalkeeper = selectedAthlete.position === 'G';
      
      await api.createNutritionalPlan({
        [isGoalkeeper ? 'goalkeeper_id' : 'field_player_id']: selectedAthlete.id,
        plan_details: values.planDetails,
        nutritionist_name: values.nutritionistName,
        nutritionist_id: values.nutritionistId,
      }, token);

      toast({
        title: "Plano Alimentar Salvo!",
        description: `O plano para ${selectedAthlete.name} foi cadastrado com sucesso no backend.`,
      });
      form.reset();
    } catch (error) {
      console.error("Erro ao salvar plano nutricional:", error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao tentar salvar o plano no servidor.",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Plano Alimentar</DialogTitle>
          <DialogDescription>
            Preencha os dados para criar um novo plano nutricional para um atleta.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="athleteId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atleta</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um atleta" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {athletes.map(athlete => (
                        <SelectItem key={athlete.id} value={athlete.id.toString()}>{athlete.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="planDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detalhes do Plano</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva as refeições, horários, suplementos, etc."
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="nutritionistName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nutricionista Responsável</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nutritionistId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nº de Matrícula</FormLabel>
                    <FormControl>
                      <Input placeholder="CRN-X 12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Finalizar Cadastro</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

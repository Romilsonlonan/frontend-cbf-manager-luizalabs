"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type { Athlete } from "@/lib/types"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"
import { api } from "@/lib/api"

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  age: z.coerce.number().int().positive({ message: "Idade deve ser um número positivo." }),
  height: z.coerce.number().positive({ message: "Altura deve ser um número positivo." }),
  weight: z.coerce.number().positive({ message: "Peso deve ser um número positivo." }),
  bodyFat: z.coerce.number().min(0).max(100, { message: "Percentual entre 0 e 100." }),
  muscle: z.coerce.number().min(0).max(100, { message: "Percentual entre 0 e 100." }),
  hdl: z.coerce.number().positive({ message: "HDL deve ser um número positivo." }),
  ldl: z.coerce.number().positive({ message: "LDL deve ser um número positivo." }),
  totalCholesterol: z.coerce.number().positive({ message: "Colesterol total deve ser um número positivo." }),
  triglycerides: z.coerce.number().positive({ message: "Triglicerídeos deve ser um número positivo." }),
})

type AthleteDataFormProps = {
  athlete: Athlete;
}

export function AthleteDataForm({ athlete }: AthleteDataFormProps) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: athlete.name,
      age: athlete.age,
      height: athlete.height || 0,
      weight: athlete.weight || 0,
      bodyFat: athlete.bodyFat || 0,
      muscle: athlete.muscle || 0,
      hdl: athlete.labData?.hdl || 0,
      ldl: athlete.labData?.ldl || 0,
      totalCholesterol: athlete.labData?.totalCholesterol || 0,
      triglycerides: athlete.labData?.triglycerides || 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para salvar alterações.",
        variant: "destructive",
      });
      return;
    }

    try {
      const isGoalkeeper = athlete.position === 'G';
      const healthData = {
        body_fat: values.bodyFat,
        muscle_mass: values.muscle,
        hdl: values.hdl,
        ldl: values.ldl,
        total_cholesterol: values.totalCholesterol,
        triglycerides: values.triglycerides,
      };

      await api.updateAthleteHealth(athlete.id, isGoalkeeper, healthData, token);

      // Também salvar no histórico de progresso
      const currentDate = new Date();
      const weekNumber = Math.ceil(currentDate.getDate() / 7);
      await api.createAthleteProgress({
        [isGoalkeeper ? 'goalkeeper_id' : 'field_player_id']: athlete.id,
        week: `Semana ${weekNumber} (${currentDate.toLocaleDateString('pt-BR')})`,
        weight: values.weight,
        body_fat: values.bodyFat,
        muscle_mass: values.muscle,
      }, token);

      toast({
        title: "Dados Atualizados!",
        description: `Os dados de ${values.name} foram salvos com sucesso no backend.`,
      });
    } catch (error) {
      console.error("Erro ao salvar dados do atleta:", error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao tentar salvar os dados no servidor.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados do Atleta</CardTitle>
        <CardDescription>Adicione ou edite as informações do atleta. Clique em Salvar para aplicar as mudanças.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-primary">Informações Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="age" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="height" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Altura (cm)</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="weight" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso (kg)</FormLabel>
                    <FormControl><Input type="number" step="0.1" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="bodyFat" render={({ field }) => (
                  <FormItem>
                    <FormLabel>% de Gordura</FormLabel>
                    <FormControl><Input type="number" step="0.1" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="muscle" render={({ field }) => (
                  <FormItem>
                    <FormLabel>% de Músculo</FormLabel>
                    <FormControl><Input type="number" step="0.1" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-primary">Dados Laboratoriais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormField control={form.control} name="hdl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colesterol HDL</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="ldl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colesterol LDL</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="totalCholesterol" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colesterol Total</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="triglycerides" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Triglicerídeos</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

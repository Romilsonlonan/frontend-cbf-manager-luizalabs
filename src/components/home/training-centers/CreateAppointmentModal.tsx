"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Clock, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import type { Athlete } from "@/lib/types"

const formSchema = z.object({
  athlete_id: z.string().min(1, "Selecione um atleta"),
  service_id: z.string().min(1, "Selecione um serviço"),
  location_id: z.string().min(1, "Selecione um local"),
  date: z.date({
    required_error: "Selecione uma data",
  }),
  time: z.string().min(1, "Selecione um horário"),
  notes: z.string().optional(),
})

interface CreateAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  athletes: Athlete[]
  appointment?: any // Optional appointment for editing
}

export function CreateAppointmentModal({ isOpen, onClose, onSuccess, athletes, appointment }: CreateAppointmentModalProps) {
  const [services, setServices] = useState<any[]>([])
  const [locations, setLocations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { token, user } = useAuth()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  })

  useEffect(() => {
    if (isOpen) {
      fetchData()
      if (appointment) {
        const startDate = new Date(appointment.start_time)
        form.reset({
          athlete_id: `${appointment.athlete_type}-${appointment.athlete_id}`,
          service_id: appointment.service_id.toString(),
          location_id: appointment.location_id.toString(),
          date: startDate,
          time: format(startDate, "HH:mm"),
          notes: appointment.notes || "",
        })
      } else {
        form.reset({
          athlete_id: "",
          service_id: "",
          location_id: "",
          date: undefined,
          time: "",
          notes: "",
        })
      }
    }
  }, [isOpen, appointment, form])

  const fetchData = async () => {
    try {
      const [servicesData, locationsData] = await Promise.all([
        api.getServices(),
        api.getLocations()
      ])
      setServices(servicesData)
      setLocations(locationsData)
    } catch (error) {
      console.error("Erro ao buscar dados para o formulário:", error)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!token || !user) return

    setIsLoading(true)
    try {
      const [pos, id] = values.athlete_id.split("-")
      const startTime = new Date(values.date)
      const [hours, minutes] = values.time.split(":")
      startTime.setHours(parseInt(hours), parseInt(minutes), 0)

      const selectedService = services.find(s => s.id.toString() === values.service_id)
      const endTime = new Date(startTime.getTime() + (selectedService?.duration || 60) * 60000)

      const appointmentData = {
        athlete_id: parseInt(id),
        athlete_type: pos,
        nutritionist_id: user.id,
        service_id: parseInt(values.service_id),
        location_id: parseInt(values.location_id),
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        notes: values.notes,
        status: appointment?.status || "pending"
      }

      if (appointment) {
        await api.updateAppointment(appointment.id, appointmentData, token)
        toast({
          title: "Sucesso",
          description: "Consulta atualizada com sucesso!",
        })
      } else {
        await api.createAppointment(appointmentData, token)
        toast({
          title: "Sucesso",
          description: "Consulta agendada com sucesso!",
        })
      }
      onSuccess()
      onClose()
      form.reset()
    } catch (error) {
      console.error("Erro ao criar consulta:", error)
      toast({
        title: "Erro",
        description: "Não foi possível agendar a consulta.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-accent">
            {appointment ? "Editar Consulta" : "Agendar Nova Consulta"}
          </DialogTitle>
          <DialogDescription>
            {appointment ? "Altere os detalhes da consulta selecionada." : "Preencha os dados abaixo para marcar uma nova consulta nutricional."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="athlete_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atleta</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o atleta" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {athletes.map((athlete) => (
                        <SelectItem key={`${athlete.position}-${athlete.id}`} value={`${athlete.position}-${athlete.id}`}>
                          {athlete.name} ({athlete.position})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="service_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serviço</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo de consulta" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Local de atendimento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location.id} value={location.id.toString()}>
                            {location.name} {location.is_online ? "(Online)" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecione a data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="time" {...field} className="pl-10" />
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Informações adicionais sobre a consulta..." 
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {appointment ? "Salvar Alterações" : "Confirmar Agendamento"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

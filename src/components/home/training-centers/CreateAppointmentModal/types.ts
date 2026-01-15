import type { Athlete, ClubSimpleResponse as Club } from "@/lib/types"
import * as z from "zod"

export const appointmentFormSchema = z.object({
  club_id: z.string().min(1, "Selecione um clube"),
  professional_id: z.string().min(1, "Selecione um profissional responsável"),
  athlete_id: z.string().min(1, "Selecione um atleta"),
  service_id: z.string().min(1, "Selecione um serviço"),
  location_id: z.string().min(1, "Selecione um local"),
  date: z.date({
    required_error: "Selecione uma data",
  }),
  time: z.string().min(1, "Selecione um horário"),
  notes: z.string().optional(),
})

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>

export interface CreateAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  athletes: Athlete[]
  clubs: Club[]
  appointment?: any
}

export interface CreateAppointmentModalViewProps {
  isOpen: boolean
  onClose: () => void
  form: any
  isLoading: boolean
  services: any[]
  locations: any[]
  professionals: any[]
  clubs: Club[]
  filteredAthletes: Athlete[]
  selectedClubId: string
  onSubmit: (values: AppointmentFormValues) => Promise<void>
  isEditing: boolean
}

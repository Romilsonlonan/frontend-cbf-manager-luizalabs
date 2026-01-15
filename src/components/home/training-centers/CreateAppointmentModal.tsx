"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { api } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { 
  CreateAppointmentModalProps, 
  AppointmentFormValues, 
  appointmentFormSchema 
} from "./CreateAppointmentModal/types"
import { CreateAppointmentModalView } from "./CreateAppointmentModal/CreateAppointmentModalView"
import { CREATE_APPOINTMENT_STRINGS as STRINGS } from "./CreateAppointmentModal/constants"

/**
 * CreateAppointmentModal (Container Component)
 * 
 * Responsibilities:
 * - Data fetching (services, locations, professionals)
 * - State management (isLoading, services, locations, professionals)
 * - Form handling (react-hook-form, zod)
 * - Event handling (onSubmit)
 * - Orchestrating the presentational component
 */
export function CreateAppointmentModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  athletes, 
  clubs, 
  appointment 
}: CreateAppointmentModalProps) {
  const [services, setServices] = useState<any[]>([])
  const [locations, setLocations] = useState<any[]>([])
  const [professionals, setProfessionals] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { token, user } = useAuth()
  const { toast } = useToast()

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      club_id: "",
      professional_id: "",
      athlete_id: "",
      service_id: "",
      location_id: "",
      notes: "",
    },
  })

  const selectedClubId = form.watch("club_id")

  const filteredAthletes = athletes.filter(
    (a) => !selectedClubId || a.club_id?.toString() === selectedClubId
  )

  useEffect(() => {
    if (isOpen) {
      fetchData()
      if (appointment) {
        const startDate = new Date(appointment.start_time)
        const athlete = athletes.find(a => a.id === appointment.athlete_id && a.position === appointment.athlete_type)
        form.reset({
          club_id: athlete?.club_id?.toString() || "",
          professional_id: appointment.nutritionist_id.toString(),
          athlete_id: `${appointment.athlete_type}-${appointment.athlete_id}`,
          service_id: appointment.service_id.toString(),
          location_id: appointment.location_id.toString(),
          date: startDate,
          time: format(startDate, "HH:mm"),
          notes: appointment.notes || "",
        })
      } else {
        form.reset({
          club_id: "",
          professional_id: user?.id.toString() || "",
          athlete_id: "",
          service_id: "",
          location_id: "",
          date: undefined,
          time: "",
          notes: "",
        })
      }
    }
  }, [isOpen, appointment, form, athletes, user])

  const fetchData = async () => {
    try {
      const [servicesData, locationsData, professionalsData] = await Promise.all([
        api.getServices(),
        api.getLocations(),
        token ? api.getUsers(token) : Promise.resolve([])
      ])
      setServices(servicesData)
      setLocations(locationsData)
      setProfessionals(professionalsData)
    } catch (error) {
      console.error(STRINGS.FETCH_ERROR, error)
    }
  }

  const onSubmit = async (values: AppointmentFormValues) => {
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
        nutritionist_id: parseInt(values.professional_id),
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
          description: STRINGS.SUCCESS_EDIT,
        })
      } else {
        await api.createAppointment(appointmentData, token)
        toast({
          title: "Sucesso",
          description: STRINGS.SUCCESS_CREATE,
        })
      }
      onSuccess()
      onClose()
      form.reset()
    } catch (error) {
      console.error("Erro ao processar consulta:", error)
      toast({
        title: "Erro",
        description: STRINGS.ERROR_SUBMIT,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CreateAppointmentModalView
      isOpen={isOpen}
      onClose={onClose}
      form={form}
      isLoading={isLoading}
      services={services}
      locations={locations}
      professionals={professionals}
      clubs={clubs}
      filteredAthletes={filteredAthletes}
      selectedClubId={selectedClubId}
      onSubmit={onSubmit}
      isEditing={!!appointment}
    />
  )
}

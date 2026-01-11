"use client"

import { useState, useEffect, useMemo } from "react"
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Video,
  MoreHorizontal,
  CheckCircle2,
  ClipboardEdit,
  AlertCircle,
  XCircle,
  Settings,
  User,
  Briefcase,
  ArrowRight,
  Loader2,
  Check,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  format, 
  addDays, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameDay, 
  addWeeks, 
  subWeeks,
  startOfMonth,
  endOfMonth,
  isToday,
  parseISO,
  startOfDay,
  endOfDay
} from "date-fns"
import { ptBR } from "date-fns/locale"
import { api } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import type { Athlete } from "@/lib/types"
import { CreateAppointmentModal } from "./CreateAppointmentModal"
import { AvailabilitySettingsModal } from "./AvailabilitySettingsModal"
import { LocationSettingsModal } from "./LocationSettingsModal"
import { ServiceSettingsModal } from "./ServiceSettingsModal"

interface AppointmentCalendarProps {
  athletes: Athlete[]
}

export function AppointmentCalendar({ athletes }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'day' | 'week' | 'month'>('week')
  const [appointments, setAppointments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const { token } = useAuth()
  const { toast } = useToast()

  const weekDays = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 })
    const end = endOfWeek(currentDate, { weekStartsOn: 0 })
    return eachDayOfInterval({ start, end })
  }, [currentDate])

  const hours = Array.from({ length: 13 }, (_, i) => i + 8) // 08:00 to 20:00

  useEffect(() => {
    if (token) {
      fetchAppointments()
    }
  }, [token, currentDate])

  const fetchAppointments = async () => {
    setIsLoading(true)
    try {
      let start, end;
      if (view === 'week') {
        start = startOfWeek(currentDate, { weekStartsOn: 0 });
        end = endOfWeek(currentDate, { weekStartsOn: 0 });
      } else if (view === 'month') {
        start = startOfMonth(currentDate);
        end = endOfMonth(currentDate);
      } else {
        start = startOfDay(currentDate);
        end = endOfDay(currentDate);
      }
      
      const data = await api.getAppointments(token!, start.toISOString(), end.toISOString())
      setAppointments(data)
    } catch (error) {
      console.error("Erro ao buscar consultas:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as consultas.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (id: number, status: string) => {
    if (!token) return
    try {
      await api.updateAppointmentStatus(id, status, token)
      toast({
        title: "Status Atualizado",
        description: `Consulta marcada como ${status === 'confirmed' ? 'confirmada' : 'cancelada'}.`,
      })
      fetchAppointments()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status.",
        variant: "destructive"
      })
    }
  }

  const handleDeleteAppointment = async (id: number) => {
    if (!token) return
    if (!window.confirm("Tem certeza que deseja excluir esta consulta?")) return

    try {
      await api.deleteAppointment(id, token)
      toast({
        title: "Sucesso",
        description: "Consulta excluída com sucesso.",
      })
      fetchAppointments()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir a consulta.",
        variant: "destructive"
      })
    }
  }

  const handleEditAppointment = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsCreateModalOpen(true)
  }

  const nextPeriod = () => {
    if (view === 'week') setCurrentDate(addWeeks(currentDate, 1))
    else if (view === 'month') setCurrentDate(addDays(startOfMonth(addDays(endOfMonth(currentDate), 1)), 0))
    else setCurrentDate(addDays(currentDate, 1))
  }

  const prevPeriod = () => {
    if (view === 'week') setCurrentDate(subWeeks(currentDate, 1))
    else if (view === 'month') setCurrentDate(addDays(startOfMonth(addDays(startOfMonth(currentDate), -1)), 0))
    else setCurrentDate(addDays(currentDate, -1))
  }

  const goToToday = () => setCurrentDate(new Date())

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/10 text-green-600 border-green-200'
      case 'pending': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200'
      case 'canceled': return 'bg-red-500/10 text-red-600 border-red-200'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const nextAppointment = useMemo(() => {
    const now = new Date()
    return appointments
      .filter(a => new Date(a.start_time) > now && a.status !== 'canceled')
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())[0]
  }, [appointments])

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[800px]">
      {/* Calendário Principal */}
      <div className="flex-1 flex flex-col bg-card rounded-xl border shadow-sm overflow-hidden">
        {/* Header do Calendário */}
        <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4 bg-muted/5">
          <div className="flex items-center gap-4">
            <Button 
              variant="default" 
              size="sm" 
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => {
                setSelectedAppointment(null)
                setIsCreateModalOpen(true)
              }}
            >
              <Plus className="h-4 w-4" />
              Criar
            </Button>
            <h2 className="text-xl font-bold text-primary">
              {format(currentDate, "MMMM 'de' yyyy", { locale: ptBR })}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md bg-background">
              <Button variant="ghost" size="icon" onClick={prevPeriod} className="h-8 w-8 rounded-none border-r">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={goToToday} className="h-8 px-3 rounded-none border-r text-xs font-medium">
                Hoje
              </Button>
              <Button variant="ghost" size="icon" onClick={nextPeriod} className="h-8 w-8 rounded-none">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center border rounded-md bg-background p-1">
              {(['day', 'week', 'month'] as const).map((v) => (
                <Button
                  key={v}
                  variant={view === v ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setView(v)}
                  className="h-7 px-3 text-xs capitalize"
                >
                  {v === 'day' ? 'Dia' : v === 'week' ? 'Semana' : 'Mês'}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Grade do Calendário (Semanal) */}
        <div className="flex-1 overflow-auto relative">
          {isLoading && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-50 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          <div className="min-w-[800px]">
            {/* Dias da Semana */}
            <div className="grid grid-cols-8 border-b sticky top-0 bg-card z-10">
              <div className="p-4 border-r text-center text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted/10">
                Horário
              </div>
              {weekDays.map((day, i) => (
                <div 
                  key={i} 
                  className={`p-4 text-center border-r last:border-r-0 ${isToday(day) ? 'bg-primary/5' : ''}`}
                >
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                    {format(day, "eee", { locale: ptBR })}
                  </p>
                  <p className={`text-lg font-bold ${isToday(day) ? 'text-primary' : 'text-primary'}`}>
                    {format(day, "dd/MM")}
                  </p>
                </div>
              ))}
            </div>

            {/* Linhas de Horário */}
            <div className="relative">
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 border-b group">
                  <div className="p-4 border-r text-center text-xs font-medium text-muted-foreground bg-muted/5">
                    {hour.toString().padStart(2, '0')}:00
                  </div>
                  {weekDays.map((day, i) => (
                    <div 
                      key={i} 
                      className={`relative h-20 border-r last:border-r-0 group-hover:bg-primary/5 transition-colors ${isToday(day) ? 'bg-primary/5' : ''}`}
                    >
                      {/* Renderizar consultas aqui */}
                      {appointments
                        .filter(a => {
                          const start = new Date(a.start_time)
                          return isSameDay(start, day) && start.getHours() === hour
                        })
                        .map((app, idx) => (
                          <DropdownMenu key={idx}>
                            <DropdownMenuTrigger asChild>
                              <div 
                                className={`absolute inset-1 rounded-md p-2 border text-[10px] leading-tight shadow-sm cursor-pointer hover:scale-[1.02] transition-transform z-20 ${getStatusColor(app.status)}`}
                              >
                                <p className="font-bold truncate">
                                  {athletes.find(ath => ath.id === app.athlete_id && ath.position === app.athlete_type)?.name || "Evento Especial"}
                                </p>
                                <p className="opacity-80">{app.service?.name}</p>
                                <div className="mt-1 flex items-center gap-1">
                                  {app.location?.is_online ? <Video className="h-2 w-2" /> : <MapPin className="h-2 w-2" />}
                                  <span className="truncate">{app.location?.name}</span>
                                </div>
                              </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuItem onClick={() => handleUpdateStatus(app.id, 'confirmed')} className="text-green-600">
                                <Check className="mr-2 h-4 w-4" /> Confirmar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(app.id, 'canceled')} className="text-red-600">
                                <X className="mr-2 h-4 w-4" /> Cancelar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditAppointment(app)}>
                                <ClipboardEdit className="mr-2 h-4 w-4" /> Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteAppointment(app.id)} className="text-destructive">
                                <XCircle className="mr-2 h-4 w-4" /> Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
              
              {/* Linha de Tempo Atual */}
              {isSameDay(currentDate, new Date()) && (
                <div 
                  className="absolute left-0 right-0 border-t-2 border-red-400 z-30 pointer-events-none flex items-center"
                  style={{ 
                    top: `${((new Date().getHours() - 8) * 80) + (new Date().getMinutes() * 80 / 60) + 80}px` 
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-red-400 -ml-1" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Painel Lateral */}
      <div className="w-full lg:w-80 flex flex-col gap-6">
        {/* Próxima Consulta */}
        <Card className="border-primary/20 shadow-md overflow-hidden">
          <CardHeader className="pb-3 bg-primary/5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-primary uppercase tracking-wider">Próxima consulta</CardTitle>
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-200 text-[10px]">Atrasada</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {nextAppointment ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden relative">
                    {(() => {
                      const athlete = athletes.find(a => a.id === nextAppointment.athlete_id && a.position === nextAppointment.athlete_type);
                      return athlete?.image_url ? (
                        <Image src={athlete.image_url} alt={athlete.name || "Atleta"} fill className="object-cover" />
                      ) : (
                        <User className="h-6 w-6 text-muted-foreground" />
                      );
                    })()}
                  </div>
                  <div>
                    <p className="font-bold text-primary">
                      {athletes.find(a => a.id === nextAppointment.athlete_id && a.position === nextAppointment.athlete_type)?.name || "Cliente Exemplo"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(nextAppointment.start_time), "d 'de' MMMM | HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                  Iniciar consulta
                </Button>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">Nenhuma consulta agendada.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Configurações de Serviço */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest px-1">Configurações</h3>
          
          <Card 
            className="cursor-pointer hover:border-primary transition-colors group overflow-hidden border-l-4 border-l-purple-400"
            onClick={() => setIsAvailabilityModalOpen(true)}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <Clock className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-primary">Horário de trabalho</p>
                <p className="text-[10px] text-muted-foreground">Defina sua disponibilidade semanal.</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary transition-colors group overflow-hidden border-l-4 border-l-blue-400"
            onClick={() => setIsLocationModalOpen(true)}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-primary">Locais de consulta</p>
                <p className="text-[10px] text-muted-foreground">Gerencie endereços e links online.</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary transition-colors group overflow-hidden border-l-4 border-l-amber-400"
            onClick={() => setIsServiceModalOpen(true)}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-primary">Seus serviços</p>
                <p className="text-[10px] text-muted-foreground">Tipos de consulta, preços e durações.</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>
        </div>
      </div>

      <CreateAppointmentModal 
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false)
          setSelectedAppointment(null)
        }}
        onSuccess={fetchAppointments}
        athletes={athletes}
        appointment={selectedAppointment}
      />

      <AvailabilitySettingsModal 
        isOpen={isAvailabilityModalOpen}
        onClose={() => setIsAvailabilityModalOpen(false)}
      />

      <LocationSettingsModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      <ServiceSettingsModal 
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
      />
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { api } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

const DAYS = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo"
]

interface AvailabilitySettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AvailabilitySettingsModal({ isOpen, onClose }: AvailabilitySettingsModalProps) {
  const [availabilities, setAvailabilities] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { token, user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen && token) {
      fetchAvailabilities()
    }
  }, [isOpen, token])

  const fetchAvailabilities = async () => {
    setIsLoading(true)
    try {
      const data = await api.getAvailabilities(token!)
      // Initialize with default values if empty
      const initial = DAYS.map((day, index) => {
        const existing = data.find((a: any) => a.day_of_week === index)
        return existing || {
          day_of_week: index,
          start_time: "08:00",
          end_time: "18:00",
          is_active: true
        }
      })
      setAvailabilities(initial)
    } catch (error) {
      console.error("Erro ao buscar disponibilidades:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = (index: number) => {
    const newAvail = [...availabilities]
    newAvail[index].is_active = !newAvail[index].is_active
    setAvailabilities(newAvail)
  }

  const handleTimeChange = (index: number, field: 'start_time' | 'end_time', value: string) => {
    const newAvail = [...availabilities]
    newAvail[index][field] = value
    setAvailabilities(newAvail)
  }

  const handleSave = async () => {
    if (!token || !user) return
    setIsSaving(true)
    try {
      await Promise.all(availabilities.map(a => 
        api.updateAvailability({ ...a, user_id: user.id }, token)
      ))
      toast({
        title: "Sucesso",
        description: "Disponibilidade atualizada com sucesso!",
      })
      onClose()
    } catch (error) {
      console.error("Erro ao salvar disponibilidades:", error)
      toast({
        title: "Erro",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-accent">Configurar Horário de Trabalho</DialogTitle>
          <DialogDescription>
            Defina os dias e horários em que você está disponível para realizar consultas.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : (
            availabilities.map((avail, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/5">
                <div className="flex items-center gap-4 w-1/3">
                  <Switch 
                    checked={avail.is_active} 
                    onCheckedChange={() => handleToggle(index)}
                  />
                  <Label className={cn("font-medium", !avail.is_active && "text-muted-foreground")}>
                    {DAYS[index]}
                  </Label>
                </div>
                
                <div className="flex items-center gap-2 flex-1 justify-end">
                  <Input 
                    type="time" 
                    value={avail.start_time} 
                    onChange={(e) => handleTimeChange(index, 'start_time', e.target.value)}
                    disabled={!avail.is_active}
                    className="w-24"
                  />
                  <span className="text-muted-foreground">até</span>
                  <Input 
                    type="time" 
                    value={avail.end_time} 
                    onChange={(e) => handleTimeChange(index, 'end_time', e.target.value)}
                    disabled={!avail.is_active}
                    className="w-24"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleSave} disabled={isSaving}>
            {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

import { cn } from "@/lib/utils"

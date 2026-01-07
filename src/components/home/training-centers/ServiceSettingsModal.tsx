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
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Briefcase, Plus, Trash2, DollarSign, Clock } from "lucide-react"

interface ServiceSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ServiceSettingsModal({ isOpen, onClose }: ServiceSettingsModalProps) {
  const [services, setServices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { token } = useAuth()
  const { toast } = useToast()

  const [newService, setNewService] = useState({
    name: "",
    duration: 60,
    price: 0,
    description: ""
  })

  useEffect(() => {
    if (isOpen && token) {
      fetchServices()
    }
  }, [isOpen, token])

  const fetchServices = async () => {
    setIsLoading(true)
    try {
      const data = await api.getServices()
      setServices(data)
    } catch (error) {
      console.error("Erro ao buscar serviços:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddService = async () => {
    if (!token || !newService.name) return
    setIsSaving(true)
    try {
      await api.createService(newService, token)
      toast({
        title: "Sucesso",
        description: "Serviço adicionado com sucesso!",
      })
      setNewService({ name: "", duration: 60, price: 0, description: "" })
      fetchServices()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o serviço.",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-accent">Seus Serviços</DialogTitle>
          <DialogDescription>
            Cadastre e gerencie os tipos de consulta, durações e preços dos serviços oferecidos.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Lista de Serviços */}
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Serviços Ativos</Label>
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-accent" />
              </div>
            ) : (
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                {services.map((svc) => (
                  <div key={svc.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/5">
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-4 w-4 text-accent" />
                      <div>
                        <p className="text-sm font-bold">{svc.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {svc.duration} min • R$ {svc.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Novo Serviço */}
          <div className="space-y-4 p-4 rounded-xl border bg-accent/5">
            <Label className="text-xs font-bold uppercase text-accent tracking-wider">Adicionar Novo Serviço</Label>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="svc-name" className="text-xs">Nome do Serviço</Label>
                <Input 
                  id="svc-name"
                  placeholder="Ex: Consulta de Retorno" 
                  value={newService.name}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="svc-dur" className="text-xs">Duração (min)</Label>
                  <div className="relative">
                    <Input 
                      id="svc-dur"
                      type="number"
                      value={newService.duration}
                      onChange={(e) => setNewService({...newService, duration: parseInt(e.target.value)})}
                      className="pl-8"
                    />
                    <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="svc-price" className="text-xs">Preço (R$)</Label>
                  <div className="relative">
                    <Input 
                      id="svc-price"
                      type="number"
                      value={newService.price}
                      onChange={(e) => setNewService({...newService, price: parseFloat(e.target.value)})}
                      className="pl-8"
                    />
                    <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="svc-desc" className="text-xs">Descrição</Label>
                <Textarea 
                  id="svc-desc"
                  placeholder="Breve descrição do serviço..." 
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  className="h-20 resize-none"
                />
              </div>

              <Button 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                onClick={handleAddService}
                disabled={isSaving || !newService.name}
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Adicionar Serviço
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

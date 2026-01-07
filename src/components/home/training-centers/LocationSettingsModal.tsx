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
import { Loader2, MapPin, Plus, Trash2, Video } from "lucide-react"

interface LocationSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LocationSettingsModal({ isOpen, onClose }: LocationSettingsModalProps) {
  const [locations, setLocations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { token } = useAuth()
  const { toast } = useToast()

  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    is_online: false
  })

  useEffect(() => {
    if (isOpen && token) {
      fetchLocations()
    }
  }, [isOpen, token])

  const fetchLocations = async () => {
    setIsLoading(true)
    try {
      const data = await api.getLocations()
      setLocations(data)
    } catch (error) {
      console.error("Erro ao buscar locais:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddLocation = async () => {
    if (!token || !newLocation.name) return
    setIsSaving(true)
    try {
      await api.createLocation(newLocation, token)
      toast({
        title: "Sucesso",
        description: "Local adicionado com sucesso!",
      })
      setNewLocation({ name: "", address: "", is_online: false })
      fetchLocations()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o local.",
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
          <DialogTitle className="text-2xl font-bold text-accent">Locais de Atendimento</DialogTitle>
          <DialogDescription>
            Gerencie os locais onde você realiza seus atendimentos, sejam eles físicos ou online.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Lista de Locais */}
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Locais Cadastrados</Label>
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-accent" />
              </div>
            ) : (
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                {locations.map((loc) => (
                  <div key={loc.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/5">
                    <div className="flex items-center gap-3">
                      {loc.is_online ? <Video className="h-4 w-4 text-blue-500" /> : <MapPin className="h-4 w-4 text-accent" />}
                      <div>
                        <p className="text-sm font-bold">{loc.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate max-w-[200px]">{loc.address}</p>
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

          {/* Novo Local */}
          <div className="space-y-4 p-4 rounded-xl border bg-accent/5">
            <Label className="text-xs font-bold uppercase text-accent tracking-wider">Adicionar Novo Local</Label>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="loc-name" className="text-xs">Nome do Local</Label>
                <Input 
                  id="loc-name"
                  placeholder="Ex: Consultório Jardins" 
                  value={newLocation.name}
                  onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="loc-addr" className="text-xs">Endereço ou Link</Label>
                <Input 
                  id="loc-addr"
                  placeholder="Ex: Av. Paulista, 1000 ou Link do Meet" 
                  value={newLocation.address}
                  onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  id="is-online"
                  checked={newLocation.is_online}
                  onCheckedChange={(checked) => setNewLocation({...newLocation, is_online: checked})}
                />
                <Label htmlFor="is-online" className="text-xs cursor-pointer">Este é um atendimento online</Label>
              </div>
              <Button 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                onClick={handleAddLocation}
                disabled={isSaving || !newLocation.name}
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Adicionar Local
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

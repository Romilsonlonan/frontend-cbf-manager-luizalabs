"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import type { Athlete, ClubSimpleResponse as Club } from "@/lib/types"
import { generateNutritionalPlanAction } from "@/app/ai-actions"
import { api } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { Loader2, Utensils, Mic, Send, Sparkles, History, Trash2, Calendar, FileDown } from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { jsPDF } from "jspdf"

// Importação dinâmica para evitar problemas de carregamento de chunks pesados no lado do servidor
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false })

interface NutritionalChatbotProps {
  athletes: Athlete[]
  clubs: Club[]
}

export function NutritionalChatbot({ athletes, clubs }: NutritionalChatbotProps) {
  const [selectedClubId, setSelectedClubId] = useState<string>("")
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>("")
  const [context, setContext] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [history, setHistory] = useState<any[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const { toast } = useToast()
  const { token } = useAuth()

  // Remove duplicatas de atletas baseando-se no ID
  const uniqueAthletes = Array.from(new Map(athletes.map(a => [a.id, a])).values());

  const filteredAthletes = uniqueAthletes.filter(
    (a) => !selectedClubId || selectedClubId === "all" || a.club_id?.toString() === selectedClubId
  )

  const fetchHistory = async () => {
    if (!selectedAthleteId || !token) return

    const [pos, id] = selectedAthleteId.split("-")
    setIsLoadingHistory(true)
    try {
      const data = await api.getNutritionalPlans(parseInt(id), pos === "G", token)
      setHistory(data)
    } catch (error) {
      console.error("Erro ao buscar histórico:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar o histórico.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingHistory(false)
    }
  }

  const handleDeletePlan = async (planId: number) => {
    if (!token) return
    if (!window.confirm("Tem certeza que deseja excluir este plano nutricional?")) return

    try {
      await api.deleteNutritionalPlan(planId, token)
      toast({
        title: "Sucesso",
        description: "Plano excluído com sucesso.",
      })
      fetchHistory()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o plano.",
        variant: "destructive",
      })
    }
  }

  const handleDownloadPlanPDF = (plan: any) => {
    const [pos, id] = selectedAthleteId.split("-")
    const athlete = athletes.find((a) => a.id.toString() === id && a.position === pos)
    const athleteName = athlete?.name || "Atleta"
    const dateStr = format(new Date(plan.date), "dd/MM/yyyy")
    
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.setTextColor(40, 40, 40);
      doc.text("PLANO NUTRICIONAL - CBF MANAGER", 105, 20, { align: "center" });
      
      doc.setFontSize(12);
      doc.text(`Atleta: ${athleteName}`, 20, 40);
      doc.text(`Data: ${dateStr}`, 20, 50);
      doc.text(`Nutricionista: ${plan.nutritionist_name}`, 20, 60);
      
      doc.setLineWidth(0.5);
      doc.line(20, 65, 190, 65);
      
      // Content
      doc.setFontSize(11);
      const splitText = doc.splitTextToSize(plan.plan_details, 170);
      doc.text(splitText, 20, 75);
      
      const fileName = `Plano_Nutricional_${athleteName.replace(/\s+/g, '_')}_${dateStr.replace(/\//g, '-')}.pdf`
      doc.save(fileName);

      toast({
        title: "Download Concluído",
        description: `O arquivo PDF foi gerado com sucesso.`,
      })
    } catch (error) {
      console.error("Erro ao gerar PDF:", error)
      toast({
        title: "Erro no Download",
        description: "Não foi possível gerar o arquivo PDF.",
        variant: "destructive"
      })
    }
  }

  const handleGenerate = async () => {
    if (!selectedAthleteId) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um atleta.",
        variant: "destructive",
      })
      return
    }

    // O ID agora vem no formato "POS-ID" (ex: G-1, A-5) para garantir unicidade
    const [pos, id] = selectedAthleteId.split("-");
    const athlete = athletes.find((a) => a.id.toString() === id && a.position === pos);
    
    if (!athlete) return

    setIsGenerating(true)
    try {
      const result = await generateNutritionalPlanAction({
        ...athlete,
        additionalContext: context,
      })

      if (result.success) {
        setGeneratedPlan(result.plan || null)
        
        // Salvar no banco de dados
        if (token) {
          await api.createNutritionalPlan({
            field_player_id: pos !== "G" ? parseInt(id) : null,
            goalkeeper_id: pos === "G" ? parseInt(id) : null,
            plan_details: result.plan,
            nutritionist_name: "IA Nutricionista",
            nutritionist_id: "AI-001",
            date: new Date().toISOString().split('T')[0]
          }, token)
        }

        toast({
          title: "Sucesso",
          description: "Plano alimentar gerado e salvo com sucesso!",
        })
      } else {
        toast({
          title: "Erro",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao gerar plano:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-card text-card-foreground rounded-xl border shadow-lg h-full overflow-hidden">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
            <Utensils className="h-6 w-6" />
            Nova Consulta Nutricional
          </h2>
          <p className="text-sm text-muted-foreground">IA Nutricionista - CBF Manager</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full gap-2"
            onClick={() => {
              if (!selectedAthleteId) {
                toast({
                  title: "Aviso",
                  description: "Selecione um atleta para ver o histórico.",
                })
                return
              }
              setIsHistoryOpen(true)
              fetchHistory()
            }}
          >
            <History className="h-4 w-4" />
            Consultas anteriores
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Modelos
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        <div className="lg:col-span-7 flex gap-6 overflow-y-auto pr-2 items-stretch">
          {/* Imagem Lateral Esquerda */}
          <div className="hidden md:block w-2/5 relative rounded-xl overflow-hidden border shadow-lg">
            <Image
              src="https://i.ibb.co/qMTcDtrH/nutricao.webp"
              alt="Nutrição Esportiva"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          <div className="flex-1 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Clube</Label>
              <Select onValueChange={setSelectedClubId} value={selectedClubId}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Selecione o clube" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os clubes</SelectItem>
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={club.id.toString()}>
                      {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Atleta</Label>
              <Select onValueChange={setSelectedAthleteId} value={selectedAthleteId}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Selecione o atleta" />
                </SelectTrigger>
                <SelectContent>
                  {filteredAthletes.map((athlete) => (
                    <SelectItem key={`${athlete.position}-${athlete.id}`} value={`${athlete.position}-${athlete.id}`}>
                      {athlete.name} ({athlete.position})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 flex-1 flex flex-col">
              <Label className="text-sm font-medium">Contexto do Paciente</Label>
              <Textarea
                placeholder="Preencha este campo com informações clínicas do paciente: medicamentos, prontuários anteriores ou exames. Isso ajuda a fornecer um documento clínico mais completo."
                className="flex-1 min-h-[200px] bg-background/50 resize-none focus:ring-primary"
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>

            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20 flex items-start gap-3 text-[10px] text-muted-foreground">
              <Mic className="h-3.5 w-3.5 text-primary mt-0.5" />
              <p>Habilite o microfone para gravar a consulta.</p>
            </div>

            <Button
              className="w-full gap-2 h-12 text-lg font-semibold shadow-md hover:shadow-lg transition-all bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleGenerate}
              disabled={isGenerating || !selectedAthleteId}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Gerar Plano com IA
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5 border rounded-xl bg-muted/20 flex flex-col overflow-hidden shadow-inner">
          <div className="p-4 border-b bg-muted/40 flex justify-between items-center">
            <h3 className="font-semibold flex items-center gap-2">
              <Send className="h-4 w-4 text-primary" />
              Plano Alimentar Gerado
            </h3>
            {generatedPlan && (
              <Button variant="ghost" size="sm" onClick={() => setGeneratedPlan(null)}>
                Limpar
              </Button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {generatedPlan ? (
              <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
                <ReactMarkdown>
                  {generatedPlan}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center p-8 space-y-4">
                <div className="p-6 bg-background rounded-full shadow-sm border">
                    <Utensils className="h-12 w-12 opacity-20 text-primary" />
                </div>
                <div>
                    <p className="font-medium text-foreground">Nenhum plano gerado ainda</p>
                    <p className="text-sm max-w-[250px] mx-auto">Selecione um atleta e clique em "Gerar Plano com IA" para iniciar a análise nutricional.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Histórico */}
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Histórico de Consultas
            </DialogTitle>
            <DialogDescription>
              Veja os planos nutricionais gerados anteriormente para este atleta.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {isLoadingHistory ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma consulta anterior encontrada para este atleta.
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((plan) => (
                  <div key={plan.id} className="border rounded-lg p-4 space-y-3 bg-muted/10">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Calendar className="h-4 w-4 text-primary" />
                        {format(new Date(plan.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-primary hover:text-primary hover:bg-primary/10"
                          onClick={() => handleDownloadPlanPDF(plan)}
                          title="Baixar PDF"
                        >
                          <FileDown className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeletePlan(plan.id)}
                          title="Excluir Plano"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Nutricionista: {plan.nutritionist_name}
                    </div>
                    <div className="bg-background p-3 rounded border text-sm max-h-[200px] overflow-y-auto">
                      <ReactMarkdown>{plan.plan_details}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

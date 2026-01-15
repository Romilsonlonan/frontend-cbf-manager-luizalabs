"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { generateNutritionalPlanAction } from "@/app/ai-actions"
import { api } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { format } from "date-fns"
import { jsPDF } from "jspdf"
import { NutritionalChatbotProps, NutritionalPlan } from "./types"
import { NutritionalChatbotView } from "./NutritionalChatbotView"
import { NUTRITIONAL_CHATBOT_CONSTANTS as CONSTANTS } from "./constants"
import { useSubscription } from "@/hooks/useSubscription"

export function NutritionalChatbot({ athletes, clubs }: NutritionalChatbotProps) {
  const [selectedClubId, setSelectedClubId] = useState<string>("")
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string>("")
  const [professionals, setProfessionals] = useState<any[]>([])
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>("")
  const [context, setContext] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [history, setHistory] = useState<NutritionalPlan[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const { toast } = useToast()
  const { token, user } = useAuth()
  const { canAccessPremiumFeature, upgradeToPremium } = useSubscription()

  useEffect(() => {
    if (token) {
      fetchProfessionals()
    }
    if (user) {
      setSelectedProfessionalId(user.id.toString())
    }
  }, [token, user])

  const fetchProfessionals = async () => {
    try {
      const data = await api.getUsers(token!)
      setProfessionals(data)
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error)
    }
  }

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
    if (!window.confirm(CONSTANTS.DELETE_PLAN_CONFIRMATION)) return

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

  const handleDownloadPlanPDF = (plan: NutritionalPlan) => {
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
      doc.text(`Profissional Responsável: ${plan.nutritionist_name}`, 20, 60);
      
      doc.setLineWidth(0.5);
      doc.line(20, 65, 190, 65);
      
      // Content
      doc.setFontSize(11);
      const splitText = doc.splitTextToSize(plan.plan_details, 170);
      doc.text(splitText, 20, 75);

      // Approval Section at the end
      const finalY = 75 + (splitText.length * 7); // Rough estimate of height
      if (finalY > 250) doc.addPage();
      
      const currentY = doc.internal.pageSize.getHeight() - 60;
      doc.setLineWidth(0.2);
      doc.line(20, currentY, 190, currentY);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("TERMO DE APROVAÇÃO TÉCNICA", 20, currentY + 10);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const approvalText = `Eu, ${plan.nutritionist_name}, declaro que revisei e aprovo integralmente este plano nutricional gerado por IA, testificando sua adequação técnica para o atleta ${athleteName}. Documento gerado via CBF-Manager em ${format(new Date(), "dd/MM/yyyy HH:mm")}.`;
      const splitApproval = doc.splitTextToSize(approvalText, 170);
      doc.text(splitApproval, 20, currentY + 20);
      
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
    if (!canAccessPremiumFeature()) {
      toast({
        title: "Recurso Premium",
        description: "A geração de planos nutricionais por IA é exclusiva para usuários Premium.",
        variant: "destructive",
        action: (
          <button 
            onClick={upgradeToPremium}
            className="bg-white text-red-600 px-3 py-1 rounded-md text-sm font-medium"
          >
            Upgrade
          </button>
        )
      })
      return
    }

    if (!selectedAthleteId) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um atleta.",
        variant: "destructive",
      })
      return
    }

    const [pos, id] = selectedAthleteId.split("-");
    const athlete = athletes.find((a) => a.id.toString() === id && a.position === pos);
    
    if (!athlete) return

    setIsGenerating(true)
    try {
      const professional = professionals.find(p => p.id.toString() === selectedProfessionalId)
      
      const result = await generateNutritionalPlanAction({
        ...athlete,
        additionalContext: context,
      }, professional)

      if (result.success) {
        setGeneratedPlan(result.plan || null)
        
        if (token) {
          await api.createNutritionalPlan({
            field_player_id: pos !== "G" ? parseInt(id) : null,
            goalkeeper_id: pos === "G" ? parseInt(id) : null,
            plan_details: result.plan,
            nutritionist_name: professional?.name || "IA Nutricionista",
            nutritionist_id: selectedProfessionalId || "AI-001",
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
    <NutritionalChatbotView
      athletes={athletes}
      clubs={clubs}
      filteredAthletes={filteredAthletes}
      professionals={professionals}
      history={history}
      selectedClubId={selectedClubId}
      selectedProfessionalId={selectedProfessionalId}
      selectedAthleteId={selectedAthleteId}
      context={context}
      isGenerating={isGenerating}
      generatedPlan={generatedPlan}
      isHistoryOpen={isHistoryOpen}
      isLoadingHistory={isLoadingHistory}
      setSelectedClubId={setSelectedClubId}
      setSelectedProfessionalId={setSelectedProfessionalId}
      setSelectedAthleteId={setSelectedAthleteId}
      setContext={setContext}
      setGeneratedPlan={setGeneratedPlan}
      setIsHistoryOpen={setIsHistoryOpen}
      handleGenerate={handleGenerate}
      handleDeletePlan={handleDeletePlan}
      handleDownloadPlanPDF={handleDownloadPlanPDF}
      fetchHistory={fetchHistory}
    />
  )
}

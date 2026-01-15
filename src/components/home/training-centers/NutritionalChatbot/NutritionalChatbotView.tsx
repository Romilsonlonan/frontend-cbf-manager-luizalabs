"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Loader2, Utensils, Mic, Send, Sparkles, History, Trash2, Calendar, FileDown, User as UserIcon, CheckCircle } from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { NutritionalChatbotViewProps } from "./types"
import { NUTRITIONAL_CHATBOT_CONSTANTS as CONSTANTS } from "./constants"

// Importação dinâmica para evitar problemas de carregamento de chunks pesados no lado do servidor
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false })

export function NutritionalChatbotView({
  athletes,
  clubs,
  filteredAthletes,
  professionals,
  history,
  selectedClubId,
  selectedProfessionalId,
  selectedAthleteId,
  context,
  isGenerating,
  generatedPlan,
  isHistoryOpen,
  isLoadingHistory,
  setSelectedClubId,
  setSelectedProfessionalId,
  setSelectedAthleteId,
  setContext,
  setGeneratedPlan,
  setIsHistoryOpen,
  handleGenerate,
  handleDeletePlan,
  handleDownloadPlanPDF,
  fetchHistory,
}: NutritionalChatbotViewProps) {
  return (
    <div className="flex flex-col gap-6 p-6 bg-card text-card-foreground rounded-xl border shadow-lg h-full overflow-hidden">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
            <Utensils className="h-6 w-6" />
            {CONSTANTS.TITLE}
          </h2>
          <p className="text-sm text-muted-foreground">{CONSTANTS.SUBTITLE}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full gap-2"
            onClick={() => {
              if (!selectedAthleteId) {
                // Toast is handled in container if needed, but here we just check
                return
              }
              setIsHistoryOpen(true)
              fetchHistory()
            }}
          >
            <History className="h-4 w-4" />
            {CONSTANTS.HISTORY_BUTTON}
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            {CONSTANTS.MODELS_BUTTON}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        <div className="lg:col-span-7 flex gap-6 overflow-y-auto pr-2 items-stretch">
          {/* Imagem Lateral Esquerda */}
          <div className="hidden md:block w-2/5 relative rounded-xl overflow-hidden border shadow-lg">
            <Image
              src={CONSTANTS.IMAGE_URL}
              alt={CONSTANTS.IMAGE_ALT}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          <div className="flex-1 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <Label className="text-sm font-medium">{CONSTANTS.CLUB_LABEL}</Label>
              <Select onValueChange={setSelectedClubId} value={selectedClubId}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder={CONSTANTS.CLUB_PLACEHOLDER} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{CONSTANTS.ALL_CLUBS}</SelectItem>
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={club.id.toString()}>
                      {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">{CONSTANTS.PROFESSIONAL_LABEL}</Label>
              <Select onValueChange={setSelectedProfessionalId} value={selectedProfessionalId}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder={CONSTANTS.PROFESSIONAL_PLACEHOLDER} />
                </SelectTrigger>
                <SelectContent>
                  {professionals.map((professional) => (
                    <SelectItem key={professional.id} value={professional.id.toString()}>
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4" />
                        <span>{professional.name}</span>
                        <span className="text-[10px] text-muted-foreground ml-auto">
                          {professional.profession}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">{CONSTANTS.ATHLETE_LABEL}</Label>
              <Select onValueChange={setSelectedAthleteId} value={selectedAthleteId}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder={CONSTANTS.ATHLETE_PLACEHOLDER} />
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
              <Label className="text-sm font-medium">{CONSTANTS.CONTEXT_LABEL}</Label>
              <Textarea
                placeholder={CONSTANTS.CONTEXT_PLACEHOLDER}
                className="flex-1 min-h-[200px] bg-background/50 resize-none focus:ring-primary"
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>

            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20 flex items-start gap-3 text-[10px] text-muted-foreground">
              <Mic className="h-3.5 w-3.5 text-primary mt-0.5" />
              <p>{CONSTANTS.MICROPHONE_HELP}</p>
            </div>

            <Button
              className="w-full gap-2 h-12 text-lg font-semibold shadow-md hover:shadow-lg transition-all bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleGenerate}
              disabled={isGenerating || !selectedAthleteId}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {CONSTANTS.GENERATING_BUTTON}
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  {CONSTANTS.GENERATE_BUTTON}
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5 border rounded-xl bg-muted/20 flex flex-col overflow-hidden shadow-inner">
          <div className="p-4 border-b bg-muted/40 flex justify-between items-center">
            <h3 className="font-semibold flex items-center gap-2">
              <Send className="h-4 w-4 text-primary" />
              {CONSTANTS.GENERATED_PLAN_TITLE}
            </h3>
            {generatedPlan && (
              <Button variant="ghost" size="sm" onClick={() => setGeneratedPlan(null)}>
                {CONSTANTS.CLEAR_BUTTON}
              </Button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {generatedPlan ? (
              <div className="space-y-6">
                <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
                  <ReactMarkdown>
                    {generatedPlan}
                  </ReactMarkdown>
                </div>
                
                <div className="pt-6 border-t border-primary/10">
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 space-y-3">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                      <CheckCircle className="h-4 w-4" />
                      {CONSTANTS.APPROVAL_TITLE}
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-tight">
                      Eu, <strong>{professionals.find(p => p.id.toString() === selectedProfessionalId)?.name || "Profissional"}</strong>, 
                      na qualidade de <strong>{professionals.find(p => p.id.toString() === selectedProfessionalId)?.profession || "Especialista"}</strong>, 
                      declaro que revisei e aprovo integralmente este plano nutricional gerado por IA, 
                      testificando sua adequação técnica para o atleta selecionado.
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-[10px] font-mono opacity-50">
                        ID: {selectedProfessionalId} | {format(new Date(), "dd/MM/yyyy HH:mm")}
                      </div>
                      <Badge className="bg-green-500 hover:bg-green-600 text-[9px] h-5">{CONSTANTS.APPROVAL_STATUS}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center p-8 space-y-4">
                <div className="p-6 bg-background rounded-full shadow-sm border">
                    <Utensils className="h-12 w-12 opacity-20 text-primary" />
                </div>
                <div>
                    <p className="font-medium text-foreground">{CONSTANTS.EMPTY_PLAN_TITLE}</p>
                    <p className="text-sm max-w-[250px] mx-auto">{CONSTANTS.EMPTY_PLAN_DESCRIPTION}</p>
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
              {CONSTANTS.HISTORY_MODAL_TITLE}
            </DialogTitle>
            <DialogDescription>
              {CONSTANTS.HISTORY_MODAL_DESCRIPTION}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {isLoadingHistory ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {CONSTANTS.NO_HISTORY_FOUND}
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

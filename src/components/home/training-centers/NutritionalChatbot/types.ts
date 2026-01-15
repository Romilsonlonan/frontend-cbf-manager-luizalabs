import type { Athlete, ClubSimpleResponse as Club } from "@/lib/types"

export interface NutritionalChatbotProps {
  athletes: Athlete[]
  clubs: Club[]
}

export interface NutritionalPlan {
  id: number
  date: string
  plan_details: string
  nutritionist_name: string
  nutritionist_id: string
  field_player_id?: number | null
  goalkeeper_id?: number | null
}

export interface NutritionalChatbotViewProps {
  // Data
  athletes: Athlete[]
  clubs: Club[]
  filteredAthletes: Athlete[]
  professionals: any[]
  history: NutritionalPlan[]
  
  // State
  selectedClubId: string
  selectedProfessionalId: string
  selectedAthleteId: string
  context: string
  isGenerating: boolean
  generatedPlan: string | null
  isHistoryOpen: boolean
  isLoadingHistory: boolean
  
  // Actions
  setSelectedClubId: (id: string) => void
  setSelectedProfessionalId: (id: string) => void
  setSelectedAthleteId: (id: string) => void
  setContext: (context: string) => void
  setGeneratedPlan: (plan: string | null) => void
  setIsHistoryOpen: (isOpen: boolean) => void
  handleGenerate: () => Promise<void>
  handleDeletePlan: (planId: number) => Promise<void>
  handleDownloadPlanPDF: (plan: NutritionalPlan) => void
  fetchHistory: () => Promise<void>
}

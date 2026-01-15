"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, RefreshCw, Users, Goal, AlertCircle, CheckCircle, Plus, FileText, Brain, Download, User as UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getClubs, getGoalkeepers, getFieldPlayers } from "@/lib/api";
import { generateNutritionalPlanAction } from "@/app/ai-actions";
import { ClubSimpleResponse, GoalkeeperResponse, FieldPlayerResponse } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

export function Athletes() {
  const [modalNutricionalAberto, setModalNutricionalAberto] = useState(false);
  const [clubes, setClubes] = useState<ClubSimpleResponse[]>([]);
  const [clubeSelecionado, setClubeSelecionado] = useState<string>("");
  const [atletas, setAtletas] = useState<(GoalkeeperResponse | FieldPlayerResponse)[]>([]);
  const [atletaSelecionado, setAtletaSelecionado] = useState<string>("");
  const [carregando, setCarregando] = useState(false);
  const [gerandoPlano, setGerandoPlano] = useState(false);
  const [planoGerado, setPlanoGerado] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const carregarDadosIniciais = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const data = await getClubs(token);
          setClubes(data);
        }
      } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error);
      }
    };
    carregarDadosIniciais();
  }, []);

  useEffect(() => {
    const carregarAtletas = async () => {
      if (!clubeSelecionado) {
        setAtletas([]);
        return;
      }

      setCarregando(true);
      try {
        const token = localStorage.getItem('access_token');
        const clubId = parseInt(clubeSelecionado);
        const [goleiros, jogadores] = await Promise.all([
          getGoalkeepers(token, clubId),
          getFieldPlayers(token, clubId)
        ]);
        setAtletas([...goleiros, ...jogadores]);
      } catch (error) {
        console.error("Erro ao carregar atletas:", error);
      } finally {
        setCarregando(false);
      }
    };
    carregarAtletas();
  }, [clubeSelecionado]);

  const handleGerarPlano = async () => {
    if (!atletaSelecionado) {
      toast({
        title: "Erro",
        description: "Selecione um atleta para gerar o plano.",
        variant: "destructive"
      });
      return;
    }

    setGerandoPlano(true);
    try {
      const atleta = atletas.find(a => a.id.toString() === atletaSelecionado);
      
      if (!atleta) return;

      // O profissional responsável é o usuário logado no sistema
      const result = await generateNutritionalPlanAction(atleta, user);
      
      if (result.success && result.plan) {
        setPlanoGerado(result.plan);
        toast({
          title: "Sucesso",
          description: "Plano alimentar gerado com sucesso pela IA.",
        });
      } else {
        throw new Error(result.error || "Erro desconhecido ao gerar plano.");
      }
    } catch (error: any) {
      console.error("Erro ao gerar plano:", error);
      toast({
        title: "Erro",
        description: error.message || "Falha ao gerar plano alimentar.",
        variant: "destructive"
      });
    } finally {
      setGerandoPlano(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Gestão de Atletas</h2>
        <div className="flex gap-2">
          <Button onClick={() => setModalNutricionalAberto(true)} className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="h-4 w-4 mr-2" /> Nova Consulta Nutricional
          </Button>
        </div>
      </div>

      <Dialog open={modalNutricionalAberto} onOpenChange={setModalNutricionalAberto}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nova Consulta Nutricional (IA)</DialogTitle>
            <DialogDescription>Preencha os dados para gerar um plano alimentar personalizado.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="clube">Clube</Label>
              <Select onValueChange={setClubeSelecionado} value={clubeSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o clube" />
                </SelectTrigger>
                <SelectContent>
                  {clubes.map((clube) => (
                    <SelectItem key={clube.id} value={clube.id.toString()}>
                      {clube.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="atleta">Atleta</Label>
              <Select onValueChange={setAtletaSelecionado} value={atletaSelecionado} disabled={!clubeSelecionado || carregando}>
                <SelectTrigger>
                  <SelectValue placeholder={carregando ? "Carregando..." : "Selecione o atleta"} />
                </SelectTrigger>
                <SelectContent>
                  {atletas.map((atleta) => (
                    <SelectItem key={atleta.id} value={atleta.id.toString()}>
                      {atleta.name} ({atleta.position})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="profissional">Profissional Responsável</Label>
              <div className="p-3 border rounded-md bg-muted/50 text-sm flex flex-col gap-1 border-green-200">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-green-600" />
                  <span className="font-bold text-primary">{user?.name || 'Usuário Logado'}</span>
                </div>
                <div className="flex items-center gap-2 ml-6">
                  <span className="text-xs text-muted-foreground bg-green-100 px-2 py-0.5 rounded-full">
                    {user?.profession || 'Nutricionista Esportivo'}
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground italic">
                * O plano será emitido e assinado pelo profissional logado no sistema.
              </p>
            </div>

            {planoGerado && (
              <div className="mt-4 p-4 bg-muted rounded-md max-h-[300px] overflow-y-auto">
                <h4 className="font-bold mb-2 flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-purple-600" />
                  Plano Alimentar Gerado:
                </h4>
                <div className="text-sm whitespace-pre-wrap">{planoGerado}</div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setModalNutricionalAberto(false);
              setPlanoGerado(null);
              setClubeSelecionado("");
              setAtletaSelecionado("");
            }}>
              Cancelar
            </Button>
            {planoGerado ? (
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" /> Baixar PDF
              </Button>
            ) : (
              <Button 
                onClick={handleGerarPlano} 
                disabled={gerandoPlano || !atletaSelecionado}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {gerandoPlano ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Gerar Plano com IA
                  </>
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Atletas Cadastrados</CardTitle>
          <CardDescription>Visualize e gerencie os atletas de todos os clubes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-10 text-muted-foreground">
            <Users className="h-10 w-10 mr-4 opacity-20" />
            <p>Selecione um clube para visualizar os atletas ou use a busca.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

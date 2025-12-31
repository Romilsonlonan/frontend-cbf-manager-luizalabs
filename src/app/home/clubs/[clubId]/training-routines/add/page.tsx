"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getClubDetails, addTrainingRoutine } from "@/lib/api";
import { ClubDetailsResponse } from "@/lib/types";
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";

export default function AddTrainingRoutinePage() {
  const router = useRouter();
  const params = useParams();
  const clubId = params.clubId as string;

  const [club, setClub] = useState<ClubDetailsResponse | null>(null);
  const [routineName, setRoutineName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast(); // Correctly use the hook

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const data = await getClubDetails(parseInt(clubId));
        setClub(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (clubId) {
      fetchClub();
    }
  }, [clubId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addTrainingRoutine(parseInt(clubId), { name: routineName, description });
      toast({
        title: "Sucesso!",
        description: "Rotina de treinamento adicionada com sucesso.",
      });
      router.push(`/home/clubs/${clubId}/training-routines`);
    } catch (e: any) {
      toast({
        title: "Erro",
        description: `Erro ao adicionar rotina de treinamento: ${e.message}`,
        variant: "destructive",
      });
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Adicionar Rotina de Treinamento</h1>
        <p className="text-muted-foreground">Carregando informações do clube...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Adicionar Rotina de Treinamento</h1>
        <p className="text-muted-foreground text-red-500">Erro ao carregar informações do clube: {error}</p>
      </div>
    );
  }

  if (!club) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Adicionar Rotina de Treinamento</h1>
        <p className="text-muted-foreground">Clube não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Adicionar Rotina de Treinamento para {club.name}</h1>
        <p className="text-muted-foreground">
          Preencha os detalhes para adicionar uma nova rotina de treinamento.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Rotina</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              {club.shield_image_url && (
                <Image
                  src={club.shield_image_url}
                  alt={`${club.name} shield`}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              )}
              <h2 className="text-xl font-semibold">{club.name}</h2>
            </div>
            <div>
              <Label htmlFor="routineName">Nome da Rotina</Label>
              <Input
                id="routineName"
                value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Adicionando...' : 'Adicionar Rotina'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

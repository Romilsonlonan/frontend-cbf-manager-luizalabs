"use client";

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getClubs } from "@/lib/api"; // Import getClubs from api.ts
import { ClubSimpleResponse } from "@/lib/types"; // Import ClubSimpleResponse type

export default function TrainingCentersPage() {
  const [trainingCenters, setTrainingCenters] = useState<ClubSimpleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainingCenters = async () => {
      try {
        const data: ClubSimpleResponse[] = await getClubs();
        console.log("Raw clubs data from API:", data); // Log raw data for debugging
        const filteredTrainingCenters = data.filter(club => club.training_center && club.training_center.trim() !== '');
        setTrainingCenters(filteredTrainingCenters);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingCenters();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Centros de Treinamento</h1>
        <p className="text-muted-foreground">Carregando centros de treinamento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Centros de Treinamento</h1>
        <p className="text-muted-foreground text-red-500">Erro ao carregar centros de treinamento: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Centros de Treinamento</h1>
        <p className="text-muted-foreground">
          Aqui você pode visualizar e gerenciar os centros de treinamento.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trainingCenters.length === 0 ? (
          <p className="text-muted-foreground">Nenhum centro de treinamento cadastrado.</p>
        ) : (
          trainingCenters.map((club) => (
            <Card key={club.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{club.name}</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{club.training_center}</div>
                <p className="text-xs text-muted-foreground">
                  Centro de Treinamento do {club.name}
                </p>
                <Button asChild size="sm" className="mt-4">
                    <Link href={`/home/clubs/${club.id}/training-routines/add`}>Adicionar Rotina</Link>
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

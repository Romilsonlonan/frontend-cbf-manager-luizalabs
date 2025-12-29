'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { api } from '@/lib/api';
import { ClubSimpleResponse } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';

interface TrainingRoutine {
  id: number;
  club_id: number;
  day_of_week: string;
  time: string;
  activity: string;
  description?: string;
}

const daysOfWeek = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo',
];

const TrainingRoutinesPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const clubId = params.clubId ? parseInt(params.clubId as string) : null;
  const [routines, setRoutines] = useState<TrainingRoutine[]>([]);
  const [clubDetails, setClubDetails] = useState<ClubSimpleResponse | null>(null);
  const [newRoutine, setNewRoutine] = useState({
    day_of_week: '',
    time: '',
    activity: '',
    description: '',
  });
  const [editingRoutine, setEditingRoutine] = useState<TrainingRoutine | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (clubId) {
      fetchRoutines();
      fetchClubDetails(clubId);
    }
    if (searchParams.get('action') === 'add-routine') {
      openCreateModal();
    }
  }, [clubId, searchParams]);

  const handleAuthError = () => {
    localStorage.removeItem('access_token');
    router.push('/login');
    toast({
      title: 'Sessão expirada',
      description: 'Por favor, faça login novamente.',
      variant: 'destructive',
    });
  };

  const fetchClubDetails = async (id: number) => {
    try {
      const club = await api.getClubById(id);
      console.log('Fetched club details:', JSON.stringify(club, null, 2));
      setClubDetails(club);
    } catch (error: any) {
      console.error('Error fetching club details:', error);
      if (error.message.includes('Credenciais inválidas') || error.message.includes('No access token found')) {
        handleAuthError();
      } else {
        toast({
          title: 'Erro',
          description: 'Falha ao carregar detalhes do clube.',
          variant: 'destructive',
        });
      }
    }
  };

  const fetchRoutines = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        handleAuthError();
        return;
      }

      const response = await fetch(`http://localhost:8000/training_routines/?club_id=${clubId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to fetch training routines. Status:', response.status, 'Error Data:', errorData);
        if (response.status === 401) {
          handleAuthError();
          return;
        }
        throw new Error(errorData.detail || `Failed to fetch training routines: ${response.status}`);
      }
      const data: TrainingRoutine[] = await response.json();
      setRoutines(data);
    } catch (error) {
      console.error('Error fetching routines:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao carregar rotinas de treinamento.',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingRoutine) {
      setEditingRoutine({ ...editingRoutine, [name]: value });
    } else {
      setNewRoutine({ ...newRoutine, [name]: value });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (editingRoutine) {
      setEditingRoutine({ ...editingRoutine, [name]: value });
    } else {
      setNewRoutine({ ...newRoutine, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!clubId) return;

    const method = editingRoutine ? 'PUT' : 'POST';
    const url = editingRoutine
      ? `http://localhost:8000/training_routines/${editingRoutine.id}`
      : 'http://localhost:8000/training_routines/';
    const payload = editingRoutine
      ? { ...editingRoutine, club_id: clubId }
      : { ...newRoutine, club_id: clubId };

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        handleAuthError();
        return;
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to save training routine. Status:', response.status, 'Error Data:', errorData);
        if (response.status === 401) {
          handleAuthError();
          return;
        }
        throw new Error(errorData.detail || 'Failed to save training routine');
      }

      toast({
        title: 'Sucesso',
        description: `Rotina de treinamento ${editingRoutine ? 'atualizada' : 'criada'} com sucesso!`,
      });
      setIsModalOpen(false);
      setEditingRoutine(null);
      setNewRoutine({ day_of_week: '', time: '', activity: '', description: '' });
      fetchRoutines();
    } catch (error: any) {
      console.error('Error saving routine:', error);
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (routineId: number) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        handleAuthError();
        return;
      }

      const response = await fetch(`http://localhost:8000/training_routines/${routineId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to delete training routine. Status:', response.status, 'Error Data:', errorData);
        if (response.status === 401) {
          handleAuthError();
          return;
        }
        throw new Error(errorData.detail || 'Failed to delete training routine');
      }

      toast({
        title: 'Sucesso',
        description: 'Rotina de treinamento excluída com sucesso!',
      });
      fetchRoutines();
    } catch (error) {
      console.error('Error deleting routine:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao excluir rotina de treinamento.',
        variant: 'destructive',
      });
    }
  };

  const openEditModal = (routine: TrainingRoutine) => {
    setEditingRoutine(routine);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingRoutine(null);
    setNewRoutine({ day_of_week: '', time: '', activity: '', description: '' });
    setIsModalOpen(true);
  };

  const sortedRoutines = [...routines].sort((a, b) => {
    const dayA = daysOfWeek.indexOf(a.day_of_week);
    const dayB = daysOfWeek.indexOf(b.day_of_week);
    if (dayA !== dayB) {
      return dayA - dayB;
    }
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold mr-4">
          Rotinas do CT {clubDetails?.training_center || 'Carregando...'}
        </h1>
        {clubDetails?.shield_image_url && (
          <Image
            src={clubDetails.shield_image_url}
            alt={`${clubDetails.name} shield`}
            width={50}
            height={50}
            className="object-contain"
          />
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button onClick={openCreateModal} className="mb-4">
            Adicionar Nova Rotina
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingRoutine ? 'Editar Rotina' : 'Adicionar Nova Rotina'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="day_of_week" className="text-right">
                Dia da Semana
              </Label>
              <Select
                name="day_of_week"
                value={editingRoutine?.day_of_week || newRoutine.day_of_week}
                onValueChange={(value) => handleSelectChange('day_of_week', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o dia" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Horário
              </Label>
              <Input
                id="time"
                name="time"
                value={editingRoutine?.time || newRoutine.time}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Ex: 09:00-11:00"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="activity" className="text-right">
                Atividade
              </Label>
              <Input
                id="activity"
                name="activity"
                value={editingRoutine?.activity || newRoutine.activity}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Ex: Treino físico"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Input
                id="description"
                name="description"
                value={editingRoutine?.description || newRoutine.description}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Ex: Campo, academia, ou recuperação ativa"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              {editingRoutine ? 'Salvar Alterações' : 'Adicionar Rotina'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ScrollArea className="h-[600px] w-full rounded-md border p-4">
        {daysOfWeek.map((day) => {
          const routinesForDay = sortedRoutines.filter((routine) => routine.day_of_week === day);
          if (routinesForDay.length === 0) return null;

          return (
            <div key={day} className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">{day}</h2>
              <Separator className="mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {routinesForDay.map((routine) => (
                  <Card key={routine.id} className="flex flex-col justify-between">
                    <CardHeader>
                      <CardTitle>{routine.activity}</CardTitle>
                      <p className="text-sm text-gray-500">{routine.time}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{routine.description}</p>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm" onClick={() => openEditModal(routine)}>
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(routine.id)}>
                          Excluir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
        {routines.length === 0 && (
          <p className="text-center text-gray-500">Nenhuma rotina de treinamento cadastrada para este clube.</p>
        )}
      </ScrollArea>
    </div>
  );
};

export default TrainingRoutinesPage;

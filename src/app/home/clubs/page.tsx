'use client'

import { useState, useEffect, useCallback } from 'react'
import { scrapeClubPlayers, getClubs } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/context/AuthContext'
import { useLoading } from '@/context/LoadingContext'
import { useRouter } from 'next/navigation'
import { CLUBS_CONSTANTS } from './constants'
import { Club } from './types'
import { ClubsView } from './ClubsView'

/**
 * ClubsPage (Container Component)
 * 
 * Responsibilities:
 * - Data fetching (getClubs)
 * - State management (clubs, loading, modals)
 * - Event handling (handleDeleteClub, handleScrapePlayers)
 * - Orchestrating presentation components
 */
export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(true)
  const { startLoading, stopLoading } = useLoading()
  const [clubModalOpen, setClubModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [clubToEdit, setClubToEdit] = useState<Club | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()
  const { token, logout } = useAuth()
  const router = useRouter()

  const fetchClubs = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true)
      startLoading()
      const data = await getClubs(token)
      setClubs(data)
    } catch (error) {
      console.error('Erro ao buscar clubes:', error)
      toast({
        title: CLUBS_CONSTANTS.TOAST_ERROR_TITLE,
        description: CLUBS_CONSTANTS.TOAST_FETCH_ERROR_DESCRIPTION,
        variant: "destructive",
      });
    } finally {
      setLoading(false)
      stopLoading()
    }
  }, [token, startLoading, stopLoading, toast]);

  const handleDeleteClub = async (clubId: number, clubName: string) => {
    if (!token) {
      toast({
        title: CLUBS_CONSTANTS.TOAST_AUTH_ERROR_TITLE,
        description: CLUBS_CONSTANTS.TOAST_AUTH_ERROR_DESCRIPTION,
        variant: "destructive",
      });
      return;
    }

    if (!window.confirm(CLUBS_CONSTANTS.DELETE_CONFIRMATION(clubName))) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:8000/clubs/${clubId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          router.push('/login');
        }
        throw new Error('Erro ao excluir clube');
      }

      toast({
        title: CLUBS_CONSTANTS.TOAST_DELETE_SUCCESS_TITLE,
        description: CLUBS_CONSTANTS.TOAST_DELETE_SUCCESS_DESCRIPTION(clubName),
        variant: "success",
      });
      fetchClubs();
    } catch (error: any) {
      console.error(`Erro ao excluir clube ${clubName}:`, error);
      toast({
        title: CLUBS_CONSTANTS.TOAST_DELETE_ERROR_TITLE,
        description: CLUBS_CONSTANTS.TOAST_DELETE_ERROR_DESCRIPTION(clubName, error.message),
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleScrapePlayers = async (clubId: number, clubName: string) => {
    if (!token) {
      toast({
        title: CLUBS_CONSTANTS.TOAST_AUTH_ERROR_TITLE,
        description: CLUBS_CONSTANTS.TOAST_AUTH_ERROR_DESCRIPTION,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: CLUBS_CONSTANTS.TOAST_SCRAPE_START_TITLE,
      description: CLUBS_CONSTANTS.TOAST_SCRAPE_START_DESCRIPTION(clubName),
    });

    const handleAuthError = () => {
      toast({
        title: CLUBS_CONSTANTS.TOAST_SESSION_EXPIRED_TITLE,
        description: CLUBS_CONSTANTS.TOAST_SESSION_EXPIRED_DESCRIPTION,
        variant: "destructive",
      });
      logout();
      router.push('/login');
    };

    try {
      const result: any = await scrapeClubPlayers(clubId, token, handleAuthError);
      
      let description = CLUBS_CONSTANTS.TOAST_SCRAPE_SUCCESS_DESCRIPTION(clubName, result.total_count);
      if (result.new_count === 0 && result.updated_count > 0) {
        description = CLUBS_CONSTANTS.TOAST_SCRAPE_ALREADY_DONE_DESCRIPTION(clubName, result.total_count);
      }

      toast({
        title: CLUBS_CONSTANTS.TOAST_SCRAPE_SUCCESS_TITLE,
        description: description,
        variant: "success",
        duration: 5000,
      });
      fetchClubs();
    } catch (error: any) {
      console.error(`Erro ao raspar jogadores para ${clubName}:`, error);
      toast({
        title: CLUBS_CONSTANTS.TOAST_SCRAPE_ERROR_TITLE,
        description: CLUBS_CONSTANTS.TOAST_SCRAPE_ERROR_DESCRIPTION(clubName, error.message),
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchClubs()
  }, [fetchClubs])

  return (
    <ClubsView
      clubs={clubs}
      loading={loading}
      isDeleting={isDeleting}
      clubModalOpen={clubModalOpen}
      editModalOpen={editModalOpen}
      clubToEdit={clubToEdit}
      onSetClubModalOpen={setClubModalOpen}
      onSetEditModalOpen={setEditModalOpen}
      onSetClubToEdit={setClubToEdit}
      onDeleteClub={handleDeleteClub}
      onScrapePlayers={handleScrapePlayers}
      onFetchClubs={fetchClubs}
    />
  )
}

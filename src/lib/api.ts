// /home/romilson/Projetos/luizalabs/frontend/cbf_manager/src/lib/api.ts
import { ClubSimpleResponse, GoalkeeperResponse, FieldPlayerResponse } from './types'; // Import types

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const login = async (email: string, password: string, startLoading: () => void, stopLoading: () => void) => {
  startLoading();
  try {
    const response = await fetch(`${API_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    });

    if (!response.ok) {
      console.error('API Response not OK:', response);
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Network or JSON parsing error:', error);
    throw new Error('Network error or invalid response from server');
  } finally {
    stopLoading();
  }
};

export const getCurrentUser = async (token: string, startLoading: () => void, stopLoading: () => void, onAuthError?: () => void) => {
  startLoading();
  try {
    const response = await fetch(`${API_URL}/users/me/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        onAuthError?.();
        throw new Error('Token inválido ou expirado');
      }
      const errorData = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
      console.error('API Response not OK for getCurrentUser:', response.status, errorData);
      throw new Error(errorData.detail || 'Falha ao buscar usuário');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Token inválido')) {
      console.warn('Token inválido detectado, necessário fazer login novamente');
    } else {
      console.error('Network or JSON parsing error for getCurrentUser:', error);
    }
    throw error;
  } finally {
    stopLoading();
  }
};

export const updateUserProfile = async (token: string, userId: number, userData: { name?: string; email?: string }, startLoading: () => void, stopLoading: () => void, onAuthError?: () => void) => {
  startLoading();
  try {
    const response = await fetch(`${API_URL}/users/me/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      if (response.status === 401) {
        onAuthError?.();
        throw new Error('Token inválido ou expirado');
      }
      const errorBody = await response.json();
      console.error('API Response not OK for updateUserProfile:', response, errorBody);
      throw new Error(errorBody.detail || 'Falha ao atualizar perfil');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Network or JSON parsing error for updateUserProfile:', error);
    throw new Error('Erro de rede ou resposta inválida do servidor ao atualizar perfil');
  } finally {
    stopLoading();
  }
};

export const changePassword = async (token: string, currentPassword: string, newPassword: string, startLoading: () => void, stopLoading: () => void, onAuthError?: () => void) => {
  startLoading();
  try {
    const response = await fetch(`${API_URL}/users/me/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        onAuthError?.();
        throw new Error('Token inválido ou expirado');
      }
      const errorBody = await response.json();
      console.error('API Response not OK for changePassword:', response, errorBody);
      throw new Error(errorBody.detail || 'Falha ao alterar senha');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Network or JSON parsing error for changePassword:', error);
    throw new Error('Erro de rede ou resposta inválida do servidor ao alterar senha');
  } finally {
    stopLoading();
  }
};

export const deleteAccount = async (token: string, startLoading: () => void, stopLoading: () => void, onAuthError?: () => void) => {
  startLoading();
  try {
    const response = await fetch(`${API_URL}/users/me/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        onAuthError?.();
        throw new Error('Token inválido ou expirado');
      }
      const errorBody = await response.json();
      console.error('API Response not OK for deleteAccount:', response, errorBody);
      throw new Error(errorBody.detail || 'Falha ao excluir conta');
    }
    return true;
  } catch (error) {
    console.error('Network or JSON parsing error for deleteAccount:', error);
    throw new Error('Erro de rede ou resposta inválida do servidor ao excluir conta');
  } finally {
    stopLoading();
  }
};

export const uploadProfileImage = async (token: string, formData: FormData, startLoading: () => void, stopLoading: () => void, onAuthError?: () => void) => {
  startLoading();
  try {
    const response = await fetch(`${API_URL}/users/me/photo`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) {
        onAuthError?.();
        throw new Error('Token inválido ou expirado');
      }
      let errorDetail = 'Falha ao fazer upload da foto de perfil';
      let errorBody: any = { detail: 'Erro desconhecido' };

      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          errorBody = await response.json();
          errorDetail = errorBody.detail || JSON.stringify(errorBody);
        } else {
          errorDetail = await response.text();
          if (!errorDetail) {
            errorDetail = `Erro ${response.status}: ${response.statusText}`;
          }
        }
      } catch (jsonError) {
        console.warn('Failed to parse error response as JSON or text:', jsonError);
        errorDetail = `Erro ${response.status}: ${response.statusText}`;
      }

      console.error('API Response not OK for uploadProfileImage:', response.status, errorDetail);
      throw new Error(errorDetail);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Network or JSON parsing error for uploadProfileImage:', error);
    throw new Error('Erro de rede ou resposta inválida do servidor ao fazer upload da foto de perfil');
  } finally {
    stopLoading();
  }
};

export const createClub = async (formData: FormData) => {
  const response = await fetch(`${API_URL}/clubs/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Erro ao criar clube');
  }

  return response.json();
};

export const getClubs = async (token: string, onAuthError?: () => void): Promise<ClubSimpleResponse[]> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/clubs/`, { headers });
  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado. Por favor, faça login novamente.');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getClubs:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Erro ao buscar clubes');
  }
  return response.json();
};

export const getGoalkeepers = async (token: string | null = null, clubId: number | null = null, nameFilter: string = '', onAuthError?: () => void): Promise<GoalkeeperResponse[]> => {
  let url = new URL(`${API_URL}/goalkeepers/`);
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (clubId) {
    url.searchParams.append('club_id', clubId.toString());
  }

  if (nameFilter) {
    url.searchParams.append('name', nameFilter);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado. Por favor, faça login novamente.');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getGoalkeepers:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Erro ao buscar goleiros');
  }
  return response.json();
};

export const getFieldPlayers = async (token: string | null = null, clubId: number | null = null, nameFilter: string = '', positionFilter: string = '', onAuthError?: () => void): Promise<FieldPlayerResponse[]> => {
  let url = new URL(`${API_URL}/field_players/`);
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (clubId) {
    url.searchParams.append('club_id', clubId.toString());
  }

  if (nameFilter) {
    url.searchParams.append('name', nameFilter);
  }

  if (positionFilter) {
    url.searchParams.append('position', positionFilter);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado. Por favor, faça login novamente.');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getFieldPlayers:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Erro ao buscar jogadores de campo');
  }
  return response.json();
};

export const createGoalkeeper = async (goalkeeperData: any, token: string, clubId: number, onAuthError?: () => void) => {
  const response = await fetch(`${API_URL}/goalkeepers/?club_id=${clubId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(goalkeeperData),
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for createGoalkeeper:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao criar goleiro');
  }

  return response.json();
};

export const createFieldPlayer = async (fieldPlayerData: any, token: string, clubId: number, onAuthError?: () => void) => {
  const response = await fetch(`${API_URL}/field_players/?club_id=${clubId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(fieldPlayerData),
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for createFieldPlayer:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao criar jogador de campo');
  }

  return response.json();
};

export const scrapeAthletes = async (clubId: string, url: string, token: string, onAuthError?: () => void) => {
  const response = await fetch(`${API_URL}/scrape-athletes/${clubId}?url=${encodeURIComponent(url)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for scrapeAthletes:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao realizar scraping de athletes');
  }

  return response.json();
};

export const scrapeClubPlayers = async (clubId: number, token: string, onAuthError?: () => void) => {
  const response = await fetch(`${API_URL}/clubs/${clubId}/scrape_players`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for scrapeClubPlayers:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao realizar scraping de jogadores do clube');
  }

  return response.json();
};

export const getClubDetails = async (clubId: number): Promise<ClubSimpleResponse> => {
  const token = localStorage.getItem('access_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/clubs/${clubId}`, { headers });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('API Response not OK for getClubDetails:', response.status, 'Error Data:', errorData);
    throw new Error(errorData.detail || `Erro ao buscar clube com ID ${clubId}: ${response.status}`);
  }
  return response.json();
};

export const addTrainingRoutine = async (clubId: number, routineData: { name: string; description: string }) => {
  const token = localStorage.getItem('access_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/clubs/${clubId}/training_routines`, {
    method: 'POST',
    headers,
    body: JSON.stringify(routineData),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for addTrainingRoutine:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao adicionar rotina de treinamento');
  }

  return response.json();
};

export const deleteClub = async (clubId: number, token: string, onAuthError?: () => void) => {
  const response = await fetch(`${API_URL}/clubs/${clubId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for deleteClub:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao excluir clube');
  }
  return true;
};

export const getTopGoalScorers = async (token: string, position?: string, clubId?: number, onAuthError?: () => void): Promise<FieldPlayerResponse[]> => {
  let url = new URL(`${API_URL}/statistics/top_goal_scorers/`);
  if (position) {
    url.searchParams.append('position', position);
  }
  if (clubId) {
    url.searchParams.append('club_id', clubId.toString());
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getTopGoalScorers:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao buscar artilheiros');
  }
  return response.json();
};

export const getTopPlayersByStatistic = async (token: string, statistic: string, clubId?: number, onAuthError?: () => void): Promise<(FieldPlayerResponse | GoalkeeperResponse)[]> => {
  let url = new URL(`${API_URL}/statistics/top_players_by_statistic/`);
  if (statistic) {
    url.searchParams.append('statistic', statistic);
  }
  if (clubId) {
    url.searchParams.append('club_id', clubId.toString());
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getTopPlayersByStatistic:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao buscar estatísticas de jogadores');
  }
  return response.json();
};

export const getTopPlayersByAge = async (token: string, ageFilter: 'oldest' | 'youngest', clubId?: number, onAuthError?: () => void): Promise<(FieldPlayerResponse | GoalkeeperResponse)[]> => {
  let url = new URL(`${API_URL}/statistics/top_players_by_age/`);
  if (ageFilter) {
    url.searchParams.append('age_filter', ageFilter);
  }
  if (clubId) {
    url.searchParams.append('club_id', clubId.toString());
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getTopPlayersByAge:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao buscar jogadores por idade');
  }
  return response.json();
};

export const getTotalAthletesCount = async (token: string, onAuthError?: () => void): Promise<number> => {
  const url = new URL(`${API_URL}/statistics/total_athletes_count/`);
  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getTotalAthletesCount:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao buscar total de atletas');
  }
  const data = await response.json();
  return data.total_count;
};

export const getTotalClubsCount = async (token: string, onAuthError?: () => void): Promise<number> => {
  const url = new URL(`${API_URL}/statistics/total_clubs_count/`);
  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getTotalClubsCount:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao buscar total de clubes');
  }
  const data = await response.json();
  return data.total_count;
};

export const scrapeBrasileiraoLeaderboard = async (token: string, onAuthError?: () => void): Promise<any[]> => {
  const url = new URL(`${API_URL}/api/scraper/brasileirao-leaderboard`);
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for scrapeBrasileiraoLeaderboard:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao raspar dados do Brasileirão Leaderboard');
  }
  const data = await response.json();
  return data.data;
};

export const api = {
  login,
  getCurrentUser,
  updateUserProfile,
  changePassword,
  deleteAccount,
  uploadProfileImage,
  createClub,
  getClubs,
  getClubDetails,
  getGoalkeepers,
  getFieldPlayers,
  createGoalkeeper,
  createFieldPlayer,
  addTrainingRoutine,
  deleteClub,
  getTopGoalScorers,
  getTopPlayersByStatistic,
  getTopPlayersByAge,
  getTotalAthletesCount,
  getTotalClubsCount,
  scrapeBrasileiraoLeaderboard,
};

export const clubsApi = {
  scrapeAthletes,
  scrapeClubPlayers,
};

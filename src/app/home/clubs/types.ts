import { ClubSimpleResponse } from '@/lib/types';

export type Club = ClubSimpleResponse;

export interface ClubsViewProps {
  clubs: Club[];
  loading: boolean;
  isDeleting: boolean;
  clubModalOpen: boolean;
  editModalOpen: boolean;
  clubToEdit: Club | null;
  onSetClubModalOpen: (open: boolean) => void;
  onSetEditModalOpen: (open: boolean) => void;
  onSetClubToEdit: (club: Club | null) => void;
  onDeleteClub: (clubId: number, clubName: string) => Promise<void>;
  onScrapePlayers: (clubId: number, clubName: string) => Promise<void>;
  onFetchClubs: () => Promise<void>;
}

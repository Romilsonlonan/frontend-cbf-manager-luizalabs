import { ClubDetailsResponse } from "@/lib/types";

export interface AddTrainingRoutineViewProps {
  club: ClubDetailsResponse | null;
  routineName: string;
  description: string;
  loading: boolean;
  submitting: boolean;
  error: string | null;
  onRoutineNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

import { Position } from '@/lib/types';
import { Shield, PersonStanding, Forward, Target } from 'lucide-react';

export type View = 'main' | 'management' | 'detail' | 'appointments';

export const positionMap: Record<Position, string> = {
  'A': 'Atacante',
  'D': 'Defensor',
  'M': 'Meio-campo',
  'G': 'Goleiro',
};

export const positions: { name: Position, label: string, icon: React.FC<any> }[] = [
  { name: 'A', label: 'Atacante', icon: Forward },
  { name: 'D', label: 'Defensor', icon: Shield },
  { name: 'M', label: 'Meio-campo', icon: PersonStanding },
  { name: 'G', label: 'Goleiro', icon: Target },
];

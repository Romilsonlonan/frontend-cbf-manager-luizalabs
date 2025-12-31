'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClubSimpleResponse } from '@/lib/types';

interface ClubFilterProps {
  clubs: ClubSimpleResponse[];
  selectedClubId: string | null;
}

export function ClubFilter({ clubs, selectedClubId }: ClubFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleClubChange = (value: string) => {
    const newQueryString = createQueryString('clubId', value);
    router.push(`${pathname}?${newQueryString}`);
  };

  return (
    <Select onValueChange={handleClubChange} value={selectedClubId || 'all'}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filtrar por Clube" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos os Clubes</SelectItem>
        {clubs.map((club) => (
          <SelectItem key={club.id} value={club.id.toString()}>
            {club.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

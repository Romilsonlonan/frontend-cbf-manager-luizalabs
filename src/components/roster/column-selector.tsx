'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import type { PlayerStatsColumn } from '@/lib/definitions';

interface ColumnSelectorProps {
  allColumns: PlayerStatsColumn[];
  selectedColumns: string[];
  label?: string;
}

export function ColumnSelector({ allColumns, selectedColumns, label = 'Colunas' }: ColumnSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleColumnToggle = (key: string, isChecked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelectedColumns = selectedColumns ? [...selectedColumns] : [];

    if (isChecked) {
      newSelectedColumns = [...newSelectedColumns, key];
    } else {
      newSelectedColumns = newSelectedColumns.filter((col) => col !== key);
    }

    if (newSelectedColumns.length > 0) {
      params.set('columns', newSelectedColumns.join(','));
    } else {
      params.delete('columns');
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Selecionar Colunas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {allColumns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.key}
            checked={selectedColumns.includes(column.key)}
            onCheckedChange={(isChecked) => handleColumnToggle(column.key, isChecked)}
          >
            {column.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Category } from '@/lib/definitions';

interface CategoryFilterProps {
  categories: Category[];
  currentCategory: string;
}

export function CategoryFilter({ categories, currentCategory }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'Todos') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    params.delete('columns'); // Reset columns when category changes
    router.replace(`?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleCategoryChange} value={currentCategory}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Filtrar por Categoria" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

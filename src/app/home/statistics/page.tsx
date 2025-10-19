
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Statistics from '@/components/home/statistics/statistics';

export default function StatisticsPage() {
  return (
    <div className="grid gap-8 h-full flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas de Desempenho</CardTitle>
          <CardDescription>
            Análise comparativa dos atletas da temporada 2025.
          </CardDescription>
        </CardHeader>
      </Card>
      <Statistics />
    </div>
  );
}

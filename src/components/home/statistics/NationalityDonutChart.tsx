'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Globe } from 'lucide-react';
import { useNationalityData } from '@/hooks/useNationalityData';

interface NationalityDonutChartProps {
  selectedClub: string;
}

const COLORS = ['#0088FE', '#FFBB28'];

export function NationalityDonutChart({ selectedClub }: NationalityDonutChartProps) {
  const { data, loading, error } = useNationalityData(selectedClub);

  if (loading) {
    return (
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Globe className="h-6 w-6" />
            Distribuição por Nacionalidade
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p>Carregando...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Globe className="h-6 w-6" />
            Distribuição por Nacionalidade
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const hasData = data.length > 0 && (data[0].value > 0 || data[1].value > 0);

  return (
    <Card className="shadow-lg border-none">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Globe className="h-6 w-6" />
          Brasileiros vs Estrangeiros
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="h-[400px] flex items-center justify-center">
            <p>Nenhum dado de nacionalidade disponível.</p>
          </div>
        ) : (
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={130}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

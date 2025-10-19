
'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

// Mock data (o mesmo usado em outras páginas para consistência)
const athletes = [
  {
    id: '1',
    name: 'C. Alberto',
    position: 'Atacante',
    club: 'SC Corinthians',
    age: 28,
    goals: 15,
    salary: 150000,
  },
  {
    id: '2',
    name: 'B. Santos',
    position: 'Meio-campo',
    club: 'SE Palmeiras',
    age: 25,
    goals: 7,
    salary: 120000,
  },
  {
    id: '3',
    name: 'R. Lima',
    position: 'Zagueiro',
    club: 'São Paulo FC',
    age: 30,
    goals: 2,
    salary: 100000,
  },
  {
    id: '4',
    name: 'J. Pereira',
    position: 'Goleiro',
    club: 'SC Corinthians',
    age: 32,
    goals: 0,
    salary: 90000,
  },
  {
    id: '5',
    name: 'L. Costa',
    position: 'Atacante',
    club: 'São Paulo FC',
    age: 22,
    goals: 18,
    salary: 180000,
  },
  {
    id: '6',
    name: 'F. Alves',
    position: 'Lateral-Esquerdo',
    club: 'SE Palmeiras',
    age: 24,
    goals: 1,
    salary: 95000,
  },
  {
    id: '7',
    name: 'L. Martins',
    position: 'Meio-campo',
    club: 'SC Corinthians',
    age: 26,
    goals: 9,
    salary: 130000,
  },
].sort((a, b) => b.goals - a.goals); // Ordenar por gols para o gráfico

const salaryData = [...athletes].sort((a, b) => b.salary - a.salary);
const ageData = [...athletes].sort((a, b) => b.age - a.age);

const chartConfigGoals = {
  goals: {
    label: 'Gols',
    color: 'hsl(var(--chart-1))',
  },
};

const chartConfigSalary = {
  salary: {
    label: 'Salário (R$)',
    color: 'hsl(var(--chart-2))',
  },
};

const chartConfigAge = {
  age: {
    label: 'Idade',
    color: 'hsl(var(--chart-3))',
  },
};

export default function Statistics() {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Gols por Atleta</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigGoals} className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={athletes} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <ChartTooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={<ChartTooltipContent />}
                />
                <Legend />
                <Bar
                  dataKey="goals"
                  name="Gols"
                  fill="hsl(var(--chart-1))"
                  radius={4}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Salários por Atleta</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfigSalary}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer>
              <BarChart data={salaryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  tickFormatter={(value) => `R$${Number(value) / 1000}k`}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <ChartTooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={
                    <ChartTooltipContent
                      formatter={(value) =>
                        value.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })
                      }
                    />
                  }
                />
                <Legend />
                <Bar
                  dataKey="salary"
                  name="Salário"
                  fill="hsl(var(--chart-2))"
                  radius={4}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Distribuição de Idade</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigAge} className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={ageData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis />
                <ChartTooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={<ChartTooltipContent />}
                />
                <Legend />
                <Bar
                  dataKey="age"
                  name="Idade"
                  fill="hsl(var(--chart-3))"
                  radius={4}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

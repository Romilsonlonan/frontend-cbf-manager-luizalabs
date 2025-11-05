
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
import styles from './salary-chart.module.css';

const chartConfigSalary = {
  salary: {
    label: 'Salário (R$)',
    color: 'hsl(var(--chart-2))',
  },
};

type Athlete = {
  name: string;
  salary: number;
};

type SalaryChartProps = {
  data: Athlete[];
};

export default function SalaryChart({ data }: SalaryChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Salários por Atleta</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfigSalary}
          className={styles.chartContainer}
        >
          <BarChart width={996} height={300} data={data} layout="vertical">
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
                    Number(value).toLocaleString('pt-BR', {
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
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

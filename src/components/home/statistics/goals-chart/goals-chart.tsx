
'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  YAxis,
  XAxis,
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
import styles from './goals-chart.module.css';

const chartConfigGoals = {
  goals: {
    label: 'Gols',
    color: 'hsl(var(--chart-1))',
  },
};

type Athlete = {
  name: string;
  goals: number;
};

type GoalsChartProps = {
  data: Athlete[];
};

export default function GoalsChart({ data }: GoalsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gols por Atleta</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfigGoals}
          className={styles.chartContainer}
        >
          <BarChart width={996} height={300} data={data} layout="vertical">
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
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

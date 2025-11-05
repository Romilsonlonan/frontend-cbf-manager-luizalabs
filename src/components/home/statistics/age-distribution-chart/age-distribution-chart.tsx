
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
import styles from './age-distribution-chart.module.css';

const chartConfigAge = {
  age: {
    label: 'Idade',
    color: 'hsl(var(--chart-3))',
  },
};

type Athlete = {
  name: string;
  age: number;
};

type AgeDistributionChartProps = {
  data: Athlete[];
};

export default function AgeDistributionChart({
  data,
}: AgeDistributionChartProps) {
  return (
    <Card className={styles.fullSpanCard}>
      <CardHeader>
        <CardTitle>Distribuição de Idade</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfigAge}
          className={styles.chartContainer}
        >
          <BarChart width={996} height={300} data={data}>
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
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

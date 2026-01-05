"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart"
import type { Athlete } from "@/lib/types"

const chartConfig = {
  weight: {
    label: "Peso (kg)",
    color: "hsl(var(--primary))",
  },
  bodyFat: {
    label: "% Gordura",
    color: "hsl(var(--accent))",
  },
  muscle: {
    label: "% Músculo",
    color: "hsl(var(--secondary-foreground))",
  },
} satisfies ChartConfig

type ProgressDashboardProps = {
  athlete: Athlete;
}

export function ProgressDashboard({ athlete }: ProgressDashboardProps) {
  const chartData = athlete.progress || [];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução Semanal</CardTitle>
        <CardDescription>Acompanhamento do progresso físico do atleta.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 8)}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="weight" fill="var(--color-weight)" radius={4} />
            <Bar dataKey="bodyFat" fill="var(--color-bodyFat)" radius={4} />
            <Bar dataKey="muscle" fill="var(--color-muscle)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

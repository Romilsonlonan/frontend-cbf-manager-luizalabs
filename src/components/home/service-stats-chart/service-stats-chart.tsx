
"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import styles from "./service-stats-chart.module.css";

const chartConfig = {
  users: {
    label: "New Users",
    color: "hsl(var(--primary))",
  },
}

export function ServiceStatsChart() {
  const [chartData, setChartData] = useState<any[] | null>(null)

  useEffect(() => {
    const data = [
      { date: "Jan", users: Math.floor(Math.random() * 200) + 100 },
      { date: "Feb", users: Math.floor(Math.random() * 200) + 100 },
      { date: "Mar", users: Math.floor(Math.random() * 200) + 100 },
      { date: "Apr", users: Math.floor(Math.random() * 200) + 100 },
      { date: "May", users: Math.floor(Math.random() * 200) + 100 },
      { date: "Jun", users: Math.floor(Math.random() * 200) + 100 },
    ]
    setChartData(data)
  }, [])
  
  if (!chartData) {
    return <Skeleton className={styles.chartSkeleton} />
  }

  return (
    <ChartContainer config={chartConfig} className={styles.chartContainer}>
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
           <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" hideLabel />}
          />
          <Bar dataKey="users" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

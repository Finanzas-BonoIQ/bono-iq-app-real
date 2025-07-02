"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const description = "Gráfico interactivo de rendimientos"

const chartData = [
  { date: "2024-04-01", rendimiento: 850, capital: 25000 },
  { date: "2024-04-02", rendimiento: 920, capital: 25000 },
  { date: "2024-04-03", rendimiento: 1050, capital: 25000 },
  { date: "2024-04-04", rendimiento: 1180, capital: 25000 },
  { date: "2024-04-05", rendimiento: 1320, capital: 25000 },
  { date: "2024-04-06", rendimiento: 1450, capital: 25000 },
  { date: "2024-04-07", rendimiento: 1580, capital: 25000 },
  { date: "2024-04-08", rendimiento: 1720, capital: 25000 },
  { date: "2024-04-09", rendimiento: 1850, capital: 25000 },
  { date: "2024-04-10", rendimiento: 1950, capital: 25000 },
]

const chartConfig = {
  rendimiento: {
    label: "Rendimiento",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-04-10")
    let daysToSubtract = 30
    if (timeRange === "7d") {
      daysToSubtract = 7
    } else if (timeRange === "90d") {
      daysToSubtract = 90
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-xl">Evolución de Rendimientos</CardTitle>
            <CardDescription>Rendimiento acumulado de tu cartera de inversiones</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 días</SelectItem>
                <SelectItem value="30d">30 días</SelectItem>
                <SelectItem value="90d">90 días</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="fillRendimiento" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("es-PE", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  className="text-xs fill-muted-foreground"
              />
              <ChartTooltip
                  cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
                  content={
                    <ChartTooltipContent
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("es-PE", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        }}
                        formatter={(value) => [
                          new Intl.NumberFormat("es-PE", {
                            style: "currency",
                            currency: "PEN",
                          }).format(value as number),
                          "Rendimiento",
                        ]}
                    />
                  }
              />
              <Area
                  dataKey="rendimiento"
                  type="monotone"
                  fill="url(#fillRendimiento)"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
  )
}

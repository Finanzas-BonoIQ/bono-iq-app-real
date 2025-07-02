<<<<<<< Updated upstream
import { IconTrendingUp, IconCoin, IconCalendar, IconChartLine } from "@tabler/icons-react"
import type { InvestorSummary } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface DashboardCardsProps {
    summary: InvestorSummary
}

export function DashboardCards({ summary }: DashboardCardsProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-PE", {
            style: "currency",
            currency: "PEN",
        }).format(amount)
    }

    const cards = [
        {
            title: "Total Invertido",
            value: formatCurrency(summary.totalInvertido),
            description: `Distribuido en ${summary.bonosActivos} bonos`,
            icon: IconCoin,
            badge: "Capital",
            badgeVariant: "secondary" as const,
        },
        {
            title: "Rendimiento Total",
            value: formatCurrency(summary.rendimientoTotal),
            description: "Ganancia sobre inversión total",
            icon: IconTrendingUp,
            badge: `+${((summary.rendimientoTotal / summary.totalInvertido) * 100).toFixed(1)}%`,
            badgeVariant: "default" as const,
        },
        {
            title: "Bonos Activos",
            value: summary.bonosActivos.toString(),
            description: "Instrumentos en cartera",
            icon: IconChartLine,
            badge: "Activos",
            badgeVariant: "secondary" as const,
        },
        {
            title: "Próximo Pago",
            value: formatCurrency(summary.proximoPago),
            description: `Rendimiento promedio ${summary.rendimientoPromedio}%`,
            icon: IconCalendar,
            badge: "Este mes",
            badgeVariant: "outline" as const,
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => (
                <Card key={index} className="relative overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="text-sm font-medium text-muted-foreground">{card.title}</div>
                        <Badge variant={card.badgeVariant} className="text-xs">
                            {card.badge}
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <div className="text-2xl font-bold">{card.value}</div>
                            <card.icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                    </CardContent>
                </Card>
            ))}
=======
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Calendar, Users, PieChart } from "lucide-react"
import type { InvestorSummary, EmisorSummary } from "@/lib/types"

interface DashboardCardsProps {
    userRole: "Emisor" | "Inversor"
    investorSummary?: InvestorSummary
    emisorSummary?: EmisorSummary
    isLoading?: boolean
}

export function DashboardCards({ userRole, investorSummary, emisorSummary, isLoading = false }: DashboardCardsProps) {
    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-4 w-4 bg-gray-200 rounded"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-20"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    if (userRole === "Inversor") {
        const summary = investorSummary || {
            total_invertido: 0,
            total_bonos: 0,
            rendimiento_promedio: 0,
            proximos_pagos: 0,
        }

        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Invertido</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            S/{" "}
                            {(summary.total_invertido || 0).toLocaleString("es-PE", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </div>
                        <p className="text-xs text-muted-foreground">En {summary.total_bonos || 0} bonos</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bonos Activos</CardTitle>
                        <PieChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{summary.total_bonos || 0}</div>
                        <p className="text-xs text-muted-foreground">Inversiones activas</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rendimiento Promedio</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{(summary.rendimiento_promedio || 0).toFixed(2)}%</div>
                        <p className="text-xs text-muted-foreground">Tasa anual promedio</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Próximos Pagos</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            S/{" "}
                            {(summary.proximos_pagos || 0).toLocaleString("es-PE", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </div>
                        <p className="text-xs text-muted-foreground">Este mes</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Para Emisor
    const summary = emisorSummary || {
        total_emitido: 0,
        total_bonos: 0,
        total_inversionistas: 0,
        proximos_pagos: 0,
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Emitido</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        S/{" "}
                        {(summary.total_emitido || 0).toLocaleString("es-PE", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </div>
                    <p className="text-xs text-muted-foreground">En {summary.total_bonos || 0} bonos</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Bonos Activos</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{summary.total_bonos || 0}</div>
                    <p className="text-xs text-muted-foreground">Emisiones activas</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inversionistas</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{summary.total_inversionistas || 0}</div>
                    <p className="text-xs text-muted-foreground">Inversionistas únicos</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Próximos Pagos</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        S/{" "}
                        {(summary.proximos_pagos || 0).toLocaleString("es-PE", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </div>
                    <p className="text-xs text-muted-foreground">Este mes</p>
                </CardContent>
            </Card>
>>>>>>> Stashed changes
        </div>
    )
}

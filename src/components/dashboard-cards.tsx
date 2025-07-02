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
        </div>
    )
}

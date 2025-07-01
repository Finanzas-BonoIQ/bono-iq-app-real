import { DashboardCards } from "@/components/dashboard-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { BondsTable } from "@/components/bonds-table"
import { investorSummary, getInvestorBonds } from "@/lib/mock-data"

export default function DashboardPage() {
    const investorBonds = getInvestorBonds()

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Principal</h1>
                <p className="text-muted-foreground">Resumen de tu cartera de inversiones en bonos</p>
            </div>

            {/* Cards Row - 4 cards in one row */}
            <DashboardCards summary={investorSummary} />

            {/* Chart Row - Full width */}
            <div className="w-full">
                <ChartAreaInteractive />
            </div>

            {/* Bonds Table Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight">Tus Bonos Activos</h2>
                        <p className="text-muted-foreground">Instrumentos en tu cartera generando rendimientos</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {investorBonds.length} {investorBonds.length === 1 ? "bono activo" : "bonos activos"}
                    </div>
                </div>

                {investorBonds && investorBonds.length > 0 ? (
                    <BondsTable bonds={investorBonds} />
                ) : (
                    <div className="rounded-lg border border-dashed p-12 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                            <svg className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">No tienes bonos activos</h3>
                        <p className="mt-2 text-muted-foreground">
                            Explora las oportunidades de inversión disponibles en la sección de Bonos
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

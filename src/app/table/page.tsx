"use client"

import { useState, useEffect, useMemo } from "react"
import { AmortizationTable } from "@/components/amortization-table"
import { getBonds } from "@/lib/supabase/queries"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Bond, AmortizationRow } from "@/lib/types"

function calculateAmortizationSchedule(bond: Bond, investmentAmount: number): AmortizationRow[] {
    const schedule: AmortizationRow[] = []

    // Calcular el plazo en años (si no está definido, calcularlo desde las fechas)
    let totalYears = bond.plazo || 1
    if (!bond.plazo) {
        const startDate = new Date(bond.fecha_emision)
        const endDate = new Date(bond.fecha_vencimiento)
        totalYears = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    }

    // Determinar la frecuencia de pago
    const couponFrequency =
        bond.frecuencia_pago === "mensual"
            ? 12
            : bond.frecuencia_pago === "trimestral"
                ? 4
                : bond.frecuencia_pago === "semestral"
                    ? 2
                    : 1

    const totalPeriods = Math.ceil(totalYears * couponFrequency)
    const periodicRate = bond.tasa_cupon / 100 / couponFrequency
    const amortizationAmount = investmentAmount / totalPeriods

    let remainingBalance = investmentAmount
    const startDate = new Date(bond.fecha_emision)

    for (let period = 1; period <= totalPeriods; period++) {
        const couponPayment = remainingBalance * periodicRate
        const finalBalance = remainingBalance - amortizationAmount
        const totalFlow = couponPayment + amortizationAmount

        // Calcular fecha del período
        const periodDate = new Date(startDate)
        const monthsToAdd = (period * 12) / couponFrequency
        periodDate.setMonth(periodDate.getMonth() + monthsToAdd)

        schedule.push({
            periodo: period,
            fecha: periodDate.toLocaleDateString("es-PE"),
            saldo_inicial: remainingBalance,
            cupon: couponPayment,
            amortizacion: amortizationAmount,
            saldo_final: Math.max(0, finalBalance),
            flujo_total: totalFlow,
        })

        remainingBalance = Math.max(0, finalBalance)
    }

    return schedule
}

export default function TablePage() {
    const [bonds, setBonds] = useState<Bond[]>([])
    const [selectedBondId, setSelectedBondId] = useState<string>("")
    const [investmentAmount, setInvestmentAmount] = useState<string>("10000")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadBonds() {
            try {
                setLoading(true)
                const bondsData = await getBonds()
                setBonds(bondsData)
                if (bondsData.length > 0) {
                    setSelectedBondId(bondsData[0].id)
                }
            } catch (err) {
                setError("Error al cargar los bonos")
                console.error("Error loading bonds:", err)
            } finally {
                setLoading(false)
            }
        }

        loadBonds()
    }, [])

    const selectedBond = useMemo(() => {
        return bonds.find((bond) => bond.id === selectedBondId)
    }, [bonds, selectedBondId])

    const amortizationData = useMemo(() => {
        if (!selectedBond || !investmentAmount) return []

        const amount = Number.parseFloat(investmentAmount)
        if (isNaN(amount) || amount <= 0) return []

        return calculateAmortizationSchedule(selectedBond, amount)
    }, [selectedBond, investmentAmount])

    const totalExpenses = useMemo(() => {
        if (!selectedBond) return 0
        return (
            (selectedBond.gastos_emision || 0) +
            (selectedBond.gastos_colocacion || 0) +
            (selectedBond.gastos_estructuracion || 0) +
            (selectedBond.gastos_cavali || 0)
        )
    }, [selectedBond])

    if (loading) {
        return (
            <div className="container mx-auto py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto py-8">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-destructive">{error}</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (bonds.length === 0) {
        return (
            <div className="container mx-auto py-8">
                <Card>
                    <CardContent className="pt-6">
                        <p>No hay bonos disponibles. Crea un bono primero.</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 space-y-6">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Tabla de Amortización</h1>
                <p className="text-muted-foreground">Calcula y visualiza el cronograma de pagos de tu inversión en bonos</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Configuración de Inversión</CardTitle>
                        <CardDescription>Selecciona un bono y define el monto de inversión</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="bond-select">Bono</Label>
                            <Select value={selectedBondId} onValueChange={setSelectedBondId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un bono" />
                                </SelectTrigger>
                                <SelectContent>
                                    {bonds.map((bond) => (
                                        <SelectItem key={bond.id} value={bond.id}>
                                            {bond.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="investment-amount">Monto de Inversión (USD)</Label>
                            <Input
                                id="investment-amount"
                                type="number"
                                value={investmentAmount}
                                onChange={(e) => setInvestmentAmount(e.target.value)}
                                placeholder="10000"
                                min="1"
                                step="0.01"
                            />
                        </div>
                    </CardContent>
                </Card>

                {selectedBond && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Información del Bono</CardTitle>
                            <CardDescription>Detalles del bono seleccionado</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="font-medium">Valor Nominal:</p>
                                    <p className="text-muted-foreground">${selectedBond.valor_nominal.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Plazo:</p>
                                    <p className="text-muted-foreground">
                                        {selectedBond.plazo ||
                                            Math.ceil(
                                                (new Date(selectedBond.fecha_vencimiento).getTime() -
                                                    new Date(selectedBond.fecha_emision).getTime()) /
                                                (1000 * 60 * 60 * 24 * 365.25),
                                            )}{" "}
                                        años
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium">Tasa Cupón:</p>
                                    <p className="text-muted-foreground">{selectedBond.tasa_cupon}%</p>
                                </div>
                                <div>
                                    <p className="font-medium">Frecuencia:</p>
                                    <p className="text-muted-foreground">{selectedBond.frecuencia_pago}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Gastos Totales:</p>
                                    <p className="text-muted-foreground">{totalExpenses.toFixed(2)}%</p>
                                </div>
                                <div>
                                    <p className="font-medium">Colocación:</p>
                                    <p className="text-muted-foreground">{selectedBond.porcentaje_colocacion || 0}%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {amortizationData.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Cronograma de Pagos</CardTitle>
                        <CardDescription>
                            Tabla de amortización para una inversión de ${Number.parseFloat(investmentAmount).toLocaleString()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AmortizationTable data={amortizationData} />
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

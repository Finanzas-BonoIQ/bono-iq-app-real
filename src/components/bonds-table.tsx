"use client"
import type { ColumnDef } from "@tanstack/react-table"
import type { Bond } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import Link from "next/link"

interface BondsTableProps {
    bonds: Bond[]
    showInvestButton?: boolean
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
    }).format(value)
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}

const getRiskColor = (risk: string) => {
    switch (risk) {
        case "Bajo":
            return "bg-green-100 text-green-800 hover:bg-green-100"
        case "Medio":
            return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
        case "Alto":
            return "bg-red-100 text-red-800 hover:bg-red-100"
        default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
}

export function BondsTable({ bonds = [], showInvestButton = false }: BondsTableProps) {
    const columns: ColumnDef<Bond>[] = [
        {
            accessorKey: "nombre",
            header: "Nombre del Bono",
            cell: ({ row }) => (
                <div className="space-y-1">
                    <Link href={`/bonos/${row.original.id}`} className="font-medium text-primary hover:underline">
                        {row.original.nombre}
                    </Link>
                    <div className="text-sm text-muted-foreground">{row.original.emisor}</div>
                </div>
            ),
        },
        {
            accessorKey: "valorNominal",
            header: "Valor Nominal",
            cell: ({ row }) => <div className="font-mono text-sm">{formatCurrency(row.original.valorNominal)}</div>,
        },
        {
            accessorKey: "tasaInteres",
            header: "Tasa de Interés",
            cell: ({ row }) => <div className="font-mono text-sm">{row.original.tasaInteres}%</div>,
        },
        {
            accessorKey: "fechaVencimiento",
            header: "Vencimiento",
            cell: ({ row }) => <div className="font-mono text-sm">{formatDate(row.original.fechaVencimiento)}</div>,
        },
        {
            accessorKey: "riesgo",
            header: "Riesgo",
            cell: ({ row }) => (
                <Badge variant="secondary" className={getRiskColor(row.original.riesgo)}>
                    {row.original.riesgo}
                </Badge>
            ),
        },
        {
            accessorKey: "rendimientoActual",
            header: "Rendimiento",
            cell: ({ row }) => (
                <div className="font-mono text-sm font-medium text-green-600">{row.original.rendimientoActual}%</div>
            ),
        },
        ...(showInvestButton
            ? [
                {
                    id: "actions",
                    header: "Acciones",
                    cell: () => (
                        <Button size="sm" variant="outline">
                            Invertir
                        </Button>
                    ),
                } as ColumnDef<Bond>,
            ]
            : [
                {
                    accessorKey: "montoInvertido",
                    header: "Monto Invertido",
                    cell: ({ row }) => (
                        <div className="font-mono text-sm font-medium">
                            {row.original.montoInvertido ? formatCurrency(row.original.montoInvertido) : "-"}
                        </div>
                    ),
                } as ColumnDef<Bond>,
            ]),
    ]

    return <DataTable columns={columns} data={bonds} />
}

"use client"
import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "react"
import type { AmortizationRow } from "@/lib/types"

const columns: ColumnDef<AmortizationRow>[] = [
    {
        accessorKey: "periodo",
        header: "Período",
        cell: ({ row }) => <div className="text-center">{row.getValue("periodo")}</div>,
    },
    {
        accessorKey: "fecha",
        header: "Fecha",
        cell: ({ row }) => <div className="text-center">{row.getValue("fecha")}</div>,
    },
    {
        accessorKey: "saldo_inicial",
        header: "Saldo Inicial",
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("saldo_inicial"))
            const formatted = new Intl.NumberFormat("es-PE", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "cupon",
        header: "Cupón",
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("cupon"))
            const formatted = new Intl.NumberFormat("es-PE", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "amortizacion",
        header: "Amortización",
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("amortizacion"))
            const formatted = new Intl.NumberFormat("es-PE", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "saldo_final",
        header: "Saldo Final",
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("saldo_final"))
            const formatted = new Intl.NumberFormat("es-PE", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "flujo_total",
        header: "Flujo Total",
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("flujo_total"))
            const formatted = new Intl.NumberFormat("es-PE", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="text-right font-medium text-green-600">{formatted}</div>
        },
    },
]

interface AmortizationTableProps {
    data: AmortizationRow[]
}

export function AmortizationTable({ data }: AmortizationTableProps) {
    const parentRef = useRef<HTMLDivElement>(null)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const { rows } = table.getRowModel()

    const virtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 50,
        overscan: 10,
    })

    return (
        <div className="rounded-md border">
            <div className="relative">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="border-b transition-colors hover:bg-muted/50">
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                                >
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                </table>
                <div ref={parentRef} className="h-[400px] overflow-auto">
                    <div
                        style={{
                            height: `${virtualizer.getTotalSize()}px`,
                            width: "100%",
                            position: "relative",
                        }}
                    >
                        <table className="w-full caption-bottom text-sm">
                            <tbody className="[&_tr:last-child]:border-0">
                            {virtualizer.getVirtualItems().map((virtualRow) => {
                                const row = rows[virtualRow.index]
                                return (
                                    <tr
                                        key={row.id}
                                        data-index={virtualRow.index}
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: `${virtualRow.size}px`,
                                            transform: `translateY(${virtualRow.start}px)`,
                                        }}
                                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

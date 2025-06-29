"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AmortizationRow } from "@/lib/types";

// Helper function to format currency, using parentheses for negatives
const formatCurrency = (value: number) => {
    const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    if (value < 0) {
        return `(${Math.abs(value).toLocaleString("en-US", options)})`;
    }
    return value.toLocaleString("en-US", options);
};

export const columns: ColumnDef<AmortizationRow>[] = [
    { accessorKey: "n", header: "Nº" },
    {
        accessorKey: "fecha",
        header: "Fecha",
        cell: ({ row }) => new Date(row.getValue("fecha")).toLocaleDateString("es-PE"),
    },
    {
        accessorKey: "saldoInicial",
        header: "Saldo Inicial",
        cell: ({ row }) => formatCurrency(row.getValue("saldoInicial")),
    },
    {
        accessorKey: "interes",
        header: "Interes",
        cell: ({ row }) => <span className="text-red-600">{formatCurrency(row.getValue("interes"))}</span>,
    },
    {
        accessorKey: "cuota",
        header: "Cuota",
        cell: ({ row }) => <span className="text-red-600">{formatCurrency(row.getValue("cuota"))}</span>,
    },
    {
        accessorKey: "amort",
        header: "Amort.",
        cell: ({ row }) => <span className="text-blue-600">{formatCurrency(row.getValue("amort"))}</span>,
    },
    {
        accessorKey: "seguroDesgrav",
        header: "Seguro Des.",
        cell: ({ row }) => <span className="text-red-600">{formatCurrency(row.getValue("seguroDesgrav"))}</span>,
    },
    {
        accessorKey: "seguroRiesgo",
        header: "Seguro Riesgo",
        cell: ({ row }) => <span className="text-red-600">{formatCurrency(row.getValue("seguroRiesgo"))}</span>,
    },
    {
        accessorKey: "comision",
        header: "Comisión",
        cell: ({ row }) => <span className="text-red-600">{formatCurrency(row.getValue("comision"))}</span>,
    },
    {
        accessorKey: "portes",
        header: "Portes",
        cell: ({ row }) => <span className="text-red-600">{formatCurrency(row.getValue("portes"))}</span>,
    },
    {
        accessorKey: "gastosAdm",
        header: "Gastos Adm.",
        cell: ({ row }) => <span className="text-red-600">{formatCurrency(row.getValue("gastosAdm"))}</span>,
    },
    {
        accessorKey: "saldoFinal",
        header: "Saldo Final",
        cell: ({ row }) => formatCurrency(row.getValue("saldoFinal")),
    },
    {
        accessorKey: "flujo",
        header: "Flujo",
        cell: ({ row }) => <span className="text-red-600">{formatCurrency(row.getValue("flujo"))}</span>,
    },
    {
        accessorKey: "valorActual",
        header: "Valor Actual",
        cell: ({ row }) => <span className="text-red-600">{formatCurrency(row.getValue("valorActual"))}</span>,
    },
];
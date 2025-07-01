import type { Bond, InvestorSummary, AmortizationRow } from "./types"

// Datos de ejemplo para amortización
const generateAmortizationData = (valorNominal: number, tasaInteres: number, plazo: number): AmortizationRow[] => {
    const data: AmortizationRow[] = []
    let saldoInicial = valorNominal
    const tasaMensual = tasaInteres / 100 / 12
    const cuotaMensual =
        (valorNominal * tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1)

    for (let i = 1; i <= plazo; i++) {
        const interes = saldoInicial * tasaMensual
        const amort = cuotaMensual - interes
        const saldoFinal = saldoInicial - amort
        const seguroDesgrav = valorNominal * 0.0005 // 0.05%
        const seguroRiesgo = valorNominal * 0.0003 // 0.03%
        const comision = i === 1 ? valorNominal * 0.01 : 0 // 1% solo primer mes
        const portes = 25 // Fijo
        const gastosAdm = 15 // Fijo
        const flujo = cuotaMensual + seguroDesgrav + seguroRiesgo + comision + portes + gastosAdm

        const fecha = new Date()
        fecha.setMonth(fecha.getMonth() + i)

        data.push({
            n: i,
            fecha: fecha.toISOString(),
            saldoInicial: Math.round(saldoInicial * 100) / 100,
            interes: Math.round(interes * 100) / 100,
            cuota: Math.round(cuotaMensual * 100) / 100,
            amort: Math.round(amort * 100) / 100,
            seguroDesgrav: Math.round(seguroDesgrav * 100) / 100,
            seguroRiesgo: Math.round(seguroRiesgo * 100) / 100,
            comision: Math.round(comision * 100) / 100,
            portes,
            gastosAdm,
            saldoFinal: Math.round(saldoFinal * 100) / 100,
            flujo: Math.round(flujo * 100) / 100,
            valorActual: Math.round((flujo / Math.pow(1 + tasaMensual, i)) * 100) / 100,
        })

        saldoInicial = saldoFinal
    }

    return data
}

export const mockBonds: Bond[] = [
    {
        id: "BOND001",
        nombre: "Bono Corporativo ABC",
        emisor: "Corporación ABC S.A.",
        valorNominal: 10000,
        tasaInteres: 8.5,
        fechaEmision: "2024-01-15",
        fechaVencimiento: "2026-01-15",
        plazo: 24,
        frecuenciaPago: "mensual",
        montoInvertido: 10000,
        rendimientoActual: 8.2,
        riesgo: "Medio",
        estado: "Activo",
        amortizacion: generateAmortizationData(10000, 8.5, 24),
        descripcion: "Bono corporativo con garantía hipotecaria",
        garantias: "Garantía hipotecaria sobre inmuebles",
        calificacionRiesgo: "BBB+",
    },
    {
        id: "BOND002",
        nombre: "Bono Verde XYZ",
        emisor: "Energía Verde XYZ S.A.",
        valorNominal: 15000,
        tasaInteres: 7.8,
        fechaEmision: "2024-03-01",
        fechaVencimiento: "2027-03-01",
        plazo: 36,
        frecuenciaPago: "mensual",
        montoInvertido: 15000,
        rendimientoActual: 7.5,
        riesgo: "Bajo",
        estado: "Activo",
        amortizacion: generateAmortizationData(15000, 7.8, 36),
        descripcion: "Bono verde para proyectos de energía renovable",
        garantias: "Garantía corporativa y flujos del proyecto",
        calificacionRiesgo: "A-",
    },
    {
        id: "BOND003",
        nombre: "Bono Inmobiliario DEF",
        emisor: "Desarrollos DEF S.A.",
        valorNominal: 20000,
        tasaInteres: 9.2,
        fechaEmision: "2024-06-01",
        fechaVencimiento: "2026-06-01",
        plazo: 24,
        frecuenciaPago: "mensual",
        rendimientoActual: 9.0,
        riesgo: "Alto",
        estado: "Disponible",
        amortizacion: generateAmortizationData(20000, 9.2, 24),
        descripcion: "Bono respaldado por proyecto inmobiliario",
        garantias: "Garantía sobre el proyecto inmobiliario",
        calificacionRiesgo: "BB",
    },
    {
        id: "BOND004",
        nombre: "Bono Tecnológico GHI",
        emisor: "Tech Solutions GHI S.A.",
        valorNominal: 12000,
        tasaInteres: 8.8,
        fechaEmision: "2024-04-15",
        fechaVencimiento: "2027-04-15",
        plazo: 36,
        frecuenciaPago: "mensual",
        rendimientoActual: 8.6,
        riesgo: "Medio",
        estado: "Disponible",
        amortizacion: generateAmortizationData(12000, 8.8, 36),
        descripcion: "Bono para financiamiento de proyectos tecnológicos",
        garantias: "Garantía corporativa y activos tecnológicos",
        calificacionRiesgo: "BBB",
    },
]

export const investorSummary: InvestorSummary = {
    totalInvertido: 25000,
    rendimientoTotal: 1950,
    bonosActivos: 2,
    proximoPago: 850,
    rendimientoPromedio: 7.8,
}

export const getInvestorBonds = (): Bond[] => {
    return mockBonds.filter((bond) => bond.montoInvertido && bond.montoInvertido > 0)
}

export const getAvailableBonds = (): Bond[] => {
    return mockBonds.filter((bond) => bond.estado === "Disponible")
}

export const getBondById = (id: string): Bond | undefined => {
    return mockBonds.find((bond) => bond.id === id)
}

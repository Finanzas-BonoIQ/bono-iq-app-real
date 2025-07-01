export interface AmortizationRow {
    n: number
    fecha: string
    saldoInicial: number
    interes: number
    cuota: number
    amort: number
    seguroDesgrav: number
    seguroRiesgo: number
    comision: number
    portes: number
    gastosAdm: number
    saldoFinal: number
    flujo: number
    valorActual: number
}

export interface Bond {
    id: string
    nombre: string
    emisor: string
    valorNominal: number
    tasaInteres: number
    fechaEmision: string
    fechaVencimiento: string
    plazo: number // en meses
    frecuenciaPago: string // "mensual", "trimestral", etc.
    montoInvertido?: number // para bonos del inversor
    rendimientoActual: number
    riesgo: "Bajo" | "Medio" | "Alto"
    estado: "Activo" | "Vencido" | "Disponible"
    amortizacion: AmortizationRow[]
    descripcion: string
    garantias: string
    calificacionRiesgo: string
}

export interface InvestorSummary {
    totalInvertido: number
    rendimientoTotal: number
    bonosActivos: number
    proximoPago: number
    rendimientoPromedio: number
}

export interface UserRole {
    type: "Emisor" | "Inversor"
    name: string
    email: string
}

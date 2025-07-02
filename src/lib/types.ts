<<<<<<< Updated upstream
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
=======
// Tipos base
export interface Profile {
    id: string
    email: string
    first_name?: string
    last_name?: string
    full_name?: string
    role: "Emisor" | "Inversor"
    ruc?: string
    phone?: string
    birth_date?: string
    address?: string
    city?: string
    country?: string
    bio?: string
    company?: string
    position?: string
    website?: string
    avatar_url?: string
    created_at: string
    updated_at: string
>>>>>>> Stashed changes
}

export interface Bond {
    id: string
<<<<<<< Updated upstream
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
=======
    user_id: string
    nombre: string
    emisor_name: string
    valor_nominal: number
    tasa_cupon: number
    fecha_emision: string
    fecha_vencimiento: string
    plazo?: number
    frecuencia_pago: "mensual" | "trimestral" | "semestral" | "anual"
    descripcion?: string
    garantias?: string
    calificacion_riesgo?: string
    riesgo: "Bajo" | "Medio" | "Alto"
    estado: "Borrador" | "Disponible" | "Activo" | "Vencido"
    monto_emision: number
    monto_disponible: number
    gastos_emision?: number
    gastos_colocacion?: number
    gastos_estructuracion?: number
    gastos_cavali?: number
    porcentaje_colocacion?: number
    created_at: string
    updated_at: string
}

export interface CreateBondData {
    nombre: string
    emisor_name: string
    valor_nominal: number
    tasa_cupon: number
    fecha_emision: string
    fecha_vencimiento: string
    plazo?: number
    frecuencia_pago: "mensual" | "trimestral" | "semestral" | "anual"
    descripcion?: string
    garantias?: string
    calificacion_riesgo?: string
    riesgo: "Bajo" | "Medio" | "Alto"
    estado: "Borrador" | "Disponible" | "Activo" | "Vencido"
    monto_emision: number
    monto_disponible: number
    gastos_emision?: number
    gastos_colocacion?: number
    gastos_estructuracion?: number
    gastos_cavali?: number
    porcentaje_colocacion?: number
}

export interface Investment {
    id: string
    bond_id: string
    investor_id: string
    monto_invertido: number
    fecha_inversion: string
    estado: "Activa" | "Vencida" | "Cancelada"
    created_at: string
    updated_at: string
    bond?: Bond
}

export interface CreateInvestmentData {
    bond_id: string
    monto_invertido: number
    fecha_inversion?: string
    estado?: "Activa" | "Vencida" | "Cancelada"
>>>>>>> Stashed changes
}

export interface User {
    id: string
    email: string
    full_name?: string
    avatar_url?: string
    created_at: string
    updated_at: string
}

export interface AmortizationRow {
    periodo: number
    fecha: string
    saldo_inicial: number
    cupon: number
    amortizacion: number
    saldo_final: number
    flujo_total: number
}

export interface BondSummary {
    total_cupones: number
    total_amortizacion: number
    total_flujos: number
    tir: number
    duracion: number
    valor_presente: number
}

export interface BondCalculation {
    bond: Bond
    amortization: AmortizationRow[]
    summary: BondSummary
}

// Tipos para dashboard - NOMBRES CONSISTENTES
export interface InvestorSummary {
    total_invertido: number
    total_bonos: number
    rendimiento_promedio: number
    proximos_pagos: number
}

<<<<<<< Updated upstream
export interface UserRole {
    type: "Emisor" | "Inversor"
    name: string
    email: string
=======
export interface EmisorSummary {
    total_emitido: number
    total_bonos: number
    total_inversionistas: number
    proximos_pagos: number
>>>>>>> Stashed changes
}

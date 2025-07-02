import { createClient } from "@/lib/supabase/client"
import type {
    Bond,
    CreateBondData,
    AmortizationRow,
    BondSummary,
    BondCalculation,
    Investment,
    CreateInvestmentData,
    User,
    Profile,
    InvestorSummary,
    EmisorSummary,
} from "@/lib/types"

// Tipos específicos para las respuestas de Supabase
interface SupabaseInvestorSummaryResponse {
    monto_invertido: number
    bonds: {
        tasa_cupon: number
        fecha_vencimiento: string
    }
}

interface SupabaseEmisorSummaryResponse {
    monto_invertido: number
    investor_id: string
    bonds: {
        user_id: string
    }
}

// Client-side functions
export async function getBonds(filters?: { emisor_id?: string }): Promise<Bond[]> {
    const supabase = createClient()

    let query = supabase.from("bonds").select("*")

    if (filters?.emisor_id) {
        query = query.eq("user_id", filters.emisor_id)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching bonds:", error)
        throw error
    }

    return data || []
}

export async function getBond(id: string): Promise<Bond | null> {
    const supabase = createClient()

    const { data, error } = await supabase.from("bonds").select("*").eq("id", id).single()

    if (error) {
        console.error("Error fetching bond:", error)
        return null
    }

    return data
}

export async function createBond(bondData: CreateBondData): Promise<Bond> {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Usuario no autenticado")
    }

    // Verificar que el usuario tiene un perfil
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (!profile) {
        throw new Error("Perfil de usuario no encontrado")
    }

    if (profile.role !== "Emisor") {
        throw new Error("Solo los emisores pueden crear bonos")
    }

    const { data, error } = await supabase
        .from("bonds")
        .insert({
            user_id: user.id,
            nombre: bondData.nombre,
            emisor_name: bondData.emisor_name,
            valor_nominal: bondData.valor_nominal,
            tasa_cupon: bondData.tasa_cupon,
            fecha_emision: bondData.fecha_emision,
            fecha_vencimiento: bondData.fecha_vencimiento,
            plazo: bondData.plazo,
            frecuencia_pago: bondData.frecuencia_pago,
            descripcion: bondData.descripcion,
            garantias: bondData.garantias,
            calificacion_riesgo: bondData.calificacion_riesgo,
            riesgo: bondData.riesgo,
            estado: bondData.estado,
            monto_emision: bondData.monto_emision,
            monto_disponible: bondData.monto_disponible,
            gastos_emision: bondData.gastos_emision || 0,
            gastos_colocacion: bondData.gastos_colocacion || 0,
            gastos_estructuracion: bondData.gastos_estructuracion || 0,
            gastos_cavali: bondData.gastos_cavali || 0,
            porcentaje_colocacion: bondData.porcentaje_colocacion || 0,
        })
        .select()
        .single()

    if (error) {
        console.error("Error creating bond:", error)
        throw error
    }

    return data
}

export async function updateBond(id: string, bondData: Partial<CreateBondData>): Promise<Bond> {
    const supabase = createClient()

    const { data, error } = await supabase.from("bonds").update(bondData).eq("id", id).select().single()

    if (error) {
        console.error("Error updating bond:", error)
        throw error
    }

    return data
}

export async function deleteBond(id: string): Promise<void> {
    const supabase = createClient()

    const { error } = await supabase.from("bonds").delete().eq("id", id)

    if (error) {
        console.error("Error deleting bond:", error)
        throw error
    }
}

export async function getUserBonds(): Promise<Bond[]> {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Usuario no autenticado")
    }

    const { data, error } = await supabase
        .from("bonds")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching user bonds:", error)
        throw error
    }

    return data || []
}

// Investment functions
export async function createInvestment(investmentData: CreateInvestmentData): Promise<Investment> {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Usuario no autenticado")
    }

    // Verificar que el bono existe y tiene suficiente monto disponible
    const { data: bond, error: bondError } = await supabase
        .from("bonds")
        .select("monto_disponible")
        .eq("id", investmentData.bond_id)
        .single()

    if (bondError || !bond) {
        throw new Error("Bono no encontrado")
    }

    if (bond.monto_disponible < investmentData.monto_invertido) {
        throw new Error("Monto insuficiente disponible en el bono")
    }

    // Crear la inversión
    const { data, error } = await supabase
        .from("investments")
        .insert({
            ...investmentData,
            investor_id: user.id,
        })
        .select()
        .single()

    if (error) {
        console.error("Error creating investment:", error)
        throw error
    }

    // Actualizar el monto disponible del bono
    const { error: updateError } = await supabase
        .from("bonds")
        .update({
            monto_disponible: bond.monto_disponible - investmentData.monto_invertido,
        })
        .eq("id", investmentData.bond_id)

    if (updateError) {
        console.error("Error updating bond amount:", updateError)
        throw updateError
    }

    return data
}

export async function getInvestments(filters?: { investor_id?: string; bond_id?: string }): Promise<Investment[]> {
    const supabase = createClient()

    let query = supabase.from("investments").select(`
    *,
    bond:bonds (
      id,
      nombre,
      emisor_name,
      tasa_cupon,
      fecha_vencimiento,
      valor_nominal
    )
  `)

    if (filters?.investor_id) {
        query = query.eq("investor_id", filters.investor_id)
    }

    if (filters?.bond_id) {
        query = query.eq("bond_id", filters.bond_id)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching investments:", error)
        throw error
    }

    return data || []
}

export async function getUserInvestments(): Promise<Investment[]> {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Usuario no autenticado")
    }

    return getInvestments({ investor_id: user.id })
}

export async function getBondInvestments(bondId: string): Promise<Investment[]> {
    return getInvestments({ bond_id: bondId })
}

// Profile functions
export async function getProfile(userId: string): Promise<Profile | null> {
    const supabase = createClient()

    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) {
        console.error("Error fetching profile:", error)
        return null
    }

    return data
}

export async function getCurrentUser(): Promise<User | null> {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return null
    }

    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (error) {
        console.error("Error fetching user profile:", error)
        return null
    }

    return {
        id: user.id,
        email: user.email || "",
        full_name: data?.full_name,
        avatar_url: data?.avatar_url,
        created_at: user.created_at || "",
        updated_at: data?.updated_at || "",
    }
}

export async function updateUserProfile(updates: Partial<User>): Promise<User> {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Usuario no autenticado")
    }

    const { data, error } = await supabase
        .from("profiles")
        .update({
            full_name: updates.full_name,
            avatar_url: updates.avatar_url,
            updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select()
        .single()

    if (error) {
        console.error("Error updating user profile:", error)
        throw error
    }

    return {
        id: user.id,
        email: user.email || "",
        full_name: data.full_name,
        avatar_url: data.avatar_url,
        created_at: user.created_at || "",
        updated_at: data.updated_at,
    }
}

// Summary functions for dashboard
export async function getInvestorSummary(userId: string): Promise<InvestorSummary> {
    const supabase = createClient()

    const { data: investments, error } = await supabase
        .from("investments")
        .select(`
      monto_invertido,
      bonds (
        tasa_cupon,
        fecha_vencimiento
      )
    `)
        .eq("investor_id", userId)
        .eq("estado", "Activa")

    if (error) {
        console.error("Error fetching investor summary:", error)
        throw error
    }

    const typedInvestments = investments as unknown as SupabaseInvestorSummaryResponse[]

    const totalInvertido = typedInvestments.reduce((sum, inv) => sum + inv.monto_invertido, 0)
    const bonosActivos = typedInvestments.length

    let rendimientoPromedio = 0
    if (typedInvestments.length > 0) {
        const sumaRendimientos = typedInvestments.reduce((sum, inv) => {
            return sum + (inv.bonds?.tasa_cupon || 0)
        }, 0)
        rendimientoPromedio = sumaRendimientos / typedInvestments.length
    }

    const rendimientoTotal = totalInvertido * rendimientoPromedio
    const proximoPago = totalInvertido * 0.05 // estimado

    return {
        totalInvertido,
        bonosActivos,
        rendimientoPromedio,
        rendimientoTotal,
        proximoPago,
    }
}

export async function getEmisorSummary(userId: string): Promise<EmisorSummary> {
    const supabase = createClient()

    const { data: bonds, error: bondsError } = await supabase
        .from("bonds")
        .select("monto_emision")
        .eq("user_id", userId)

    if (bondsError) {
        console.error("Error fetching emisor bonds:", bondsError)
        throw bondsError
    }

    const { data: investments, error: investmentsError } = await supabase
        .from("investments")
        .select(`
      monto_invertido,
      investor_id,
      bonds!inner (
        user_id
      )
    `)
        .eq("bonds.user_id", userId)

    if (investmentsError) {
        console.error("Error fetching emisor investments:", investmentsError)
        throw investmentsError
    }

    const typedInvestments = investments as unknown as SupabaseEmisorSummaryResponse[]

    const totalEmitido = bonds?.reduce((sum, bond) => sum + bond.monto_emision, 0) || 0
    const bonosActivos = bonds?.length || 0
    const inversionistas = new Set(typedInvestments.map((inv) => inv.investor_id)).size
    const totalInvertido = typedInvestments.reduce((sum, inv) => sum + inv.monto_invertido, 0)
    const proximoVencimiento = totalInvertido * 0.05 // estimado mensual

    return {
        totalEmitido,
        bonosActivos,
        inversionistas,
        proximoVencimiento,
    }
}

// Calculation functions
export function calculateAmortization(bond: Bond): AmortizationRow[] {
    const { valor_nominal, tasa_cupon, fecha_emision, fecha_vencimiento, frecuencia_pago } = bond

    const startDate = new Date(fecha_emision)
    const endDate = new Date(fecha_vencimiento)

    // Calcular número de períodos por año
    const periodsPerYear = {
        mensual: 12,
        trimestral: 4,
        semestral: 2,
        anual: 1,
    }[frecuencia_pago]

    // Calcular duración en años
    const durationYears = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    const totalPeriods = Math.ceil(durationYears * periodsPerYear)

    // Tasa por período
    const periodRate = tasa_cupon / 100 / periodsPerYear

    // Calcular amortización por período (método francés)
    const amortizacionPorPeriodo = valor_nominal / totalPeriods

    const amortization: AmortizationRow[] = []
    let saldoRestante = valor_nominal

    for (let periodo = 1; periodo <= totalPeriods; periodo++) {
        const cupon = saldoRestante * periodRate
        const amortizacion = periodo === totalPeriods ? saldoRestante : amortizacionPorPeriodo
        const saldoFinal = saldoRestante - amortizacion

        // Calcular fecha del período
        const fechaPeriodo = new Date(startDate)
        fechaPeriodo.setMonth(fechaPeriodo.getMonth() + (periodo * 12) / periodsPerYear)

        amortization.push({
            periodo,
            fecha: fechaPeriodo.toISOString().split("T")[0],
            saldo_inicial: saldoRestante,
            cupon: cupon,
            amortizacion: amortizacion,
            saldo_final: saldoFinal,
            flujo_total: cupon + amortizacion,
        })

        saldoRestante = saldoFinal
    }

    return amortization
}

export function calculateBondSummary(amortization: AmortizationRow[], valorNominal: number): BondSummary {
    const totalCupones = amortization.reduce((sum, row) => sum + row.cupon, 0)
    const totalAmortizacion = amortization.reduce((sum, row) => sum + row.amortizacion, 0)
    const totalFlujos = totalCupones + totalAmortizacion

    // Cálculo simplificado de TIR (aproximación)
    const tir = ((totalFlujos / valorNominal - 1) / (amortization.length / 12)) * 100

    // Duración modificada (aproximación)
    const duracion = amortization.length / 12

    // Valor presente (usando tasa de descuento del 10%)
    const tasaDescuento = 0.1
    const valorPresente = amortization.reduce((sum, row, index) => {
        return sum + row.flujo_total / Math.pow(1 + tasaDescuento / 12, index + 1)
    }, 0)

    return {
        total_cupones: totalCupones,
        total_amortizacion: totalAmortizacion,
        total_flujos: totalFlujos,
        tir: tir,
        duracion: duracion,
        valor_presente: valorPresente,
    }
}

export function getBondCalculation(bond: Bond): BondCalculation {
    const amortization = calculateAmortization(bond)
    const summary = calculateBondSummary(amortization, bond.valor_nominal)

    return {
        bond,
        amortization,
        summary,
    }
}

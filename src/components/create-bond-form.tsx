"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { createClient } from "@/lib/supabase/client"
import { createBond } from "@/lib/supabase/queries"
import type { Bond, FrecuenciaPago } from "@/lib/types"

interface FormData {
    nombre: string
    valor_nominal: string
    tasa_interes: string
    fecha_emision: Date
    plazo_anos: string
    frecuencia_pago: FrecuenciaPago
    monto_total: string
    gastos_emision: string
    gastos_colocacion: string
    gastos_estructuracion: string
    gastos_cavali: string
}

export function CreateBondForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState<FormData>({
        nombre: "",
        valor_nominal: "",
        tasa_interes: "",
        fecha_emision: new Date(),
        plazo_anos: "",
        frecuencia_pago: "semestral",
        monto_total: "",
        gastos_emision: "",
        gastos_colocacion: "100",
        gastos_estructuracion: "",
        gastos_cavali: "0.15",
    })

    const handleInputChange = (field: keyof FormData, value: string | Date | FrecuenciaPago) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        setError(null)
    }

    const validateForm = (): string | null => {
        if (!formData.nombre.trim()) return "El nombre del bono es requerido"

        const valorNominal = Number.parseFloat(formData.valor_nominal)
        if (!formData.valor_nominal || valorNominal <= 0) return "El valor nominal debe ser mayor a 0"
        if (valorNominal > 1000000) return "El valor nominal no puede exceder USD 1,000,000"

        const tasaInteres = Number.parseFloat(formData.tasa_interes)
        if (!formData.tasa_interes || tasaInteres <= 0) return "La tasa de interés debe ser mayor a 0"
        if (tasaInteres > 100) return "La tasa de interés no puede exceder 100%"

        const plazoAnos = Number.parseInt(formData.plazo_anos)
        if (!formData.plazo_anos || plazoAnos <= 0) return "El plazo debe ser mayor a 0"
        if (plazoAnos < 1 || plazoAnos > 15) return "El plazo debe estar entre 1 y 15 años"

        if (!formData.monto_total || Number.parseFloat(formData.monto_total) <= 0)
            return "El monto total debe ser mayor a 0"

        const gastosColocacion = Number.parseFloat(formData.gastos_colocacion)
        if (gastosColocacion < 50 || gastosColocacion > 150) return "Los gastos de colocación deben estar entre 50% y 150%"

        const gastosEstructuracion = Number.parseFloat(formData.gastos_estructuracion)
        if (gastosEstructuracion < 0 || gastosEstructuracion > 5)
            return "Los gastos de estructuración deben estar entre 0% y 5%"

        // Validar frecuencia de pago según el plazo
        const frecuenciasPorAno = {
            mensual: 12,
            trimestral: 4,
            semestral: 2,
            anual: 1,
        }

        const totalPeriodos = plazoAnos * frecuenciasPorAno[formData.frecuencia_pago]
        if (totalPeriodos > 180) {
            return "El número total de períodos no puede exceder 180"
        }

        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const supabase = createClient()
            const {
                data: { user },
            } = await supabase.auth.getUser()

            if (!user) {
                setError("Usuario no autenticado")
                return
            }

            // Obtener perfil del usuario
            const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

            if (!profile || profile.role !== "Emisor") {
                setError("Solo los emisores pueden crear bonos")
                return
            }

            // Validaciones
            const validationError = validateForm()
            if (validationError) {
                setError(validationError)
                return
            }

            // Calcular fecha de vencimiento
            const fechaVencimiento = new Date(formData.fecha_emision)
            fechaVencimiento.setFullYear(fechaVencimiento.getFullYear() + Number.parseInt(formData.plazo_anos))

            const bondData: Omit<Bond, "id" | "created_at" | "updated_at"> = {
                emisor_id: user.id,
                nombre: formData.nombre.trim(),
                emisor_name: profile.full_name || profile.email,
                valor_nominal: Number.parseFloat(formData.valor_nominal),
                tasa_interes: Number.parseFloat(formData.tasa_interes),
                fecha_emision: formData.fecha_emision.toISOString().split("T")[0],
                fecha_vencimiento: fechaVencimiento.toISOString().split("T")[0],
                plazo_anos: Number.parseInt(formData.plazo_anos),
                frecuencia_pago: formData.frecuencia_pago,
                estado: "Borrador",
                monto_total: Number.parseFloat(formData.monto_total),
                monto_disponible: Number.parseFloat(formData.monto_total),
                gastos_emision: Number.parseFloat(formData.gastos_emision) || 0,
                gastos_colocacion: Number.parseFloat(formData.gastos_colocacion),
                gastos_estructuracion: Number.parseFloat(formData.gastos_estructuracion) || 0,
                gastos_cavali: Number.parseFloat(formData.gastos_cavali),
            }

            const newBond = await createBond(bondData)

            if (!newBond) {
                setError("Error al crear el bono")
                return
            }

            setSuccess(true)
            setTimeout(() => {
                router.push(`/dashboard`)
            }, 2000)
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error al crear el bono")
        } finally {
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl">¡Bono Creado Exitosamente!</CardTitle>
                        <CardDescription>Tu bono ha sido creado y guardado como borrador</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="rounded-lg bg-green-50 p-4 mb-4">
                            <p className="text-sm text-green-700">Serás redirigido al dashboard en unos segundos...</p>
                        </div>
                        <Button onClick={() => router.push("/dashboard")} className="w-full">
                            Ir al Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Crear Nuevo Bono</h2>
                <p className="text-muted-foreground">Completa la información para crear un nuevo bono de inversión</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Información Básica */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Información Básica</CardTitle>
                            <CardDescription>Datos principales del bono</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nombre">Nombre del Bono *</Label>
                                <Input
                                    id="nombre"
                                    value={formData.nombre}
                                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                                    placeholder="Ej: Bono Corporativo ABC 2024"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="valor_nominal">Valor Nominal (USD) *</Label>
                                    <Input
                                        id="valor_nominal"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="1000000"
                                        value={formData.valor_nominal}
                                        onChange={(e) => handleInputChange("valor_nominal", e.target.value)}
                                        placeholder="10000"
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">Máximo USD 1,000,000</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tasa_interes">Tasa de Interés (%) *</Label>
                                    <Input
                                        id="tasa_interes"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="100"
                                        value={formData.tasa_interes}
                                        onChange={(e) => handleInputChange("tasa_interes", e.target.value)}
                                        placeholder="5.00"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Fecha de Emisión *</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !formData.fecha_emision && "text-muted-foreground",
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {formData.fecha_emision ? (
                                                    format(formData.fecha_emision, "PPP", { locale: es })
                                                ) : (
                                                    <span>Seleccionar fecha</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={formData.fecha_emision}
                                                onSelect={(date) => handleInputChange("fecha_emision", date as Date)}
                                                disabled={(date) => date < new Date()}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="plazo_anos">Plazo (años) *</Label>
                                    <Input
                                        id="plazo_anos"
                                        type="number"
                                        min="1"
                                        max="15"
                                        value={formData.plazo_anos}
                                        onChange={(e) => handleInputChange("plazo_anos", e.target.value)}
                                        placeholder="5"
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">Entre 1 y 15 años</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="monto_total">Monto Total de la Emisión (USD) *</Label>
                                <Input
                                    id="monto_total"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.monto_total}
                                    onChange={(e) => handleInputChange("monto_total", e.target.value)}
                                    placeholder="100000"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="frecuencia_pago">Frecuencia de Pago *</Label>
                                <Select
                                    value={formData.frecuencia_pago}
                                    onValueChange={(value: FrecuenciaPago) => handleInputChange("frecuencia_pago", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="anual">Anual (1 vez al año)</SelectItem>
                                        <SelectItem value="semestral">Semestral (2 veces al año)</SelectItem>
                                        <SelectItem value="trimestral">Trimestral (4 veces al año)</SelectItem>
                                        <SelectItem value="mensual">Mensual (12 veces al año)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">Período entre cupones: 1 a 12 veces al año</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Gastos y Comisiones */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Gastos y Comisiones</CardTitle>
                            <CardDescription>Costos asociados a la emisión del bono</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="gastos_emision">Gastos de Emisión (%)</Label>
                                    <Input
                                        id="gastos_emision"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={formData.gastos_emision}
                                        onChange={(e) => handleInputChange("gastos_emision", e.target.value)}
                                        placeholder="0.5"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gastos_colocacion">Colocación (%) *</Label>
                                    <Input
                                        id="gastos_colocacion"
                                        type="number"
                                        step="0.01"
                                        min="50"
                                        max="150"
                                        value={formData.gastos_colocacion}
                                        onChange={(e) => handleInputChange("gastos_colocacion", e.target.value)}
                                        placeholder="100"
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">50-100% = Descuento | 100% = Par | 100-150% = Prima</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="gastos_estructuracion">Estructuración (%)</Label>
                                    <Input
                                        id="gastos_estructuracion"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="5"
                                        value={formData.gastos_estructuracion}
                                        onChange={(e) => handleInputChange("gastos_estructuracion", e.target.value)}
                                        placeholder="0.15"
                                    />
                                    <p className="text-xs text-muted-foreground">Entre 0% y 5%</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gastos_cavali">Cavali (%)</Label>
                                    <Input id="gastos_cavali" type="number" step="0.01" value="0.15" disabled className="bg-muted" />
                                    <p className="text-xs text-muted-foreground">Fijo: 0.15%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200">{error}</div>}

                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Creando..." : "Crear Bono"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

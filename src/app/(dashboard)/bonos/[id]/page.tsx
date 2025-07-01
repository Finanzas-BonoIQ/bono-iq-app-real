import { notFound } from "next/navigation"
import { getBondById } from "@/lib/mock-data"
import { AmortizationTable } from "@/components/amortization-table"
import { columns } from "@/components/columns"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BondDetailPageProps {
    params: {
        id: string
    }
}

export default function BondDetailPage({ params }: BondDetailPageProps) {
    const bond = getBondById(params.id)

    if (!bond) {
        notFound()
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("es-PE", {
            style: "currency",
            currency: "PEN",
        }).format(value)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("es-PE")
    }

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case "Bajo":
                return "text-green-600 bg-green-50"
            case "Medio":
                return "text-yellow-600 bg-yellow-50"
            case "Alto":
                return "text-red-600 bg-red-50"
            default:
                return "text-gray-600 bg-gray-50"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/bonos">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a Bonos
                    </Button>
                </Link>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{bond.nombre}</h2>
                    <p className="text-muted-foreground">{bond.emisor}</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información General</CardTitle>
                            <CardDescription>Detalles principales del bono</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Valor Nominal</label>
                                <p className="text-lg font-semibold">{formatCurrency(bond.valorNominal)}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Tasa de Interés</label>
                                <p className="text-lg font-semibold">{bond.tasaInteres}%</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Fecha de Emisión</label>
                                <p className="text-lg font-semibold">{formatDate(bond.fechaEmision)}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Fecha de Vencimiento</label>
                                <p className="text-lg font-semibold">{formatDate(bond.fechaVencimiento)}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Plazo</label>
                                <p className="text-lg font-semibold">{bond.plazo} meses</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Frecuencia de Pago</label>
                                <p className="text-lg font-semibold capitalize">{bond.frecuenciaPago}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tabla de Amortización</CardTitle>
                            <CardDescription>Cronograma de pagos del bono</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AmortizationTable columns={columns} data={bond.amortizacion} />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Estado del Bono</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Estado</label>
                                <p className="text-lg font-semibold">{bond.estado}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Nivel de Riesgo</label>
                                <Badge className={getRiskColor(bond.riesgo)}>{bond.riesgo}</Badge>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Calificación</label>
                                <p className="text-lg font-semibold">{bond.calificacionRiesgo}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Rendimiento Actual</label>
                                <p className="text-lg font-semibold text-green-600">{bond.rendimientoActual}%</p>
                            </div>
                            {bond.montoInvertido && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Monto Invertido</label>
                                    <p className="text-lg font-semibold">{formatCurrency(bond.montoInvertido)}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Descripción</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{bond.descripcion}</p>
                            <div className="space-y-2">
                                <div>
                                    <label className="text-sm font-medium">Garantías:</label>
                                    <p className="text-sm text-muted-foreground">{bond.garantias}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {bond.estado === "Disponible" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Invertir en este Bono</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" size="lg">
                                    Invertir Ahora
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

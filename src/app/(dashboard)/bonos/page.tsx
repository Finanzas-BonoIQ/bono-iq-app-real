import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BondsTable } from "@/components/bonds-table"
import { getInvestorBonds, getAvailableBonds } from "@/lib/mock-data"

export default function BonosPage() {
    const investorBonds = getInvestorBonds()
    const availableBonds = getAvailableBonds()

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Gestión de Bonos</h2>
                <p className="text-muted-foreground">
                    Administra tu cartera de bonos y explora nuevas oportunidades de inversión
                </p>
            </div>

            <Tabs defaultValue="mis-bonos" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="mis-bonos">Tus Bonos</TabsTrigger>
                    <TabsTrigger value="disponibles">Bonos Disponibles</TabsTrigger>
                </TabsList>

                <TabsContent value="mis-bonos" className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold">Tus Bonos</h3>
                        <p className="text-sm text-muted-foreground">
                            Bonos en los que has invertido y están generando rendimientos
                        </p>
                    </div>
                    <BondsTable bonds={investorBonds} />
                </TabsContent>

                <TabsContent value="disponibles" className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold">Bonos Disponibles para Inversión</h3>
                        <p className="text-sm text-muted-foreground">Nuevas oportunidades de inversión disponibles en el mercado</p>
                    </div>
                    <BondsTable bonds={availableBonds} showInvestButton={true} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

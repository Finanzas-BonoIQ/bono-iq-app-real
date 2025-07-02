
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AmortizationTable } from "./_components/amortization-table";
import { columns } from "./_components/columns";
import { AmortizationRow } from "@/lib/types"; // We'll create this type definition

// Helper function to generate mock data that looks like the Excel sheet
// In a real app, this data would come from your calculation engine
const generateMockData = (): AmortizationRow[] => {
    const data: AmortizationRow[] = [];
    let saldoInicial = 120630.00;
    const startDate = new Date("2025-08-31");

    for (let i = 0; i < 180; i++) {
        const interes = -(saldoInicial * 0.0073996); // Dummy interest calc
        const cuota = -578.75; // Constant from image
        const seguroDesgrav = -60.32 - (i * 0.1); // Make it change slightly
        const seguroRiesgo = -37.50;
        const comision = -1.00;
        const portes = -4.00;
        const gastosAdm = -8.00;
        const flujoTotal = cuota + seguroDesgrav + seguroRiesgo + comision + portes + gastosAdm;

        const currentDate = new Date(startDate);
        currentDate.setMonth(startDate.getMonth() + i);

        data.push({
            n: i + 1,
            fecha: currentDate,
            factor: 0.9926547,
            saldoInicial: saldoInicial,
            interes: interes,
            cuota: -578.75, // The fixed part of the payment
            amort: 313.86 + (i*0.5), // Make it change slightly
            seguroDesgrav: seguroDesgrav,
            seguroRiesgo: seguroRiesgo,
            comision: comision,
            portes: portes,
            gastosAdm: gastosAdm,
            saldoFinal: saldoInicial - (313.86 + (i*0.5)), // Simple reduction for demo
            flujoTEA: 276.36 + (i*0.2), // Dummy
            flujo: flujoTotal,
            valorActual: -666.66 - (i*0.1), // Dummy
        });

        saldoInicial = data[i].saldoFinal;
    }
    return data;
};

export default function AmortizationSchedulePage() {
    const data = generateMockData();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center p-4 sm:p-8">
            <Card className="w-full max-w-7xl shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
                        Tabla de Amortización
                    </CardTitle>
                    <CardDescription className="text-center">
                        Detalle del cronograma de pagos del préstamo.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AmortizationTable columns={columns} data={data} />
                </CardContent>
            </Card>
        </div>
    );
}
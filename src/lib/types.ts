export type AmortizationRow = {
    n: number;
    fecha: Date;
    factor: number;
    saldoInicial: number;
    interes: number;
    cuota: number;
    amort: number;
    seguroDesgrav: number;
    seguroRiesgo: number;
    comision: number;
    portes: number;
    gastosAdm: number;
    saldoFinal: number;
    flujoTEA: number;
    flujo: number;
    valorActual: number;
};
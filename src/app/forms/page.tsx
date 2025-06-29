"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, Calendar, Percent, FileText, TrendingUp } from 'lucide-react';

export default function PeruvianMethodCalculator() {
    const [formData, setFormData] = useState({
        // Loan Basic Info
        salePrice: 150000,
        initialQuota: 20000,
        years: 15,
        paymentFrequency: 30,
        daysPerYear: 360,
        numberOfPayments: '',
        tea: 8.5,

        // Initial Costs
        initialCosts: 150,
        registrationCosts: 250,
        inspection: 30,
        studyCommission: 100,
        activationCommission: 50,

        // Periodic Costs
        periodicCosts: 1,
        desgravamen: 0.06,
        administrationCosts: 8,
        riskInsurance: 0.30,

        // Financing Details
        amountToFinance: 120000,
        loanAmount: 120650,
        numberOfInstallments: 12,
        totalInstallments: 180,
        simpleQuota: 0.739965,

        // Additional Fields
        riskInsuranceRate: 17.50,
        periodicInsurance: 203.4455,
        capitalAmortization: 59.26712,
        desgravamenInsurance: 13.24701,
        riskInsuranceAmount: 6.75,
        periodicCommissions: 58,
        performanceIndicators: 2160,
        rentabilityIndicators: '',
        irrVerification: 'No aplica',
        fluxTcea: 24.5951,
        tcf: 24.54
    });

    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        alert('Cálculo realizado exitosamente!');
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN'
        }).format(value);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-full text-white">
                            <Calculator className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                            MÉTODO AMERICANO
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">Sistema de Cálculo de Préstamos y Financiamiento</p>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Left Column - Loan Details */}
                        <div className="space-y-6">

                            {/* Basic Loan Information */}
                            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                                    <CardTitle className="flex items-center gap-2">
                                        <DollarSign className="w-5 h-5" />
                                        Datos del Préstamo
                                    </CardTitle>
                                    <CardDescription className="text-blue-100">
                                        Información básica del financiamiento
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="salePrice" className="text-sm font-medium text-gray-700">
                                                Precio de Venta del Activo
                                            </Label>
                                            <Input
                                                id="salePrice"
                                                type="number"
                                                value={formData.salePrice}
                                                onChange={(e) => handleInputChange('salePrice', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">{formatCurrency(formData.salePrice)}</p>
                                        </div>
                                        <div>
                                            <Label htmlFor="initialQuota" className="text-sm font-medium text-gray-700">
                                                % Cuota Inicial
                                            </Label>
                                            <Input
                                                id="initialQuota"
                                                type="number"
                                                value={formData.initialQuota}
                                                onChange={(e) => handleInputChange('initialQuota', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="years" className="text-sm font-medium text-gray-700">
                                                Nº de Años
                                            </Label>
                                            <Input
                                                id="years"
                                                type="number"
                                                value={formData.years}
                                                onChange={(e) => handleInputChange('years', parseInt(e.target.value))}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="paymentFrequency" className="text-sm font-medium text-gray-700">
                                                Frecuencia de Pago
                                            </Label>
                                            <Input
                                                id="paymentFrequency"
                                                type="number"
                                                value={formData.paymentFrequency}
                                                onChange={(e) => handleInputChange('paymentFrequency', parseInt(e.target.value))}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="daysPerYear" className="text-sm font-medium text-gray-700">
                                                Nº de días por año
                                            </Label>
                                            <Input
                                                id="daysPerYear"
                                                type="number"
                                                value={formData.daysPerYear}
                                                onChange={(e) => handleInputChange('daysPerYear', parseInt(e.target.value))}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="tea" className="text-sm font-medium text-gray-700">
                                            TEA %
                                        </Label>
                                        <Input
                                            id="tea"
                                            type="number"
                                            value={formData.tea}
                                            onChange={(e) => handleInputChange('tea', parseFloat(e.target.value))}
                                            className="mt-1"
                                            step="0.01"
                                        />
                                        <Badge variant="secondary" className="mt-2">
                                            <Percent className="w-3 h-3 mr-1" />
                                            Tasa Efectiva Anual
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Initial Costs */}
                            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="w-5 h-5" />
                                        Costos Iniciales
                                    </CardTitle>
                                    <CardDescription className="text-orange-100">
                                        Gastos al inicio del préstamo
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="initialCosts" className="text-sm font-medium text-gray-700">
                                                Costes Notariales
                                            </Label>
                                            <Input
                                                id="initialCosts"
                                                type="number"
                                                value={formData.initialCosts}
                                                onChange={(e) => handleInputChange('initialCosts', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="registrationCosts" className="text-sm font-medium text-gray-700">
                                                Costes Registrales
                                            </Label>
                                            <Input
                                                id="registrationCosts"
                                                type="number"
                                                value={formData.registrationCosts}
                                                onChange={(e) => handleInputChange('registrationCosts', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="inspection" className="text-sm font-medium text-gray-700">
                                                Tasación
                                            </Label>
                                            <Input
                                                id="inspection"
                                                type="number"
                                                value={formData.inspection}
                                                onChange={(e) => handleInputChange('inspection', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="studyCommission" className="text-sm font-medium text-gray-700">
                                                Comisión de estudio
                                            </Label>
                                            <Input
                                                id="studyCommission"
                                                type="number"
                                                value={formData.studyCommission}
                                                onChange={(e) => handleInputChange('studyCommission', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="activationCommission" className="text-sm font-medium text-gray-700">
                                                Comisión activación
                                            </Label>
                                            <Input
                                                id="activationCommission"
                                                type="number"
                                                value={formData.activationCommission}
                                                onChange={(e) => handleInputChange('activationCommission', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Periodic Costs */}
                            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        Costos Periódicos
                                    </CardTitle>
                                    <CardDescription className="text-purple-100">
                                        Gastos recurrentes del préstamo
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="periodicCosts" className="text-sm font-medium text-gray-700">
                                                Comisión periódica
                                            </Label>
                                            <Input
                                                id="periodicCosts"
                                                type="number"
                                                value={formData.periodicCosts}
                                                onChange={(e) => handleInputChange('periodicCosts', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="desgravamen" className="text-sm font-medium text-gray-700">
                                                Portes
                                            </Label>
                                            <Input
                                                id="desgravamen"
                                                type="number"
                                                value={formData.desgravamen}
                                                onChange={(e) => handleInputChange('desgravamen', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="administrationCosts" className="text-sm font-medium text-gray-700">
                                                Gastos de Administración
                                            </Label>
                                            <Input
                                                id="administrationCosts"
                                                type="number"
                                                value={formData.administrationCosts}
                                                onChange={(e) => handleInputChange('administrationCosts', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="riskInsurance" className="text-sm font-medium text-gray-700">
                                                % de Seguro riesgo
                                            </Label>
                                            <Input
                                                id="riskInsurance"
                                                type="number"
                                                value={formData.riskInsurance}
                                                onChange={(e) => handleInputChange('riskInsurance', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Financing Details */}
                        <div className="space-y-6">

                            {/* Financing Information */}
                            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                                <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5" />
                                        Del Financiamiento
                                    </CardTitle>
                                    <CardDescription className="text-green-100">
                                        Detalles del monto a financiar
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="amountToFinance" className="text-sm font-medium text-gray-700">
                                                Saldo a financiar
                                            </Label>
                                            <Input
                                                id="amountToFinance"
                                                type="number"
                                                value={formData.amountToFinance}
                                                onChange={(e) => handleInputChange('amountToFinance', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">{formatCurrency(formData.amountToFinance)}</p>
                                        </div>
                                        <div>
                                            <Label htmlFor="loanAmount" className="text-sm font-medium text-gray-700">
                                                Monto del préstamo
                                            </Label>
                                            <Input
                                                id="loanAmount"
                                                type="number"
                                                value={formData.loanAmount}
                                                onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">{formatCurrency(formData.loanAmount)}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="numberOfInstallments" className="text-sm font-medium text-gray-700">
                                                Nº Cuotas por Año
                                            </Label>
                                            <Input
                                                id="numberOfInstallments"
                                                type="number"
                                                value={formData.numberOfInstallments}
                                                onChange={(e) => handleInputChange('numberOfInstallments', parseInt(e.target.value))}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="totalInstallments" className="text-sm font-medium text-gray-700">
                                                Nº Total de Cuotas
                                            </Label>
                                            <Input
                                                id="totalInstallments"
                                                type="number"
                                                value={formData.totalInstallments}
                                                onChange={(e) => handleInputChange('totalInstallments', parseInt(e.target.value))}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="simpleQuota" className="text-sm font-medium text-gray-700">
                                                Valor cuota simple
                                            </Label>
                                            <Input
                                                id="simpleQuota"
                                                type="number"
                                                value={formData.simpleQuota}
                                                onChange={(e) => handleInputChange('simpleQuota', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.000001"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Insurance and Additional Costs */}
                            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
                                    <CardTitle>Seguros y Costos Adicionales</CardTitle>
                                    <CardDescription className="text-indigo-100">
                                        Coberturas y gastos periódicos
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="riskInsuranceRate" className="text-sm font-medium text-gray-700">
                                                % de Seguros del desgravamen
                                            </Label>
                                            <Input
                                                id="riskInsuranceRate"
                                                type="number"
                                                value={formData.riskInsuranceRate}
                                                onChange={(e) => handleInputChange('riskInsuranceRate', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="periodicInsurance" className="text-sm font-medium text-gray-700">
                                                Seguro contra todo riesgo
                                            </Label>
                                            <Input
                                                id="periodicInsurance"
                                                type="number"
                                                value={formData.periodicInsurance}
                                                onChange={(e) => handleInputChange('periodicInsurance', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="capitalAmortization" className="text-sm font-medium text-gray-700">
                                                Intereses
                                            </Label>
                                            <Input
                                                id="capitalAmortization"
                                                type="number"
                                                value={formData.capitalAmortization}
                                                onChange={(e) => handleInputChange('capitalAmortization', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="desgravamenInsurance" className="text-sm font-medium text-gray-700">
                                                Amortización del capital
                                            </Label>
                                            <Input
                                                id="desgravamenInsurance"
                                                type="number"
                                                value={formData.desgravamenInsurance}
                                                onChange={(e) => handleInputChange('desgravamenInsurance', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Performance Indicators */}
                            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
                                    <CardTitle>Indicadores de Rentabilidad</CardTitle>
                                    <CardDescription className="text-amber-100">
                                        Métricas financieras del préstamo
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="performanceIndicators" className="text-sm font-medium text-gray-700">
                                                Portes / Gastos de adm.
                                            </Label>
                                            <Input
                                                id="performanceIndicators"
                                                type="number"
                                                value={formData.performanceIndicators}
                                                onChange={(e) => handleInputChange('performanceIndicators', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="fluxTcea" className="text-sm font-medium text-gray-700">
                                                TCEA del Flujo
                                            </Label>
                                            <Input
                                                id="fluxTcea"
                                                type="number"
                                                value={formData.fluxTcea}
                                                onChange={(e) => handleInputChange('fluxTcea', parseFloat(e.target.value))}
                                                className="mt-1"
                                                step="0.01"
                                            />
                                            <Badge variant="outline" className="mt-2">
                                                <Percent className="w-3 h-3 mr-1" />
                                                {formData.fluxTcea}%
                                            </Badge>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="tcf" className="text-sm font-medium text-gray-700">
                                            TCF
                                        </Label>
                                        <Input
                                            id="tcf"
                                            type="number"
                                            value={formData.tcf}
                                            onChange={(e) => handleInputChange('tcf', parseFloat(e.target.value))}
                                            className="mt-1"
                                            step="0.01"
                                        />
                                        <Badge variant="outline" className="mt-2">
                                            Tasa de Costo Financiero: {formData.tcf}%
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <Button
                            onClick={handleSubmit}
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-12 py-4 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg"
                        >
                            <Calculator className="w-5 h-5 mr-2" />
                            Calcular Préstamo
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
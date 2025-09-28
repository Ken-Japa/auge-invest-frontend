import { Button,Grid } from '@mui/material';
import { useCallback,useEffect, useState } from 'react';

import { HistoricalDataSection } from './components/HistoricalDataSection';
import { ResultsSection } from './components/ResultsSection';
import { ScenariosSection } from './components/ScenariosSection';
import { ValuationInputsSection } from './components/ValuationInputsSection';
import { DEFAULT_SCENARIO_INPUTS,DEFAULT_VALUATION_INPUTS } from './constants';
import { SectionContainer, SectionTitle } from './styled';
import type {
    HistoricalFCF,
    ScenarioInputs,
    SensitivityResults,
    ValuationInputs,
    ValuationResults,
    ValuationSectionProps} from './types';
import { calculateGrowthRate, calculateScenario } from './utils/calculations';

export const ValuationSection = ({
    fluxoCaixaOperacional: defaultFCO,
    fluxoCaixaLivre: defaultFCL,
    precoAcao,
    acoesCirculacao,
    dividaLiquida,
    ebitda,
    lucroLiquido,
    caixaEquivalentes,
    onResultsChange,
    onSensitivityResultsChange
}: ValuationSectionProps) => {
    const [fco, setFco] = useState(defaultFCO);
    const [fcl, setFcl] = useState(defaultFCL);
    const [historicalData, setHistoricalData] = useState<HistoricalFCF[]>([]);
    const [valuationInputs, setValuationInputs] = useState(DEFAULT_VALUATION_INPUTS);
    const [scenarioInputs, setScenarioInputs] = useState(DEFAULT_SCENARIO_INPUTS);
    const [results, setResults] = useState<ValuationResults | null>(null);
    const [sensitivityResults, setSensitivityResults] = useState<SensitivityResults | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const handleValuationInputChange = (field: keyof ValuationInputs, value: number) => {
        setValuationInputs(prev => ({ ...prev, [field]: value }));
        setResults(null);
        setSensitivityResults(null);
    };

    const handleScenarioChange = (
        scenario: 'otimista' | 'pessimista',
        field: keyof ScenarioInputs,
        value: number
    ) => {
        setScenarioInputs(prev => ({
            ...prev,
            [scenario]: { ...prev[scenario], [field]: value }
        }));

        calculateValuation();
    };

    const calculateValuation = useCallback(() => {
        if (!fcl || !acoesCirculacao || !precoAcao) {
            console.error('Missing required inputs for calculation');
            return;
        }

        setIsCalculating(true);

        const baseScenarioInputs = {
            wacc: valuationInputs.wacc,
            crescimentoProjecao: calculateGrowthRate(historicalData, valuationInputs.crescimentoProjecao),
            crescimentoTerminal: valuationInputs.crescimentoTerminal
        };

        try {
            const baseResults = calculateScenario(
                baseScenarioInputs as any,
                fcl,
                dividaLiquida,
                caixaEquivalentes,
                acoesCirculacao,
                precoAcao,
                lucroLiquido
            );

            // Calculate optimistic scenario
            const otimista = calculateScenario(
                scenarioInputs.otimista as any,
                fcl,
                dividaLiquida,
                caixaEquivalentes,
                acoesCirculacao,
                precoAcao,
                lucroLiquido
            );

            // Calculate pessimistic scenario
            const pessimista = calculateScenario(
                scenarioInputs.pessimista as any,
                fcl,
                dividaLiquida,
                caixaEquivalentes,
                acoesCirculacao,
                precoAcao,
                lucroLiquido
            );

            setResults(baseResults);
            setSensitivityResults({ base: baseResults, otimista, pessimista });

            // Call the callback functions if they exist
            if (onResultsChange) onResultsChange(baseResults);
            if (onSensitivityResultsChange) onSensitivityResultsChange({ base: baseResults, otimista, pessimista });
        } catch (error) {
            console.error('Error calculating valuation:', error);
        } finally {
            setIsCalculating(false);
        }
    }, [
        fcl,
        acoesCirculacao,
        precoAcao,
        dividaLiquida,
        caixaEquivalentes,
        lucroLiquido,
        valuationInputs,
        scenarioInputs,
        historicalData,
        onResultsChange,
        onSensitivityResultsChange
    ]);

    useEffect(() => {
        if (fcl && historicalData.length > 0) {
            calculateValuation();
        }
    }, [fcl, historicalData, calculateValuation]);

    const handleCalculateClick = useCallback(() => {
        if (!fcl) {
            console.error('FCL is required for calculation');
            return;
        }
        calculateValuation();
    }, [fcl, calculateValuation]);

    return (
        <SectionContainer>
            <SectionTitle variant="h3" gutterBottom>
                Valuation
            </SectionTitle>

            <ValuationInputsSection
                inputs={valuationInputs}
                fco={fco}
                fcl={fcl}
                onInputChange={handleValuationInputChange}
                onFcoChange={(value) => setFco(value ?? defaultFCO)}
                onFclChange={(value) => setFcl(value ?? defaultFCL)}
            />

            <HistoricalDataSection
                historicalData={historicalData}
                onAddYear={() => setHistoricalData([...historicalData, { year: historicalData.length + 1, value: null }])}
                onRemoveYear={(index) => {
                    const newData = historicalData.filter((_, i) => i !== index)
                        .map((item, idx) => ({ ...item, year: idx + 1 }));
                    setHistoricalData(newData);
                }}
                onDataChange={(index, value) => {
                    const newData = [...historicalData];
                    newData[index].value = value;
                    setHistoricalData(newData);
                }}
            />

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        onClick={handleCalculateClick}
                        fullWidth
                        disabled={isCalculating || !fcl}
                    >
                        {isCalculating ? 'Calculando...' : 'Calcular Valuation'}
                    </Button>
                </Grid>
            </Grid>

            {results && (
                <>
                    <ResultsSection
                        results={results}
                        sensitivityResults={sensitivityResults}
                    />
                    <ScenariosSection
                        scenarioInputs={scenarioInputs as any}
                        sensitivityResults={sensitivityResults}
                        onScenarioChange={handleScenarioChange as any}
                    />
                </>
            )}
        </SectionContainer>
    );
};
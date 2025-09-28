import { Box, Grid, Slider,Typography } from '@mui/material';
import type { SyntheticEvent } from 'react';
import { FC } from 'react';

import { ScenarioInputs, ValuationResults } from '../../types';
import { SensitivityContainer } from './styled';


interface ScenarioInput {
    wacc: number;
    crescimentoProjecao: number;
    crescimentoTerminal: number;
}

interface ScenariosSectionProps {
    scenarioInputs: {
        otimista: ScenarioInput;
        pessimista: ScenarioInput;
    };
    sensitivityResults: {
        otimista: ValuationResults;
        pessimista: ValuationResults;
    } | null;
    onScenarioChange: (
        scenario: 'otimista' | 'pessimista',
        field: keyof ScenarioInput,
        value: number
    ) => void;
}

export const ScenariosSection: FC<ScenariosSectionProps> = ({
    scenarioInputs,
    sensitivityResults,
    onScenarioChange
}) => {
    const handleSliderChange = (
        scenario: 'otimista' | 'pessimista',
        field: keyof ScenarioInput
    ) => (_: Event | SyntheticEvent, value: number | number[]) => {
        const newValue = Array.isArray(value) ? value[0] : value;
        onScenarioChange(scenario, field, newValue);
    };

    return (
        <SensitivityContainer>
            <Typography variant="h6" gutterBottom >
                Análise de Sensibilidade
            </Typography>

            <Grid container spacing={4}>
                {/* Pessimistic Scenario */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Cenário Pessimista
                    </Typography>
                    <Box sx={{ px: 2, py: 1 }}>
                        <Typography gutterBottom>
                            WACC: {scenarioInputs.pessimista.wacc}%
                        </Typography>
                        <Slider
                            value={scenarioInputs.pessimista.wacc}
                            onChange={handleSliderChange('pessimista', 'wacc')}
                            min={12}
                            max={20}
                            step={0.5}
                            marks
                            valueLabelDisplay="auto"
                            sx={{ width: '100%' }}
                        />

                        <Typography gutterBottom sx={{ mt: 2 }}>
                            Crescimento Terminal: {scenarioInputs.pessimista.crescimentoTerminal}%
                        </Typography>
                        <Slider
                            value={scenarioInputs.pessimista.crescimentoTerminal}
                            onChange={handleSliderChange('pessimista', 'crescimentoTerminal')}
                            min={0}
                            max={2}
                            step={0.5}
                            marks
                            valueLabelDisplay="auto"
                            sx={{ width: '100%' }}
                        />

                        <Typography gutterBottom sx={{ mt: 2 }}>
                            Crescimento Projeção: {scenarioInputs.pessimista.crescimentoProjecao}%
                        </Typography>
                        <Slider
                            value={scenarioInputs.pessimista.crescimentoProjecao}
                            onChange={handleSliderChange('pessimista', 'crescimentoProjecao')}
                            min={-5}
                            max={0}
                            step={0.5}
                            marks
                            valueLabelDisplay="auto"
                            sx={{ width: '100%' }}
                        />
                    </Box>
                </Grid>

                {/* Optimistic Scenario */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Cenário Otimista
                    </Typography>
                    <Box sx={{ px: 2, py: 1 }}>
                        <Typography gutterBottom>
                            WACC: {scenarioInputs.otimista.wacc}%
                        </Typography>
                        <Slider
                            value={scenarioInputs.otimista.wacc}
                            onChange={handleSliderChange('otimista', 'wacc')}
                            min={5}
                            max={12}
                            step={0.5}
                            marks
                            valueLabelDisplay="auto"
                            sx={{ width: '100%' }}
                        />

                        <Typography gutterBottom sx={{ mt: 2 }}>
                            Crescimento Terminal: {scenarioInputs.otimista.crescimentoTerminal}%
                        </Typography>
                        <Slider
                            value={scenarioInputs.otimista.crescimentoTerminal}
                            onChange={handleSliderChange('otimista', 'crescimentoTerminal')}
                            min={2}
                            max={5}
                            step={0.5}
                            marks
                            valueLabelDisplay="auto"
                            sx={{ width: '100%' }}
                        />

                        <Typography gutterBottom sx={{ mt: 2 }}>
                            Crescimento Projeção: {scenarioInputs.otimista.crescimentoProjecao}%
                        </Typography>
                        <Slider
                            value={scenarioInputs.otimista.crescimentoProjecao}
                            onChange={handleSliderChange('otimista', 'crescimentoProjecao')}
                            min={0}
                            max={10}
                            step={0.5}
                            marks
                            valueLabelDisplay="auto"
                            sx={{ width: '100%' }}
                        />
                    </Box>
                </Grid>

                {sensitivityResults && (
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Comparação de Cenários
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Typography>
                                Variação de Preço: R$ {sensitivityResults.pessimista.precoJusto.toFixed(2)} - R$ {sensitivityResults.otimista.precoJusto.toFixed(2)}
                            </Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </SensitivityContainer>
    );
};
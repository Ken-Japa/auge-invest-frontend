import { Box,Grid, Typography } from '@mui/material';
import { FC } from 'react';

import { CustomAccordion } from '@/components/Core/Accordion';

import { SensitivityResults,ValuationResults } from '../../types';
import { ResultsContainer } from './styled';

interface ResultsSectionProps {
    results: ValuationResults;
    sensitivityResults: SensitivityResults | null;
}

export const ResultsSection: FC<ResultsSectionProps> = ({
    results,
    sensitivityResults
}) => {
    return (
        <ResultsContainer>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Resultados do Valuation
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">
                        Preço Justo: R$ {results.precoJusto.toFixed(2)}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">
                        Subvalorização: {results.subvalorizacao.toFixed(2)}%
                    </Typography>
                </Grid>

                {/* Add growth rates section */}
                <Grid item xs={12}>
                    <Box title="Taxas Utilizadas no Cálculo">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Typography variant="subtitle2" gutterBottom>
                                    WACC: {results.detalhes.waccUtilizado.toFixed(2)}%
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Taxa de Crescimento na Projeção: {results.taxaProjecaoUtilizada.toFixed(2)}%
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Crescimento Terminal: {results.crescimentoTerminalUtilizado.toFixed(2)}%
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>


            </Grid>
        </ResultsContainer>
    );
};
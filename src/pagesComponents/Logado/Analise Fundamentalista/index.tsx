'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Container, Typography, Grid, IconButton } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

import { PageTransition } from '@/components/Utils/PageTransition';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';

import { DadosAnaliseFundamental, MetricasCalculadas } from './types';
import { DataInputForm } from './components/DataInputForm';
import { MetricsDisplay } from './components/MetricsDisplay';
import { HelpDialog } from './components/HelpDialog';
import { ContentContainer, StyledPaper } from './styled';
import { ValuationSection } from './components/ValuationSection';
import { SaveReportSection } from './components/SaveReportSection';
import { PageBackground } from '@/components/Layout/PageBackground';

import { generateReport } from './components/SaveReportSection/utils/reportGenerator';
import { ValuationResults, SensitivityResults } from './components/ValuationSection/types';
import { GenerateReportParams } from './components/SaveReportSection/utils/types';
import { generatePDF } from './components/SaveReportSection/utils/pdfGenerator';

export const AnaliseFundamentalista = () => {
    const [helpOpen, setHelpOpen] = useState(false);
    const [results, setResults] = useState<ValuationResults | null>(null);
    const [sensitivityResults, setSensitivityResults] = useState<SensitivityResults | null>(null);

    const { control, watch } = useForm<DadosAnaliseFundamental>({
        defaultValues: {
            precoAcao: 0,
            acoesCirculacao: 0,
            receitaLiquida: 0,
        }
    });

    const formValues = watch();

    const [metricsResults, setMetricsResults] = useState<MetricasCalculadas | undefined>(undefined);

    const valuationResultsRef = useRef<ValuationResults | null>(null);
    const sensitivityResultsRef = useRef<SensitivityResults | null>(null);

    // Update the refs when results change
    useEffect(() => {
        valuationResultsRef.current = results;
    }, [results]);

    useEffect(() => {
        sensitivityResultsRef.current = sensitivityResults;
    }, [sensitivityResults]);

    const handleSaveReport = async (params: GenerateReportParams) => {
        let content: string | Blob;
        let mimeType: string;
        let fileExtension: string;

        if (params.options.format === 'pdf') {
            content = await generatePDF(params);
            mimeType = 'application/pdf';
            fileExtension = 'pdf';
        } else {
            content = generateReport(params);
            mimeType = 'text/markdown';
            fileExtension = 'md';
        }

        const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${params.options.companyName}.${fileExtension}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const metricsRef = useRef<any>(null);

    return (
        <PageTransition>
            <ErrorBoundary>
                <PageBackground imageName="Fundamentalista">
                    <Container maxWidth="lg">
                        <ContentContainer>
                            <SuspenseWrapper>
                                <ProgressiveLoad>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                                        <Typography variant="h2" gutterBottom>
                                            Análise Fundamentalista
                                        </Typography>
                                        <IconButton onClick={() => setHelpOpen(true)} sx={{ ml: 2 }}>
                                            <HelpIcon />
                                        </IconButton>
                                    </Box>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <StyledPaper>
                                                <DataInputForm control={control} />
                                            </StyledPaper>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <StyledPaper>
                                                <MetricsDisplay
                                                    ref={metricsRef}
                                                    data={formValues}
                                                />
                                            </StyledPaper>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <StyledPaper>
                                                <ValuationSection
                                                    fluxoCaixaOperacional={formValues.fluxoCaixaOperacional}
                                                    fluxoCaixaLivre={formValues.fluxoCaixaLivre}
                                                    precoAcao={formValues.precoAcao}
                                                    acoesCirculacao={formValues.acoesCirculacao}
                                                    dividaLiquida={formValues.dividaLiquida}
                                                    ebitda={formValues.ebitda}
                                                    lucroLiquido={formValues.lucroLiquido}
                                                    patrimonioLiquido={formValues.patrimonioLiquido}
                                                    caixaEquivalentes={formValues.caixaEquivalentes}
                                                    onResultsChange={setResults}
                                                    onSensitivityResultsChange={setSensitivityResults}
                                                />
                                            </StyledPaper>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <StyledPaper>
                                                <SaveReportSection
                                                    onSave={handleSaveReport}
                                                    isEnabled={!!formValues.precoAcao && !!formValues.acoesCirculacao}
                                                    fundamentalData={formValues}
                                                    valuationResults={results}
                                                    sensitivityResults={sensitivityResults}
                                                    metricsResults={metricsResults}
                                                />
                                            </StyledPaper>
                                        </Grid>
                                    </Grid>
                                    <HelpDialog
                                        open={helpOpen}
                                        onClose={() => setHelpOpen(false)}
                                    />
                                </ProgressiveLoad>
                            </SuspenseWrapper>
                        </ContentContainer>
                    </Container>
                </PageBackground>
            </ErrorBoundary>
        </PageTransition>
    );
}
'use client'

import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import HelpIcon from '@mui/icons-material/Help'
import { Box, Container, Grid, IconButton } from '@mui/material'
import { useForm } from 'react-hook-form'

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { PageBackground } from '@/components/Layout/PageBackground'
import { PageTransition } from '@/components/Helpers/PageTransition'
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'

import { DataInputForm } from './components/DataInputForm'
const HelpDialog = lazy(() => import('./components/HelpDialog').then((mod) => ({ default: mod.HelpDialog })))
import { MetricsDisplay } from './components/MetricsDisplay'
import { SaveReportSection } from './components/SaveReportSection'
import { GenerateReportParams } from './components/SaveReportSection/utils/types'
import { generatePDF } from './components/SaveReportSection/utils/pdfGenerator'
import { generateReport } from './components/SaveReportSection/utils/reportGenerator'
import { ValuationSection } from './components/ValuationSection'
import { SensitivityResults, ValuationResults } from './components/ValuationSection/types'
import { ContentContainer, StyledPaper, StyledPaperInput, Title } from './styled'
import { DadosAnaliseFundamental, MetricasCalculadas } from './types'

export const AnaliseFundamentalista = () => {
  const [helpOpen, setHelpOpen] = useState(false)
  const [results, setResults] = useState<ValuationResults | null>(null)
  const [sensitivityResults, setSensitivityResults] = useState<SensitivityResults | null>(null)

  const { control, watch } = useForm<DadosAnaliseFundamental>({
    defaultValues: {
      precoAcao: 0,
      acoesCirculacao: 0,
      receitaLiquida: 0,
    },
  })

  const formValues = watch()

  const [metricsResults, setMetricsResults] = useState<MetricasCalculadas | undefined>(undefined)

  const valuationResultsRef = useRef<ValuationResults | null>(null)
  const sensitivityResultsRef = useRef<SensitivityResults | null>(null)

  // Update the refs when results change
  useEffect(() => {
    valuationResultsRef.current = results
  }, [results])

  useEffect(() => {
    sensitivityResultsRef.current = sensitivityResults
  }, [sensitivityResults])

  const handleSaveReport = async (params: GenerateReportParams) => {
    let content: string | Blob
    let mimeType: string
    let fileExtension: string

    if (params.options.format === 'pdf') {
      content = await generatePDF(params)
      mimeType = 'application/pdf'
      fileExtension = 'pdf'
    } else {
      content = generateReport(params)
      mimeType = 'text/markdown'
      fileExtension = 'md'
    }

    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${params.options.companyName}.${fileExtension}`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const metricsRef = useRef<any>(null)

  return (
    <PageTransition>
      <ErrorBoundary>
        <PageBackground imageName="Fundamentalista">
          <Container maxWidth="lg">
            <ContentContainer>
              <SuspenseWrapper>
                <ProgressiveLoad>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 6 }}>
                    <Title>Análise Fundamentalista</Title>
                    <IconButton
                      onClick={() => setHelpOpen(true)}
                      sx={{ ml: 2, '&:hover': { color: (theme) => theme.palette.primary.main } }}
                    >
                      <HelpIcon />
                    </IconButton>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <StyledPaperInput>
                        <DataInputForm control={control} />
                      </StyledPaperInput>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <StyledPaper>
                        <MetricsDisplay ref={metricsRef} data={formValues} />
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
                      <StyledPaperInput>
                        <SaveReportSection
                          onSave={handleSaveReport}
                          isEnabled={!!formValues.precoAcao && !!formValues.acoesCirculacao}
                          fundamentalData={formValues}
                          valuationResults={results}
                          sensitivityResults={sensitivityResults}
                          metricsResults={metricsResults}
                        />
                      </StyledPaperInput>
                    </Grid>
                  </Grid>
                  <Suspense fallback={<div>Loading Help...</div>}>
                    <HelpDialog open={helpOpen} onClose={() => setHelpOpen(false)} />
                  </Suspense>
                </ProgressiveLoad>
              </SuspenseWrapper>
            </ContentContainer>
          </Container>
        </PageBackground>
      </ErrorBoundary>
    </PageTransition>
  )
}

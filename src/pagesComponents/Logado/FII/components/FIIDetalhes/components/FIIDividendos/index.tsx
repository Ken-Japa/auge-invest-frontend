'use client'
import { Alert, CircularProgress, Typography } from '@mui/material'
import { lazy, Suspense } from 'react'

import { useFIIDividendosLogic } from './hooks/useFIIDividendosLogic'
import { DividendContainer, DividendPaper, DividendTitle, ErrorContainer, LoadingContainer } from './styled'

const LazyFIIDividendSummaryDisplay = lazy(() => import('./FIIDividendSummary'))
const LazyFIIDividendTable = lazy(() => import('./FIIDividendTable'))

interface FIIDividendosProps {
  nomeFII: string
}

interface FIIDividendosProps {
  nomeFII: string
}

const FIIDividendos = ({ nomeFII }: FIIDividendosProps) => {
  const { dividends, loading, error, summary } = useFIIDividendosLogic({ nomeFII })

  if (loading) {
    return (
      <DividendContainer>
        <DividendPaper>
          <LoadingContainer>
            <CircularProgress size={40} />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Carregando dividendos...
            </Typography>
          </LoadingContainer>
        </DividendPaper>
      </DividendContainer>
    )
  }

  if (error) {
    return (
      <DividendContainer>
        <DividendPaper>
          <ErrorContainer>
            <Alert severity="error">{error}</Alert>
          </ErrorContainer>
        </DividendPaper>
      </DividendContainer>
    )
  }

  if (!dividends.length) {
    return null
  }

  return (
    <DividendContainer>
      <DividendPaper>
        <DividendTitle variant="h4" gutterBottom>
          Dividendos Recebidos
        </DividendTitle>

        <Suspense fallback={<div>Carregando resumo de dividendos...</div>}>
          <LazyFIIDividendSummaryDisplay summary={summary} />
        </Suspense>

        <Suspense fallback={<div>Carregando tabela de dividendos...</div>}>
          <LazyFIIDividendTable dividends={dividends} />
        </Suspense>
      </DividendPaper>
    </DividendContainer>
  )
}

export default FIIDividendos

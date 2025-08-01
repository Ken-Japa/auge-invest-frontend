"use client";
import { Alert, CircularProgress, Typography } from '@mui/material';
import {
  DividendContainer,
  DividendPaper,
  DividendTitle,
  ErrorContainer,
  LoadingContainer,
} from './styled';
import { useFIIDividendosLogic } from './hooks/useFIIDividendosLogic';
import FIIDividendSummaryDisplay from './FIIDividendSummary';
import FIIDividendTable from './FIIDividendTable';

interface FIIDividendosProps {
  nomeFII: string;
}

interface FIIDividendosProps {
  nomeFII: string;
}

const FIIDividendos = ({ nomeFII }: FIIDividendosProps) => {
  const { dividends, loading, error, summary } = useFIIDividendosLogic({ nomeFII });

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
    );
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
    );
  }

  if (!dividends.length) {
    return null;
  }

  return (
    <DividendContainer>
      <DividendPaper>
        <DividendTitle variant="h4" gutterBottom>
          Dividendos Recebidos
        </DividendTitle>

        <FIIDividendSummaryDisplay summary={summary} />

        <FIIDividendTable dividends={dividends} />
      </DividendPaper>
    </DividendContainer>
  );
};

export default FIIDividendos;
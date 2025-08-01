"use client";
import { Alert, CircularProgress, Tooltip, Typography } from '@mui/material';
import { formatCurrency } from '@/components/Utils/Formatters/formatters';
import BDRDividendTable from './BDRDividendTable';
import useBDRDividendosLogic from './useBDRDividendosLogic';
import {
  DividendContainer,
  DividendPaper,
  DividendSummary,
  DividendTitle,
  ErrorContainer,
  LoadingContainer,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
} from './styled';



interface BDRDividendosProps {
  codigoEmpresa: string;
}

interface BDRDividendosProps {
  codigoEmpresa: string;
}

const BDRDividendos = ({ codigoEmpresa }: BDRDividendosProps) => {
  const { dividends, loading, error, summary } = useBDRDividendosLogic(codigoEmpresa);

  const getStatusColor = (tipoDividendo: string) => {
    switch (tipoDividendo.toUpperCase()) {
      case 'DIVIDENDO':
        return 'success';
      case 'RENDIMENTO':
        return 'warning';
      case 'AMORTIZAÇÃO':
        return 'info';
      default:
        return 'default';
    }
  };

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
        <DividendTitle variant="h3">
          Histórico de Dividendos {codigoEmpresa}
        </DividendTitle>

        <DividendSummary>
          <SummaryItem>
            <SummaryLabel>Último Dividendo</SummaryLabel>
            <SummaryValue>{formatCurrency(summary.lastValue)}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Média</SummaryLabel>
            <SummaryValue>{formatCurrency(summary.average)}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <Tooltip title={`Desde: ${summary.firstPaymentDate}`} arrow placement="top">
              <div>
                <SummaryLabel>Total Acumulado</SummaryLabel>
                <SummaryValue>{formatCurrency(summary.total)}</SummaryValue>
              </div>
            </Tooltip>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Frequência</SummaryLabel>
            <SummaryValue>{summary.paymentFrequency}</SummaryValue>
          </SummaryItem>
        </DividendSummary>

        <BDRDividendTable dividends={dividends} />
      </DividendPaper>
    </DividendContainer>
  );
};

export default BDRDividendos;
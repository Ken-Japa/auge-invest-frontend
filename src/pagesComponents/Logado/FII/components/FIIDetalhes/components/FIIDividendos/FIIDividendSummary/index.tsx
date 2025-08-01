import { Tooltip, Typography } from '@mui/material';
import { formatCurrency } from '@/components/Utils/Formatters/formatters';
import { DividendSummary, SummaryItem, SummaryLabel, SummaryValue } from '../styled';

interface FIIDividendSummaryDisplayProps {
  summary: {
    total: number;
    average: number;
    lastValue: number;
    paymentFrequency: string;
    firstPaymentDate: string;
  };
}

const FIIDividendSummaryDisplay = ({ summary }: FIIDividendSummaryDisplayProps) => {
  return (
    <DividendSummary>
      <SummaryItem>
        <SummaryLabel>Total Recebido:</SummaryLabel>
        <SummaryValue>
          <Typography variant="body1" component="span">{formatCurrency(summary.total)}</Typography>
        </SummaryValue>
      </SummaryItem>
      <SummaryItem>
        <SummaryLabel>Média por Dividendo:</SummaryLabel>
        <SummaryValue>
          <Typography variant="body1" component="span">{formatCurrency(summary.average)}</Typography>
        </SummaryValue>
      </SummaryItem>
      <SummaryItem>
        <SummaryLabel>Último Dividendo:</SummaryLabel>
        <SummaryValue>
          <Typography variant="body1" component="span">{formatCurrency(summary.lastValue)}</Typography>
        </SummaryValue>
      </SummaryItem>
      <SummaryItem>
        <SummaryLabel>
          <Tooltip title={`Primeiro pagamento em: ${summary.firstPaymentDate}`}>
            <Typography variant="body1" component="span">Frequência de Pagamento:</Typography>
          </Tooltip>
        </SummaryLabel>
        <SummaryValue>
          <Typography variant="body1" component="span">{summary.paymentFrequency}</Typography>
        </SummaryValue>
      </SummaryItem>
    </DividendSummary>
  );
};

export default FIIDividendSummaryDisplay;
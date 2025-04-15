"use client";
import { useState, useEffect } from 'react';
import { CircularProgress, Alert, Typography, Tooltip } from '@mui/material';
import { api } from '@/services/api';
import { formatCurrency, formatDate } from '@/components/Utils/Formatters/formatters';
import {
  DividendContainer,
  DividendPaper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  HeaderCell,
  StatusChip,
  NoDataContainer,
  LoadingContainer,
  ErrorContainer,
  DividendTitle,
  DividendSummary,
  SummaryItem,
  SummaryLabel,
  SummaryValue
} from './styled';

interface FIIDividendosProps {
  nomeFII: string;
}

interface FIIDividendResponse {
  result: {
    _id: string;
    nomeFII: string;
    quantidade: string;
    totalDividendos: number;
    dividendos: Dividend[];
  };
  pagination: {
    offset: number;
    limit: number;
    total: number;
    page: number;
    pages: number;
  };
}

interface Dividend {
  _id?: string;
  id?: string;
  dataPagamento: string;
  valor: string | number;
  relativo: string;
  dataAprovacao: string;
  tipoDividendo: string;
  ultimoDiaCom?: string;
}

const FIIDividendos = ({ nomeFII }: FIIDividendosProps) => {
  const [dividends, setDividends] = useState<Dividend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDividends = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.fiis.getFIIDividends({
          nomeFII,
          pageSize: 100,
          page: 0
        }) as unknown as FIIDividendResponse;

        if (response && response.result && response.result.dividendos) {
          setDividends(response.result.dividendos);
        } else {
          setDividends([]);
        }
      } catch (err) {
        console.error('Erro ao buscar dividendos:', err);
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro ao buscar os dividendos';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (nomeFII) {
      fetchDividends();
    }
  }, [nomeFII]);

  const calculateSummary = () => {
    if (!dividends.length) return { total: 0, average: 0, lastValue: 0, paymentFrequency: 'N/A', firstPaymentDate: '' };

    // Convert string values to numbers for calculations
    const values = dividends.map(div => {
      const value = typeof div.valor === 'string' ?
        parseFloat(div.valor.replace(',', '.')) :
        div.valor;
      return isNaN(value) ? 0 : value;
    });

    const total = values.reduce((sum, val) => sum + val, 0);
    const average = total / values.length;
    const lastValue = values[0] || 0;

    // Helper function to safely parse dates
    const parseDate = (dateString: string) => {
      try {
        // Handle different date formats
        // First try direct parsing
        const date = new Date(dateString);

        // Check if date is valid
        if (!isNaN(date.getTime())) {
          return date;
        }

        // If direct parsing fails, try to parse DD/MM/YYYY format
        if (dateString.includes('/')) {
          const [day, month, year] = dateString.split('/').map(Number);
          return new Date(year, month - 1, day);
        }

        // Try to parse Brazilian date format DD/MM/YYYY
        const parts = dateString.match(/(\d+)/g);
        if (parts && parts.length >= 3) {
          // Assuming day/month/year format
          return new Date(
            parseInt(parts[2]),
            parseInt(parts[1]) - 1,
            parseInt(parts[0])
          );
        }

        return null;
      } catch (e) {
        console.error('Error parsing date:', dateString, e);
        return null;
      }
    };

    // Sort dividends by payment date (oldest first)
    const validDividends = dividends.filter(d => d.dataPagamento && parseDate(d.dataPagamento));

    const sortedByDate = [...validDividends].sort((a, b) => {
      const dateA = parseDate(a.dataPagamento);
      const dateB = parseDate(b.dataPagamento);

      if (!dateA || !dateB) return 0;
      return dateA.getTime() - dateB.getTime();
    });

    // Get the first (oldest) payment date for the tooltip
    const firstPaymentDate = sortedByDate.length > 0 ? formatDate(sortedByDate[0].dataPagamento) : '';

    // Calculate frequency (average days between payments)
    let paymentFrequency = 'N/A';

    if (sortedByDate.length > 1) {
      try {
        const firstDate = parseDate(sortedByDate[0].dataPagamento);
        const lastDate = parseDate(sortedByDate[sortedByDate.length - 1].dataPagamento);

        if (firstDate && lastDate) {
          // Calculate total days between first and last payment
          const totalDays = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);

          // Calculate average days between payments
          const avgDays = totalDays / (sortedByDate.length - 1);

          // Format the result
          paymentFrequency = `${Math.round(avgDays)} dias`;
        }
      } catch (e) {
        console.error('Error calculating payment frequency:', e);
      }
    } else if (sortedByDate.length === 1) {
      paymentFrequency = 'Único pagamento';
    }

    return {
      total,
      average,
      lastValue,
      paymentFrequency,
      firstPaymentDate
    };
  };

  const summary = calculateSummary();

  const getStatusColor = (tipoDividendo: string) => {
    switch (tipoDividendo.toUpperCase()) {
      case 'RENDIMENTO':
        return 'success';
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
          Histórico de Dividendos
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

        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <HeaderCell align="center">Data Base</HeaderCell>
                <HeaderCell align="center">Data Pagamento</HeaderCell>
                <HeaderCell align="center">Valor (R$)</HeaderCell>
                <HeaderCell align="center">Relativo</HeaderCell>
                <HeaderCell align="center">Tipo</HeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dividends.map((dividend, index) => {
                const valor = typeof dividend.valor === 'string' ?
                  parseFloat(dividend.valor.replace(',', '.')) :
                  dividend.valor;

                return (
                  <TableRow key={dividend._id || dividend.id || index}>
                    <TableCell>{formatDate(dividend.dataAprovacao)}</TableCell>
                    <TableCell>{formatDate(dividend.dataPagamento)}</TableCell>
                    <TableCell align="right">{formatCurrency(valor)}</TableCell>
                    <TableCell align="right">{dividend.relativo}</TableCell>
                    <TableCell align="center">
                      <StatusChip
                        label={dividend.tipoDividendo}
                        color={getStatusColor(dividend.tipoDividendo) as any}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DividendPaper>
    </DividendContainer>
  );
};

export default FIIDividendos;
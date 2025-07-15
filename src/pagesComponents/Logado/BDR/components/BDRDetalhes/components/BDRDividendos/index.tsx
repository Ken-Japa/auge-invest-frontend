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

interface BDRDividendosProps {
  codigoEmpresa: string;
}

interface BDRDividendResponse {
  result: {
    _id: string;
    nomeEmpresa: string;
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
  dataAprovacao: string;
  tipo: string;
  ultimoDiaCom?: string;
}

const BDRDividendos = ({ codigoEmpresa }: BDRDividendosProps) => {
  const [dividends, setDividends] = useState<Dividend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDividends = async () => {
      try {
        setLoading(true);
        setError(null);

        // Tenta buscar dividendos de BDRs patrocinados primeiro
        try {
          const response = await api.bdrs.getBDRDividends({
            nomeEmpresa: codigoEmpresa,
            pageSize: 100,
            page: 0
          }) as unknown as BDRDividendResponse;

          if (response && response.result && response.result.dividendos) {
            setDividends(response.result.dividendos);
            return;
          }
        } catch (err) {
          console.log('Não encontrou dividendos em BDRs patrocinados, tentando não patrocinados');
        }
        // Se chegou aqui, não encontrou dividendos
        setDividends([]);
      } catch (err) {
        console.error('Erro ao buscar dividendos:', err);
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro ao buscar os dividendos';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (codigoEmpresa) {
      fetchDividends();
    }
  }, [codigoEmpresa]);

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
        if (!dateString) return null;

        // Expecting DD/MM/AAAA format
        if (dateString.includes('/')) {
          const [day, month, year] = dateString.split('/').map(Number);
          // Basic validation for date components
          if (day > 0 && day <= 31 && month > 0 && month <= 12 && year > 1900) {
            const date = new Date(year, month - 1, day);
            // Validate if the date components match after creation to catch invalid dates like 31/02
            if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
              return date;
            }
          }
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

        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <HeaderCell align="center">Data Base</HeaderCell>
                <HeaderCell align="center">Data Pagamento</HeaderCell>
                <HeaderCell align="center">Valor (R$)</HeaderCell>
                <HeaderCell align="center">Tipo</HeaderCell>
                <HeaderCell align="center">Último Dia com</HeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dividends.map((dividend, index) => {
                const valor = typeof dividend.valor === 'string' ?
                  parseFloat(dividend.valor.replace(',', '.')) :
                  dividend.valor;

                return (
                  <TableRow key={dividend._id || dividend.id || index}>
                    <TableCell>{dividend.dataAprovacao}</TableCell>
                    <TableCell>{dividend.dataPagamento}</TableCell>
                    <TableCell align="right">{formatCurrency(valor)}</TableCell>
                    <TableCell align="center">
                      <StatusChip
                        label={dividend.tipo}
                        color={getStatusColor(dividend.tipo) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell >{dividend.ultimoDiaCom}</TableCell>
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

export default BDRDividendos;
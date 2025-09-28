import { useEffect, useState } from "react";

import {
  formatDate,
  parseDateDividends as parseDate,
} from "@/components/Utils/Formatters/formatters";
import { api } from "@/services/api";
import {
  BDRDividendItem as Dividend,
  BDRDividendResponseData as BDRDividendResponse,
} from "@/services/api";

interface SummaryData {
  total: number;
  average: number;
  lastValue: number;
  paymentFrequency: string;
  firstPaymentDate: string;
}

const useBDRDividendosLogic = (codigoEmpresa: string) => {
  const [dividends, setDividends] = useState<Dividend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<SummaryData>({
    total: 0,
    average: 0,
    lastValue: 0,
    paymentFrequency: "N/A",
    firstPaymentDate: "",
  });

  useEffect(() => {
    const fetchDividends = async () => {
      try {
        setLoading(true);
        setError(null);

        try {
          const response = (await api.bdrs.getBDRDividends({
            nomeEmpresa: codigoEmpresa,
            pageSize: 100,
            page: 0,
          })) as unknown as BDRDividendResponse;

          if (response && response.result && response.result.dividendos) {
            setDividends(response.result.dividendos);
            return;
          }
        } catch (err) {
          console.log(
            "Não encontrou dividendos em BDRs patrocinados, tentando não patrocinados"
          );
        }
        setDividends([]);
      } catch (err) {
        console.error("Erro ao buscar dividendos:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Ocorreu um erro ao buscar os dividendos";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (codigoEmpresa) {
      fetchDividends();
    }
  }, [codigoEmpresa]);

  useEffect(() => {
    const calculateSummary = () => {
      if (!dividends.length)
        return {
          total: 0,
          average: 0,
          lastValue: 0,
          paymentFrequency: "N/A",
          firstPaymentDate: "",
        };

      const values = dividends.map((div) => {
        const value =
          typeof div.valor === "string"
            ? parseFloat(div.valor.replace(",", "."))
            : div.valor;
        return isNaN(value) ? 0 : value;
      });

      const total = values.reduce((sum, val) => sum + val, 0);
      const average = total / values.length;
      const lastValue = values[0] || 0;

      const validDividends = dividends.filter(
        (d) => d.dataPagamento && parseDate(d.dataPagamento)
      );

      const sortedByDate = [...validDividends].sort((a, b) => {
        const dateA = parseDate(a.dataPagamento);
        const dateB = parseDate(b.dataPagamento);

        if (!dateA || !dateB) return 0;
        return dateA.getTime() - dateB.getTime();
      });

      const firstPaymentDate =
        sortedByDate.length > 0
          ? formatDate(sortedByDate[0].dataPagamento)
          : "";

      let paymentFrequency = "N/A";

      if (sortedByDate.length > 1) {
        try {
          const firstDate = parseDate(sortedByDate[0].dataPagamento);
          const lastDate = parseDate(
            sortedByDate[sortedByDate.length - 1].dataPagamento
          );

          if (firstDate && lastDate) {
            const totalDays =
              (lastDate.getTime() - firstDate.getTime()) /
              (1000 * 60 * 60 * 24);
            const avgDays = totalDays / (sortedByDate.length - 1);
            paymentFrequency = `${Math.round(avgDays)} dias`;
          }
        } catch (e) {
          console.error("Error calculating payment frequency:", e);
        }
      } else if (sortedByDate.length === 1) {
        paymentFrequency = "Único pagamento";
      }

      return {
        total,
        average,
        lastValue,
        paymentFrequency,
        firstPaymentDate,
      };
    };

    setSummary(calculateSummary());
  }, [dividends]);

  return { dividends, loading, error, summary };
};

export default useBDRDividendosLogic;

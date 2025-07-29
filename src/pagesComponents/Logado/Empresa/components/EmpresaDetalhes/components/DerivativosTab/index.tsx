import React, { useState, useEffect, useMemo } from 'react';
import {
  CircularProgress,
  Alert
} from '@mui/material';
import { api } from '@/services/api';
import { VencimentoTabs } from './components/VencimentoTabs';
import { OpcoesTable } from './components/OpcoesTable';
import {
  DerivativosContainer,
  VencimentoInfo,
  TitleTypography,
  SubtitleTypography,
  LoadingContainer
} from './styled';

interface DerivativoItem {
  "COD Opcao": string;
  "Call ou Put": string;
  "Tipo": string;
  "ON ou PN": string;
  "Strike": string;
  "Vencimento": string;
  "Ultimo Preco": number;
  "Data Negocio": string | null;
  "Hora Negocio": string;
  "Oferta Compra": number;
  "Oferta Venda": number;
  "Volume": number;
  "Contratos": number;
  "_id": string;
}

interface DerivativosResponse {
  success?: boolean;
  data?: {
    _id: string;
    Empresa: string;
    "COD Empresa": string;
    totalDerivativos: number;
    Derivativos: DerivativoItem[];
    pagination: {
      offset: number;
      limit: number;
      total: number;
      page: number;
      pages: number;
    };
  };
  _id?: string;
  Empresa?: string;
  "COD Empresa"?: string;
  totalDerivativos?: number;
  Derivativos?: DerivativoItem[];
  pagination?: {
    offset: number;
    limit: number;
    total: number;
    page: number;
    pages: number;
  };
}

interface DerivativosTabProps {
  codigoBase: string;
}

export const DerivativosTab: React.FC<DerivativosTabProps> = ({ codigoBase }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [derivativos, setDerivativos] = useState<DerivativoItem[]>([]);
  const [totalDerivativos, setTotalDerivativos] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [hasDerivatives, setHasDerivatives] = useState(true);
  const [selectedVencimento, setSelectedVencimento] = useState<string>('');
  const [allDerivativesLoaded, setAllDerivativesLoaded] = useState(false);

  // Fetch all derivatives at once
  useEffect(() => {
    const fetchAllDerivativos = async () => {
      if (!codigoBase) {
        setError('Código de ativo não fornecido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // First, get the total count
        const initialResponse: DerivativosResponse = await api.derivatives.getDerivatives({
          cod_empresa: codigoBase,
          page: 0,
          pageSize: 10
        });

        let totalCount = 0;
        if (initialResponse.totalDerivativos) {
          totalCount = initialResponse.totalDerivativos;
        } else if (initialResponse.data?.totalDerivativos) {
          totalCount = initialResponse.data.totalDerivativos;
        }

        if (totalCount === 0) {
          setHasDerivatives(false);
          setLoading(false);
          return;
        }

        // Now fetch all derivatives in one request with a large page size
        const response: DerivativosResponse = await api.derivatives.getDerivatives({
          cod_empresa: codigoBase,
          page: 0,
          pageSize: totalCount // Get all at once
        });

        if (response.Derivativos && Array.isArray(response.Derivativos)) {
          setDerivativos(response.Derivativos);
          setTotalDerivativos(response.Derivativos.length);
          setHasDerivatives(response.Derivativos.length > 0);
        }
        else if (response.success && response.data) {
          setDerivativos(response.data.Derivativos || []);
          setTotalDerivativos(response.data.Derivativos.length);
          setHasDerivatives(response.data.Derivativos.length > 0);
        } else {
          setHasDerivatives(false);
          setError('Dados de derivativos não disponíveis');
        }

        setAllDerivativesLoaded(true);
      } catch (err) {
        console.error('Erro ao buscar derivativos:', err);
        setHasDerivatives(false);
        setError('Não foi possível carregar os dados de derivativos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllDerivativos();
  }, [codigoBase]);

  // Extrair vencimentos únicos e ordenados
  const vencimentos = useMemo(() => {
    const uniqueVencimentos = Array.from(
      new Set(derivativos.map(d => d["Vencimento"]))
    ).sort();

    // Se temos vencimentos e nenhum está selecionado, selecione o primeiro
    if (uniqueVencimentos.length > 0 && !selectedVencimento) {
      setSelectedVencimento(uniqueVencimentos[0]);
    }

    return uniqueVencimentos;
  }, [derivativos, selectedVencimento]);

  // Filtrar derivativos pelo vencimento selecionado
  const derivativosFiltrados = useMemo(() => {
    if (!selectedVencimento) return [];
    return derivativos.filter(d => d["Vencimento"] === selectedVencimento);
  }, [derivativos, selectedVencimento]);

  // Organizar derivativos em calls e puts por strike
  const derivativosOrganizados = useMemo(() => {
    if (!derivativosFiltrados.length) return { strikes: [], callsMap: {}, putsMap: {} };

    const callsMap: Record<string, DerivativoItem> = {};
    const putsMap: Record<string, DerivativoItem> = {};
    const strikesSet = new Set<string>();

    derivativosFiltrados.forEach(derivativo => {
      const strike = derivativo["Strike"];
      strikesSet.add(strike);

      // Verificar se é CALL ou PUT baseado no texto do campo
      if (derivativo["Call ou Put"].includes("COMPRA")) {
        callsMap[strike] = derivativo;
      } else if (derivativo["Call ou Put"].includes("VENDA")) {
        putsMap[strike] = derivativo;
      }
    });

    // Ordenar strikes numericamente
    const strikes = Array.from(strikesSet).sort((a, b) => parseFloat(a) - parseFloat(b));

    return { strikes, callsMap, putsMap };
  }, [derivativosFiltrados]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleVencimentoChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedVencimento(newValue);
  };

  const formatarVencimento = (data: string) => {
    if (!data) return '-';
    // Formato esperado: YYYYMMDD
    const ano = data.substring(0, 4);
    const mes = data.substring(4, 6);
    const dia = data.substring(6, 8);
    return `${dia}/${mes}/${ano}`;
  };

  const calcularDiasAteVencimento = (vencimento: string) => {
    if (!vencimento) return 0;

    const ano = parseInt(vencimento.substring(0, 4));
    const mes = parseInt(vencimento.substring(4, 6)) - 1;
    const dia = parseInt(vencimento.substring(6, 8));

    const dataVencimento = new Date(ano, mes, dia);
    const hoje = new Date();

    return Math.max(0, Math.floor((dataVencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)));
  };

  const getVencimentoColor = (dias: number) => {
    if (dias <= 0) return '#ff4d4d'; // Vermelho para vencido ou hoje
    if (dias <= 30) return '#ffa64d'; // Laranja para vencimento em até 1 mês
    if (dias <= 90) return '#ffff4d'; // Amarelo para vencimento em até 3 meses
    return '#4dff4d'; // Verde para vencimento distante
  };

  const formatCurrency = (value: number | string): string => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numValue);
  };

  return (
    <DerivativosContainer>
      <TitleTypography variant="h4" gutterBottom>
        Derivativos para {codigoBase}
      </TitleTypography>

      {loading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : derivativos.length === 0 ? (
        <Alert severity="info">Não há derivativos disponíveis para este ativo.</Alert>
      ) : (
        <>
          {/* Componente de tabs de vencimentos */}
          <VencimentoTabs
            vencimentos={vencimentos}
            selectedVencimento={selectedVencimento}
            onVencimentoChange={handleVencimentoChange}
            formatarVencimento={formatarVencimento}
            calcularDiasAteVencimento={calcularDiasAteVencimento}
            getVencimentoColor={getVencimentoColor}
          />

          {/* Tabela de opções organizadas */}
          {selectedVencimento && (
            <>
              <VencimentoInfo>
                <SubtitleTypography variant="subtitle1" gutterBottom>
                  Vencimento: {formatarVencimento(selectedVencimento)} - {calcularDiasAteVencimento(selectedVencimento)} dias restantes
                </SubtitleTypography>
              </VencimentoInfo>

              {/* Componente de tabela de opções com paginação client-side */}
              <OpcoesTable
                strikes={derivativosOrganizados.strikes}
                callsMap={derivativosOrganizados.callsMap}
                putsMap={derivativosOrganizados.putsMap}
                formatCurrency={formatCurrency}
                totalItems={derivativosOrganizados.strikes.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </>
      )}
    </DerivativosContainer>
  );
};
import { api } from "@/services/api";

export interface PriceDataPoint {
  data: string;
  valor: number;
  dataFormatada?: string;
  timestamp: number;
}

export const getHistoricalData = async (
  codigoAtivo: string,
  period = "5A"
): Promise<PriceDataPoint[]> => {
  try {
    // Calcular a data limite com base no período selecionado
    const today = new Date();
    let targetDate: Date | null = new Date();

    switch (period) {
      case "1M":
        targetDate.setMonth(today.getMonth() - 1);
        break;
      case "6M":
        targetDate.setMonth(today.getMonth() - 6);
        break;
      case "1A":
        targetDate.setFullYear(today.getFullYear() - 1);
        break;
      case "5A":
        targetDate.setFullYear(today.getFullYear() - 5);
        break;
      case "MAX":
        targetDate = null; // Buscar todos os dados disponíveis
        break;
    }

    // Configuração inicial para paginação
    const pageSize = 100;
    let currentPage = 0;
    let hasMoreData = true;
    let allData: PriceDataPoint[] = [];
    let reachedTargetDate = false;
    const shouldFetchAllPages = period === "MAX";

    // Fazer a primeira chamada para obter o total de páginas
    const initialResponse = await api.historical.getHistoricalData({
      codigo: codigoAtivo,
      pageSize: pageSize,
      page: 0,
    });

    const typedInitialResponse = initialResponse as unknown as {
      _id: string;
      empresa: string;
      codigo: string;
      totalHistoric: number;
      historic: { data: string; preco: string; volume: number }[];
      pagination: {
        offset: number;
        limit: number;
        total: number;
        page: number;
        pages: number;
      };
    };

    // Determinar o total de páginas disponíveis
    const totalPages = typedInitialResponse?.pagination?.pages || 80;

    // Determinar quantas páginas vamos buscar
    const pagesToFetch = shouldFetchAllPages
      ? Math.min(totalPages, 100) // Limite de 100 páginas para MAX
      : totalPages;

    // Processar os dados da primeira página
    if (
      typedInitialResponse?.historic &&
      Array.isArray(typedInitialResponse.historic) &&
      typedInitialResponse.historic.length > 0
    ) {
      const pageData: PriceDataPoint[] = typedInitialResponse.historic
        .map((item) => {
          try {
            const date = new Date(item.data);
            if (isNaN(date.getTime())) return null;
            return {
              data: item.data,
              valor: parseFloat(item.preco) || 0,
              timestamp: date.getTime(),
            };
          } catch (e) {
            return null;
          }
        })
        .filter((item): item is PriceDataPoint => item !== null);

      allData = [...pageData];

      // Verificar se já atingimos a data alvo com a primeira página
      if (!shouldFetchAllPages && targetDate !== null && pageData.length > 0) {
        const targetTimestamp = targetDate.getTime();
        const timestamps = pageData.map((item) => item.timestamp);
        const oldestDataInPage = Math.min(...timestamps);

        if (oldestDataInPage <= targetTimestamp) {
          reachedTargetDate = true;
        }
      }
    }

    // Buscar as páginas restantes
    currentPage = 1; // Já buscamos a página 0

    while (
      currentPage < pagesToFetch &&
      hasMoreData &&
      (!reachedTargetDate || shouldFetchAllPages)
    ) {
      // Buscar próxima página
      const historicalResponse = await api.historical.getHistoricalData({
        codigo: codigoAtivo,
        pageSize: pageSize,
        page: currentPage,
      });

      const typedResponse = historicalResponse as unknown as {
        historic: { data: string; preco: string; volume: number }[];
        pagination: {
          totalPages: number;
          currentPage: number;
        };
      };

      // Verificar se temos dados válidos
      if (
        !typedResponse?.historic ||
        !Array.isArray(typedResponse.historic) ||
        typedResponse.historic.length === 0
      ) {
        hasMoreData = false;
        continue;
      }

      // Processar os dados desta página
      const pageData: PriceDataPoint[] = typedResponse.historic
        .map((item) => {
          try {
            const date = new Date(item.data);
            if (isNaN(date.getTime())) return null;
            return {
              data: item.data,
              valor: parseFloat(item.preco) || 0,
              timestamp: date.getTime(),
            };
          } catch (e) {
            return null;
          }
        })
        .filter((item): item is PriceDataPoint => item !== null);

      // Adicionar dados à coleção completa
      allData = [...allData, ...pageData];

      // Verificar se atingimos a data alvo (apenas se não estamos buscando todas as páginas)
      if (!shouldFetchAllPages && targetDate !== null && pageData.length > 0) {
        const targetTimestamp = targetDate.getTime();
        const timestamps = pageData.map((item) => item.timestamp);
        const oldestDataInPage = Math.min(...timestamps);

        if (oldestDataInPage <= targetTimestamp) {
          reachedTargetDate = true;
        }
      }

      // Avançar para a próxima página
      currentPage++;
    }

    // Se não encontramos dados suficientes para o período solicitado
    if (allData.length === 0) {
      return [];
    }

    // Ordenar todos os dados por data
    allData.sort((a, b) => a.timestamp - b.timestamp);

    // Filtrar dados com base na data alvo (se aplicável)
    let filteredData = allData;
    if (targetDate !== null && period !== "MAX") {
      const targetTimestamp = targetDate.getTime();
      filteredData = allData.filter(
        (item) => item.timestamp >= targetTimestamp
      );
    }

    // Se após a filtragem não temos dados, retornamos os dados mais recentes disponíveis
    if (filteredData.length === 0 && allData.length > 0) {
      // Determinar um período razoável com base nos dados disponíveis
      const latestDate = new Date(
        Math.max(...allData.map((item) => item.timestamp))
      );
      const oldestDate = new Date(
        Math.min(...allData.map((item) => item.timestamp))
      );

      const availableMonths =
        (latestDate.getTime() - oldestDate.getTime()) /
        (30 * 24 * 60 * 60 * 1000);

      // Selecionar um subconjunto razoável dos dados disponíveis
      if (availableMonths > 1) {
        const cutoffDate = new Date(latestDate);
        cutoffDate.setMonth(
          latestDate.getMonth() - Math.min(6, Math.floor(availableMonths))
        );

        filteredData = allData.filter(
          (item) => item.timestamp >= cutoffDate.getTime()
        );
      } else {
        // Se temos menos de um mês de dados, usamos todos
        filteredData = allData;
      }
    }

    // Adicionar dataFormatada para exibição
    return filteredData.map((item) => ({
      data: item.data,
      valor: item.valor,
      timestamp: item.timestamp,
      dataFormatada: new Date(item.data).toLocaleDateString("pt-BR"),
    }));
  } catch (err) {
    console.error("Erro ao buscar dados históricos:", err);
    return [];
  }
};

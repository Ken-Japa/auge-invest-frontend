import { api } from "@/services/api";
import { ETFFilter, ETFListResponse } from "@/services/api/types/etf";
import { ETF } from "@/services/api/types/etf";

export const fetchETFs = async (
  filters: ETFFilter
): Promise<ETFListResponse> => {
  try {
    const { page, pageSize, ...restFilters } = filters; // Extrai page e pageSize
    const response = await api.etf.getETFs({
      ...restFilters, // Usa o restante dos filtros
      sortBy: filters.sortBy || "quotaCount",
      sortOrder: filters.sortOrder || "desc",
    });
    return response;
  } catch (error) {
    console.error("Error fetching ETFs:", error);
    throw error;
  }
};

export const fetchETFBySlugOrCode = async (
  param: string,
  isCode: boolean
): Promise<ETF | null> => {
  try {
    let response: ETF | null;
    if (isCode) {
      response = await api.etf.getETFByCode(param);
    } else {
      // Assuming there's a getETFBySlug or similar API call for slug
      // If not, you might need to implement logic to search by name or other fields
      // For now, let's assume getETFByCode can handle both or we need to adjust API
      response = await api.etf.getETFByNomeETF(param);
    }
    return response;
  } catch (error) {
    console.error(
      `Error fetching ETF with param ${param} (isCode: ${isCode}):`,
      error
    );
    throw error;
  }
};

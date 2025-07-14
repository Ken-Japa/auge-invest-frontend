import { api } from "@/services/api";
import { ETFFilter, ETFListResponse } from "@/services/api/types/etf";

import { ETF } from "@/services/api/types/etf";

export const fetchETFs = async (
  filters: ETFFilter
): Promise<ETFListResponse> => {
  try {
    const response = await api.etf.getETFs(filters);
    return response;
  } catch (error) {
    console.error("Error fetching ETFs:", error);
    throw error;
  }
};

export const fetchETFById = async (id: string): Promise<ETF | null> => {
  try {
    const response = await api.etf.getETFByCode(id);
    return response
  } catch (error) {
    console.error(`Error fetching ETF with ID ${id}:`, error);
    throw error;
  }
};

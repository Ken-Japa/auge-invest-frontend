import { api } from '@/services/api';
import { ETFFilter, ETFListResponse } from '@/services/api/types/etf';

export const fetchETFs = async (filters: ETFFilter): Promise<ETFListResponse> => {
  try {
    const response = await api.etf.getETFs(filters);
    return response.data;
  } catch (error) {
    console.error('Error fetching ETFs:', error);
    throw error;
  }
};
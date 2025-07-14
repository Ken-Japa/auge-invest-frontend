import { api } from '@/services/api';
import { ETFBDRFilter } from '@/services/api/types/etfbdr';

export const fetchETFBDRs = async (filters: ETFBDRFilter) => {
  try {
    const response = await api.etfbdr.getETFBDRs(filters);
    return response.data;
  } catch (error) {
    console.error('Error fetching ETFBDRs:', error);
    throw error;
  }
};

export const fetchETFBDRBySlugOrCode = async (param: string, isCode: boolean) => {
  try {
    let response;
    if (isCode) {
      response = await api.etfbdr.getETFBDRByCodigoETF(param);
    } else {
      response = await api.etfbdr.getETFBDRByNomeCompletoETF(param);
      if (!response.data) {
        response = await api.etfbdr.getETFBDRByNomeETF(param);
      }
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching ETFBDR by slug or code:', error);
    throw error;
  }
};
import { api } from '@/services/api';
import { FIIExtended, FIIFilter } from '../types';

export const fetchFIIs = async (filter: FIIFilter = {}) => {
  try {
    console.log('Fetching FIIs with filters:', filter);
    
    // If search query is less than 3 characters and not empty, don't search
    if (filter.nome && filter.nome.length < 3 && filter.nome !== '') {
      return {
        fiis: [],
        pagination: { 
          offset: 0, 
          limit: filter.pageSize || 10, 
          total: 0, 
          page: 1, 
          pages: 1 
        }
      };
    }
    
    // Ensure pageSize is a valid number
    const pageSize = filter.pageSize && filter.pageSize > 0 ? filter.pageSize : 10;
    
    const response = await api.fiis.getFIIs({
      segmento: filter.segmento,
      nome: filter.nome,
      page: filter.page !== undefined ? filter.page : 0,
      pageSize
    });
    
    console.log('API Response:', response);
    
    // Based on the console output, the API response structure is:
    // { result: Array(12), pagination: {...} }
    if (!response || !response.result || !Array.isArray(response.result)) {
      console.error('Unexpected API response structure:', response);
      throw new Error('Formato de resposta da API inesperado');
    }
    
    // Map the current API response to include future fields
    const mappedFIIs = response.result.map((fii: any) => {
      // Ensure fii.codigo is an array before mapping
      const codigo = Array.isArray(fii.codigo) ? fii.codigo : 
                    (fii.codigo ? [fii.codigo] : []);
      
      const extendedFII: FIIExtended = {
        ...fii,
        nomeCompleto: fii.nomeCompletoFII || '',
        dataInicio: fii.quotaDateApproved || '',
        codigos: codigo.map((code: string) => ({
          codigo: code,
          preco: null,
          precoAnterior: null,
          variacao: null
        }))
      };
      return extendedFII;
    });

    return {
      fiis: mappedFIIs,
      pagination: response.pagination || { 
        offset: 0, 
        limit: pageSize, 
        total: mappedFIIs.length, 
        page: filter.page !== undefined ? filter.page + 1 : 1, 
        pages: Math.ceil(mappedFIIs.length / pageSize) || 1 
      }
    };
  } catch (error) {
    console.error('Erro ao buscar FIIs:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    } else {
      console.error('Unknown error type:', error);
    }
    
    throw new Error('Não foi possível carregar os FIIs. Tente novamente mais tarde.');
  }
};
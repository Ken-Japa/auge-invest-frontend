import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import {
  Favorite,
  CreateFavorite,
  FavoriteFilter,
  FavoriteListResponseApi,
} from "../types/favorite";
import { ErrorCode, handleApiError } from "../errorHandler";

class FavoritesApiService extends BaseApiService {
  getFavoritesByUser = async (
    filters?: FavoriteFilter
  ): Promise<FavoriteListResponseApi> => {
    const params = {
      page: filters?.page !== undefined ? filters.page : 0,
      pageSize: filters?.pageSize || 10,
    };
    try {
      return await this.get<FavoriteListResponseApi>(
        `${API_ENDPOINTS.FAVORITES.BASE}/user`,
        params
      );
    } catch (error) {
      console.error(`Erro ao buscar alertas para o usuário:`, error);
      throw handleApiError(error, ErrorCode.FAVORITE_NOT_FOUND);
    }
  };

  createFavorite = async (favorite: CreateFavorite): Promise<Favorite> => {
    try {
      return await this.post<Favorite>(API_ENDPOINTS.FAVORITES.BASE, favorite);
    } catch (error) {
      console.error(`Erro ao criar favorito:`, error);
      throw handleApiError(error, ErrorCode.FAVORITE_CREATION_FAILED);
    }
  };

  deleteFavorite = async (id: string): Promise<void> => {
    try {
      await this.delete(`${API_ENDPOINTS.FAVORITES.BASE}/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar favorito:`, error);
      throw handleApiError(error, ErrorCode.FAVORITE_DELETION_FAILED);
    }
  };
}
export const favoritesApi = new FavoritesApiService();

import api from "../client";
import { Favorite, CreateFavorite } from "../types/favorite";

export const favoritesApi = {
  getFavoritesByUser: (userId: string, page: number = 0, pageSize: number = 10): Promise<{ data: { result: Favorite[]; total: number; page: number; pages: number; }; }> =>
    api.get(`/favorites/user/${userId}?page=${page}&pageSize=${pageSize}`),
  createFavorite: (favorite: CreateFavorite) => api.post("/favorites", favorite),
  deleteFavorite: (id: string) => api.delete(`/favorites/${id}`),
};
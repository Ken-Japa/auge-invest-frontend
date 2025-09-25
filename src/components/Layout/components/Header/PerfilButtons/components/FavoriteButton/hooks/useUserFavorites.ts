import { useState, useEffect, useCallback } from 'react';
import { api } from '@/services/api';
import { useApi } from '@/providers/ApiProvider';

export const useUserFavorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { revalidateFavorites } = useApi();

  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.favorites.getFavoritesByUser();
      setFavorites(response.result);
    } catch (err) {
      setError("Failed to fetch favorites.");
      console.error("Failed to fetch favorites:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites, revalidateFavorites]);

  return {
    favorites,
    loading,
    error,
    fetchFavorites,
  };
};


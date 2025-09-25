import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { favoritesApi } from '@/services/api/endpoints/favorites';
import { Favorite } from '@/services/api/types/favorite';

export const useUserFavorites = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await favoritesApi.getFavoritesByUser();
      setFavorites(response.result || []);
    } catch (err) {
      setError('Falha ao carregar favoritos.');
      console.error('Falha ao carregar favoritos:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return { favorites, loading, error, fetchFavorites };
};

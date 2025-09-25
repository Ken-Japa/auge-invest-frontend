import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, CircularProgress, Alert as MuiAlert, Card, CardContent } from '@mui/material';
import { useFavoriteNavigation } from '@/hooks/useFavoriteNavigation';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSession } from 'next-auth/react';
import { api } from '@/services/api';
import { Favorite } from '@/services/api/types/favorite';
import GlobalSearchBar from '@/pagesComponents/Logado/components/SearchBar';
import { SettingsCard } from '@/components/Core/Card/SettingsCard';
import { SettingsControlContainer } from '../../styled';
import StarIcon from '@mui/icons-material/Star';

interface FavoritesManagementProps {
  // Adicione props se necessário
}

export const FavoritesManagement: React.FC<FavoritesManagementProps> = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    if (userId) {
      try {
        setLoading(true);
        const response = await api.favorites.getFavoritesByUser();
        setFavorites(response.result || []);
      } catch (err) {
        setError("Failed to fetch favorites.");
        console.error("Failed to fetch favorites:", err);
      } finally {
        setLoading(false);
      }
    }
  }, [userId]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleAddFavorite = async (symbol: string, type: string) => {
    if (!userId) return;
    try {
      await api.favorites.createFavorite({ asset: symbol, type });
      fetchFavorites();
    } catch (err) {
      console.error('Erro ao adicionar favorito:', err);
      setError('Não foi possível adicionar o favorito.');
    }
  };

  const handleDeleteFavorite = async (id: string) => {
    try {
      await api.favorites.deleteFavorite(id);
      fetchFavorites();
    } catch (err) {
      console.error('Erro ao remover favorito:', err);
      setError('Não foi possível remover o favorito.');
    }
  };

  const { navigateToFavorite } = useFavoriteNavigation();

  return (
    <SettingsCard
      icon={<StarIcon />}
      title="Gerenciar Favoritos"
    >
      <SettingsControlContainer>
        <Box mb={2}>
          <GlobalSearchBar type="TodosSimplificado" onSelect={(item) => {
            if (item.id && item.assetType) {
              handleAddFavorite(item.id, item.assetType);
            }
          }} />
        </Box>

        {loading && <CircularProgress />}
        {error && <MuiAlert severity="error">{error}</MuiAlert>}

        {!loading && !error && favorites.length === 0 && (
          <Typography>Nenhum favorito adicionado ainda.</Typography>
        )}

        <List>
          {favorites.map((favorite) => (
            <Card key={favorite._id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <ListItem
                  onClick={() => navigateToFavorite(favorite)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFavorite(favorite._id);
                    }}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={favorite.asset}
                    secondary={favorite.type}
                  />
                </ListItem>
              </CardContent>
            </Card>
          ))}
        </List>
      </SettingsControlContainer>
    </SettingsCard>
  );
};
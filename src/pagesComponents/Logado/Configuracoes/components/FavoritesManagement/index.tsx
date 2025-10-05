import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import {
  Alert as MuiAlert,
  Box,
  CardContent,
  CircularProgress,
  IconButton,
  List,
  ListItemText,
  Typography,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'

import { SettingsCard } from '@/components/Core/Card/SettingsCard'
import { useFavoriteNavigation } from '@/hooks/useFavoriteNavigation'
import GlobalSearchBar from '@/pagesComponents/Logado/components/SearchBar'
import { useApi } from '@/providers/ApiProvider'
import { api } from '@/services/api'
import { Favorite } from '@/services/api/types/favorite'

import { SettingsControlContainer } from '../../styled'

import { StyledCard, StyledListItem } from './styled'

interface FavoritesManagementProps {
  // Adicione props se necessário
}

export const FavoritesManagement: React.FC<FavoritesManagementProps> = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { revalidateFavorites } = useApi()

  const fetchFavorites = useCallback(async () => {
    if (userId) {
      try {
        setLoading(true)
        const response = await api.favorites.getFavoritesByUser()
        setFavorites(response.result || [])
      } catch (err) {
        setError('Failed to fetch favorites.')
        console.error('Failed to fetch favorites:', err)
      } finally {
        setLoading(false)
      }
    }
  }, [userId])

  useEffect(() => {
    fetchFavorites()
  }, [fetchFavorites])

  const handleAddFavorite = async (symbol: string, type: string) => {
    if (!userId) return
    try {
      await api.favorites.createFavorite({ asset: symbol, type })
      fetchFavorites()
      revalidateFavorites()
    } catch (err) {
      console.error('Erro ao adicionar favorito:', err)
      setError('Não foi possível adicionar o favorito.')
    }
  }

  const handleDeleteFavorite = async (id: string) => {
    try {
      await api.favorites.deleteFavorite(id)
      fetchFavorites()
      revalidateFavorites()
    } catch (err) {
      console.error('Erro ao remover favorito:', err)
      setError('Não foi possível remover o favorito.')
    }
  }

  const { navigateToFavorite } = useFavoriteNavigation()

  return (
    <SettingsCard icon={<StarIcon />} title="Gerenciar Favoritos">
      <SettingsControlContainer>
        <Box mb={2}>
          <GlobalSearchBar
            type="TodosSimplificado"
            onSelect={(item) => {
              if (item.id && item.assetType) {
                handleAddFavorite(item.id, item.assetType)
              }
            }}
          />
        </Box>

        {loading && <CircularProgress />}
        {error && <MuiAlert severity="error">{error}</MuiAlert>}

        {!loading && !error && favorites.length === 0 && (
          <Typography>Nenhum favorito adicionado ainda.</Typography>
        )}

        <List>
          {favorites.map((favorite) => (
            <StyledCard key={favorite._id}>
              <CardContent>
                <StyledListItem
                  onClick={() => navigateToFavorite(favorite)}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteFavorite(favorite._id)
                      }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={
                      <Typography variant="h4" component="span">
                        {favorite.asset}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {favorite.type}
                      </Typography>
                    }
                  />
                </StyledListItem>
              </CardContent>
            </StyledCard>
          ))}
        </List>
      </SettingsControlContainer>
    </SettingsCard>
  )
}

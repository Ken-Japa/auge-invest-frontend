import { useState } from 'react';
import Link from "next/link";
import { IconButton, Menu, MenuItem, Divider, CircularProgress, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';
import { useUserFavorites } from '@/components/Layout/components/Header/PerfilButtons/components/FavoriteButton/hooks/useUserFavorites';
import { useFavoriteNavigation } from '@/hooks/useFavoriteNavigation';

export const FavoriteButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const { favorites, loading, error } = useUserFavorites();
  const { navigateToFavorite } = useFavoriteNavigation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFavoriteClick = (favorite: any) => {
    navigateToFavorite(favorite);
    handleClose();
  };

  const displayedFavorites = favorites.slice(0, 5); // Limita a 5 favoritos no dropdown

  return (
    <div>
      <IconButton
        onClick={handleMenu}
        color="inherit"
        aria-label="favorite menu"
        aria-controls="favorite-appbar"
        aria-haspopup="true"
      >
        <FavoriteIcon />
      </IconButton>
      <Menu
        id="favorite-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255)' : 'rgba(33, 33, 33, 0.95)',
            color: theme.palette.mode === 'light' ? 'text.primary' : 'inherit',
            maxHeight: 300, // Limita a altura do dropdown
          }
        }}
      >
        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={20} sx={{ mr: 1 }} /> Carregando...
          </MenuItem>
        ) : error ? (
          <MenuItem disabled>
            <Typography color="error">{error}</Typography>
          </MenuItem>
        ) : displayedFavorites.length > 0 ? (
          displayedFavorites.map((favorite) => (
            <MenuItem key={favorite._id} onClick={() => handleFavoriteClick(favorite)}>
              {favorite.asset} ({favorite.type})
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleClose}>Nenhum favorito adicionado</MenuItem>
        )}
        <Divider />
        <MenuItem component={Link} href="/perfil/configuracoes?tab=favorites" onClick={handleClose}>
          Configurar favoritos
        </MenuItem>
      </Menu>
    </div>
  );
};
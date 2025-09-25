import { useState } from 'react';
import Link from "next/link";
import { IconButton, Menu, MenuItem, Divider, CircularProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';
import { useUserFavorites } from '@/components/Layout/components/Header/PerfilButtons/components/FavoriteButton/hooks/useUserFavorites';
import { MAX_DISPLAY_ITEMS } from '../constants';
import { FavoriteMenuItem } from './components/FavoriteMenuItem';
import { ErrorDisplay } from '@/components/Feedback/ErrorDisplay';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';

export const FavoriteButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const { favorites, loading, error, fetchFavorites } = useUserFavorites();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <MenuItem disabled sx={{ display: 'block' }}>
            <ContentSkeleton type="text" textLines={3} />
          </MenuItem>
        ) : error ? (
          <MenuItem disabled>
            <ErrorDisplay message="Erro ao carregar favoritos." onRetry={fetchFavorites} />
          </MenuItem>
        ) : favorites.length === 0 ? (
          <MenuItem onClick={handleClose} disabled>Nenhum favorito encontrado.</MenuItem>
        ) : (
          favorites.slice(0, MAX_DISPLAY_ITEMS).map((fav) => (
            <FavoriteMenuItem key={fav._id} favorite={fav} onClose={handleClose} />
          ))
        )}
        <Divider />
        <MenuItem component={Link} href="/perfil/configuracoes?tab=favorites" onClick={handleClose}>
          Configurar favoritos
        </MenuItem>
      </Menu>
    </div>
  );
};
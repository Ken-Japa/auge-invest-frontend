import FavoriteIcon from '@mui/icons-material/Favorite';
import { Divider,IconButton, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from "next/link";
import { useState } from 'react';

import { ErrorDisplay } from '@/components/Feedback/ErrorDisplay';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';
import { useUserFavorites } from '@/components/Layout/components/Header/PerfilButtons/components/FavoriteButton/hooks/useUserFavorites';

import { MAX_DISPLAY_ITEMS } from '../constants';
import { FavoriteMenuItem } from './components/FavoriteMenuItem';

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
        color={anchorEl ? "primary" : "inherit"}
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
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255)' : 'rgba(33, 33, 33, 0.95)',
            color: theme.palette.mode === 'light' ? 'text.primary' : 'inherit',
            maxHeight: 300, // Limita a altura do dropdown
            borderRadius: '8px',
            boxShadow: theme.shadows[3],
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
        <MenuItem
          component={Link}
          href="/perfil/configuracoes"
          onClick={handleClose}
          sx={{
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: 'action.selected',
            },
          }}
        >
          Configurar favoritos
        </MenuItem>
      </Menu>
    </div>
  );
};
import { MenuItem, Typography } from '@mui/material';
import { useFavoriteNavigation } from '@/hooks/useFavoriteNavigation';
import { Favorite } from '@/services/api/types/favorite';


interface FavoriteMenuItemProps {
  favorite: Favorite;
  onClose: () => void;
}

export const FavoriteMenuItem = ({ favorite, onClose }: FavoriteMenuItemProps) => {
  const { navigateToFavorite } = useFavoriteNavigation();

  const handleClick = () => {
    navigateToFavorite(favorite);
    onClose();
  };

  return (
    <MenuItem onClick={handleClick}>
      <Typography variant="inherit" noWrap>
        {favorite.asset} ({favorite.type})
      </Typography>
    </MenuItem>
  );
};
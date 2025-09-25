import { ListItemText, MenuItem, Typography } from '@mui/material';
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
    <MenuItem onClick={handleClick} sx={{ paddingY: 1, paddingX: 2, textAlign: 'center', '&:hover': { backgroundColor: 'action.hover' } }}>
      <ListItemText
        primary={
          <Typography variant="body1" >
            {favorite.asset}
          </Typography>
        }
        secondary={favorite.type}
      />
    </MenuItem>
  );
};
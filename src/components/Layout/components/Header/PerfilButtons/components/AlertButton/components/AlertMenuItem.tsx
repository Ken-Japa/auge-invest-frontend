import { MenuItem, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ALERT_TYPES } from '../../constants';
import { Alert } from '@/services/api/types/alert-types';


interface AlertMenuItemProps {
  alert: Alert;
  onClose: () => void;
  markAlertAsRead: (alert: Alert) => void;
}

export const AlertMenuItem = ({ alert, onClose, markAlertAsRead }: AlertMenuItemProps) => {
  const theme = useTheme();

  const handleClick = () => {
    markAlertAsRead(alert);
    onClose();
  };

  return (
    <MenuItem
      key={alert._id}
      onClick={handleClick}
      sx={{
        bgcolor: alert.triggered ? theme.palette.action.selected : 'inherit',
        '&:hover': {
          bgcolor: alert.triggered ? theme.palette.action.hover : 'inherit',
        },
      }}
    >
      <Box>
        <Typography variant="subtitle1">{alert.asset}</Typography>
        <Typography
          variant="body2"
          color={alert.type === ALERT_TYPES.SELL ? theme.palette.error.main : theme.palette.success.main}
        >
          {alert.type === ALERT_TYPES.SELL ? 'Venda' : 'Compra'} no valor de R$ {alert.targetPrice}
        </Typography>
      </Box>
    </MenuItem>
  );
};
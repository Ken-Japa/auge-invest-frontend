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
        paddingY: 1,
        paddingX: 2,
        bgcolor: alert.triggered ? theme.palette.action.selected : 'inherit',
        textAlign: 'center',
        '&:hover': {
          bgcolor: alert.triggered ? theme.palette.action.focus : theme.palette.action.hover,
        },
      }}
    >
      <Box>
        <Typography variant="subtitle1" sx={{ marginBottom: 0.5 }}>{alert.asset}</Typography>
        <Typography
          variant="body2"
          color={alert.type === ALERT_TYPES.SELL ? theme.palette.error.main : theme.palette.success.main}
        >
          <Typography component="span" >
            {alert.type === ALERT_TYPES.SELL ? 'Venda' : 'Compra'}
          </Typography> no valor de
          <Typography component="span" fontWeight="italic"> R$ {alert.targetPrice}</Typography>
        </Typography>
      </Box>
    </MenuItem>
  );
};
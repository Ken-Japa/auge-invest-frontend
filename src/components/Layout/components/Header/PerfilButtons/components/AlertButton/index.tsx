import { useState } from 'react';
import Link from "next/link";
import { IconButton, Menu, MenuItem, Badge, Divider, CircularProgress, Typography, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTheme } from '@mui/material/styles';
import { useUserAlerts } from '@/components/Layout/components/Header/PerfilButtons/components/AlertButton/hooks/useUserAlerts';

export const AlertButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const { alerts, loading, error, triggeredAlertCount, markAlertAsRead } = useUserAlerts();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAlertClick = (alertId: string) => {
    markAlertAsRead(alertId);
    // Optionally navigate or show alert details
    handleClose();
  };

  const displayedAlerts = alerts.slice(0, 5); // Limita a 5 alertas no dropdown

  return (
    <div>
      <IconButton
        onClick={handleMenu}
        color="inherit"
        aria-label="alert menu"
        aria-controls="alert-appbar"
        aria-haspopup="true"
      >
        <Badge badgeContent={triggeredAlertCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="alert-appbar"
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
        ) : displayedAlerts.length > 0 ? (
          displayedAlerts.map((alert) => (
            <MenuItem
              key={alert._id}
              onClick={() => handleAlertClick(alert._id)}
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
                  color={alert.type === 'sell' ? theme.palette.error.main : theme.palette.success.main}
                >
                  {alert.type === 'sell' ? 'Venda' : 'Compra'} no valor de R$ {alert.targetPrice}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleClose}>Nenhum alerta</MenuItem>
        )}
        <Divider />
        <MenuItem component={Link} href="/alertas" onClick={handleClose}>
          Configurar Alertas
        </MenuItem>
      </Menu>
    </div>
  );
};
import { useState } from 'react';
import Link from "next/link";
import { IconButton, Menu, Badge, Divider, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTheme } from '@mui/material/styles';
import { useUserAlerts } from '@/components/Layout/components/Header/PerfilButtons/components/AlertButton/hooks/useUserAlerts';
import { MAX_DISPLAY_ITEMS } from '../constants';
import { AlertMenuItem } from './components/AlertMenuItem';
import { Snackbar } from '@/components/Feedback/Snackbar';
import { ErrorDisplay } from '@/components/Feedback/ErrorDisplay';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';

export const AlertButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const theme = useTheme();
  const { alerts, loading, error, triggeredAlertCount, markAlertAsRead, fetchAlerts } = useUserAlerts();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAlertMarkAsRead = async (alert: any) => {
    try {
      await markAlertAsRead(alert._id);
      if (alert.triggered) {
        setSnackbarMessage('Alerta marcado como lido!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarMessage('Erro ao marcar alerta como lido.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={handleMenu}
        color={Boolean(anchorEl) ? 'primary' : 'inherit'}
        aria-label="alert menu"
        aria-controls="alert-appbar"
        aria-haspopup="true"
      >
        <Badge
          badgeContent={triggeredAlertCount}
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              height: 18,
              minWidth: 18,
              fontSize: 10,
              padding: "0 4px",
              backgroundColor: theme.palette.warning.main,
            },
          }}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="alert-appbar"
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
            maxHeight: 300,
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
            <ErrorDisplay message="Erro ao carregar alertas." onRetry={fetchAlerts} />
          </MenuItem>
        ) : alerts.length === 0 ? (
          <MenuItem onClick={handleClose} disabled>Nenhum alerta encontrado.</MenuItem>
        ) : (
          alerts.slice(0, MAX_DISPLAY_ITEMS).map((alert, index) => (
            <div key={alert._id}>
              <AlertMenuItem
                alert={alert}
                onClose={handleClose}
                markAlertAsRead={handleAlertMarkAsRead}
              />
              {index < alerts.slice(0, MAX_DISPLAY_ITEMS).length - 1 && (
                <Divider variant="middle" sx={{ borderStyle: 'dotted' }} />
              )}
            </div>
          ))
        )}
        <Divider />
        <MenuItem
          component={Link}
          href="/alertas"
          onClick={handleClose}
          sx={{
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: 'action.selected',
            },
          }}
        >
          Configurar Alertas
        </MenuItem>
      </Menu>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </div>
  );
};
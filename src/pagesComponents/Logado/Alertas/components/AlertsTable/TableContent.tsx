import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import { IconButton, Switch, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import React from 'react'

import { Alert } from '@/services/api/types'

import { AlertTypography } from '../../styled'

interface TableContentProps {
  alerts: Alert[]
  theme: any
  handleEdit: (alert: Alert) => void
  handleToggle: (alert: Alert) => Promise<void>
  handleDelete: (id: string) => Promise<void>
  toggleAlert: (id: string, field: 'recurring' | 'triggered', value: boolean) => Promise<void>
  refreshAlerts: () => Promise<void>
  showSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void
}

export const TableContent = React.memo(
  ({
    alerts,
    theme,
    handleEdit,
    handleToggle,
    handleDelete,
    toggleAlert,
    refreshAlerts,
    showSnackbar,
  }: TableContentProps) => {
    return (
      <>
        {alerts.map((alert) => (
          <TableRow
            key={alert._id}
            sx={{
              backgroundColor: alert.triggered ? theme.palette.secondary.A200 : 'inherit',
              '&:hover': {
                backgroundColor: alert.triggered ? theme.palette.secondary.A300 : theme.palette.action.hover,
              },
            }}
          >
            <TableCell align="center">
              <Typography variant="body1" component="strong">
                {alert.asset}
              </Typography>
              {alert.comments && alert.comments.trim() !== '' && (
                <Typography variant="caption" display="block" color="textSecondary">
                  {alert.comments}
                </Typography>
              )}
            </TableCell>
            <TableCell align="center">
              <AlertTypography type={alert.type}>{alert.type === 'buy' ? 'Compra' : 'Venda'}</AlertTypography>
            </TableCell>
            <TableCell align="center">
              <Typography className="price-value">R$ {alert.targetPrice.toFixed(2)}</Typography>
            </TableCell>
            <TableCell align="center">
              <Switch checked={alert.recurring} onChange={() => handleToggle(alert)} />
            </TableCell>
            <TableCell align="center">
              <Typography>
                {alert.createdAt
                  ? new Date(alert.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    })
                  : 'N/A'}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <div className="action-buttons">
                <Tooltip title="Editar">
                  <IconButton size="small" onClick={() => handleEdit(alert)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      if (alert._id) {
                        handleDelete(alert._id)
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Notificações">
                  <IconButton
                    size="small"
                    color={alert.triggered ? 'primary' : 'default'}
                    onClick={async () => {
                      if (alert._id) {
                        await toggleAlert(alert._id, 'triggered', !alert.triggered)
                        refreshAlerts()
                        showSnackbar(
                          `Alerta para ${alert.type === 'buy' ? 'compra' : 'venda'} de ${alert.asset} a R$ ${alert.targetPrice.toFixed(2)} está ${alert.triggered ? 'desativado' : 'ativado'}.`,
                          'success',
                        )
                      }
                    }}
                  >
                    <NotificationsActiveIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </>
    )
  },
)

TableContent.displayName = 'TableContent'

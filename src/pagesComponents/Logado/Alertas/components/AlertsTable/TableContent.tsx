import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import { IconButton, Switch, Tooltip, Typography } from '@mui/material'
import React from 'react'

import { Alert } from '@/services/api/types'

import { AlertTypography } from '../../styled'
import { StyledTableCell, StyledTableRow } from './styled'

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
          <StyledTableRow key={alert._id} className={alert.triggered ? 'triggered-alert' : ''}>
            <StyledTableCell align="center">
              <Typography variant="body1" component="strong">
                {alert.asset}
              </Typography>
              {alert.comments && alert.comments.trim() !== '' && (
                <Typography variant="caption" display="block" color="textSecondary">
                  {alert.comments}
                </Typography>
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              <AlertTypography type={alert.type}>{alert.type === 'buy' ? 'Compra' : 'Venda'}</AlertTypography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography className="price-value">R$ {alert.targetPrice.toFixed(2)}</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Switch checked={alert.recurring} onChange={() => handleToggle(alert)} />
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>
                {alert.createdAt
                  ? new Date(alert.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    })
                  : 'N/A'}
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
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
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </>
    )
  },
)

TableContent.displayName = 'TableContent'

import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useCallback, useMemo, useState } from 'react'

import { StyledTable } from '@/components/Data-Display/Table'
import { Alert } from '@/services/api/types'

import { AlertDialog } from '../AlertDialog'

import { TableContent } from './TableContent'

interface AlertsTableProps {
  alerts: Alert[]
  loading: boolean
  error: string | null
  refreshAlerts: () => Promise<void>
  toggleAlert: (id: string, field: 'recurring' | 'triggered', value: boolean) => Promise<void>
  deleteAlert: (id: string) => Promise<void>
  showSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void
}

export const AlertsTable = ({
  alerts,
  loading,
  error,
  refreshAlerts,
  toggleAlert,
  deleteAlert,
  showSnackbar,
}: AlertsTableProps) => {
  const theme = useTheme()
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)

  /**
   * Handles the edit action for an alert.
   * Sets the selected alert and opens the dialog.
   * @param alert The alert to be edited.
   */
  const handleEdit = useCallback((alert: Alert) => {
    setSelectedAlert(alert)
    setOpenDialog(true)
  }, [])

  /**
   * Handles toggling the recurring status of an alert.
   * @param alert The alert to be toggled.
   */
  const handleToggle = useCallback(
    async (alert: Alert) => {
      if (!alert._id) {
        return
      }
      await toggleAlert(alert._id, 'recurring', !alert.recurring)
      refreshAlerts()
      showSnackbar(
        `Alerta para ${alert.type === 'buy' ? 'compra' : 'venda'} de ${alert.asset} a R$ ${alert.targetPrice.toFixed(2)} agora ${alert.recurring ? 'não é recorrente' : 'é recorrente'}.`,
        'success',
      )
    },
    [toggleAlert, refreshAlerts, showSnackbar],
  )

  /**
   * Handles the deletion of an alert.
   * @param id The ID of the alert to be deleted.
   */
  const handleDelete = useCallback(
    async (id?: string) => {
      const alertIdToDelete = id || selectedAlert?._id
      if (alertIdToDelete) {
        await deleteAlert(alertIdToDelete)
        refreshAlerts()
        showSnackbar('Alerta excluído com sucesso!', 'success')
        setOpenDialog(false)
        setSelectedAlert(null)
      }
    },
    [deleteAlert, refreshAlerts, selectedAlert, showSnackbar],
  )

  const sortedAlerts = useMemo(() => {
    const alertsCopy = [...alerts]
    return alertsCopy.sort((a, b) => {
      // Triggered alerts first
      if (a.triggered && !b.triggered) return -1
      if (!a.triggered && b.triggered) return 1

      // Then by createdAt descending
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return dateB - dateA
    })
  }, [alerts])

  const buyAlerts = useMemo(() => sortedAlerts.filter((alert) => alert.type === 'buy'), [sortedAlerts])
  const sellAlerts = useMemo(() => sortedAlerts.filter((alert) => alert.type === 'sell'), [sortedAlerts])

  /**
   * Memoized array of table headers.
   */
  const tableHeaders = useMemo(() => ['Ativo', 'Tipo', 'Preço Alvo', 'Recorrente', 'Criado em', 'Ações'], [])

  /**
   * Memoized array of table column alignments.
   */
  const tableAlignments = useMemo(() => ['center', 'center', 'center', 'center', 'center', 'center'], []) as (
    | 'left'
    | 'center'
    | 'right'
  )[]

  const renderTable = (
    alertsToRender: Alert[],
    title: string,
    noDataMessage: string,
    noDataDescription: string,
  ) => (
    <Box mb={4}>
      <Typography variant="h3" component="h2" gutterBottom textAlign="center" mb={4} color="warning">
        {title}
      </Typography>
      <StyledTable
        headers={tableHeaders}
        alignments={tableAlignments}
        showData={alertsToRender.length > 0}
        loading={loading}
        noDataMessage={noDataMessage}
        noDataDescription={noDataDescription}
      >
        <TableContent
          alerts={alertsToRender}
          theme={theme}
          handleEdit={handleEdit}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
          toggleAlert={toggleAlert}
          refreshAlerts={refreshAlerts}
          showSnackbar={showSnackbar}
        />
      </StyledTable>
    </Box>
  )

  return (
    <>
      {buyAlerts.length > 0 &&
        renderTable(
          buyAlerts,
          'Alertas de Compra',
          'Nenhum alerta de compra encontrado',
          "Clique em 'Adicionar Alerta' para criar seu primeiro alerta de compra.",
        )}
      {sellAlerts.length > 0 &&
        renderTable(
          sellAlerts,
          'Alertas de Venda',
          'Nenhum alerta de venda encontrado',
          "Clique em 'Adicionar Alerta' para criar seu primeiro alerta de venda.",
        )}

      {buyAlerts.length === 0 && sellAlerts.length === 0 && (
        <StyledTable
          headers={tableHeaders}
          alignments={tableAlignments}
          showData={false}
          loading={loading}
          noDataMessage="Nenhum alerta encontrado"
          noDataDescription="Clique em 'Adicionar Alerta' para criar seu primeiro alerta de preço."
        >
          {null}
        </StyledTable>
      )}

      <AlertDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        alert={selectedAlert}
        refreshAlerts={refreshAlerts}
        showSnackbar={showSnackbar}
        onDelete={handleDelete}
      />
    </>
  )
}

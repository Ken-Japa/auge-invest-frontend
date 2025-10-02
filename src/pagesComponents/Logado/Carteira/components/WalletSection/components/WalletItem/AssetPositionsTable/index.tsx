import { Box, CircularProgress, TableBody, Typography } from '@mui/material'
import React, { useEffect } from 'react'

import { WalletTransactions } from '@/services/api/types/transaction'

import { AssetPositionRow } from './AssetPositionRow'
import {
  StyledAssetHeaderTableRow,
  StyledAssetTable,
  StyledAssetTableContainer,
  StyledAssetTableHead,
  StyledAssetTableHeaderCell,
} from './styled'
import { useAssetPositionsCalculations } from './useAssetPositionsCalculations'

interface AssetPositionsTableProps {
  walletPositions: WalletTransactions | null
  loadingPositions: boolean
  errorPositions: string | null
  expandedRows: string[]
  handleToggleRow: (positionId: string) => void
  setSelectedAssetPositionId: (id: string | null) => void
  setIsTransactionsDialogOpen: (isOpen: boolean) => void
  setAssetCode: (code: string | null) => void
  setAssetType: (type: string | null) => void
  setIsAddSameTransactionOpen: (isOpen: boolean) => void
  onTransactionChange: () => void
  focusedAssetCode: string | null
}

/**
 * @function AssetPositionsTable
 * @description Displays a table of asset positions with expandable rows for transactions.
 * @param {AssetPositionsTableProps} props - Props for the AssetPositionsTable component.
 * @returns {React.FC<AssetPositionsTableProps>} - The AssetPositionsTable component.
 */
export const AssetPositionsTable: React.FC<AssetPositionsTableProps> = ({
  walletPositions,
  loadingPositions,
  errorPositions,
  expandedRows,
  handleToggleRow,
  setSelectedAssetPositionId,
  setIsTransactionsDialogOpen,
  setAssetCode,
  setAssetType,
  setIsAddSameTransactionOpen,
  onTransactionChange,
  focusedAssetCode,
}) => {
  const calculatedAssetData = useAssetPositionsCalculations(walletPositions, onTransactionChange)

  useEffect(() => {
    if (focusedAssetCode && walletPositions) {
      const element = document.getElementById(`asset-row-${focusedAssetCode}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }

      const positionToExpand = walletPositions.result.find(
        (position) => position.assetCode === focusedAssetCode,
      )
      if (positionToExpand && !expandedRows.includes(positionToExpand._id)) {
        handleToggleRow(positionToExpand._id)
      }
    }
  }, [focusedAssetCode, walletPositions, expandedRows, handleToggleRow])

  return (
    <>
      {loadingPositions ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <CircularProgress />
        </Box>
      ) : errorPositions ? (
        <Typography color="error">Erro ao carregar operações: {errorPositions}</Typography>
      ) : walletPositions && walletPositions.result.length > 0 ? (
        <StyledAssetTableContainer sx={{ borderRadius: 3 }}>
          <StyledAssetTable size="small">
            <StyledAssetTableHead>
              <StyledAssetHeaderTableRow>
                <StyledAssetTableHeaderCell>Ativo</StyledAssetTableHeaderCell>
                <StyledAssetTableHeaderCell align="center">Quantidade</StyledAssetTableHeaderCell>
                <StyledAssetTableHeaderCell align="center">Preço Médio</StyledAssetTableHeaderCell>
                <StyledAssetTableHeaderCell align="center">Total</StyledAssetTableHeaderCell>
                <StyledAssetTableHeaderCell align="center">Valor Atual</StyledAssetTableHeaderCell>
                <StyledAssetTableHeaderCell align="center">Diferença</StyledAssetTableHeaderCell>
                <StyledAssetTableHeaderCell align="center">Tipo</StyledAssetTableHeaderCell>
                <StyledAssetTableHeaderCell align="center">Data Início</StyledAssetTableHeaderCell>
                <StyledAssetTableHeaderCell align="center">Ações</StyledAssetTableHeaderCell>
              </StyledAssetHeaderTableRow>
            </StyledAssetTableHead>
            <TableBody>
              {walletPositions.result.map((position) => (
                <AssetPositionRow
                  key={position._id}
                  position={position}
                  isRowExpanded={expandedRows.includes(position._id)}
                  calculatedAssetData={calculatedAssetData[position._id]}
                  handleToggleRow={handleToggleRow}
                  setSelectedAssetPositionId={setSelectedAssetPositionId}
                  setIsTransactionsDialogOpen={setIsTransactionsDialogOpen}
                  setAssetCode={setAssetCode}
                  setAssetType={setAssetType}
                  setIsAddSameTransactionOpen={setIsAddSameTransactionOpen}
                  onTransactionChange={onTransactionChange}
                />
              ))}
            </TableBody>
          </StyledAssetTable>
        </StyledAssetTableContainer>
      ) : (
        <Typography>Nenhuma operação encontrada para esta carteira.</Typography>
      )}
    </>
  )
}

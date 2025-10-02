import { Add as AddIcon, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { IconButton, TableCell, Tooltip, Typography } from '@mui/material'
import React from 'react'

import { formatCurrency, formatDate2 as formatDate } from '@/components/Helpers/Formatters/formatters'
import { Positions } from '@/services/api/types/transaction'

import { assetTypes } from '../../../transactionConstants'
import { TransactionTable } from '../../TransactionTable'

import { StyledAssetTableCell, StyledAssetTableRow } from './styled'

interface AssetPositionRowProps {
  position: Positions
  isRowExpanded: boolean
  calculatedAssetData: {
    averagePrice: number
    spentValue: number
    quantity: number
    netSpentValue: number
  }
  handleToggleRow: (positionId: string) => void
  setSelectedAssetPositionId: (id: string | null) => void
  setIsTransactionsDialogOpen: (isOpen: boolean) => void
  setAssetCode: (code: string | null) => void
  setAssetType: (type: string | null) => void
  setIsAddSameTransactionOpen: (isOpen: boolean) => void
  onTransactionChange: () => void
}

/**
 * @function AssetPositionRow
 * @description Renders a single row of the asset positions table, including expansion functionality and transaction table.
 * @param {AssetPositionRowProps} props - Props for the AssetPositionRow component.
 * @returns {React.FC<AssetPositionRowProps>} - The AssetPositionRow component.
 */
export const AssetPositionRow: React.FC<AssetPositionRowProps> = ({
  position,
  isRowExpanded,
  calculatedAssetData,
  handleToggleRow,
  setSelectedAssetPositionId,
  setIsTransactionsDialogOpen,
  setAssetCode,
  setAssetType,
  setIsAddSameTransactionOpen,
  onTransactionChange,
}) => {
  return (
    <>
      <StyledAssetTableRow id={`asset-row-${position.assetCode}`}>
        <StyledAssetTableCell
          onClick={() => {
            setSelectedAssetPositionId(position._id)
            setIsTransactionsDialogOpen(true)
            setAssetCode(position.assetCode)
            setAssetType(position.assetType)
          }}
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {position.assetCode}
        </StyledAssetTableCell>
        <StyledAssetTableCell align="center">
          <Typography
            variant="body2"
            sx={{
              color:
                calculatedAssetData?.quantity !== undefined
                  ? calculatedAssetData?.quantity > 0
                    ? 'success.main'
                    : 'error.main'
                  : 'inherit',
            }}
          >
            {calculatedAssetData?.quantity !== undefined ? calculatedAssetData?.quantity.toFixed(2) : 'N/A'}
          </Typography>
        </StyledAssetTableCell>
        <StyledAssetTableCell align="center">
          <Typography variant="body2">
            {calculatedAssetData?.averagePrice !== undefined
              ? formatCurrency(Math.abs(calculatedAssetData?.averagePrice))
              : 'N/A'}
          </Typography>
        </StyledAssetTableCell>
        <StyledAssetTableCell align="center">
          <Typography
            variant="body2"
            sx={{
              color:
                calculatedAssetData?.netSpentValue !== undefined
                  ? calculatedAssetData?.netSpentValue > 0
                    ? 'success.main'
                    : 'error.main'
                  : 'inherit',
            }}
          >
            {calculatedAssetData?.netSpentValue !== undefined
              ? formatCurrency(calculatedAssetData?.netSpentValue)
              : 'N/A'}
          </Typography>
        </StyledAssetTableCell>
        <StyledAssetTableCell align="center">Implementar</StyledAssetTableCell>
        <StyledAssetTableCell align="center">Implementar</StyledAssetTableCell>
        <StyledAssetTableCell align="center">
          {assetTypes.find((type) => type.value === position.assetType)?.label || position.assetType}
        </StyledAssetTableCell>
        <StyledAssetTableCell align="center">{formatDate(position.createdAt)}</StyledAssetTableCell>
        <StyledAssetTableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              handleToggleRow(position._id)
              setSelectedAssetPositionId(position._id)
              setAssetCode(position.assetCode)
              setAssetType(position.assetType)
            }}
          >
            {isRowExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          <Tooltip title="Adicionar Transação">
            <IconButton
              aria-label="add same transaction"
              size="small"
              onClick={() => {
                setIsAddSameTransactionOpen(true)
                setSelectedAssetPositionId(position._id)
                setAssetCode(position.assetCode)
                setAssetType(position.assetType)
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </StyledAssetTableCell>
      </StyledAssetTableRow>
      {isRowExpanded && (
        <StyledAssetTableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
            <TransactionTable
              assetCode={position.assetCode}
              assetType={position.assetType}
              positionId={position._id}
              onTransactionChange={onTransactionChange}
            />
          </TableCell>
        </StyledAssetTableRow>
      )}
    </>
  )
}

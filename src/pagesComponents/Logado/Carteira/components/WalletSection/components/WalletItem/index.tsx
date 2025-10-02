import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import React from 'react'

import { Wallet, WalletTransactions } from '@/services/api/types'
import { useTheme } from '@/theme/ThemeContext'

import { useFocus } from '../../../RecentActivities/components/FocusContext/FocusContext'
import { AddTransactionDialog } from '../Dialogs/Transactions/AddTransactionDialog'
import { AddSameTransactionDialog } from '../Dialogs/Transactions/AddTransactionSameAsset'
import { TransactionsDialog } from '../Dialogs/Transactions/TransactionsDialog'
import { AddTransactionButton } from './AddTransactionButton'
import { AssetPositionsTable } from './AssetPositionsTable'
import { WalletDetailsContainer, WalletItemContainer, WalletSummaryContainer } from './styled'
import { useWalletItem } from './useWalletItem'
import { WalletActions } from './WalletActions'

interface WalletItemProps {
  wallet: Wallet
  expanded: boolean
  onAccordionChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void
  onEdit: (wallet: Wallet) => void
  onDelete: (walletId: string) => void
  walletPositions: WalletTransactions | null
  loadingPositions: boolean
  errorPositions: string | null
  fetchWalletPositions: (walletId: string) => Promise<void>
}

export const WalletItem = React.memo(
  ({ wallet, expanded, onAccordionChange, onEdit, onDelete }: WalletItemProps) => {
    const { isDarkMode } = useTheme()
    const accordionSummaryBackground = isDarkMode
      ? 'linear-gradient(to right, #0A1929, #163451 95%)'
      : 'linear-gradient(to right, #ffffff, #f5f7fa 95%)'
    const accordionDetailsBackground = isDarkMode ? '#223B54' : '#faf6f0'

    const {
      walletPositions,
      loadingPositions,
      errorPositions,
      fetchWalletPositions,
      isAddTransactionOpen,
      setIsAddTransactionOpen,
      isAddSameTransactionOpen,
      setIsAddSameTransactionOpen,
      selectedPosition,
      setSelectedPosition,
      expandedRows,
      handleToggleRow,
      isTransactionsDialogOpen,
      setIsTransactionsDialogOpen,
      selectedAssetPositionId,
      setSelectedAssetPositionId,
      assetCode,
      setAssetCode,
      assetType,
      setAssetType,
    } = useWalletItem({ walletId: wallet._id, expanded })

    const { focusedAssetCode } = useFocus()

    const handleTransactionSavedOrDeleted = () => {
      fetchWalletPositions()
    }

    return (
      <WalletItemContainer>
        <Accordion expanded={expanded} onChange={onAccordionChange(wallet._id)} key={wallet._id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${wallet._id}-content`}
            id={`panel-${wallet._id}-header`}
            sx={{ background: accordionSummaryBackground }}
          >
            <WalletSummaryContainer>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                }}
              >
                <Typography variant="h4" color="text.primary" sx={{ flexGrow: 1 }}>
                  {wallet.name}
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {wallet.description}
                  </Typography>
                </Typography>
                <WalletActions wallet={wallet} onEdit={onEdit} onDelete={onDelete} />
              </Box>
            </WalletSummaryContainer>
          </AccordionSummary>
          <AccordionDetails sx={{ background: accordionDetailsBackground }}>
            <WalletDetailsContainer>
              <AddTransactionButton
                onClick={() => {
                  setSelectedPosition(wallet._id)
                  setIsAddTransactionOpen(true)
                }}
              />

              <AssetPositionsTable
                walletPositions={walletPositions}
                loadingPositions={loadingPositions}
                errorPositions={errorPositions}
                expandedRows={expandedRows}
                handleToggleRow={handleToggleRow}
                setSelectedAssetPositionId={setSelectedAssetPositionId}
                setIsTransactionsDialogOpen={setIsTransactionsDialogOpen}
                setAssetCode={setAssetCode}
                setAssetType={setAssetType}
                setIsAddSameTransactionOpen={setIsAddSameTransactionOpen}
                onTransactionChange={handleTransactionSavedOrDeleted}
                focusedAssetCode={focusedAssetCode}
              />

              <AddTransactionDialog
                open={isAddTransactionOpen}
                onClose={() => setIsAddTransactionOpen(false)}
                positionId={selectedPosition}
                userId={wallet.userId}
                onSave={handleTransactionSavedOrDeleted}
              />

              <TransactionsDialog
                open={isTransactionsDialogOpen}
                onClose={() => setIsTransactionsDialogOpen(false)}
                userId={wallet.userId}
                assetId={selectedAssetPositionId}
                onSave={handleTransactionSavedOrDeleted}
                assetCode={assetCode}
                assetType={assetType}
              />
              <AddSameTransactionDialog
                open={isAddSameTransactionOpen}
                onClose={() => setIsAddSameTransactionOpen(false)}
                userId={wallet.userId}
                positionId={selectedAssetPositionId}
                assetCode={assetCode}
                assetType={assetType}
                onSave={handleTransactionSavedOrDeleted}
              />
            </WalletDetailsContainer>
          </AccordionDetails>
        </Accordion>
      </WalletItemContainer>
    )
  },
)

WalletItem.displayName = 'WalletItem'

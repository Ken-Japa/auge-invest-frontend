import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'

import { Wallet } from '@/services/api/types'

import { EditButton, WalletActions as StyledWalletActions } from '../styled'

interface WalletActionsProps {
  wallet: Wallet
  onEdit: (wallet: Wallet) => void
  onDelete: (walletId: string) => void
}

/**
 * @function WalletActions
 * @description Component for displaying edit and delete actions for a wallet.
 * @param {WalletActionsProps} props - The props for the component.
 * @param {Wallet} props.wallet - The wallet object.
 * @param {(wallet: Wallet) => void} props.onEdit - Callback function for editing the wallet.
 * @param {(walletId: string) => void} props.onDelete - Callback function for deleting the wallet.
 */
export const WalletActions: React.FC<WalletActionsProps> = ({ wallet, onEdit, onDelete }) => {
  return (
    <StyledWalletActions>
      <Tooltip title="Editar Carteira">
        <EditButton
          onClick={(e) => {
            e.stopPropagation()
            onEdit(wallet)
          }}
        >
          <EditIcon />
        </EditButton>
      </Tooltip>
      <Tooltip title="Excluir Carteira">
        <EditButton
          onClick={(e) => {
            e.stopPropagation()
            onDelete(wallet._id)
          }}
          sx={{ ml: 2 }}
        >
          <DeleteIcon sx={{ color: 'error.main' }} />
        </EditButton>
      </Tooltip>
    </StyledWalletActions>
  )
}

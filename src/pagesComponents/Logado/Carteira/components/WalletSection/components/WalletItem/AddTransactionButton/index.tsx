import { Add as AddIcon } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import React from 'react'

interface AddTransactionButtonProps {
  onClick: () => void
}

/**
 * @function AddTransactionButton
 * @description Component for the "Cadastrar Operação" button.
 * @param {AddTransactionButtonProps} props - The props for the component.
 * @param {() => void} props.onClick - Callback function to be called when the button is clicked.
 */
export const AddTransactionButton: React.FC<AddTransactionButtonProps> = ({ onClick }) => {
  return (
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        sx={{
          backgroundColor: '#0A1929',
          color: 'white',
          '&:hover': {
            backgroundColor: '#1A3A5B',
          },
          '.MuiButton-startIcon': {
            color: 'white',
          },
        }}
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={onClick}
      >
        Cadastrar Operação
      </Button>
    </Box>
  )
}

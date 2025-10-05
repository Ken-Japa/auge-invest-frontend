import { Alert, AlertProps, Snackbar as MuiSnackbar } from '@mui/material'
import React from 'react'

interface SnackbarProps {
  open: boolean
  message: string
  severity?: AlertProps['severity']
  onClose: () => void
  autoHideDuration?: number
}

/**
 * @typedef {object} SnackbarProps
 * @property {boolean} open - Controla a visibilidade do Snackbar.
 * @property {string} message - A mensagem a ser exibida no Snackbar.
 * @property {AlertProps['severity']} [severity] - O tipo de alerta (e.g., 'success', 'error', 'warning', 'info'). Padrão é 'info'.
 * @property {() => void} onClose - Callback disparado quando o Snackbar é fechado.
 * @property {number} [autoHideDuration] - Duração em milissegundos para o Snackbar fechar automaticamente. Padrão é 6000ms.
 */

/**
 * Componente Snackbar reutilizável para exibir mensagens de feedback temporárias ao usuário.
 * Utiliza o componente Snackbar e Alert do Material UI.
 *
 * @param {SnackbarProps} props - As propriedades do componente.
 * @returns {JSX.Element} O componente Snackbar renderizado.
 */
export const Snackbar = ({
  open,
  message,
  severity = 'info',
  onClose,
  autoHideDuration = 6000,
}: SnackbarProps) => {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}

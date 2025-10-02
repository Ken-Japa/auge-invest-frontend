import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

export const AlertGrid = styled(Grid)(() => ({
  // Estilos específicos para o grid de alerta, se necessário
}))

export const BuyAlertPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}))

export const SellAlertPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}))

export const BuyAlertTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.success.light,
  marginBottom: theme.spacing(2),
}))

export const SellAlertTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.error.light,
  marginBottom: theme.spacing(2),
}))
export const PriceContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

export const BuyPriceValue = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.success.light,
  marginBottom: theme.spacing(2),
}))

export const SellPriceValue = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.error.light,
  marginBottom: theme.spacing(2),
}))

export const PriceInfo = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}))

export const AlertDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
}))

export const SecondaryPriceContainer = styled(Box)(() => ({
  // Estilos específicos para o container de preço secundário, se necessário
}))

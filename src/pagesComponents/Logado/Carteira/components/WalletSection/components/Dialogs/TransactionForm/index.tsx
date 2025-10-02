import { Button, Grid, MenuItem, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { assetTypes, transactionTypes } from '../../transactionConstants'

interface TransactionFormProps {
  initialValues?: any
  onSubmit: (data: any) => void
  onCancel: () => void
  isEdit?: boolean
  disableAssetFields?: boolean
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isEdit = false,
  disableAssetFields = false,
}) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: initialValues || {
      type: 'buy',
      assetType: 'acao',
      assetCode: '',
      quantity: '',
      price: '',
      date: new Date(),
    },
  })

  React.useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="Tipo de Transação" fullWidth margin="normal">
                  {transactionTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="assetType"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Tipo de Ativo"
                  fullWidth
                  margin="normal"
                  disabled={disableAssetFields}
                >
                  {assetTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="assetCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Código do Ativo"
                  fullWidth
                  margin="normal"
                  disabled={disableAssetFields}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Quantidade" type="number" fullWidth margin="normal" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Preço Unitário"
                  type="number"
                  fullWidth
                  margin="normal"
                  inputProps={{ step: '0.01' }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Data da Transação"
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={onCancel} color="secondary">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {isEdit ? 'Salvar Alterações' : 'Adicionar Transação'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  )
}

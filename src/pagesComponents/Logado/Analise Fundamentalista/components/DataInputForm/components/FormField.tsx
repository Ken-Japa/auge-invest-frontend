import { Tooltip } from '@mui/material'
import { Controller } from 'react-hook-form'

import { NumberInput } from '@/components/Form/NumberInput'

import { FieldContainer } from '../styled'
import { FormFieldProps } from '../types/types'

export const FormField = ({
  control,
  name,
  label,
  tooltip,
  allowNegative = false,
  warning,
}: FormFieldProps) => (
  <FieldContainer item xs={12} sm={6}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Tooltip
          title={
            <>
              {tooltip}
              {warning && field.value < 0 && (
                <>
                  <br />
                  <br />
                  <strong>Atenção:</strong> {warning}
                </>
              )}
            </>
          }
          placement="top-start"
        >
          <NumberInput
            {...field}
            value={field.value || null}
            label={label}
            error={!allowNegative && field.value < 0}
            helperText={!allowNegative && field.value < 0 ? 'Este campo não deve ser negativo' : undefined}
            fullWidth
            onChange={(value: number | null) => {
              if (value === null) {
                field.onChange(null)
              } else if (!allowNegative && value < 0) {
                field.onChange(Math.abs(value))
              } else {
                field.onChange(value)
              }
            }}
          />
        </Tooltip>
      )}
    />
  </FieldContainer>
)

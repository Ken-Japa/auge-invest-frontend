import { TextField, TextFieldProps } from '@mui/material'
import { forwardRef, useState } from 'react'

interface NumberInputProps extends Omit<TextFieldProps, 'onChange'> {
  onChange?: (value: number | null) => void
  value?: number | null
  decimalPlaces?: number
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ onChange, value, decimalPlaces = 2, ...props }, ref) => {
    const [isEditing, setIsEditing] = useState(false)
    const [localValue, setLocalValue] = useState('')

    const formatNumber = (num: number | null | undefined): string => {
      if (num === null || num === undefined) return ''
      return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimalPlaces,
        useGrouping: true,
      }).format(num)
    }

    const parseNumber = (value: string): number | null => {
      if (!value) return null
      const cleanValue = value.replace(/\./g, '').replace(',', '.')
      const number = parseFloat(cleanValue)
      return isNaN(number) ? null : number
    }

    const handleFocus = () => {
      setIsEditing(true)
      const rawValue = value?.toString().replace('.', ',') || ''
      setLocalValue(rawValue)
    }

    const handleBlur = () => {
      setIsEditing(false)
      const numericValue = parseNumber(localValue)
      onChange?.(numericValue)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value

      if (!/^-?[\d.,]*$/.test(inputValue)) {
        return
      }

      const decimalCount = (inputValue.match(/[.,]/g) || []).length
      if (decimalCount > 1) {
        return
      }

      if (inputValue.split('-').length > 2 || (inputValue.includes('-') && inputValue.indexOf('-') !== 0)) {
        return
      }

      setLocalValue(inputValue)

      if (!inputValue.endsWith(',') && !inputValue.endsWith('.')) {
        const numericValue = parseNumber(inputValue)
        onChange?.(numericValue)
      }
    }

    return (
      <TextField
        {...props}
        ref={ref}
        value={isEditing ? localValue : formatNumber(value)}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        inputProps={{
          ...props.inputProps,
          inputMode: 'numeric',
        }}
      />
    )
  },
)

NumberInput.displayName = 'NumberInput'

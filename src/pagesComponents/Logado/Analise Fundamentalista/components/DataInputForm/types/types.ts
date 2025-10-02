import { Control } from 'react-hook-form'

export interface FormSectionProps {
  title: string
  description: string
  children: React.ReactNode
}

export interface FormFieldProps {
  control: Control<any>
  name: string
  label: string
  tooltip: string
  allowNegative?: boolean
  warning?: string
}

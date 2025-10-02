import React, { ReactNode } from 'react'

import { UnitText } from '../styled'
import { MetricType } from '../types/types'

export const formatMetricValue = (value: number | undefined | null, type: MetricType): ReactNode => {
  if (value === undefined || value === null) {
    return '---'
  }

  try {
    switch (type) {
      case 'currency':
        return React.createElement(
          React.Fragment,
          null,
          `R$ ${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`,
        )
      case 'ratio':
        return React.createElement(
          React.Fragment,
          null,
          value.toLocaleString('pt-BR', { maximumFractionDigits: 2 }),
          React.createElement(UnitText, null, 'x'),
        )
      case 'percentage':
        return React.createElement(
          React.Fragment,
          null,
          value.toLocaleString('pt-BR', { maximumFractionDigits: 2 }),
          React.createElement(UnitText, null, '%'),
        )
      case 'number':
        return React.createElement(
          React.Fragment,
          null,
          value.toLocaleString('pt-BR', { maximumFractionDigits: 2 }),
        )
      default:
        return value.toLocaleString('pt-BR', { maximumFractionDigits: 2 })
    }
  } catch (error) {
    return '---'
  }
}

export const checkMissingFields = <T extends Record<string, any>>(
  data: T,
  fields: (keyof T)[],
  getFieldLabel: (field: keyof T) => string,
): string[] => {
  return fields.filter((field) => !data[field]).map(getFieldLabel)
}

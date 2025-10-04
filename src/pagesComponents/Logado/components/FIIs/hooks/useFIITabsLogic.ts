import { useCallback, useState } from 'react'

export const useFIITabsLogic = (initialViewMode?: 'card' | 'table' | 'grid') => {
  const getInitialValue = () => {
    switch (initialViewMode) {
      case 'card':
        return 0
      case 'table':
        return 1
      case 'grid':
        return 2
      default:
        return 0
    }
  }
  const [value, setValue] = useState(getInitialValue())

  const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }, [])

  return {
    value,
    handleChange,
  }
}

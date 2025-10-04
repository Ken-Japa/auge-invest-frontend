import { useCallback, useState } from 'react'

interface UseBDRTabsLogicProps {
  initialViewMode?: 'card' | 'table' | 'grid'
}

export const useBDRTabsLogic = ({ initialViewMode }: UseBDRTabsLogicProps) => {
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

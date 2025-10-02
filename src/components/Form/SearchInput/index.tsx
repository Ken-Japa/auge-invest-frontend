import { Clear, Search } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { ChangeEvent, FC } from 'react'

import { ClearButtonWrapper, SearchContainer, SearchIconWrapper, SearchInput } from './styled'

interface GenericSearchInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export const GenericSearchInput: FC<GenericSearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Pesquisar...',
}) => {
  const handleClear = () => {
    const event = {
      target: { value: '' },
    } as ChangeEvent<HTMLInputElement>
    onChange(event)
  }

  return (
    <SearchContainer>
      <SearchIconWrapper>
        <Search className="text-white/60" />
      </SearchIconWrapper>
      <SearchInput placeholder={placeholder} value={value} onChange={onChange} id="generic-search-input" />
      {value && (
        <ClearButtonWrapper>
          <IconButton
            onClick={handleClear}
            sx={{
              color: 'white',
              opacity: 0.6,
              padding: '4px',
              '&:hover': {
                opacity: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
            size="small"
          >
            <Clear fontSize="small" />
          </IconButton>
        </ClearButtonWrapper>
      )}
    </SearchContainer>
  )
}

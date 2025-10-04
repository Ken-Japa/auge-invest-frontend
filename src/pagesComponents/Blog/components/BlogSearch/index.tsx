import { ChangeEvent } from 'react'

import { GenericSearchInput } from '@/components/Form/SearchInput'

import { SearchInputContainer } from './styled'

interface BlogSearchProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  isLoading?: boolean
}

export const BlogSearch = ({ value, onChange, isLoading }: BlogSearchProps) => {
  if (isLoading) {
    return (
      <SearchInputContainer>
        <GenericSearchInput value="" onChange={() => {}} placeholder="Carregando..." />
      </SearchInputContainer>
    )
  }

  return (
    <SearchInputContainer>
      <GenericSearchInput value={value} onChange={onChange} placeholder="Pesquisar artigos..." />
    </SearchInputContainer>
  )
}

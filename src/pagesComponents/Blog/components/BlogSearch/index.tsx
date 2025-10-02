import { ChangeEvent } from 'react'

import { GenericSearchInput } from '@/components/Form/SearchInput'

interface BlogSearchProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  isLoading?: boolean
}

export const BlogSearch = ({ value, onChange, isLoading }: BlogSearchProps) => {
  if (isLoading) {
    return <GenericSearchInput value="" onChange={() => {}} placeholder="Carregando..." />
  }

  return <GenericSearchInput value={value} onChange={onChange} placeholder="Pesquisar artigos..." />
}

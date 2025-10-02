import CloseIcon from '@mui/icons-material/Close'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material'
import { useState } from 'react'

import { CloseButton, SearchContainer } from './styled'

interface Currency {
  id: string
  name: string
  value: number
  variation: number
}

interface SearchDialogProps {
  open: boolean
  onClose: () => void
  onSelect: (currency: Currency) => void
  currencies: Currency[]
}

export const SearchDialog = ({ open, onClose, onSelect, currencies }: SearchDialogProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Buscar Moeda
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </DialogTitle>
      <DialogContent>
        <SearchContainer>
          <TextField
            autoFocus
            fullWidth
            placeholder="Digite para buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <List>
            {filteredCurrencies.map((currency) => (
              <ListItem key={currency.id} disablePadding>
                <ListItemButton onClick={() => onSelect(currency)}>
                  <ListItemText
                    primary={currency.name}
                    secondary={`R$ ${currency.value.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </SearchContainer>
      </DialogContent>
    </Dialog>
  )
}

import CloseIcon from '@mui/icons-material/Close'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material'
import { useState } from 'react'

import { SearchContainer } from './styled'

interface SearchDialogProps {
  open: boolean
  onClose: () => void
  onSelect: (index: { id: string; name: string }) => void
}

// Temporary mock data - will be replaced with API data
const mockIndices = [
  { id: 'IBOV', name: 'IBOVESPA' },
  { id: 'IFIX', name: 'Índice de Fundos Imobiliários' },
  { id: 'SMLL', name: 'Small Caps' },
  { id: 'IDIV', name: 'Índice Dividendos' },
]

export const SearchDialog = ({ open, onClose, onSelect }: SearchDialogProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredIndices = mockIndices.filter(
    (index) =>
      index.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      index.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Buscar Índice
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
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
            {filteredIndices.map((index) => (
              <ListItem key={index.id} disablePadding>
                <ListItemButton onClick={() => onSelect(index)}>
                  <ListItemText primary={index.name} secondary={index.id} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </SearchContainer>
      </DialogContent>
    </Dialog>
  )
}

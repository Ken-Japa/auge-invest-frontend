import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

import { CustomButton } from '@/components/Core/Button'

import { ProfileLabel, ProfileSection, ProfileValue } from '../../styled'

interface UserInfoProps {
  label: string
  value: string | null | undefined
  onEdit: () => void
  addMode?: boolean
}

export const UserInfo = ({ label, value, onEdit, addMode }: UserInfoProps) => (
  <ProfileSection>
    <ProfileLabel>{label}</ProfileLabel>
    <ProfileValue>{value || 'Não informado'}</ProfileValue>
    <CustomButton
      variant="outlined"
      size="small"
      startIcon={addMode ? <AddIcon /> : <EditIcon />}
      onClick={onEdit}
    >
      {addMode ? 'Adicionar' : 'Editar'}
    </CustomButton>
  </ProfileSection>
)

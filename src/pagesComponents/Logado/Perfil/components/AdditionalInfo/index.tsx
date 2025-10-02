import EditIcon from '@mui/icons-material/Edit'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'

import { EditButton, InfoContainer, InfoLabel, InfoRow, InfoValue, StyledDivider } from '../BasicInfo/styled'

import { HeaderContainer, HeaderTitle } from './styled'

interface AdditionalInfoProps {
  displayCreatedAt: string | null
  displayUpdatedAt: string | null
  isActiveUser: boolean
  userData: any
  handleEdit: (field: string, value: string) => void
}

export const AdditionalInfo: React.FC<AdditionalInfoProps> = ({
  displayCreatedAt,
  displayUpdatedAt,
  isActiveUser,
  userData,
  handleEdit,
}) => {
  const [showAdditionalInfo, setShowAdditionalInfo] = React.useState(false)

  return (
    <>
      <HeaderContainer onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}>
        <HeaderTitle>Informações Adicionais</HeaderTitle>
        {showAdditionalInfo ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </HeaderContainer>

      {showAdditionalInfo && (
        <InfoContainer>
          {/* Account creation date */}
          {displayCreatedAt && (
            <>
              <InfoRow>
                <InfoLabel>Conta criada em</InfoLabel>
                <InfoValue>{displayCreatedAt}</InfoValue>
              </InfoRow>
              <StyledDivider />
            </>
          )}

          {/* Last update date */}
          {displayUpdatedAt && (
            <>
              <InfoRow>
                <InfoLabel>Última atualização</InfoLabel>
                <InfoValue>{displayUpdatedAt}</InfoValue>
              </InfoRow>
              <StyledDivider />
            </>
          )}

          {/* Account status */}
          <InfoRow>
            <InfoLabel>Status da conta</InfoLabel>
            <InfoValue>{isActiveUser ? 'Ativa' : 'Inativa'}</InfoValue>
          </InfoRow>
          <StyledDivider />

          {/* Default dashboard */}
          {userData?.preferences?.defaultDashboard && (
            <>
              <InfoRow>
                <InfoLabel>Dashboard padrão</InfoLabel>
                <InfoValue>{userData.preferences.defaultDashboard}</InfoValue>
                <EditButton
                  onClick={() => handleEdit('defaultDashboard', userData.preferences.defaultDashboard)}
                  startIcon={<EditIcon />}
                  size="small"
                  color="primary"
                >
                  Editar
                </EditButton>
              </InfoRow>
              <StyledDivider />
            </>
          )}

          {/* Default position type */}
          {userData?.preferences?.defaultPositionType && (
            <InfoRow>
              <InfoLabel>Tipo de posição padrão</InfoLabel>
              <InfoValue>
                {userData.preferences.defaultPositionType === 'real' ? 'Real' : 'Simulada'}
              </InfoValue>
              <EditButton
                onClick={() => handleEdit('defaultPositionType', userData.preferences.defaultPositionType)}
                startIcon={<EditIcon />}
                size="small"
                color="primary"
              >
                Editar
              </EditButton>
            </InfoRow>
          )}
        </InfoContainer>
      )}
    </>
  )
}

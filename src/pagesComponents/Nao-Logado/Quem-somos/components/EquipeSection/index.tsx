import GroupsIcon from '@mui/icons-material/Groups'

import { visitorColors } from '@/theme/palette/visitor'

import { BaseSection, ContentContainer, SectionTitle, Subtitle } from '../../styled'

import { EquipeSkeleton } from './EquipeSkeleton'

interface EquipeSectionProps {
  isLoading?: boolean
}

export const EquipeSection = ({ isLoading }: EquipeSectionProps) => {
  if (isLoading) {
    return <EquipeSkeleton />
  }

  return (
    <BaseSection>
      <SectionTitle>
        <GroupsIcon sx={{ color: visitorColors.accent, fontSize: 32 }} />
        <h2 className="text-2xl" style={{ color: visitorColors.accent }}>
          Nossa Equipe
        </h2>
      </SectionTitle>
      <Subtitle>O Cérebro por Trás da Revolução</Subtitle>
      <ContentContainer>
        <p>
          Somos um time diversificado de profissionais apaixonados por tecnologia e mercado financeiro.
          <br />
          <br />
          Nossa equipe combina experiência em desenvolvimento de software, análise de dados, mercado
          financeiro e atendimento ao cliente para oferecer a melhor experiência possível.
        </p>
      </ContentContainer>
    </BaseSection>
  )
}

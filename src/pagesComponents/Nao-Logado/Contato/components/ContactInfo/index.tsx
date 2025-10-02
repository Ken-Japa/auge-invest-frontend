import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import { Typography } from '@mui/material'
import { type FC } from 'react'

import { ContactInfoSkeleton } from './ContactInfoSkeleton'
import { InfoContainer, InfoHeader, InfoItem } from './styled'

interface ContactInfoProps {
  isLoading: boolean
}

const contactData = [
  {
    icon: EmailIcon,
    title: 'Email',
    content: 'contato@capitalauge.com.br',
  },
  {
    icon: LocationOnIcon,
    title: 'Localização',
    content: 'Minas Gerais, MG - Brasil',
  },
  {
    icon: PhoneIcon,
    title: 'Telefone',
    content: '+55 (21) 99430-3047',
  },
] as const

export const ContactInfo: FC<ContactInfoProps> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <InfoContainer spacing={3} flex={1}>
        <ContactInfoSkeleton />
      </InfoContainer>
    )
  }

  return (
    <InfoContainer spacing={3} flex={1}>
      {contactData.map(({ icon: Icon, title, content }) => (
        <InfoItem key={title}>
          <InfoHeader>
            <Icon className="info-icon" />
            <Typography className="info-title">{title}</Typography>
          </InfoHeader>
          <Typography className="info-content">{content}</Typography>
        </InfoItem>
      ))}
    </InfoContainer>
  )
}

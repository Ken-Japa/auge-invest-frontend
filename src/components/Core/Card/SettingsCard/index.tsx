import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

import {
  ContentContainer,
  SectionHeader,
  SectionIcon,
  SectionTitle,
  StyledCard} from './styled';

interface SettingsCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export const SettingsCard = ({ icon, title, children }: SettingsCardProps) => {
  return (
    <StyledCard>
      <SectionHeader>
        <SectionIcon>
          {icon}
        </SectionIcon>
        <SectionTitle variant="h4">{title}</SectionTitle>
      </SectionHeader>
      <ContentContainer>
        {children}
      </ContentContainer>
    </StyledCard>
  );
};
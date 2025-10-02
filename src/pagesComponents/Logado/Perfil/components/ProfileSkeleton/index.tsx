import { Stack } from '@mui/material'

import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

import { ProfileCard } from '../../styled'

import { StyledContainer, StyledStack } from './styled'

export const ProfileSkeleton = () => (
  <StyledContainer maxWidth="xl">
    <ContentSkeleton type="text" textLines={1} />

    <ProfileCard elevation={3}>
      {[...Array(4)].map((_, index) => (
        <StyledStack key={index} direction="row" justifyContent="space-between" alignItems="center">
          <Stack spacing={1}>
            <ContentSkeleton type="text" textLines={1} />
            <ContentSkeleton type="text" textLines={1} />
          </Stack>
          <ContentSkeleton type="text" textLines={1} />
        </StyledStack>
      ))}
    </ProfileCard>

    <ProfileCard elevation={3}>
      <ContentSkeleton type="form" formFields={5} />
    </ProfileCard>

    <ContentSkeleton type="text" textLines={1} className="mt-4" />
  </StyledContainer>
)

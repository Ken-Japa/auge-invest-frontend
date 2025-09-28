import { Container, Stack } from '@mui/material';

import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';

import { ProfileCard } from '../../styled';

export const ProfileSkeleton = () => (
    <Container maxWidth="xl" sx={{ py: 4 }}>
        <ContentSkeleton type="text" textLines={1} />

        <ProfileCard elevation={3}>
            {[...Array(4)].map((_, index) => (
                <Stack
                    key={index}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ py: 2 }}
                >
                    <Stack spacing={1}>
                        <ContentSkeleton type="text" textLines={1} />
                        <ContentSkeleton type="text" textLines={1} />
                    </Stack>
                    <ContentSkeleton type="text" textLines={1} />
                </Stack>
            ))}
        </ProfileCard>

        <ProfileCard elevation={3}>
            <ContentSkeleton type="form" formFields={5} />
        </ProfileCard>

        <ContentSkeleton type="text" textLines={1} className="mt-4" />
    </Container>
);
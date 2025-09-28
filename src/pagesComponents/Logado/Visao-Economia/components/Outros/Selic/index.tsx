"use client";

import { Box, Typography } from '@mui/material';

import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';

import { ContentSkeleton } from '../../../../../../components/Feedback/Skeletons/ContentSkeleton';
import {
    ChartContainer,
    SelicCard,
    SelicColorType,
    SelicContainer,
    SelicDate,
    SelicValue,
    SelicWrapper} from './styled';

// Temporary mock data - will be replaced with API data
const mockSelic = {
    current: 10.75,
    date: 'Jan/2024',
    history: [13.75, 13.25, 12.75, 12.25, 11.75, 11.25, 10.75]
};

const getSelicColor = (rate: number): SelicColorType => {
    if (rate >= 13) return 'error';
    if (rate >= 11) return 'warning';
    if (rate >= 8) return 'info';
    return 'success';
};

export const Selic = () => {
    return (
        <SuspenseWrapper
            fallback={<ContentSkeleton height={120} />}
        >
            <SelicContainer>
                <SelicWrapper>
                    <ChartContainer>
                        {/* Chart placeholder - will be replaced with actual chart */}
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'text.secondary',
                            fontStyle: 'italic'
                        }}>
                            SELIC<br />
                            Mini gráfico será implementado
                        </Box>
                    </ChartContainer>

                    <SelicCard>
                        <Typography variant="subtitle2" color="text.secondary">
                            Taxa Selic
                        </Typography>
                        <SelicValue color={getSelicColor(mockSelic.current)}>
                            {mockSelic.current}%
                        </SelicValue>
                        <SelicDate>
                            {mockSelic.date}
                        </SelicDate>
                    </SelicCard>
                </SelicWrapper>
            </SelicContainer>
        </SuspenseWrapper>
    );
};
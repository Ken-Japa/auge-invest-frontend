import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import { Divider,Grid, Typography } from '@mui/material';
import React from 'react';

import { InfoGrid, InfoSection, ItemList,SectionTitle } from './styled';

interface VantagensRiscosProps {
    vantagens: string[];
    riscos: string[];
}

export const VantagensRiscos: React.FC<VantagensRiscosProps> = ({ vantagens, riscos }) => {
    if ((!vantagens || vantagens.length === 0) && (!riscos || riscos.length === 0)) return null;

    return (
        <InfoGrid container spacing={3}>
            {vantagens && vantagens.length > 0 && (
                <Grid item xs={12} md={6}>
                    <InfoSection elevation={1}>
                        <SectionTitle variant="h4">
                            <TrendingUpIcon color="success" /> Vantagens Competitivas
                        </SectionTitle>
                        <Divider sx={{ my: 1.5 }} />
                        <ItemList component="ul">
                            {vantagens.slice(0, 3).map((vantagem, index) => (
                                <Typography component="li" variant="body2" key={index}>
                                    {vantagem}
                                </Typography>
                            ))}
                        </ItemList>
                    </InfoSection>
                </Grid>
            )}

            {riscos && riscos.length > 0 && (
                <Grid item xs={12} md={6}>
                    <InfoSection elevation={1}>
                        <SectionTitle variant="h4">
                            <WarningIcon color="warning" /> Riscos do Negócio
                        </SectionTitle>
                        <Divider sx={{ my: 1.5 }} />
                        <ItemList component="ul">
                            {riscos.slice(0, 3).map((risco, index) => (
                                <Typography component="li" variant="body2" key={index}>
                                    {risco}
                                </Typography>
                            ))}
                        </ItemList>
                    </InfoSection>
                </Grid>
            )}
        </InfoGrid>
    );
};
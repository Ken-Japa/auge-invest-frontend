import React from 'react';
import { useRouter } from 'next/navigation';
import { CardContent, Divider, IconButton, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CardContainer, CodesContainer } from '../../styled';
import { formatCurrency } from '../../../utils/currency';
import { CodeItem } from '../CodeItem';
import {
    CompanyTitle,
    SegmentText,
    IndustryText,
    MarketValueText,
    ParticipationText,
    CodesTitle,
    HeaderContainer,
    InfoIconContainer
} from './styled';

interface CompanyCardProps {
    empresa: {
        empresa: string;
        industria: string;
        segmento: string;
        valorMercado: number;
        codigos: Array<{
            codigo: string;
            variacao?: number;
            preco?: number;
        }>;
    };
    totalMarketValue: number;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ empresa, totalMarketValue }) => {
    const router = useRouter();
    const participation = ((empresa.valorMercado / totalMarketValue) * 100).toFixed(2);

    const handleNavigate = () => {
        if (empresa.codigos && empresa.codigos.length > 0) {
            router.push(`/empresa/${empresa.codigos[0].codigo}`);
        }
    };

    return (
        <CardContainer>
            <CardContent sx={{ flexGrow: 1 }}>
                <HeaderContainer>
                    <CompanyTitle
                        variant="h6"
                        title={empresa.empresa}
                        onClick={handleNavigate}
                    >
                        {empresa.empresa}
                    </CompanyTitle>

                    <IndustryText variant="body2">
                        {empresa.industria}
                    </IndustryText>

                    <SegmentText variant="body2">
                        {empresa.segmento}
                    </SegmentText>

                    <InfoIconContainer>
                        <Tooltip title="Ver detalhes da empresa">
                            <IconButton
                                size="small"
                                onClick={handleNavigate}
                                sx={{
                                    p: 0.5,
                                    backgroundColor: theme => theme.palette.mode === "dark"
                                        ? "rgba(70, 90, 126, 0.4)"
                                        : "rgba(230, 235, 245, 0.6)",
                                    '&:hover': {
                                        backgroundColor: theme => theme.palette.mode === "dark"
                                            ? "rgba(70, 90, 126, 0.7)"
                                            : "rgba(230, 235, 245, 0.9)",
                                    }
                                }}
                            >
                                <InfoOutlinedIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </InfoIconContainer>
                </HeaderContainer>

                <MarketValueText variant="h5">
                    {formatCurrency(empresa.valorMercado)}
                </MarketValueText>

                <ParticipationText variant="body2">
                    Participação: {participation}%
                </ParticipationText>

                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', my: 1.5 }} />

                <CodesTitle variant="subtitle2">
                    Códigos:
                </CodesTitle>

                <CodesContainer>
                    {empresa.codigos.map((codigo, index) => (
                        <CodeItem key={index} codigo={codigo} />
                    ))}
                </CodesContainer>
            </CardContent>
        </CardContainer>
    );
};
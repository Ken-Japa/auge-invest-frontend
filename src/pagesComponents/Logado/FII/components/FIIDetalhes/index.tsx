"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Grid,
    CircularProgress,
    Alert,
    Breadcrumbs,
    Typography
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    CalendarToday as CalendarIcon,
    Business as BusinessIcon,
    AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { fetchFIIBySlugOrCode } from '../../../components/FIIs/services/fiisService';
import { FIIExtended } from '../../../components/FIIs/types';
import { formatCNPJ, formatDate, formatNumber } from '@/components/Utils/Formatters/formatters';
import {
    DetailContainer,
    DetailPaper,
    HeaderContainer,
    FIITitle,
    FIISubtitle,
    CodeChip,
    SectionDivider,
    InfoLabel,
    InfoValue,
    InfoContainer,
    IconWrapper,
    BackButton,
    SectionTitle,
    LoadingContainer,
    ErrorContainer
} from './styled';

interface FIIDetailsProps {
    slug: string;
    codigo?: string;
    isCode?: boolean;
}

const FIIDetails = ({ slug, codigo, isCode = false }: FIIDetailsProps) => {
    const router = useRouter();
    const [fii, setFII] = useState<FIIExtended | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadFII = async () => {
            try {
                setLoading(true);
                setError(null);

                const searchParam = codigo || slug;
                const shouldSearchByCode = isCode || /^\w+\d+$/.test(searchParam);

                const result = await fetchFIIBySlugOrCode(searchParam, shouldSearchByCode);

                if (!result) {
                    setError('FII não encontrado');
                    return;
                }

                setFII(result);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        loadFII();
    }, [slug, codigo, isCode]);

    const handleBack = () => {
        router.back();
    };

    if (loading) {
        return (
            <LoadingContainer>
                <CircularProgress />
            </LoadingContainer>
        );
    }

    if (error) {
        return (
            <ErrorContainer>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <BackButton
                    startIcon={<ArrowBackIcon />}
                    variant="contained"
                    onClick={handleBack}
                >
                    Voltar
                </BackButton>
            </ErrorContainer>
        );
    }

    if (!fii) {
        return (
            <ErrorContainer>
                <Alert severity="warning" sx={{ mb: 2 }}>
                    FII não encontrado
                </Alert>
                <BackButton
                    startIcon={<ArrowBackIcon />}
                    variant="contained"
                    onClick={handleBack}
                >
                    Voltar
                </BackButton>
            </ErrorContainer>
        );
    }

    return (
        <DetailContainer>

            <DetailPaper>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <HeaderContainer>
                            <div>
                                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {fii.nomeFII}
                                </Typography>
                                {fii.nomeCompletoFII && (
                                    <Typography variant="subtitle1" component="div" gutterBottom sx={{ color: 'text.secondary' }}>
                                        {fii.nomeCompletoFII}
                                    </Typography>
                                )}
                            </div>
                            <div>
                                {fii.codigo && fii.codigo.map((code) => (
                                    <CodeChip
                                        key={code}
                                        label={code}
                                        color="primary"
                                    />
                                ))}
                            </div>
                        </HeaderContainer>
                    </Grid>

                    <Grid item xs={12}>
                        <SectionDivider />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InfoContainer>
                            <Typography variant="body2" component="div" sx={{ color: 'text.secondary', mb: 0.5 }}>
                                CNPJ
                            </Typography>
                            <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                {fii.informacoes?.cnpj ? formatCNPJ(fii.informacoes.cnpj) : 'Não informado'}
                            </Typography>
                        </InfoContainer>

                        <InfoContainer>
                            <Typography variant="body2" component="div" sx={{ color: 'text.secondary', mb: 0.5 }}>
                                Data de Aprovação
                            </Typography>
                            <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconWrapper>
                                    <CalendarIcon fontSize="small" />
                                </IconWrapper>
                                {fii.quotaDateApproved ? formatDate(fii.quotaDateApproved) : 'Não informado'}
                            </Typography>
                        </InfoContainer>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InfoContainer>
                            <Typography variant="body2" component="div" sx={{ color: 'text.secondary', mb: 0.5 }}>
                                Quantidade de Cotas
                            </Typography>
                            <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconWrapper>
                                    <BusinessIcon fontSize="small" />
                                </IconWrapper>
                                {fii.quotaCount ? formatNumber(fii.quotaCount) : 'Não informado'}
                            </Typography>
                        </InfoContainer>
                    </Grid>

                    <Grid item xs={12}>
                        <SectionDivider />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
                            Descrição
                        </Typography>
                        <Typography variant="body1" component="div">
                            Não há descrição disponível para este FII.
                        </Typography>
                    </Grid>
                </Grid>
            </DetailPaper>
        </DetailContainer>
    );
};

export default FIIDetails;
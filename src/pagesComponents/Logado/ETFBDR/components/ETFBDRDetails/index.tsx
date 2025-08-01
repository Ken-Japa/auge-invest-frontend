"use client";
import React from 'react';
import { useRouter } from 'next/router';
import { DetailPageContainer } from './styled';
import { useETFBDRDetails } from './hooks/useETFBDRDetails';
import { ETFBDRLoadingState } from './utils/ETFBDRLoadingState';
import { ETFBDRNotFoundState } from './utils/ETFBDRNotFoundState';
import { ETFBDRDetailsContent } from './ETFBDRDetailsContent';


interface ETFBDRDetailsProps {
    slug: string;
    codigo?: string;
    isCode?: boolean;
}

const ETFDetails = ({ slug, codigo, isCode = false }: ETFBDRDetailsProps) => {
    const router = useRouter();
    const { etf, loading, error } = useETFBDRDetails({ slug, codigo, isCode });


    const handleBack = () => {
        router.back();
    };

    if (loading) {
        return <ETFBDRLoadingState />;
    }

    if (error) {
        return <ETFBDRNotFoundState message={error} onBack={handleBack} />;
    }

    if (!etf) {
        return <ETFBDRNotFoundState message="ETF não encontrado." onBack={handleBack} />;
    }

    return (
        <DetailPageContainer>
            <ETFBDRDetailsContent etf={etf} onBack={handleBack} />
        </DetailPageContainer>
    );
};

export default ETFDetails;
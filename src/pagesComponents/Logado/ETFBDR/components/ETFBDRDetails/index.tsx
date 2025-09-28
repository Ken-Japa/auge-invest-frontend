"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

import { PageBackground } from '@/components/Layout/PageBackground';

import { ETFBDRDetailsContent } from './ETFBDRDetailsContent';
import { useETFBDRDetails } from './hooks/useETFBDRDetails';
import { DetailPageContainer } from './styled';
import { ETFBDRLoadingState } from './utils/ETFBDRLoadingState';
import { ETFBDRNotFoundState } from './utils/ETFBDRNotFoundState';


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
        <PageBackground imageName="ETFs">
            <DetailPageContainer>

                <ETFBDRDetailsContent etf={etf} onBack={handleBack} />

            </DetailPageContainer>
        </PageBackground>
    );
};

export default ETFDetails;
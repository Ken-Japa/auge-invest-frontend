import { Metadata } from "next";

import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import FIIDetails from '@/pagesComponents/Logado/FII/components/FIIDetalhes';

interface FIIPageProps {
    params: {
        slug: string;
        codigo: string;
    };
}

export async function generateMetadata({ params }: FIIPageProps): Promise<Metadata> {
    return {
        title: `${params.codigo.toUpperCase()} | AugeInvest`,
        description: `Análise detalhada do FII ${params.codigo.toUpperCase()}.`,
    };
}

export default function FIICodePage({ params }: FIIPageProps) {
    const decodedSlug = decodeURIComponent(params.slug);
    const decodedCodigo = decodeURIComponent(params.codigo);

    if (!decodedSlug || !decodedCodigo) {
        notFound();
    }

    const isCode = true;

    return (
        <Container maxWidth="xl">
            <Suspense fallback={
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                    <CircularProgress />
                </Box>
            }>
                <FIIDetails
                    slug={decodedSlug}
                    codigo={decodedCodigo}
                    isCode={isCode}
                />
            </Suspense>
        </Container>
    );
}
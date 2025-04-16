import { Metadata } from "next";
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import FIIDetails from '@/pagesComponents/Logado/FII/components/FIIDetalhes';

interface FIIPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: FIIPageProps): Promise<Metadata> {
    return {
        title: `${params.slug.toUpperCase()} | AugeInvest`,
        description: `Análise detalhada do FII ${params.slug.toUpperCase()}, incluindo dividendos e métricas principais.`,
    };
}

export default function FIIPage({ params }: FIIPageProps) {
    const decodedSlug = decodeURIComponent(params.slug);

    if (!decodedSlug) {
        notFound();
    }

    const isCode = /^[A-Z0-9]+\d+$/i.test(decodedSlug);

    return (
        <Container maxWidth="xl">
            <Suspense fallback={
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                    <CircularProgress />
                </Box>
            }>
                <FIIDetails
                    slug={decodedSlug}
                    isCode={isCode}
                />
            </Suspense>
        </Container>
    );
}
import { Metadata } from "next";

import FIIDetails from "@/pagesComponents/Logado/FII/components/FIIDetalhes";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const awaitedParams = await params;
    const decodedSlug = decodeURIComponent(awaitedParams.slug).toUpperCase();
    return {
        title: `${decodedSlug} | AugeInvest`,
        description: `Análise detalhada do Fundo Imobiliário ${decodedSlug}, incluindo dividendos, patrimônio e métricas principais.`,
    };
}

export default async function FIIPage({ params }: { params: Promise<{ slug: string }> }) {
    const awaitedParams = await params;
    const decodedSlug = decodeURIComponent(awaitedParams.slug);
    return <FIIDetails slug={decodedSlug} />;
}
import { Metadata } from "next";
import ETFDetails from "@/pagesComponents/Logado/ETF/components/ETFDetails";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const awaitedParams = await params;
    const decodedSlug = decodeURIComponent(awaitedParams.slug).toUpperCase();
    return {
        title: `${decodedSlug} | AugeInvest`,
        description: `Análise detalhada do ETF ${decodedSlug}, incluindo informações de mercado e desempenho.`,
    };
}

export default async function ETFPage({ params }: { params: Promise<{ slug: string }> }) {
    const awaitedParams = await params;
    const decodedSlug = decodeURIComponent(awaitedParams.slug);
    return <ETFDetails slug={decodedSlug} />;
}
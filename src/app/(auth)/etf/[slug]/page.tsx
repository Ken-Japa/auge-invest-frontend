import { Metadata } from "next";
import ETFDetails from "@/pagesComponents/Logado/ETF/components/ETFDetails";

type PageProps = {
    params: { slug: string }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const decodedSlug = decodeURIComponent(params.slug).toUpperCase();
    return {
        title: `${decodedSlug} | AugeInvest`,
        description: `Análise detalhada do ETF ${decodedSlug}, incluindo informações de mercado e desempenho.`,
    };
}

export default function ETFPage({ params }: PageProps) {
    const decodedSlug = decodeURIComponent(params.slug);
    return <ETFDetails slug={decodedSlug} />;
}
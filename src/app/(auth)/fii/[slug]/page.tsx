import { Metadata } from "next";
import FIIDetails from "@/pagesComponents/Logado/FII/components/FIIDetalhes";

type PageProps = {
    params: { slug: string }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const decodedSlug = decodeURIComponent(params.slug).toUpperCase();
    return {
        title: `${decodedSlug} | AugeInvest`,
        description: `Análise detalhada do Fundo Imobiliário ${decodedSlug}, incluindo dividendos, patrimônio e métricas principais.`,
    };
}

export default function FIIPage({ params }: PageProps) {
    const decodedSlug = decodeURIComponent(params.slug);
    return <FIIDetails slug={decodedSlug} />;
}
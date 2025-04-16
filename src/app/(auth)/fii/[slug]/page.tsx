import { Metadata } from "next";
import FIIDetails from "@/pagesComponents/Logado/FII/components/FIIDetalhes";

type Props = {
    params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const decodedSlug = decodeURIComponent(params.slug).toUpperCase();
    return {
        title: `${decodedSlug} | AugeInvest`,
        description: `Análise detalhada do Fundo Imobiliário ${decodedSlug}, incluindo dividendos, patrimônio e métricas principais.`,
    };
}

export default function FIIPage({ params }: Props) {
    const decodedSlug = decodeURIComponent(params.slug);
    return <FIIDetails slug={decodedSlug} />;
}
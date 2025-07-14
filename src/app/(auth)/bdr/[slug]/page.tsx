import { Metadata } from "next";
import BDRDetails from "@/pagesComponents/Logado/BDR/components/BDRDetalhes";

type Props = {
    params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const decodedSlug = decodeURIComponent(params.slug).toUpperCase();
    return {
        title: `${decodedSlug} | AugeInvest`,
        description: `Análise detalhada do BDR ${decodedSlug}, incluindo dividendos, patrimônio e métricas principais.`,
    };
}

export default function FIIPage({ params }: Props) {
    const decodedSlug = decodeURIComponent(params.slug);
    return <BDRDetails slug={decodedSlug} />;
}
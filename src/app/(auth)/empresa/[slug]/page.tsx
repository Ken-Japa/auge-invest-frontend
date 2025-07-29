import { Metadata } from "next";
import { EmpresaDetalhes } from "@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes";

type PageProps = {
    params: { slug: string }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    return {
        title: `${params.slug.toUpperCase()} | AugeInvest`,
        description: `Análise detalhada da empresa ${params.slug.toUpperCase()}, incluindo dividendos, derivativos e métricas principais.`,
    };
}

export default function EmpresaPage({ params }: PageProps) {

    return <EmpresaDetalhes slug={params.slug} />;
}
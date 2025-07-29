import { Metadata } from "next";
import { EmpresaDetalhes } from "@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes";

type PageProps = {
    params: {
        slug: string;
        codigo: string;
    }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    return {
        title: `${params.codigo.toUpperCase()} | AugeInvest`,
        description: `Análise detalhada do ativo ${params.codigo.toUpperCase()} da empresa ${params.slug.toUpperCase()}.`,
    };
}

export default function EmpresaCodigoPage({ params }: PageProps) {
    return <EmpresaDetalhes slug={params.slug} codigoSelecionado={params.codigo} />;
}
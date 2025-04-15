import { Metadata } from "next";
import { EmpresaDetalhes } from "@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes";

type Props = {
    params: {
        slug: string;
        codigo: string;
    }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        title: `${params.codigo.toUpperCase()} | AugeInvest`,
        description: `Análise detalhada do ativo ${params.codigo.toUpperCase()} da empresa ${params.slug.toUpperCase()}.`,
    };
}

export default function EmpresaCodigoPage({ params }: Props) {
    return <EmpresaDetalhes slug={params.slug} codigoSelecionado={params.codigo} />;
}
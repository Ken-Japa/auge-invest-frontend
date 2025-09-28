import { Metadata } from "next";

import { EmpresaDetalhes } from "@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const awaitedParams = await params;
    const decodedSlug = decodeURIComponent(awaitedParams.slug).toUpperCase();
    return {
        title: `${decodedSlug.toUpperCase()} | AugeInvest`,
        description: `Análise detalhada do ativo ${decodedSlug.toUpperCase()} da empresa ${decodedSlug.toUpperCase()}.`,
    };
}

export default async function EmpresaCodigoPage({ params }: { params: Promise<{ slug: string }> }) {
    const awaitedParams = await params;
    const decodedSlug = decodeURIComponent(awaitedParams.slug);
    return <EmpresaDetalhes slug={decodedSlug} codigoSelecionado={decodedSlug} />;
}
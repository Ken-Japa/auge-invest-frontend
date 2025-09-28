import { Metadata } from "next";

import { Solutions } from "@/pagesComponents/Nao-Logado/Recursos";

export const metadata: Metadata = {
    title: 'Recursos e Soluções | Auge Invest',
    description: 'Descubra as ferramentas e recursos avançados da Auge Invest. Análise técnica, fundamentalista, inteligência artificial e muito mais para otimizar seus investimentos.',
    openGraph: {
        title: 'Recursos e Soluções | Auge Invest',
        description: 'Ferramentas avançadas para análise de investimentos',
        images: [
            {
                url: '/assets/images/imagens/Analise-Tecnica.jpg',
                width: 1120,
                height: 1120,
                alt: 'Recursos Auge Invest'
            }
        ],
    },
    keywords: 'recursos, ferramentas, análise técnica, análise fundamentalista, inteligência artificial, investimentos',
    alternates: {
        canonical: 'https://augeinvest.com.br/recursos'
    }
};
export default function SolutionsPage() {
    return <Solutions />;
}
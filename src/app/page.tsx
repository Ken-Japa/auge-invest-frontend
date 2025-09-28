import { Metadata } from "next";

import { Home } from "@/pagesComponents/Nao-Logado/Home";

export const metadata: Metadata = {
    title: "Auge Invest | Plataforma de Análise de Investimentos",
    description: "Transforme sua experiência de investimento com a Auge Invest. Análises precisas, ferramentas avançadas e suporte especializado para suas decisões financeiras.",
    openGraph: {
        title: 'Auge Invest | Plataforma de Análise de Investimentos',
        description: 'Transforme sua experiência de investimento com a Auge Invest',
    }
};

export default function HomePage() {


    return <Home />;
}
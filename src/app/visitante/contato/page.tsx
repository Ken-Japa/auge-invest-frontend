import { Metadata } from "next";

import { Contact } from "@/pagesComponents/Nao-Logado/Contato";

export const metadata: Metadata = {
    title: "Contato | Auge Invest",
    description: "Entre em contato com a Auge Invest. Nossa equipe especializada está pronta para ajudar você com dúvidas sobre investimentos, plataforma e serviços.",
    openGraph: {
        title: 'Contato | Auge Invest',
        description: 'Fale com nossa equipe especializada',
        images: [
            {
                url: '/assets/images/background/Contato.jpg',
                width: 1120,
                height: 1120,
                alt: 'Contato Auge Invest'
            }
        ],
    },
    keywords: 'contato, suporte, atendimento, fale conosco, investimentos, ajuda',
    alternates: {
        canonical: 'https://augeinvest.com.br/contato'
    }
};

export default function ContactPage() {
    return <Contact />;
}
import { Metadata } from "next";
import { Configuracoes } from "@/pagesComponents/Logado/Configuracoes";

export const metadata: Metadata = {
    title: "Configurações da Conta | Personalização | AugeInvest",
    description: "Personalize suas configurações de conta, ajuste preferências de notificação, temas visuais e alertas de investimento. Configure sua experiência na plataforma AugeInvest de acordo com suas necessidades.",
    openGraph: {
        title: 'Configurações da Conta | AugeInvest',
        description: 'Personalize sua experiência na plataforma ajustando notificações, temas e preferências de investimento.',
        type: 'website',
        siteName: 'AugeInvest',
    },
    keywords: 'configurações conta, preferências usuário, personalização plataforma, ajustes notificação, configurações alertas, auge invest configurações',
    robots: 'noindex, nofollow',
};

export default function ConfiguracoesPage() {
    return <Configuracoes />;
}
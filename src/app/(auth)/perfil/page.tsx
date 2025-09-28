import { Metadata } from "next";

import { Perfil } from "@/pagesComponents/Logado/Perfil";

export const metadata: Metadata = {
    title: "Meu Perfil | Gerenciamento de Conta | AugeInvest",
    description: "Gerencie suas informações pessoais, preferências de notificação e configurações de conta. Atualize seus dados, visualize seu plano atual e personalize sua experiência na plataforma AugeInvest.",
    openGraph: {
        title: 'Gerenciamento de Perfil | AugeInvest',
        description: 'Acesse e atualize suas informações pessoais, preferências e configurações de conta na plataforma AugeInvest.',
        type: 'profile',
        siteName: 'AugeInvest',
    },
    keywords: 'perfil usuário, configurações conta, gerenciamento perfil, dados pessoais, preferências usuário, auge invest perfil',
    robots: 'noindex, nofollow',
};

export default function PerfilPage() {
    return <Perfil />;
}
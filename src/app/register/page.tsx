import { Metadata } from "next";
import { Register } from "@/pagesComponents/Nao-Logado/Register";

export const metadata: Metadata = {
    title: 'Criar Conta | Auge Invest',
    description: 'Crie sua conta gratuita na Auge Invest. Acesse ferramentas avançadas de análise e tome decisões mais inteligentes em seus investimentos.',
    openGraph: {
        title: 'Criar Conta | Auge Invest',
        description: 'Comece sua jornada de investimentos inteligentes',
        images: [
            {
                url: '/assets/images/background/REGISTER.jpg',
                width: 1368,
                height: 768,
                alt: 'Registro Auge Invest'
            }
        ],
    },
    keywords: 'criar conta, registro, cadastro, investimentos, análise financeira',
    alternates: {
        canonical: 'https://augeinvest.com.br/register'
    }
};
export default function RegisterPage() {
    return <Register />;
}
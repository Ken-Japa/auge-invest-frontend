import { Metadata } from "next";

import { PrivacyPolicy } from "@/pagesComponents/Nao-Logado/PoliticaPrivacidade";

export const metadata: Metadata = {
  title: 'Política de Privacidade | Auge Invest',
  description: 'Conheça nossa política de privacidade e entenda como a Auge Invest protege e gerencia seus dados pessoais. Transparência e segurança em primeiro lugar.',
  openGraph: {
    title: 'Política de Privacidade | Auge Invest',
    description: 'Saiba como protegemos seus dados na Auge Invest',
    images: [
      {
        url: '/assets/images/logo/Logo1.png',
        width: 722,
        height: 545,
        alt: 'Política de Privacidade Auge Invest'
      }
    ],
  },
  keywords: 'política de privacidade, proteção de dados, LGPD, segurança de dados, privacidade',
  alternates: {
    canonical: 'https://augeinvest.com.br/politica-privacidade'
  }
};
const Page = () => {
  return (<PrivacyPolicy />);
}

export default Page;
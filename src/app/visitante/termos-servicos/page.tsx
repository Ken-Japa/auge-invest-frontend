import { Metadata } from "next";

import { TermsServices } from "@/pagesComponents/Nao-Logado/TermosServicos";

export const metadata: Metadata = {
  title: 'Termos de Serviço | Auge Invest',
  description: 'Conheça os termos de serviço da Auge Invest. Informações importantes sobre o uso da plataforma, direitos e responsabilidades dos usuários.',
  openGraph: {
    title: 'Termos de Serviço | Auge Invest',
    description: 'Termos e condições de uso da plataforma',
    images: [
      {
        url: '/assets/images/logo/Logo1.png',
        width: 722,
        height: 545,
        alt: 'Termos de Serviço Auge Invest'
      }
    ],
  },
  keywords: 'termos de serviço, termos de uso, condições, regulamento, direitos, responsabilidades',
  alternates: {
    canonical: 'https://augeinvest.com.br/termos-servicos'
  }
};
const Page = () => {
  return (<TermsServices />);
}

export default Page;
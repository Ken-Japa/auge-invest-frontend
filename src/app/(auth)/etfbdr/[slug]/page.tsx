import { Metadata } from "next";
import ETFBDRDetails from "@/pagesComponents/Logado/ETFBDR/components/ETFBDRDetails";

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug).toUpperCase();
  return {
    title: `${decodedSlug} | AugeInvest`,
    description: `Análise detalhada do ETF ${decodedSlug}, incluindo informações de mercado e desempenho.`,
  };
}

export default function ETFPage({ params }: Props) {
  const decodedSlug = decodeURIComponent(params.slug);
  return <ETFBDRDetails slug={decodedSlug} />;
}
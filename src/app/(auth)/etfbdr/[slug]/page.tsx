import { Metadata } from "next";
import ETFBDRDetails from "@/pagesComponents/Logado/ETFBDR/components/ETFBDRDetails";

type PageProps = {
  params: { slug: string }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug).toUpperCase();
  return {
    title: `${decodedSlug} | AugeInvest`,
    description: `Análise detalhada do ETF ${decodedSlug}, incluindo informações de mercado e desempenho.`,
  };
}

export default function ETFPage({ params }: PageProps) {
  const decodedSlug = decodeURIComponent(params.slug);
  return <ETFBDRDetails slug={decodedSlug} />;
}
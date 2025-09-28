import { useRouter } from "next/navigation";

import { ETFExtended } from "../types";

export const useETFCardLogic = (etfs: ETFExtended[]) => {
  const router = useRouter();

  const sortedEtfs = [...etfs].sort((a, b) => {
    const quotaA = Number(a.quotaCount) || 0;
    const quotaB = Number(b.quotaCount) || 0;
    return quotaB - quotaA;
  });

  const handleCardClick = (nomeETF: string) => {
    router.push(`/etf/${nomeETF}`);
  };

  return { sortedEtfs, handleCardClick };
};

import { useRouter } from "next/navigation";
import { Favorite } from "@/services/api/types/favorite";

export const useFavoriteNavigation = () => {
  const router = useRouter();

  const navigateToFavorite = (favorite: Favorite) => {
    let path = "";
    switch (favorite.type) {
      case "Empresa":
        path = `/empresa/${favorite.asset}`;
        break;
      case "FII":
        path = `/fii/${favorite.asset}`;
        break;
      case "BDR":
        path = `/bdr/${favorite.asset}`;
        break;
      case "ETF":
        path = `/etf/${favorite.asset}`;
        break;
      case "ETFBDR":
        path = `/etfbdr/${favorite.asset}`;
        break;
      default:
        console.warn("Tipo de favorito desconhecido:", favorite.type);
        return;
    }
    router.push(path);
    window.scrollTo(0, 0);
  };

  return { navigateToFavorite };
};

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { Favorite } from '@/services/api/types/favorite'

/**
 * @typedef {Object} Favorite
 * @property {string} type - O tipo do favorito (ex: 'Empresa', 'FII', 'BDR', 'ETF', 'ETFBDR').
 * @property {string} asset - O ativo relacionado ao favorito.
 *
 * @returns {Object} Um objeto contendo a função `navigateToFavorite`.
 * @property {(favorite: Favorite) => void} navigateToFavorite - Função para navegar para a página de detalhes de um favorito.
 */
export const useFavoriteNavigation = () => {
  const router = useRouter()

  /**
   * Navega para a página de detalhes de um item favorito com base no seu tipo e ativo.
   * @param {Favorite} favorite O objeto favorito contendo o tipo e o ativo.
   */
  const navigateToFavorite = useCallback(
    (favorite: Favorite) => {
      let path = ''
      switch (favorite.type) {
        case 'Empresa':
          path = `/empresa/${favorite.asset}`
          break
        case 'FII':
          path = `/fii/${favorite.asset}`
          break
        case 'BDR':
          path = `/bdr/${favorite.asset}`
          break
        case 'ETF':
          path = `/etf/${favorite.asset}`
          break
        case 'ETFBDR':
          path = `/etfbdr/${favorite.asset}`
          break
        default:
          console.warn('Tipo de favorito desconhecido:', favorite.type)
          return
      }
      router.push(path)
      window.scrollTo(0, 0)
    },
    [router],
  )

  return { navigateToFavorite }
}

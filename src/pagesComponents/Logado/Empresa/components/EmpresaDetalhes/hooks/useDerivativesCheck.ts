import { useEffect, useState } from 'react'

export const useDerivativesCheck = (codigoAtivo: string | null): boolean => {
  const [hasDerivatives, setHasDerivatives] = useState(false)

  useEffect(() => {
    const checkDerivatives = async () => {
      if (!codigoAtivo) return

      try {
        const response = await fetch(
          `https://api-servidor-yupg.onrender.com/derivative/pagination?page=0&pageSize=1&cod_empresa=${codigoAtivo}`,
        )
        const data = await response.json()

        // Verificar se há derivativos disponíveis
        setHasDerivatives(data.success && data.data?.totalDerivativos > 0)
      } catch (err) {
        console.error('Erro ao verificar derivativos:', err)
        setHasDerivatives(false)
      }
    }

    checkDerivatives()
  }, [codigoAtivo])

  return hasDerivatives
}

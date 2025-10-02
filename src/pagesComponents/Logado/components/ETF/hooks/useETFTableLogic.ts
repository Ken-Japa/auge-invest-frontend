import { useRouter } from 'next/navigation'

export const useETFTableLogic = () => {
  const router = useRouter()

  const handleRowClick = (nomeETF: string) => {
    router.push(`/etf/${nomeETF}`)
  }

  return { handleRowClick }
}

import { useRouter } from 'next/navigation'

export const useNavigation = () => {
  const router = useRouter()

  const handleClose = () => {
    try {
      router.back()
    } catch {
      router.push('/')
    }
  }

  return { handleClose }
}

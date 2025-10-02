import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const toggle = () => setIsOpen(!isOpen)

  return {
    isOpen,
    toggle,
  }
}

import { useEffect, useState } from 'react'

import { CONFIG } from '../constants/config'

export const useScroll = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > CONFIG.SCROLL.SHOW_BUTTON_THRESHOLD)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY + CONFIG.SCROLL.SECTION_OFFSET
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return {
    showScrollTop,
    scrollToTop,
    scrollToSection,
  }
}

'use client'
import { Box } from '@mui/material'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { Footer } from './components/Footer'
import { Header } from './components/Header'

interface Props {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  const pathname = usePathname()

  const isLoginPage = pathname === '/login'

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', height: '100%' }}>
      {!isLoginPage && <Header />}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

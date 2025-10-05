'use client'

import { Menu as MenuIcon } from '@mui/icons-material'
import { Drawer, useMediaQuery } from '@mui/material'
import { IconButton, Toolbar } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef } from 'react'

import { useDrawer } from '../../hooks/useDrawer'
import { Logo } from '../../Logo'

import { LoginsButtons } from './LoginRegisterButtons'
import { Navbar } from './Navbar'
import { PerfilButtons } from './PerfilButtons'
import { AlertButton } from './PerfilButtons/components/AlertButton'
import { FavoriteButton } from './PerfilButtons/components/FavoriteButton'
import { DrawerContent, HeaderContainer } from './styled'

/**
 * @typedef {object} HeaderProps
 * // Não há props diretas para o componente Header, mas ele gerencia o estado de autenticação e navegação.
 */

/**
 * Componente de cabeçalho responsivo para a aplicação.
 * Gerencia a navegação, autenticação de usuário e exibe diferentes elementos
 * com base no tamanho da tela (mobile vs. desktop) e no status da sessão do usuário.
 * Inclui um drawer para navegação em dispositivos móveis e botões de login/perfil.
 *
 * @returns {JSX.Element} O componente Header renderizado.
 */
export const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { isOpen, toggle } = useDrawer()
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'
  const iconButtonRef = useRef<HTMLButtonElement>(null)
  const drawerContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMobile && isOpen) {
      toggle()
    }
  }, [isMobile, isOpen, toggle])

  const handleDrawerOpen = () => {
    if (drawerContentRef.current) {
      drawerContentRef.current.focus()
    }
  }

  const handleDrawerClose = () => {
    if (iconButtonRef.current) {
      iconButtonRef.current.focus()
    }
  }

  return (
    <HeaderContainer inert={isOpen ? true : undefined}>
      <Toolbar className="flex justify-between items-center ">
        {isMobile ? (
          <>
            <Link href="/">
              <Logo />
            </Link>
            <div className="flex items-center">
              <IconButton
                ref={iconButtonRef}
                color="inherit"
                aria-label="open menu"
                edge="start"
                onClick={toggle}
                className="text-white bg-[#1A1A1A]"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={isOpen}
                onClose={toggle}
                ModalProps={{ keepMounted: true }}
                onTransitionExited={handleDrawerClose}
                onTransitionEnter={handleDrawerOpen}
              >
                <DrawerContent ref={drawerContentRef} tabIndex={-1} role="dialog" aria-modal="true">
                  <Navbar />
                  <div className="mt-4">
                    {session ? (
                      <>
                        <FavoriteButton />
                        <AlertButton />
                        <PerfilButtons onButtonClick={toggle} isFullWidth />
                      </>
                    ) : (
                      <LoginsButtons onButtonClick={toggle} isFullWidth direction="column" />
                    )}
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-32">
            <Link href="/">
              <Logo />
            </Link>
            <Navbar />
          </div>
        )}
        {isMobile ? (
          <></>
        ) : (
          <div className="flex items-center gap-2">
            {session ? (
              <>
                {' '}
                <FavoriteButton /> <AlertButton /> <PerfilButtons />{' '}
              </>
            ) : (
              <LoginsButtons />
            )}
          </div>
        )}
      </Toolbar>
    </HeaderContainer>
  )
}

export default Header

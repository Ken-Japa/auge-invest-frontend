'use client'

import MenuIcon from '@mui/icons-material/Menu'
import { IconButton } from '@mui/material'
import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { authNavigation, publicNavigation } from '@/components/Layout/constants/Navigation'

import { useDrawer } from '../../../hooks/useDrawer'
import { NavDropdown } from './NavDropdown'
import { NavLink } from './NavLink'
import { LinkNavbar, MobileNavContainer } from './styled'

export const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { isOpen, toggle } = useDrawer()
  const { data: session } = useSession()

  const container = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  }

  const getLinkStyles = (isActive: boolean, isHighlight: boolean) => `
        px-3 py-2 rounded-md transition-all duration-200
        ${isActive ? 'text-white font-medium bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'}
        ${isHighlight ? 'text-[#0D95F9] hover:text-[#0D95F9]' : ''}
    `

  return (
    <div className="relative">
      <div className="md:hidden">
        <IconButton
          onClick={toggle}
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': { color: 'rgba(255, 255, 255, 0.9)' },
          }}
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <MenuIcon />
        </IconButton>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-3">
        {session
          ? authNavigation.map((nav) => (
              <motion.div key={nav.name} variants={item} className="relative">
                {nav.dropdown ? (
                  <NavDropdown name={nav.name} path={nav.path} items={nav.dropdown} />
                ) : (
                  <NavLink path={nav.path} name={nav.name} highlight={nav.highlight} />
                )}
              </motion.div>
            ))
          : publicNavigation.map((nav) => (
              <motion.div key={nav.name} variants={item} className="relative">
                {nav.dropdown ? (
                  <NavDropdown name={nav.name} path={nav.path} items={nav.dropdown} />
                ) : (
                  <NavLink path={nav.path} name={nav.name} highlight={nav.highlight} />
                )}
              </motion.div>
            ))}
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <MobileNavContainer id="mobile-menu">
          <motion.nav
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-2 items-end pr-4"
          >
            {session
              ? authNavigation.map((nav) => (
                  <motion.div key={nav.name} variants={item} className="w-full">
                    {nav.dropdown ? (
                      <div className="w-full">
                        <div className="text-white/70 px-3 py-2 font-medium">{nav.name}</div>
                        <div className="pl-4 flex flex-col gap-1">
                          {nav.dropdown.map((item) => (
                            <LinkNavbar
                              key={item.name}
                              className={getLinkStyles(pathname === item.path, false)}
                              onClick={() => {
                                router.push(item.path)
                                toggle()
                              }}
                              aria-label={item.name}
                            >
                              {item.name}
                            </LinkNavbar>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <NavLink path={nav.path} name={nav.name} highlight={nav.highlight} onClick={toggle} />
                    )}
                  </motion.div>
                ))
              : publicNavigation.map((nav) => (
                  <motion.div key={nav.name} variants={item} className="w-full">
                    {nav.dropdown ? (
                      <div className="w-full">
                        <div className="text-white/70 px-3 py-2 font-medium">{nav.name}</div>
                        <div className="pl-4 flex flex-col gap-1">
                          {nav.dropdown.map((item) => (
                            <LinkNavbar
                              key={item.name}
                              className={getLinkStyles(pathname === item.path, false)}
                              onClick={() => {
                                router.push(item.path)
                                toggle()
                              }}
                              aria-label={item.name}
                            >
                              {item.name}
                            </LinkNavbar>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <NavLink path={nav.path} name={nav.name} highlight={nav.highlight} onClick={toggle} />
                    )}
                  </motion.div>
                ))}
          </motion.nav>
        </MobileNavContainer>
      )}
    </div>
  )
}

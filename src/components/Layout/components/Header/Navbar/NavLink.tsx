import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'

import { LinkNavbar } from './styled'

interface NavLinkProps {
  path: string
  name: string
  highlight?: boolean
  onClick?: () => void
}

export const NavLink = ({ path, name, highlight, onClick }: NavLinkProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const isActive = pathname === path

  const handleClick = () => {
    router.push(path)
    onClick?.()
  }

  return (
    <LinkNavbar
      className={`
                px-3 py-2 rounded-md transition-all duration-200
                ${
                  isActive
                    ? 'text-white font-medium bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }
                ${highlight ? 'text-[#0D95F9] hover:text-[#0D95F9]' : ''}
            `}
      onClick={handleClick}
      role="link"
      aria-current={isActive ? 'page' : undefined}
    >
      {name}
      {isActive && (
        <motion.span
          layoutId="activeNav"
          className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0D95F9]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </LinkNavbar>
  )
}

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { StaggeredMenu } from './StaggeredMenu'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Sobre Nosotros', href: '/about' },
  { label: 'Reservar', href: '/reservas' },
  { label: 'Cuenta', href: '/account' },
  { label: 'Contacto', href: '/contact' },
]

interface MenuHeaderProps {
  logo?: React.ReactNode
  auth?: React.ReactNode
  isAdmin?: boolean
}

export function MenuHeader({ logo, auth, isAdmin }: MenuHeaderProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Ocultamos el link de admin para usuarios normales
  const visibleLinks = navLinks.concat(
    isAdmin ? [{ label: 'Panel Admin', href: '/admin' }] : []
  )

  return (
    <main>
      {/* Desktop Navigation */}
      <ul className="hidden sm:flex items-center gap-1 flex-nowrap whitespace-nowrap">
        {visibleLinks.map(({ label, href }) => {
          const isActive = pathname === href
          return (
            <li key={href}>
              <Link
                href={href}
                className={`relative px-3 py-1.5 text-sm rounded-md transition-colors duration-150
                  ${isActive ? 'text-foreground font-medium' : 'text-foreground/60 hover:text-foreground/90'}`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-foreground/40 rounded-full" />
                )}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Mobile Navigation - Staggered Menu */}
      <div className="sm:hidden absolute top-0 left-0 w-full h-full overflow-visible z-50 pointer-events-none">
        <StaggeredMenu
          isFixed={false}
          items={visibleLinks.map(link => ({
            label: link.label,
            ariaLabel: `Ir a ${link.label}`,
            link: link.href
          }))}
          logoUrl="" // El logo se puede pasar vacío si hay otro principal
          menuButtonColor="#000" // Aseguramos que sea visible en modo claro
          openMenuButtonColor="#000"
        />
      </div>
    </main>
  )
}
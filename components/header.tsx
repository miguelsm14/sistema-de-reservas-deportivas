'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

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
      {/* Desktop */}
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

      {/* Botón hamburguesa */}
      <button
        onClick={() => setOpen(true)}
        className="sm:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 ml-auto"
        aria-label="Abrir menú"
      >
        <span className="w-5 h-px bg-foreground block" />
        <span className="w-5 h-px bg-foreground block" />
        <span className="w-5 h-px bg-foreground block" />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`sm:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <div
        className={`sm:hidden fixed top-0 right-0 h-full w-64 z-50
          bg-background border-l border-foreground/10
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Cabecera con logo y cierre */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-foreground/10">
          {logo && <div className="font-semibold text-sm">{logo}</div>}
          <button
            onClick={() => setOpen(false)}
            className="ml-auto w-8 h-8 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col px-3 py-4 gap-1 flex-1">
          {visibleLinks.map(({ label, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2.5 text-sm rounded-md transition-colors duration-150
                  ${isActive
                    ? 'text-foreground font-medium bg-foreground/5'
                    : 'text-foreground/60 hover:text-foreground/90 hover:bg-foreground/5'}`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Auth al fondo */}
        {auth && (
          <div className="px-5 py-4 border-t border-foreground/10">
            {auth}
          </div>
        )}
      </div>
    </main>
  )
}
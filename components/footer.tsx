import Link from "next/link";
import { Github, Instagram, Twitter, X } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Footer() {
  return (
    <footer className="w-full border-t border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12 lg:py-16 mt-auto">
      <div className="container mx-auto max-w-6xl px-4 flex flex-col gap-12 md:flex-row md:justify-between">

        {/* Brand/Info */}
        <div className="flex flex-col items-center md:items-start gap-4 flex-1">
          <div className="font-bold text-3xl tracking-tight text-foreground/90">SGR</div>
          <p className="text-sm text-muted-foreground text-center md:text-left max-w-sm leading-relaxed">
            La forma más fácil y rápida de conseguir tu pista. Gestiona tus reservas y únete a nuestra comunidad en crecimiento.
          </p>
        </div>

        {/* Cofounders */}
        <div className="flex flex-col flex-1 items-center md:items-end gap-6 text-center md:text-right">
          <p className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
            Los Co-Fundadores
          </p>
          <div className="flex gap-x-12 gap-y-8 flex-row items-start justify-center md:justify-end">

            {/* Miguel Sánchez */}
            <div className="flex flex-col items-center md:items-end gap-3 transition-transform hover:-translate-y-1">
              <span className="text-sm font-medium text-foreground">Miguel Sánchez Maraver</span>
              <div className="flex items-center gap-4">
                <a href="https://github.com/miguelsm14" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub de Miguel">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://x.com/14_miiguel" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#AAB8C2] transition-colors" aria-label="X (Twitter) de Miguel">
                  <X className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/14_miiguel/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#E1306C] transition-colors" aria-label="Instagram de Miguel">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Cofounder 2 */}
            <div className="flex flex-col items-center md:items-end gap-3 transition-transform hover:-translate-y-1">
              <span className="text-sm font-medium text-foreground">Juan Francisco Márquez Arias</span>
              <div className="flex items-center gap-4">
                <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub de Cofounder 2">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#1DA1F2] transition-colors" aria-label="X (Twitter) de Cofounder 2">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#E1306C] transition-colors" aria-label="Instagram de Cofounder 2">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="container mx-auto max-w-6xl px-4 mt-12 pt-8 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sistema de Gestión de Reservas (SGR). Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-6 text-xs text-muted-foreground font-medium">
          {/*<ThemeSwitcher />*/}
          <Link href="#" className="hover:text-foreground transition-colors">Aviso Legal</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contacto</Link>
        </div>
      </div>
    </footer>
  );
}

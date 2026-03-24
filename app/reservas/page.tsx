//IMPORT VARIOS
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/landing/hero";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
/////////////////////////////////

//IMPORT DE TODAS LAS PAGES
import PistasExistentes from "@/components/reserva/pistasExistentes";
import { MenuHeaderServer as MenuHeader } from "@/components/menu-header-server";
/////////////////////////////////


export default function Reservas() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 flex flex-col gap-10 items-center w-full">

        <nav className="w-full flex justify-center border-b border-b-foreground/10">
          <div className="w-full max-w-5xl flex flex-row h-14 items-center justify-between px-5 text-sm gap-4">

            {/* Logo - solo visible en desktop */}
            <div className="flex-shrink-0 font-semibold">
              <Link href="/">SGR</Link>
            </div>

            {/* Menu */}
            <div className="flex-1 flex justify-center overflow-hidden">
              <MenuHeader
                logo={<Link href="/">SGR</Link>}
                auth={
                  !hasEnvVars ? (
                    <EnvVarWarning />
                  ) : (
                    <Suspense fallback={<p>Cargando...</p>}>
                      <AuthButton />
                    </Suspense>
                  )
                }
              />
            </div>

            {/* Auth - solo visible en desktop */}
            <div className="flex-shrink-0 hidden sm:block">
              {!hasEnvVars ? (
                <EnvVarWarning />
              ) : (
                <Suspense fallback={<p>Cargando...</p>}>
                  <AuthButton />
                </Suspense>
              )}
            </div>

          </div>
        </nav>

        {/* HERO SECTION */}
        <div className="w-full relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 pt-16 pb-12 mb-8 border-b border-border/40">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent opacity-60 pointer-events-none"></div>
            <div className="max-w-5xl mx-auto px-5 text-center relative z-10 space-y-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                    Encuentra tu pista perfecta
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Selecciona tu deporte favorito, elige fecha y hora, y prepárate para jugar. ¡Todo en menos de un minuto!
                </p>
            </div>
        </div>

        {/* CONTENIDO PISTAS */}
        <div className="w-full pb-20">
          <Suspense fallback={
            <div className="flex justify-center p-20 w-full">
              <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          }>
            <PistasExistentes/>
          </Suspense>
        </div>
          
      </div>
    </main>
  );
}

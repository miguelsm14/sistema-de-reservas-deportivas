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
      <div className="flex-1 flex flex-col items-center w-full">

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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-4">
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
            <div className="space-y-8 p-4 sm:p-6 max-w-5xl mx-auto w-full">
              <section>
                <div className="h-6 w-40 bg-muted/60 rounded-md animate-pulse mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-2xl border border-border/50 bg-card/50 p-5 h-[140px] flex flex-col justify-between">
                      <div>
                        <div className="h-8 w-8 bg-muted/60 rounded-full animate-pulse mb-3"></div>
                        <div className="h-4 w-24 bg-muted/60 rounded animate-pulse mb-2"></div>
                        <div className="h-3 w-16 bg-muted/60 rounded animate-pulse"></div>
                      </div>
                      <div className="h-5 w-12 bg-muted/60 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          }>
            <PistasExistentes />
          </Suspense>
        </div>

      </div>
    </main>
  );
}

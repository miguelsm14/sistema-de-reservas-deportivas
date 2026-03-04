//IMPORT VARIOS
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/landing/hero";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
/////////////////////////////////

//IMPORT DE TODAS LAS PAGES DE LA LANDING
import { NegPoints } from "@/components/landing/negativePoints";
import { ContactForm } from "@/components/landing/contactForm";
import { PosPoints } from "@/components/landing/positivePoints";
import { HowWork } from "@/components/landing/howWorks";
import { FinalCTA } from "@/components/landing/finalCTA";
import { RandomTitle } from "@/components/landing/randomTitle";
/////////////////////////////////


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 flex flex-col gap-10 items-center w-full">

        <nav className="w-full flex justify-center border-b border-b-foreground/10">
          <div className="w-full max-w-5xl flex flex-col sm:flex-row sm:h-16 items-center justify-between p-3 px-5 text-sm gap-3">

            {/* Logo + Auth */}
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-5 items-center font-semibold">
                <Link href="/">Sistemas de Gestión de Reservas</Link>
              </div>

              {!hasEnvVars ? (
                <EnvVarWarning />
              ) : (
                <Suspense fallback={<p>Cargando...</p>}>
                  <AuthButton />
                </Suspense>
              )}
            </div>

            {/* Menu */}
            

          </div>
        </nav>
        {/* LANDING COMPLETA */}
        <div className="w-full">
          <Hero />
          <NegPoints/>
          <PosPoints/>
          <HowWork/>
          <RandomTitle/>
          <FinalCTA/>
          <ContactForm/>
        </div>

        <footer className="w-full flex flex-col sm:flex-row items-center justify-center border-t mx-auto text-center text-xs gap-4 sm:gap-8 py-16">
          <p>
            Desarrollado por{" "}
            <a
              href="https://github.com/miguelsm14"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Miguel Sánchez
            </a>
          </p>

          {/* <ThemeSwitcher /> */}
        </footer>

      </div>
    </main>
  );
}

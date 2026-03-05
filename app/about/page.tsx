//IMPORT VARIOS
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
/////////////////////////////////

//IMPORT DE TODAS LAS PAGES DE LA LANDING
import { HeroAbout } from "@/components/about/hero"
import { Historia } from "@/components/about/history";
import { Valores } from "@/components/about/nuestrosValores";
import { Equipo } from "@/components/about/equipo";
/////////////////////////////////

export default function About() {
    return (
        <main className="min-h-screen flex flex-col items-center bg-background">
            <nav className="w-full flex justify-center border-b border-b-foreground/10">
                <div className="w-full max-w-5xl flex flex-col sm:flex-row sm:h-16 items-center justify-between p-3 px-5 text-sm gap-3">

                    {/* Logo + Auth */}{/* NAV PROVISIONAL */}
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
                </div>
            </nav>


            <div className="w-full">
                <HeroAbout />
                <Historia/>
                <Valores/>
                <Equipo/>
            </div>
        </main>
    )
}
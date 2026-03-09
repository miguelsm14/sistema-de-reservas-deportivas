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
import { MenuHeader } from "@/components/header";
/////////////////////////////////

export default function About() {
    return (
        <main className="min-h-screen flex flex-col items-center bg-background">

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

            <div className="w-full">
                <HeroAbout />
                <Historia />
                <Valores />
                <Equipo />
            </div>
        </main>
    )
}
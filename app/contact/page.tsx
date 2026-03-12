import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { MenuHeaderServer as MenuHeader } from "@/components/menu-header-server";
///////// IMPORTS PAGINAS /////////
import { Hero } from "@/components/contact/hero";
import { InfoContact } from "@/components/contact/infoContact";
import { ContactForm } from "@/components/contact/contacForm";
///////////////////////////////////

export default function Contact() {
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

                <div className="w-full">
                    <Hero/>
                    <InfoContact/>
                    <ContactForm/>
                </div>


                {/* FALTA EL FOOTER */}
            </div>
        </main>
    )
}
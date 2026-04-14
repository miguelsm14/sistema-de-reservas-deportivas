import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import Cuenta from "@/components/account/cuenta";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { MenuHeaderServer as MenuHeader } from "@/components/menu-header-server";

export default function Account() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 flex flex-col items-center w-full">

        <nav className="sticky top-0 z-50 w-full flex justify-center border-b border-b-foreground/10 bg-background/60 backdrop-blur-md">
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
          <Suspense fallback={<p>Cargando...</p>}>
            <Cuenta />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

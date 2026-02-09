import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-10 items-center">
        {/*ESTO ES EL HEADER */}
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Sistemas de Gestión de Reservas</Link>
            </div>

            {/* AQUI QUIERO PONER EL MENU */}
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Inicio</Link>
              <Link href={"/"}>Reservas</Link>
              <Link href={"/account"}>Cuenta</Link>
              <Link href={"/"}>Contacto</Link>
            </div>
            
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense fallback={<p>Cargando...</p>}>
                <AuthButton />
              </Suspense>
            )}

          </div>
        </nav>
        {/*AQUI TERMINA EL HEADER */}

        {/*AQUI DENTRO VA LA INFORMACIÓN QUE QUIERO QUE TENGA LA PÁGINA*/}
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />
        </div>
        {/*AQUI TERMINA LA INFORMACIÓN QUE QUIERO QUE TENGA LA PÁGINA*/}

        {/*ESTO ES EL FOOTER */}
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
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

          {/*Esto es para el tema de fondo, dark o ligth, lo voy a cambiar en un futuro*/}
          <ThemeSwitcher />
          
        </footer>
        {/*AQUI TERMINA EL FOOTER */}
      </div>
    </main>
  );
}

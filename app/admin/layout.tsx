import { redirect } from "next/navigation";
import { checkIsAdmin } from "@/lib/auth-utils";
import { MenuHeader } from "@/components/header";
import { AuthButton } from "@/components/auth-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    redirect("/"); // Si no es admin, fuera
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-background">
      <nav className="w-full flex justify-center border-b border-b-foreground/10">
        <div className="w-full max-w-5xl flex flex-row h-14 items-center justify-between px-5 text-sm gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 font-semibold">
            <Link href="/">SGR Admin</Link>
          </div>

          {/* Menu */}
          <div className="flex-1 flex justify-center overflow-hidden">
            <MenuHeader
              isAdmin={isAdmin}
              logo={<Link href="/">SGR Admin</Link>}
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

          {/* Auth */}
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

      <div className="w-full max-w-5xl p-5 flex-1 flex flex-col mt-4">
        <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
        {children}
      </div>
    </main>
  );
}

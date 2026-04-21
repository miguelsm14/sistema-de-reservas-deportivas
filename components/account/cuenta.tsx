import { AccountTabs } from "./tabAccount";
import { HistorialReservas } from "./historial-reservas";
import { createClient } from "@/lib/supabase/server";
import { UserCircle } from "lucide-react";

export default async function Cuenta() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  const uid = user?.sub ?? "";

  const { data: usuario } = await supabase
    .from("Usuarios")
    .select("nombre, apellido, email, telefono")
    .eq("uid", uid)
    .single();

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-background pb-20">
      {/* Hero Header de la Cuenta */}
      <div className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/40 pt-12 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="h-24 w-24 sm:h-28 sm:w-28 mx-auto sm:mx-0 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-sm">
            <UserCircle className="h-12 w-12 sm:h-16 sm:w-16 text-primary/80" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {usuario?.nombre ? `Hola, ${usuario.nombre}` : "Mi Cuenta"}
            </h1>
            <p className="text-muted-foreground font-medium">
              {usuario?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Contenido Principal desplazado hacia arriba */}
      <div className="w-full max-w-5xl px-4 sm:px-6 -mt-10 space-y-10 z-10">
        <div className="bg-card shadow-sm border border-border/50 rounded-2xl overflow-hidden">
          <AccountTabs
            uid={uid}
            usuario={{
              nombre: usuario?.nombre ?? "",
              apellido: usuario?.apellido ?? "",
              email: usuario?.email ?? "",
              telefono: usuario?.telefono ?? "",
            }}
          />
        </div>

        <div className="w-full pt-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Historial de Reservas
          </h2>
          <HistorialReservas />
        </div>
      </div>
    </div>
  );
}
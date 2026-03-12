import { AccountTabs } from "./tabAccount";
import { HistorialReservas } from "./historial-reservas";
import { createClient } from "@/lib/supabase/server";

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
    <div className="min-h-screen w-full flex flex-col items-center bg-background p-6">
      <AccountTabs
        uid={uid}
        usuario={{
          nombre: usuario?.nombre ?? "",
          apellido: usuario?.apellido ?? "",
          email: usuario?.email ?? "",
          telefono: usuario?.telefono ?? "",
        }}
      />
      <div className="w-full max-w-5xl mt-8 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-2">Mis Reservas</h2>
        <HistorialReservas />
      </div>
    </div>
  );
}
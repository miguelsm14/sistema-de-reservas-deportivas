import { AccountTabs } from "./tabAccount";
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
    <div className="min-h-screen w-full flex justify-center bg-background p-6">
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
  );
}
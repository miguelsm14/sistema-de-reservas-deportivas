import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function UsuariosData() {
  const supabase = await createClient();
  const { data: usuarios } = await supabase.from("Usuarios").select();

  return <pre>{JSON.stringify(usuarios, null, 2)}</pre>;
}

export default function Usuarios() {
  return (
    <Suspense fallback={<div>Cargando usuarios...</div>}>
      <UsuariosData />
    </Suspense>
  );
}
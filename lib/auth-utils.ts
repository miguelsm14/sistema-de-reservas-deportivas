import { createClient } from "./supabase/server";

export async function checkIsAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  if (!user?.sub) return false;

  const { data: usuario } = await supabase
    .from("Usuarios")
    .select("codRol")
    .eq("uid", user.sub)
    .single();

  return usuario?.codRol === 2;
}

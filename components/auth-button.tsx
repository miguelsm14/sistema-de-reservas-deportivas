import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  const { data: usuario } = await supabase
    .from("Usuarios")
    .select("nombre")
    .eq("uid", user?.sub) //<- User.sub es el user id, en mi caso el uid que se crea cuando se registra un usuario
    .single()
    ;

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {usuario?.nombre ?? "Usuario"}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Iniciar Sesión</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Regístrese</Link>
      </Button>
    </div>
  );
}

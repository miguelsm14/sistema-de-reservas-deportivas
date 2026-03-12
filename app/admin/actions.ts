"use server";

import { createClient } from "@/lib/supabase/server";
import { checkIsAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function addPistaAction(formData: FormData) {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    throw new Error("No tienes permisos para realizar esta acción.");
  }

  const nombre = formData.get("nombre") as string;
  const deporte = formData.get("deporte") as string;
  const precioStr = formData.get("precio") as string;

  if (!nombre || !deporte || !precioStr) {
    throw new Error("Faltan campos obligatorios.");
  }

  const precio = parseFloat(precioStr);
  if (isNaN(precio) || precio < 0) {
    throw new Error("El precio debe ser un número válido positivo.");
  }

  const supabase = await createClient();

  const { error } = await supabase.from("Pistas").insert({
    nombre,
    deporte,
    precio,
  });

  if (error) {
    throw new Error(`Error al crear la pista: ${error.message}`);
  }

  // Refrescamos las rutas que muestran las pistas
  revalidatePath("/admin");
  revalidatePath("/reservas");
}

export async function deletePistaAction(id: string) {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    throw new Error("No tienes permisos para realizar esta acción.");
  }

  const supabase = await createClient();

  const { error } = await supabase.from("Pistas").delete().eq("id", id);

  if (error) {
    throw new Error(`Error al eliminar la pista: ${error.message}`);
  }

  // Refrescamos las rutas que muestran las pistas
  revalidatePath("/admin");
  revalidatePath("/reservas");
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { checkIsAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function addPistaAction(formData: FormData) {
  try {
    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
      return { error: "No tienes permisos para realizar esta acción." };
    }

    const nombre = formData.get("nombre") as string;
    const deporte = formData.get("deporte") as string;
    const precioStr = formData.get("precio") as string;

    if (!nombre || !deporte || !precioStr) {
      return { error: "Faltan campos obligatorios." };
    }

    const precio = parseFloat(precioStr);
    if (isNaN(precio) || precio < 0) {
      return { error: "El precio debe ser un número válido positivo." };
    }

    const supabase = await createClient();

    const { error } = await supabase.from("Pistas").insert({
      nombre,
      deporte,
      precio,
    });

    if (error) {
      return { error: `Error al crear la pista: ${error.message}` };
    }

    // Refrescamos las rutas que muestran las pistas
    revalidatePath("/admin");
    revalidatePath("/reservas");
    return { success: true };
  } catch (err) {
    return { error: "Error inesperado del servidor." };
  }
}

export async function deletePistaAction(id: string) {
  try {
    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
      return { error: "No tienes permisos para realizar esta acción." };
    }

    const supabase = await createClient();

    const { error } = await supabase.from("Pistas").delete().eq("id", id);

    if (error) {
      return { error: `Error al eliminar la pista: ${error.message}` };
    }

    // Refrescamos las rutas que muestran las pistas
    revalidatePath("/admin");
    revalidatePath("/reservas");
    return { success: true };
  } catch (err) {
    return { error: "Error inesperado del servidor." };
  }
}

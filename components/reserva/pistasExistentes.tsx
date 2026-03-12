import {MapPin} from "lucide-react"
import { createClient } from "@/lib/supabase/server";
import { PistasClient } from "./pistas";
//Lo que necesito para poder comunicarme con supabase, sin esto no podriamos
//tener los datos de las pistas de padel
export default async function PistasExistentes() {

  const supabase = await createClient();
  const { data: pistas } = await supabase
    .from("Pistas")
    .select("id, nombre, deporte, precio")

  return (
    <PistasClient pistas = {pistas ?? []}/>
  );

}
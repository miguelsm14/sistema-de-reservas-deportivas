import { BotonEliminarPista } from "@/components/admin/boton-eliminar-pista";

export const dynamic = 'force-dynamic';

// ... [existing imports]
import { createClient } from "@/lib/supabase/server";
import { CrearPistaForm } from "@/components/admin/crear-pista-form";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: pistas } = await supabase.from("Pistas").select("*").order("id", { ascending: false });

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 mb-20">
        
        {/* Formulario a la izquierda */}
        <div className="order-2 md:order-1">
          <CrearPistaForm />
        </div>

        {/* Lista de pistas a la derecha */}
        <div className="order-1 md:order-2">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Instalaciones Actuales</h2>
          {pistas && pistas.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {pistas.map((p) => (
                <li key={p.id} className="p-4 border rounded-xl flex flex-col sm:flex-row justify-between sm:items-center bg-card gap-4">
                  <div>
                    <p className="font-semibold">{p.nombre}</p>
                    <p className="text-sm text-muted-foreground">{p.deporte}</p>
                  </div>
                  <div className="text-left sm:text-right flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <p className="font-bold">{p.precio}€<span className="text-xs font-normal">/h</span></p>
                    <BotonEliminarPista id={p.id} nombre={p.nombre} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No hay instalaciones registradas.</p>
          )}
        </div>

      </div>
    </div>
  );
}

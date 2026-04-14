import { createClient } from "@/lib/supabase/server";
import { Calendar, Clock, MapPin, Receipt, CheckCircle2, History } from "lucide-react";

export async function HistorialReservas() {
  const supabase = await createClient();

  // Obtenemos el usuario autenticado
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <p className="text-muted-foreground text-sm">Debes iniciar sesión para ver tus reservas.</p>;
  }

  // Realizamos la query con Join a Pistas para obtener el nombre
  const { data: reservas, error } = await supabase
    .from("Reservas")
    .select(`
      id,
      fecha,
      hora,
      Pistas (
        nombre,
        deporte,
        precio
      )
    `)
    .eq("id_usuario", user.id)
    .order("fecha", { ascending: false })
    .order("hora", { ascending: false });

  if (error) {
    return <p className="text-red-500 text-sm">Error cargando el historial: {error.message}</p>;
  }

  if (!reservas || reservas.length === 0) {
    return (
      <div className="border border-dashed p-8 rounded-lg text-center bg-card mt-6">
        <p className="text-muted-foreground">Aún no tienes ninguna reserva en tu historial.</p>
      </div>
    );
  }
  const date = new Date();
  const hoy = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const proximas = reservas.filter((r) => r.fecha >= hoy);
  const pasadas = reservas.filter((r) => r.fecha < hoy);

  return (
    <div className="w-full space-y-10">
      
      {/* SECCIÓN: PRÓXIMAS RESERVAS */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
          <CheckCircle2 className="w-5 h-5 text-primary" /> Próximas Reservas
        </h3>
        {proximas.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proximas.map((res: any) => (
              <li key={res.id} className="p-5 border border-primary/20 bg-card shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl flex flex-col justify-between gap-4 relative overflow-hidden group">
                {/* Acento decorativo */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/80"></div>
                
                <div className="flex flex-col gap-3">
                  <p className="font-bold text-lg text-foreground flex items-start gap-2 leading-tight">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    {res.Pistas?.nombre || "Pista eliminada"}
                  </p>
                  <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground bg-muted/40 w-fit px-3 py-1.5 rounded-lg">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {res.fecha.split("-").reverse().join("/")}</span>
                    <span className="block w-px h-4 bg-border"></span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {res.hora.slice(0, 5)}</span>
                  </div>
                </div>

                {res.Pistas && (
                  <div className="flex flex-col items-end gap-0.5 absolute bottom-5 right-5">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1"><Receipt className="w-3 h-3"/> Precio</span>
                    <p className="font-black text-xl text-foreground">{res.Pistas.precio}€</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="border border-dashed border-border/60 p-8 rounded-2xl text-center bg-muted/10">
            <p className="text-sm text-muted-foreground">No tienes ninguna reserva próxima.</p>
          </div>
        )}
      </div>

      {/* SECCIÓN: RESERVAS PASADAS */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-muted-foreground">
          <History className="w-5 h-5" /> Reservas Pasadas
        </h3>
        {pasadas.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pasadas.map((res: any) => (
              <li key={res.id} className="p-5 border border-border/40 bg-muted/20 rounded-2xl flex flex-col gap-3 opacity-70 hover:opacity-100 transition-opacity">
                <p className="font-medium text-foreground/80 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  {res.Pistas?.nombre || "Pista eliminada"}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground bg-background w-fit px-3 py-1 rounded-lg border border-border/50">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {res.fecha.split("-").reverse().join("/")}</span>
                  <span className="block w-px h-3 bg-border"></span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {res.hora.slice(0, 5)}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground italic">No hay historial antiguo.</p>
        )}
      </div>

    </div>
  );
}

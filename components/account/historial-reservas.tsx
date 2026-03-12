import { createClient } from "@/lib/supabase/server";

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
    <div className="w-full mt-10 space-y-8">
      
      <div>
        <h3 className="text-lg font-bold mb-4">Próximas Reservas</h3>
        {proximas.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {proximas.map((res: any) => (
              <li key={res.id} className="p-4 border border-primary/30 bg-primary/5 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-semibold text-primary">{res.Pistas?.nombre || "Pista eliminada"}</p>
                  <p className="text-sm">📅 {res.fecha.split("-").reverse().join("/")} - 🕐 {res.hora.slice(0, 5)}</p>
                </div>
                {res.Pistas && (
                  <p className="font-bold">{res.Pistas.precio}€</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground italic">No tienes próximas reservas.</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4 text-muted-foreground">Reservas Pasadas</h3>
        {pasadas.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {pasadas.map((res: any) => (
              <li key={res.id} className="p-4 border border-foreground/10 bg-muted/30 rounded-md flex justify-between items-center opacity-75">
                <div>
                  <p className="font-medium text-foreground/80">{res.Pistas?.nombre || "Pista eliminada"}</p>
                  <p className="text-sm text-muted-foreground">📅 {res.fecha.split("-").reverse().join("/")} - 🕐 {res.hora.slice(0, 5)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground italic">No hay reservas pasadas.</p>
        )}
      </div>

    </div>
  );
}

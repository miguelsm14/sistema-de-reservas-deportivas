'use client'
import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"

import { Calendario } from "./calendario"
import { HorasDisponibles } from "./horasDisponibles"
import { ConfirmarReserva } from "./confirmarReserva"
import { createClient } from "@/lib/supabase/client"

//la forma de los datos que llegan de Supabase = Cada pista tiene estas propiedades
interface Pistas {
    id: string,
    nombre: string,
    deporte: string,
    precio: number,

}

//Define lo que el componente espera recibir como props, un array de objetos Pista
interface PistasClientProps {
    pistas: Pistas[]
}

export function PistasClient({ pistas }: PistasClientProps) {
    //Guarda la pista que el usuario ha clickeado, al principio es 0
    const [pistaSeleccionada, setPistaSeleccionada] = useState<Pistas | null>(null)
    const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null)
    const [fecha, setFecha] = useState<Date | undefined>(new Date())
    const [horasOcupadas, setHorasOcupadas] = useState<string[]>([])

    // Efecto para obtener las horas ya reservadas al cambiar de pista o fecha
    useEffect(() => {
        async function fetchOcupadas() {
            if (!pistaSeleccionada || !fecha) {
                setHorasOcupadas([])
                setHoraSeleccionada(null)
                return
            }

            // Reseteamos siempre la hora al cambiar de dia para evitar estados corruptos
            setHoraSeleccionada(null)

            const supabase = createClient()
            const exactDate = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`

            const { data } = await supabase
                .from("Reservas")
                .select("hora")
                .eq("id_pista", pistaSeleccionada.id)
                .eq("fecha", exactDate)

            if (data) {
                // Supabase devuelve la hora como '15:00:00', extraemos solo '15:00'
                const occupiedFormated = data.map(r => r.hora.slice(0, 5))
                setHorasOcupadas(occupiedFormated)
            }
        }

        fetchOcupadas()
    }, [pistaSeleccionada, fecha])

    const getIconForSport = (sport: string) => {
        const lower = sport.toLowerCase()
        if (lower.includes('futbol') || lower.includes('fútbol')) return "⚽"
        if (lower.includes('baloncesto') || lower.includes('basket')) return "🏀"
        if (lower.includes('voleibol') || lower.includes('voley')) return "🏐"
        if (lower.includes('natacion') || lower.includes('piscina')) return "🏊‍♂️"
        if (lower.includes('padel') || lower.includes('tenis')) return "🎾"
        return "🏟️"
    }

    return (
        <div className="space-y-8 p-4 sm:p-6 max-w-5xl mx-auto">

            {/* Pistas */}
            <section>
                <h2 className="text-base font-display font-medium mb-4 flex items-center gap-2 text-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    Pistas disponibles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {pistas?.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => {
                                setPistaSeleccionada(c)
                                setFecha(new Date())
                                setHoraSeleccionada(null)
                            }}
                            className={`relative text-left rounded-2xl border p-5 transition-all duration-300 overflow-hidden group
                                ${pistaSeleccionada?.id === c.id
                                    ? 'border-primary ring-1 ring-primary shadow-md bg-primary/5 scale-[1.02] active:scale-95'
                                    : 'bg-card border-border hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 active:scale-95'
                                }`}
                        >
                            {/* Check badge */}
                            {pistaSeleccionada?.id === c.id && (
                                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(220 20% 4%)" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </span>
                            )}
                            <div className="flex flex-col gap-3">
                                <div>
                                    <span className="text-2xl block mb-2">{getIconForSport(c.deporte)}</span>
                                    <p className="font-display font-medium text-foreground text-sm">{c.nombre}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{c.deporte}</p>
                                </div>
                                <p className="font-display font-medium text-foreground text-lg">
                                    {c.precio}€
                                    <span className="text-xs font-normal text-muted-foreground">/h</span>
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Calendario + Horas */}
            {pistaSeleccionada && (
                <>
                    <hr className="border-border" />
                    <section className="space-y-6 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="font-display font-medium text-foreground text-xl flex items-center gap-2">
                            Pista seleccionada: <span className="text-primary font-bold">{pistaSeleccionada.nombre}</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {/* Calendario */}
                            <div className="bg-card shadow-sm border border-border/70 rounded-2xl p-6 relative overflow-hidden transition-all hover:shadow-md">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
                                    1. Elige una fecha
                                </p>
                                <Calendario fecha={fecha} onFechaSelect={setFecha} />
                            </div>

                            {/* Horas */}
                            <div className="bg-card shadow-sm border border-border/70 rounded-2xl p-6 relative overflow-hidden transition-all hover:shadow-md">
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
                                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
                                    2. Elige una hora
                                </p>
                                <HorasDisponibles
                                    horaSeleccionada={horaSeleccionada}
                                    onHoraSelect={setHoraSeleccionada}
                                    horasOcupadas={horasOcupadas}
                                />
                            </div>
                        </div>
                    </section>
                </>
            )}

            {/* Confirmar */}
            {pistaSeleccionada && fecha && horaSeleccionada && (
                <div className="max-w-3xl mx-auto w-full mt-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <ConfirmarReserva
                        pista={pistaSeleccionada}
                        fecha={fecha}
                        hora={horaSeleccionada}
                    />
                </div>
            )}
        </div>
    )
}
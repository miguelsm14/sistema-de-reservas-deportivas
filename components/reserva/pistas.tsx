'use client'
import { useState } from "react"
import { MapPin } from "lucide-react"

import { Calendario } from "./calendario"
import { HorasDisponibles } from "./horasDisponibles"
import { ConfirmarReserva } from "./confirmarReserva"

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
    const [fecha, setFecha] = useState<Date | undefined>(undefined)

    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Pistas disponibles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pistas?.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setPistaSeleccionada(c)}
                            className={`group relative text-left rounded-2xl border p-5 transition-all duration-200
                                ${pistaSeleccionada?.id === c.id
                                    ? 'border-primary bg-primary/5'
                                    : 'hover:border-foreground/30'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <span className="text-3xl block mb-1">{"🎾"}</span>
                                    <h3 className="font-display font-semibold text-foreground">{c.nombre}</h3>
                                    <p className="text-xs text-muted-foreground mt-0.5">{c.deporte}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold mt-1 text-foreground">
                                        {c.precio}€
                                        <span className="text-xs font-normal text-muted-foreground">/h</span>
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Calendario aparece solo cuando hay pista seleccionada */}
            {pistaSeleccionada && (
                <section>
                    <h2 className="text-lg font-display font-semibold mb-4">
                        Reservando: <span className="text-primary">{pistaSeleccionada.nombre}</span>
                    </h2>
                    <Calendario fecha={fecha} onFechaSelect={setFecha} />
                    <HorasDisponibles
                        horaSeleccionada={horaSeleccionada}
                        onHoraSelect={setHoraSeleccionada}
                    />
                </section>
            )}

            {pistaSeleccionada && fecha && horaSeleccionada && (
                <ConfirmarReserva
                    pista={pistaSeleccionada}
                    fecha={fecha}
                    hora={horaSeleccionada}
                />
            )}

        </div>
    )
}
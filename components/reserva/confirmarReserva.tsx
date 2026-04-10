'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ConfirmarReservaProps {
    pista: { id: string, nombre: string, precio: number }
    fecha: Date
    hora: string
}

export function ConfirmarReserva({ pista, fecha, hora }: ConfirmarReservaProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleReservar = async () => {
        setLoading(true)

        const supabase = createClient()

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            toast.error('Debes iniciar sesión para reservar.')
            setLoading(false)
            return
        }

        const exactTime = hora + ':00'
        const exactDate = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`

        // 1. Verificación de conflicto de reservas
        const { data: existingReservations, error: conflictError } = await supabase
            .from("Reservas")
            .select("id")
            .eq("id_pista", pista.id)
            .eq("fecha", exactDate)
            .eq("hora", exactTime)

        if (conflictError) {
            toast.error('Hubo un problema verificando la disponibilidad.')
            setLoading(false)
            return
        }

        if (existingReservations && existingReservations.length > 0) {
            toast.error('Esta pista ya ha sido reservada para esa hora. Por favor, elige otra.')
            setLoading(false)
            return
        }

        // 2. Solo redirigimos a la página de éxito (pasamos el id de la pista para el pago)
        router.push(`/reserva/exito?pista=${encodeURIComponent(pista.nombre)}&pistaId=${pista.id}&fecha=${exactDate}&hora=${hora}&precio=${pista.precio}`)


        setLoading(false)
    }

    return (
        <Card className="overflow-hidden border-0 ring-1 ring-border shadow-2xl bg-gradient-to-br from-card to-card/50">
            <div className="bg-primary/10 p-5 border-b border-primary/10 flex items-center gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">✓</div>
                <h3 className="font-semibold text-xl text-primary">Resumen de tu reserva</h3>
            </div>
            <CardContent className="p-6 md:p-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                    <div className="space-y-1">
                        <p className="text-muted-foreground uppercase text-xs font-semibold tracking-wider">Instalación</p>
                        <p className="text-foreground font-medium text-lg flex items-center gap-2">
                           🎾 {pista.nombre}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-muted-foreground uppercase text-xs font-semibold tracking-wider">Fecha</p>
                        <p className="text-foreground font-medium text-lg flex items-center gap-2">
                           📅 {fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-muted-foreground uppercase text-xs font-semibold tracking-wider">Horario</p>
                        <p className="text-foreground font-medium text-lg flex items-center gap-2">
                           🕐 {hora} — {`${parseInt(hora) + 1}:00`}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-muted-foreground uppercase text-xs font-semibold tracking-wider">Precio por hora</p>
                        <p className="text-foreground font-medium text-lg flex items-center gap-2">
                           💶 {pista.precio}€
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="space-y-1 text-center md:text-left">
                       <p className="text-muted-foreground uppercase text-xs font-semibold tracking-wider">Total a pagar en el club</p>
                       <p className="font-black text-4xl text-foreground">{pista.precio} <span className="text-xl text-muted-foreground">€</span></p>
                    </div>
                
                    <Button onClick={handleReservar} disabled={loading} size="lg" className="w-full md:w-auto px-10 py-7 text-lg font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-all">
                        {loading ? 'Procesando...' : 'Confirmar y Reservar'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
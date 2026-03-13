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

        // 2. Inserción de la nueva reserva
        const { error } = await supabase
            .from("Reservas")
            .insert({
                id_usuario: user.id,
                id_pista: pista.id,
                fecha: exactDate,
                hora: exactTime,
            })

        if (error) {
            toast.error('Error al realizar la reserva.')
        } else {
            toast.success('¡Reserva realizada correctamente!')
            //Esto realiza la recarga despues de reservar
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        }

        setLoading(false)
    }

    return (
        <Card>
            <CardContent className="pt-6 space-y-4">
                <div className="space-y-1 text-sm text-muted-foreground">
                    <p>🎾 <span className="text-foreground font-medium">{pista.nombre}</span></p>
                    <p>📅 <span className="text-foreground font-medium">{fecha.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                    <p>🕐 <span className="text-foreground font-medium">{hora} — {`${parseInt(hora) + 1}:00`}</span></p>
                    <p>💶 <span className="text-foreground font-medium">{pista.precio}€</span></p>
                </div>

                <Button onClick={handleReservar} disabled={loading} className="w-full">
                    {loading ? 'Reservando...' : 'Confirmar reserva'}
                </Button>
            </CardContent>
        </Card>
    )
}
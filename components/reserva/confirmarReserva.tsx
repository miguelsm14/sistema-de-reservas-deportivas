'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

interface ConfirmarReservaProps {
    pista: { id: string, nombre: string, precio: number }
    fecha: Date
    hora: string
}

export function ConfirmarReserva({ pista, fecha, hora }: ConfirmarReservaProps) {
    const [loading, setLoading] = useState(false)
    const [mensaje, setMensaje] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const handleReservar = async () => {
        setLoading(true)
        setMensaje(null)

        const supabase = createClient()

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            setMensaje({ type: 'error', text: 'Debes iniciar sesión para reservar.' })
            setLoading(false)
            return
        }

        const { error } = await supabase
            .from("Reservas")
            .insert({
                id_usuario: user.id,
                id_pista: pista.id,
                fecha: fecha.toISOString().split('T')[0], // formato YYYY-MM-DD
                hora: hora + ':00',
            })

        if (error) {
            setMensaje({ type: 'error', text: 'Error al realizar la reserva.' })
        } else {
            setMensaje({ type: 'success', text: '¡Reserva realizada correctamente!' })
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

                {mensaje && (
                    <p className={`text-sm ${mensaje.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                        {mensaje.text}
                    </p>
                )}

                <Button onClick={handleReservar} disabled={loading} className="w-full">
                    {loading ? 'Reservando...' : 'Confirmar reserva'}
                </Button>
            </CardContent>
        </Card>
    )
}
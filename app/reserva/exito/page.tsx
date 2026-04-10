'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ArrowLeft, CalendarDays, Clock, CreditCard, ChevronRight, MapPin, Trophy, ShieldAlert } from "lucide-react"

function ReservaExitoContent() {
    const searchParams = useSearchParams()
    const router = useRouter()

    // Forzar renderizado solo en cliente para evitar hydration mismatch con searchParams
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    const pista = searchParams.get("pista")
    const pistaId = searchParams.get("pistaId")
    const fecha = searchParams.get("fecha")
    const hora = searchParams.get("hora")
    const precio = searchParams.get("precio")

    const fechaFormateada = fecha
        ? new Date(fecha).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        : 'Fecha no disponible'

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">

                {/* Header de Éxito */}
                <div className="text-center mb-10 space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 animate-bounce shrink-0">
                        <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                        ¡Reserva Confirmada!
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Estás reservando la {pista ? <span className="font-bold text-foreground">{pista}</span> : 'pista seleccionada'}.
                        A continuación te mostramos los detalles de tu reserva y normativas importantes de las instalaciones.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Tarjeta de Detalles */}
                    <Card className="border-0 ring-1 ring-border shadow-xl bg-card/60 backdrop-blur-sm">
                        <div className="p-4 border-b border-border/50 bg-primary/5">
                            <h2 className="font-semibold text-lg flex items-center gap-2">
                                <CalendarDays className="w-5 h-5 text-primary" />
                                Resumen de tu cita
                            </h2>
                        </div>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center justify-between border-b border-border/50 pb-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Día</p>
                                    <p className="font-medium capitalize">{fechaFormateada}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-b border-border/50 pb-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Horario</p>
                                    <div className="flex items-center gap-2 font-medium">
                                        <Clock className="w-4 h-4 text-primary" />
                                        {hora} — {hora ? `${parseInt(hora) + 1}:00` : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">A abonar</p>
                                    <div className="flex items-center gap-2 font-bold text-2xl">
                                        <CreditCard className="w-5 h-5 text-primary" />
                                        {precio}€
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tarjeta de Información e Instrucciones (Dummy info) */}
                    <Card className="border-0 ring-1 ring-border shadow-xl bg-card/60 backdrop-blur-sm overflow-hidden">
                        <div className="p-4 border-b border-border/50 bg-primary/5">
                            <h2 className="font-semibold text-lg flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary" />
                                Sobre las instalaciones
                            </h2>
                        </div>
                        <CardContent className="p-6 space-y-5">
                            <div className="flex gap-3 items-start">
                                <Trophy className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-medium">Material deportivo</h4>
                                    <p className="text-sm text-muted-foreground mt-1">Dispones de raquetas, pelotas y petos en recepción. Recuerda solicitarlos al llegar si los necesitas.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <Clock className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-medium">Puntualidad</h4>
                                    <p className="text-sm text-muted-foreground mt-1">Se ruega llegar 10 minutos antes para acceder a los vestuarios sin prisas.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <ShieldAlert className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-medium">Normativa</h4>
                                    <p className="text-sm text-muted-foreground mt-1">Uso obligatorio de calzado adecuado para no dañar la superficie de la pista seleccionada.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">

                    <Button
                        size="lg"
                        onClick={async (e) => {
                            const btn = e.currentTarget;
                            const originalText = btn.innerHTML;
                            btn.innerHTML = "Generando pago seguro...";
                            btn.disabled = true;

                            try {
                                const response = await fetch('/api/checkout', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ pista, pistaId, fecha, hora, precio })
                                })
                                const data = await response.json()
                                if (data.url) {
                                    window.location.href = data.url
                                } else {
                                    alert("Error al contactar con Stripe: " + data.error)
                                    btn.innerHTML = originalText;
                                    btn.disabled = false;
                                }
                            } catch (e) {
                                alert("Error de red al inicializar pago")
                                btn.innerHTML = originalText;
                                btn.disabled = false;
                            }
                        }}
                        className="w-full sm:w-auto h-14 px-8 text-base shadow-lg shadow-primary/25 hover:scale-105 transition-transform"
                    >
                        Realizar el pago
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => router.push('/')}
                        className="w-full sm:w-auto h-14 px-8 text-base shadow-sm hover:bg-primary/5 transition-colors"
                    >
                        Volver al inicio

                    </Button>
                </div>
            </div>
        </div>
    )
}

export default function ReservaExitoPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
            <ReservaExitoContent />
        </Suspense>
    )
}

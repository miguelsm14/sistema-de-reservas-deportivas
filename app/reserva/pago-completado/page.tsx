'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense, useRef } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, Receipt, MailCheck } from "lucide-react"
import { sendReceipt } from "@/app/actions/sendReceipt"

function PagoCompletadoContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    
    const [mounted, setMounted] = useState(false)
    const [emailStatus, setEmailStatus] = useState<'sending' | 'sent' | 'error'>('sending')
    const emailRef = useRef(false)
    
    useEffect(() => {
        setMounted(true)
    }, [])

    const pista = searchParams.get("pista")
    const fecha = searchParams.get("fecha")
    const hora = searchParams.get("hora")
    const precio = searchParams.get("precio")

    useEffect(() => {
        // Evitamos enviar doble email si ya se mandó en esta sesión (React Strict Mode prevention)
        if (mounted && !emailRef.current && pista && fecha && hora && precio) {
            emailRef.current = true;
            sendReceipt(pista, precio, fecha, hora)
                .then((res) => {
                    if(res.success) setEmailStatus('sent')
                    else setEmailStatus('error')
                })
                .catch(() => setEmailStatus('error'))
        }
    }, [mounted, pista, fecha, hora, precio])

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            {/* Animación y diseño full premium para la finalización */}
            <div className="max-w-xl w-full text-center space-y-8 animate-in fade-in zoom-in-95 duration-1000">
                <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping duration-1000"></div>
                    <CheckCircle2 className="w-24 h-24 text-emerald-500 relative z-10" />
                </div>
                
                <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-black text-foreground">¡Pago verificado!</h1>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                        Hemos procesado de manera segura tu pago en Stripe por <span className="font-bold text-foreground">{precio}€</span>.
                    </p>
                </div>

                <div className="bg-card border shadow-lg rounded-2xl p-6 text-left max-w-sm mx-auto relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <Receipt className="w-16 h-16" />
                    </div>
                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${emailStatus === 'sending' ? 'bg-blue-500/10 text-blue-500 animate-pulse' : emailStatus === 'sent' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                <MailCheck className="w-5 h-5" />
                            </div>
                            <div className="text-sm">
                                <p className="font-medium text-foreground">Recibo por correo</p>
                                <p className="text-muted-foreground">
                                    {emailStatus === 'sending' && 'Enviando comprobante automáticamente...'}
                                    {emailStatus === 'sent' && 'Enviado con éxito a tu cuenta de email.'}
                                    {emailStatus === 'error' && 'Hubo un error enviando el comprobante de pago.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <Button 
                        size="lg" 
                        onClick={() => router.push('/account')}
                        className="h-14 px-10 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                    >
                        Ver mis reservas fijadas
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default function PagoCompletadoPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <PagoCompletadoContent />
        </Suspense>
    )
}

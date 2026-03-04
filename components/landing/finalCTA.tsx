'use client'
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import { useFadeUp } from "../ui/fadeUp";



export function FinalCTA() {
    const effect = useFadeUp();
    return (
        <section ref={effect} className="fade-up py-20 lg:py-28">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    ¿Listo para jugar?
                </h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto">
                    Únete a miles de jugadores que ya reservan pistas sin complicaciones.
                </p>
                <Button size="lg" className="mt-8 pulse-glow text-base font-semibold px-10">
                    Empieza gratis
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </section>
    )
}
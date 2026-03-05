import { Zap, MapPin } from "lucide-react"

export function HeroAbout() {
    return (
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[var(--gradient-hero)] pointer-events-none" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6">
                    <MapPin className="w-4 h-4" />
                    Sobre nosotros
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                    <span className="shiny-text">Hacemos que{" "}</span>
                    <span className="text-primary">jugar sea fácil</span>
                </h1>
                <p className="text-muted-foreground text-lg sm:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
                    (Nombre) nació de una frustración simple: ¿por qué es tan difícil
                    reservar una pista? Estamos aquí para cambiarlo.
                </p>
            </div>
        </section>
    )
}
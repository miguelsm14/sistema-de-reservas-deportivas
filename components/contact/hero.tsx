import { Mail } from "lucide-react"

export function Hero() {
    return (
        <section className="pt-24 pb-28 lg:pt-24 lg:pb-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[var(--gradient-hero)] pointer-events-none" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6">
                    <Mail className="w-4 h-4" />
                    Contacto
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                    ¿Algo que <span className="text-primary">contarnos</span>?
                </h1>
                <p className="text-muted-foreground text-lg sm:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
                    Reporta errores, sugiere mejoras o pídenos actualizar la info de
                    cualquier instalación. Estamos aquí para ayudarte.
                </p>
            </div>
        </section>
    )
}
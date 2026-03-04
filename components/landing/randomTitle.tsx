import { User, Shuffle } from "lucide-react"
import { Button } from "../ui/button"

export function RandomTitle() {
    return (
        <section
            className="relative overflow-hidden"
            style={{ background: "var(--gradient-cta)" }}>
            <div className="absolute inset-0 bg-background/60" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 text-center">
                <div className="flex justify-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
                        <Shuffle className="w-5 h-5 text-foreground" />
                    </div>
                </div>

                <p className="text-primary text-sm font-semibold uppercase tracking-wider">
                    Pádel
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 max-w-2xl mx-auto">
                    Modo 2vs2 aleatorio activado
                </h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                    ¿No tienes pareja? No hay excusa. Activa el modo aleatorio y te
                    emparejamos con jugadores de tu nivel. Solo tienes que presentarte.
                </p>
                <Button size="lg" className="mt-8 text-base font-semibold px-8">
                    Probar modo 2vs2
                </Button>
            </div>
        </section>
    )
}
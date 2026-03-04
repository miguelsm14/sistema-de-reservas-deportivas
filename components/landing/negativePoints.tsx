import { Phone, ShieldOff, TrendingDown } from "lucide-react"
import SpotlightCard from "../SpotlightCard"

const negative = [
  {
    icon: Phone,
    title: "Dependencia total",
    description: "La reserva depende de una persona, no de un sistema. Llamadas, WhatsApps, esperar respuesta…"
  },
  {
    icon: ShieldOff,
    title: "Imposible Escalar",
    description: "El sistema manual no crece contigo. Más pistas = más caos."
  },
  {
    icon: TrendingDown,
    title: "Cero seguridad",
    description: "Todo es 'palabra contra palabra'. Sin confirmación, sin registro."
  }
]

export function NegPoints(){
    return(
    <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-destructive text-sm font-semibold uppercase tracking-wider">
              El reloj del pasado
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
              Reservar una pista sigue siendo un lío
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {negative.map((item) =>(
              <SpotlightCard
              key={item.title}
              className="rounded-xl"
              spotlightColor="rgba(220, 38, 38, 0.25)"
            >
              <div className="flex flex-col gap-4 p-8">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </SpotlightCard>
            ))}
          </div>
        </div>
      </section>
); 
}
import { Clock, ShieldCheck, Zap } from "lucide-react"
import SpotlightCard from "../SpotlightCard";

const positive = [
  {
    icon: Zap,
    title: "Reserva instantánea",
    description: "Reserva en segundos desde tu móvil. Sin llamadas, sin esperas.",
  },
  {
    icon: Clock,
    title: "Disponible 24/7",
    description: "El deporte no tiene horarios, la app tampoco. Reserva cuando quieras.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad y control",
    description: "Todo registrado, confirmación al instante. Sin discusiones.",
  },
]

export function PosPoints(){
    return(
    <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">
              El reloj del pasado
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
              Reservar una pista sigue siendo un lío
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {positive.map((item) =>(
              <SpotlightCard
              key={item.title}
              className="rounded-xl"
              spotlightColor="rgba(34, 197, 94, 0.25)"
            >
              <div className="flex flex-col gap-4 p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
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
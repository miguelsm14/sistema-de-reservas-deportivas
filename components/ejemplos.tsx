"use client"
import { MapPin, CalendarCheck, PartyPopper } from "lucide-react";
import { useFadeUp } from "./ui/fadeUp";

const steps = [
  {
    icon: MapPin,
    step: "01",
    title: "Elige tu pista",
    description: "Selecciona el deporte y la pista más cercana a ti.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Escoge fecha y hora",
    description: "Mira disponibilidad en tiempo real y elige tu horario.",
  },
  {
    icon: PartyPopper,
    step: "03",
    title: "¡Listo para jugar!",
    description: "Confirmación instantánea. Solo queda disfrutar.",
  },
];

const HowItWorks = () => {
  const ref = useFadeUp();

  return (
    <section ref={ref} className="fade-up py-20 lg:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider">
            Súper fácil
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            ¿Cómo funciona?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((s, i) => (
            <div key={s.step} className="relative text-center group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
              )}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <s.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="text-xs text-primary font-bold tracking-widest">{s.step}</span>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="text-muted-foreground max-w-xs">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
import { Button } from "./ui/button";
import { ArrowRight, CalendarCheck, Clock, MapPin, PartyPopper, Phone, ShieldCheck, ShieldOff, Shuffle, TrendingDown, User, Zap } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import ScrollVelocity from "./ScrollVelocity";
import HowItWorks from "./ejemplos";


export function Hero() {

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 lg:pt-32 pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary w-fit mx-auto lg:mx-0">
                <Zap className="w-4 h-4" />
                Nuevo: Modo 2vs2 aleatorio
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="shiny-text">Reservar nunca fue</span>
                <br />
                <span className="text-primary">tan sencillo</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                La forma más fácil y rápida de reservar pistas deportivas.
                Sin llamadas, sin esperas, disponible 24/7.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button size="lg" className="pulse-glow text-base font-semibold px-8">
                  Reservar ahora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base border-border hover:bg-secondary"
                >
                  Ver cómo funciona
                </Button>
              </div>

              {/* PARA UN FUTURO¿? */}
              {/* 
              <div className="flex items-center gap-6 justify-center lg:justify-start mt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">2.4K+</p>
                  <p className="text-xs text-muted-foreground">Reservas</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">150+</p>
                  <p className="text-xs text-muted-foreground">Pistas</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">4.9★</p>
                  <p className="text-xs text-muted-foreground">Valoración</p>
                </div>
              </div>
              */}
            </div>

            {/* Right */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl" />
                <img
                  src={"/hero-sports.png"}
                  alt="Pista de pádel moderna con iluminación LED"
                  className="relative rounded-2xl w-full max-w-lg shadow-2xl border border-border"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CARRUSEL LOP ================= */}
      <div className="mt-20">
        <ScrollVelocity
          texts={['Sin llamadas - Disponible 24/7 - Confirmación instantánea - ']}
          velocity={150}
          className="custom-scroll-text"
        />
      </div>


      {/* ================= TITULO NEGATIVO ================= */}
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
            <SpotlightCard
              className="rounded-xl"
              spotlightColor="rgba(220, 38, 38, 0.25)"
            >
              <div className="flex flex-col gap-4 p-8">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-xl font-bold">Dependencia total</h3>
                <p className="text-muted-foreground leading-relaxed">
                  La reserva depende de una persona, no de un sistema. Llamadas, WhatsApps, esperar respuesta…
                </p>
              </div>
            </SpotlightCard>

            <SpotlightCard
              className="rounded-xl"
              spotlightColor="rgba(220, 38, 38, 0.25)"
            >
              <div className="flex flex-col gap-4 p-8">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-xl font-bold">Imposible Escalar</h3>
                <p className="text-muted-foreground leading-relaxed">
                  El sistema manual no crece contigo. Más pistas = más caos.
                </p>
              </div>
            </SpotlightCard>

            <SpotlightCard
              className="rounded-xl"
              spotlightColor="rgba(220, 38, 38, 0.25)"
            >
              <div className="flex flex-col gap-4 p-8">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <ShieldOff className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-xl font-bold">Cero seguridad</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Todo es "palabra contra palabra". Sin confirmación, sin registro.
                </p>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ================= TITULO POSITIVO ================= */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">
              Modo autómatico
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
              Menos llamadas, menos errores
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpotlightCard
              className="rounded-xl"
              spotlightColor="rgba(34, 197, 94, 0.25)"
            >
              <div className="flex flex-col gap-4 p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Reserva instantánea</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Reserva en segundos desde tu móvil. Sin llamadas, sin esperas.
                </p>
              </div>
            </SpotlightCard>

            <SpotlightCard
              className="rounded-xl"
              spotlightColor="rgba(34, 197, 94, 0.25)"
            >
              <div className="flex flex-col gap-4 p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Disponible 24/7</h3>
                <p className="text-muted-foreground leading-relaxed">
                  El deporte no tiene horarios, la app tampoco. Reserva cuando quieras.
                </p>
              </div>
            </SpotlightCard>

            <SpotlightCard
              className="rounded-xl"
              spotlightColor="rgba(34, 197, 94, 0.25)"
            >
              <div className="flex flex-col gap-4 p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Seguridad y control</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Todo registrado, confirmación al instante. Sin discusiones.
                </p>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ================= COMO FUNCIONA ================= */}
      <section className="py-20 lg:py-28 bg-secondary/30">
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
            <div className="relative text-center group">
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <span className="text-xs text-primary font-bold tracking-widest">01</span>
                <h3 className="text-xl font-bold">Elige tu pista</h3>
                <p className="text-muted-foreground max-w-xs">Selecciona el deporte y la pista más cercana a ti.</p>
              </div>
            </div>

            <div className="relative text-center group">
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <CalendarCheck className="w-8 h-8 text-primary" />
                </div>
                <span className="text-xs text-primary font-bold tracking-widest">02</span>
                <h3 className="text-xl font-bold"> Escoge fecha y hora </h3>
                <p className="text-muted-foreground max-w-xs">Mira disponibilidad en tiempo real y elige tu horario.</p>
              </div>
            </div>

            <div className="relative text-center group">
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <PartyPopper className="w-8 h-8 text-primary" />
                </div>
                <span className="text-xs text-primary font-bold tracking-widest">03</span>
                <h3 className="text-xl font-bold">¡Listo para jugar!</h3>
                <p className="text-muted-foreground max-w-xs">Confirmación instantánea. Solo queda disfrutar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ================= TITULO 2VS2 ================= */}
      <section
      className="relative overflow-hidden"
      style={{ background: "var(--gradient-cta)" }}
    >
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

    </div>
  );
}
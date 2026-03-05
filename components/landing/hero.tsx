'use client'
import { Button } from "../ui/button";
import { ArrowRight, Zap } from "lucide-react";
import ScrollVelocity from "../ScrollVelocity";
import { useFadeUp } from "../ui/fadeUp";

// AQUI SOLO VAMOS A DEJAR EL HERO
// TODO LO DEMÁS FUERA

export function Hero() {

  const ref = useFadeUp();

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
      <div className="mt-20 overflow-hidden border-y border-border py-4 bg-secondary/50">
        <ScrollVelocity
          texts={['Sin llamadas - Disponible 24/7 - Confirmación instantánea - ']}
          velocity={50}
          className="custom-scroll-text"
        />
      </div>
    </div>
  );
}
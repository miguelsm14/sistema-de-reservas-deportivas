import Image from "next/image";
import ShinyText from "./ShinyText";
import SpotlightCard from "./SpotlightCard";
import ScrollVelocity from "./ScrollVelocity";


export function Hero() {

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 lg:pt-32">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* IZQUIERDA */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              <ShinyText
                text="Reservar nunca fue tan sencillo"
                speed={3}
                delay={0}
                color="#000000"
                shineColor="#ffffff"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
              />
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              La forma más fácil y divertida de reservar pistas deportivas.
            </p>
          </div>
          {/* DERECHA */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <Image
              src="/reserva.png"
              alt="Reserva de pistas deportivas"
              width={320}
              height={320}
              className="rounded-xl w-48 sm:w-64 lg:w-80 h-auto"
              priority
            />
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
      <section className="mt-20 lg:mt-28 text-center px-4">
        <p className="text-red-500 text-sm font-medium">
          EL RELOJ DEL PASADO
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
          Reservar una pista sigue siendo un lío
        </h2>
      </section>
      {/* ================= DESVENTAJAS ================= */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <SpotlightCard
            className="rounded-xl"
            spotlightColor="rgba(220, 38, 38, 0.25)"
          >
            <div className="flex flex-col gap-4 text-center p-6">
              <h3 className="text-xl text-white lg:text-2xl font-bold">Dependencia total</h3>
              <p className="text-white text-muted-foreground">
                La reserva depende de una persona, no de un sistema.
              </p>
              <div className="flex justify-center mt-auto">
                <Image src="/reserva.png" alt="Problema reservas manuales" width={120} height={120} />
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard
            className="rounded-xl"
            spotlightColor="rgba(220, 38, 38, 0.25)"
          >
            <div className="flex flex-col gap-4 text-center p-6">
              <h3 className="text-xl text-white lg:text-2xl font-bold">Imposible escalar</h3>
              <p className="text-white text-muted-foreground">
                No crece, solo aguanta.
              </p>
              <div className="flex justify-center mt-auto">
                <Image src="/reserva.png" alt="Problema escalabilidad" width={120} height={120} />
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard
            className="rounded-xl"
            spotlightColor="rgba(220, 38, 38, 0.25)"
          >
            <div className="flex flex-col gap-4 text-center p-6">
              <h3 className="text-xl text-white lg:text-2xl font-bold">Cero seguridad</h3>
              <p className="text-white text-muted-foreground">
                Todo es "palabra contra palabra"
              </p>
              <div className="flex justify-center mt-auto">
                <Image src="/reserva.png" alt="Problema seguridad reservas" width={120} height={120} />
              </div>
            </div>
          </SpotlightCard>

        </div>
      </section>
      {/* ================= TITULO POSITIVO ================= */}
      <section className="mt-20 lg:mt-28 text-center px-4">
        <p className="text-green-500 text-sm font-medium">
          MODO AUTOMÁTICO
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
          Menos llamadas, menos errores, menos fricción.
        </h2>
      </section>
      {/* ================= VENTAJAS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <SpotlightCard
            className="rounded-xl"
            spotlightColor="rgba(34, 197, 94, 0.25)"
          >
            <div className="flex flex-col gap-4 text-center p-6">
              <h3 className="text-xl text-white lg:text-2xl font-bold">Reserva instantánea</h3>
              <p className="text-white text-muted-foreground">
                Reserva en segundos.<br /> Reserva cuando quieras.
              </p>
              <div className="flex justify-center mt-auto">
                <Image src="/reserva.png" alt="Problema reservas manuales" width={120} height={120} />
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard
            className="rounded-xl"
            spotlightColor="rgba(34, 197, 94, 0.25)"
          >
            <div className="flex flex-col gap-4 text-center p-6">
              <h3 className="text-xl text-white lg:text-2xl font-bold">Disponible 24/7</h3>
              <p className="text-white text-muted-foreground">
                El deporte no tiene horarios,<br />la app tampoco.
              </p>
              <div className="flex justify-center mt-auto">
                <Image src="/reserva.png" alt="Problema escalabilidad" width={120} height={120} />
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard
            className="rounded-xl"
            spotlightColor="rgba(34, 197, 94, 0.25)"
          >
            <div className="flex flex-col gap-4 text-center p-6">
              <h3 className="text-xl text-white lg:text-2xl font-bold">Seguridad y control</h3>
              <p className="text-white text-muted-foreground">
                Todo registrado, sin discusiones.
              </p>
              <div className="flex justify-center mt-auto">
                <Image src="/reserva.png" alt="Problema seguridad reservas" width={120} height={120} />
              </div>
            </div>
          </SpotlightCard>

        </div>
      </section>
      {/* ================= TITULO 2VS2 ================= */}
      <section className="mt-20 lg:mt-28 text-center border-t bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-green-300 text-sm font-medium">
            PADEL
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2">
            Modo 2vs2 aleatorio activado
          </h2>
          <p className="text-sm sm:text-lg text-white/90 mt-4 max-w-3xl mx-auto">
            Aparte de la facilidad para reservar pistas deportivas, también nos aseguramos
            de que puedas jugar incluso si no tienes pareja.
          </p>
        </div>
      </section>
    </div>
  );
}
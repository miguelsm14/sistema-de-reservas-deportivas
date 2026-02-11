import Image from "next/image";

export function Hero() {
  return (
    <div className="items-center">

      {/* ================= HERO ================= */}
      <section className="flex max-w-7xl mx-auto px-4 sm:px-6 w-full pt-40">

        {/* IZQUIERDA */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
            Reservar nunca fue tan sencillo
          </h1>

          <p className="text-lg text-muted-foreground">
            La forma más fácil y divertida de reservar pistas deportivas.
          </p>
        </div>

        {/* DERECHA */}
        <div className="w-full lg:w-1/2 flex justify-end">
          <Image
            src="/reserva.png"
            alt="Imagen Hero"
            width={300}
            height={300}
            className="rounded-xl"
          />
        </div>
      </section>

      {/* ================= TITULO NEGATIVO ================= */}
      <section className="mt-24 text-center">
        <p className="text-muted-foreground text-red-500">
          EL RELOJ DEL PASADO
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold">
          Reservar una pista sigue siendo un lío
        </h2>
      </section>

      {/* ================= DESVENTAJAS ================= */}
      <section className="flex max-w-7xl mx-auto px-4 sm:px-6 pt-40 gap-8">

        {/* CARD 1 */}
        <div className="w-full lg:w-1/3
          flex flex-col gap-4 text-center 
          border border-red-300 rounded-xl p-6 
          transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2">
          <h3 className="text-2xl font-bold">Dependencia total</h3>
          <p className="text-muted-foreground">
            La reserva depende de una persona, no de un sistema.
          </p>
          <div className="flex justify-center mt-auto">
            <Image
              src={"/reserva.png"}
              alt=""
              width={150}
              height={150}
            />
          </div>
        </div>

        {/* CARD 2 */}
        <div className="w-full lg:w-1/3
          flex flex-col gap-4 text-center
          border border-red-300 rounded-xl p-6 
          transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2">
          <h3 className="text-2xl font-bold">Imposible Escalar</h3>
          <p className="text-muted-foreground">
            No crece, solo aguanta.
          </p>
          <div className="flex justify-center mt-auto">
            <Image
              src={"/reserva.png"}
              alt=""
              width={150}
              height={150}
            />
          </div>
        </div>

        {/* CARD 3 */}
        <div className="w-full lg:w-1/3
          flex flex-col gap-4 text-center
          border border-red-300 rounded-xl p-6 
          transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2">
          <h3 className="text-2xl font-bold">Cero Seguridad</h3>
          <p className="text-muted-foreground">
            Todo es "palabra contra palabra"
          </p>
          <div className="flex justify-center mt-auto">
            <Image
              src={"/reserva.png"}
              alt=""
              width={150}
              height={150}
            />
          </div>
        </div>

      </section>

      {/* ================= TITULO POSITIVO ================= */}
      <section className="mt-24 text-center">
        <p className="text-green-500">
          MODO AUTOMÁTICO
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold">
          Menos llamadas, menos errores, menos fricción.
        </h2>
      </section>

      {/* ================= VENTAJAS ================= */}
      <section className="flex max-w-7xl mx-auto px-4 sm:px-6 pt-40 gap-8">

        {/* CARD 1 */}
        <div className="w-full lg:w-1/3
          flex flex-col gap-4 text-center
          border border-green-300 rounded-xl p-6 
          transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2">
          <h3 className="text-2xl font-bold">Reserva instantánea</h3>
          <p className="text-muted-foreground">
            Reserva en segundos.<br /> Reserva cuando quieras.
          </p>
          <div className="flex justify-center mt-auto">
            <Image
              src={"/reserva.png"}
              alt=""
              width={150}
              height={150}
            />
          </div>
        </div>

        {/* CARD 2 */}
        <div className="w-full lg:w-1/3
          flex flex-col gap-4 text-center
          border border-green-300 rounded-xl p-6 
          transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2">
          <h3 className="text-2xl font-bold">Disponible 24/7</h3>
          <p className="text-muted-foreground">
            El deporte no tiene horarios,<br />la app tampoco.
          </p>
          <div className="flex justify-center mt-auto">
            <Image
              src={"/reserva.png"}
              alt=""
              width={150}
              height={150}
            />
          </div>
        </div>

        {/* CARD 3 */}
        <div className="w-full lg:w-1/3
          flex flex-col gap-4 text-center
          border border-green-300 rounded-xl p-6 
          transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2">
          <h3 className="text-2xl font-bold">Seguridad y Control</h3>
          <p className="text-muted-foreground">
            Todo registrado, sin discusiones.
          </p>
          <div className="flex justify-center mt-auto">
            <Image
              src={"/reserva.png"}
              alt=""
              width={150}
              height={150}
            />
          </div>
        </div>

      </section>

      {/* ================= TITULO 2VS2 ================= */}
      <section className="mt-24 text-center border-t bg-emerald-300">
        <p className="text-green-500 pt-6">
          PADEL
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold pb-6 text-white">
          Modo 2vs2 aleatorio activado
        </h2>

        <div className=" bg-emerald-300 pb-6">
          <p className="mx-auto text-lg mb-6 w-px-3">
            A parte de la facilidad para reservar pistas deportivas, tambien nos aseguramos que te lo pases bien haciendo tu deporte favorito.<br />
            El modo 2vs2 se basa en una reserva a mitad de precio, pero con la condición de que no se reserva hasta que otra pareja aleatoria reserve la otra mitad de la pista.<br />
            Haciendo así que si no tienes con quien jugar, puedas enfrentarte a otra pareja aleatoriamente.
          </p>
        </div>
      </section>
    </div>
  );
}

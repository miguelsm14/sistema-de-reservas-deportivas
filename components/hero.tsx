import Image from "next/image";

export function Hero() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">

      {/* ================= HERO ================= */}
      <section className="flex flex-col lg:flex-row items-center gap-12">

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
        <div className="w-full lg:w-1/2 flex justify-center">
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
        <h2 className="text-3xl lg:text-4xl font-bold">
          Reservar una pista sigue siendo un lío
        </h2>
      </section>

      {/* ================= DESVENTAJAS ================= */}
      <section className="mt-12 flex flex-col lg:flex-row gap-8">

        {/* CARD 1 */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 text-center">
          <h3 className="text-2xl font-bold">Dependencia total</h3>
          <p className="text-muted-foreground">
            La reserva depende de una persona, no de un sistema.
          </p>
          <div className="flex justify-center">
            <Image
              src={"/reserva.png"}
              alt=""
              width={150}
              height={150}
            />
          </div>
        </div>

        {/* CARD 2 */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 text-center">
          <h3 className="text-2xl font-bold">Papel = errores</h3>
          <p className="text-muted-foreground">
            Un papel no valida nada. <br/> Un ordenador si.
          </p>
          <div className="flex justify-center">
            <Image
              src={"/reserva.png"}
              alt=""
              width={150}
              height={150}
            />
          </div>
        </div>

        {/* CARD 3 */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 text-center">
          <h3 className="text-2xl font-bold">Todo depende de memoria humana</h3>
          <p className="text-muted-foreground">
            La memoria falla. Siempre.
          </p>
          <div className="flex justify-center">
            <Image
              src={"/reserva.png"}
              alt=""
              width={150}
              height={150}
            />
          </div>
        </div>

      </section>

    </div>
  );
}

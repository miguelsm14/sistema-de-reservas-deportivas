import Image from "next/image";

export function Hero() {
  return (
    <div className="flex flex-col columns-2 gap-5 items-center">
      {/* ESTO ES EL TITULO */}

      <div className="flex">
        <h1 className="flex-1 text-3xl lg:text-6xl !leading-tight mx-auto text-center">
          Reservar nunca fue tan sencillo
        </h1>
        <p className="flex-1">
          La forma más sencilla de reservar tu pista de padel, y divertida...
        </p>
        <Image
        src="/reserva.png"
        alt="hero"
        width={200}
        height={200}
        />
      </div>

      <div className="columns-2" >
        <h1 className="text-3xl lg:text-6xl !leading-tight mx-auto text-center">
          Reservar nunca fue tan sencillo
        </h1>
        <p>
          La forma más sencilla de reservar tu pista de padel, y divertida...
        </p>
        <Image
        src="/reserva.png"
        alt="hero"
        width={200}
        height={200}
        />
      </div>
      {/* Esto es una linea */}
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-3" />

      <h2>

      </h2>

    </div>
  );
}

'use client'
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import { useFadeUp } from "../ui/fadeUp";

export default function ReservaPistas(){
    const pistas = [
    { id: 1, tipo: "padel" , nombre: "Pista 1" },
    { id: 2, tipo: "padel" ,nombre: "Pista 2" },
    { id: 3, tipo: "futbol" ,nombre: "Pista 3" },
  ];

  const ReservarBoton = (pistaId: number, pistaNombre: String) => {
    alert(`Has reservado la Pista ${pistaId} de este tipo ${pistaNombre}`);
    // Aquí guardariamos la reserva en la bbdd
  };

  


  return (
    <div className="flex justify-center p-10 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-2 gap-16">

        {pistas.map((pista) => (
          <div key={pista.id} className="flex flex-col items-center">
            {pista.tipo == "padel" && 
                (<a href= "/reservas/calendario" ><img className="w-72 h-auto transition-transform duration-300 hover:scale-105 cursor-pointer"
                     src = {"pista-padel-panoramica.webp"} 
                     width={"500px"} 
                     height={"500px"}
                     title ="PULSA PARA RESERVAR"
                    >

                </img></a>)
            }
            {pista.tipo == "futbol" && 
                (<a href = "/reservas/calendario" ><img alt="PULSA PARA RESERVAR" className="w-72 h-auto transition-transform duration-300 hover:scale-105 cursor-pointer"
                     src = {"pistaFutbolPabe.jpg"} 
                     width={"500px"} 
                     height={"500px"}
                     title ="PULSA PARA RESERVAR"
                     >

                </img></a>)
            }

            
            {/* Botón reservar */}
            <button
              onClick={() => ReservarBoton(pista.id,pista.nombre)}
              className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-500 transition-colors"
            >
              Reservar
            </button>

          </div>
        ))}
      </div>
    </div>
  );

}
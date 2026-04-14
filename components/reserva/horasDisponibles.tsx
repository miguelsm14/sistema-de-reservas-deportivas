'use client'

interface HorasDisponiblesProps {
  horaSeleccionada: string | null
  onHoraSelect: (hora: string) => void
  horasOcupadas: string[]
}

const HORAS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00'
]

export function HorasDisponibles({ horaSeleccionada, onHoraSelect, horasOcupadas }: HorasDisponiblesProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {HORAS.map((hora) => {
        const isOccupied = horasOcupadas.includes(hora)
        return (
          <button
            key={hora}
            onClick={() => !isOccupied && onHoraSelect(hora)}
            disabled={isOccupied}
            className={`rounded-xl border py-3 px-2 text-sm font-semibold transition-all duration-300
                            ${isOccupied
                ? 'opacity-30 cursor-not-allowed bg-muted/20 border-border text-muted-foreground line-through'
                : horaSeleccionada === hora
                  ? 'border-primary bg-primary text-primary-foreground shadow-md ring-offset-2 ring-2 ring-primary/30 scale-105 active:scale-95'
                  : 'bg-background border-border text-foreground hover:border-primary/50 hover:bg-primary/5 hover:scale-105 active:scale-95'
              }`}
          >
            {hora}
          </button>
        )
      })}
    </div>
  )
}
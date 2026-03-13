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
            className={`rounded-lg border py-2 px-1 text-xs font-display font-medium transition-all duration-150
                            ${isOccupied
                ? 'opacity-35 cursor-not-allowed bg-muted/40 border-border text-muted-foreground line-through'
                : horaSeleccionada === hora
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'bg-background border-border text-foreground hover:border-foreground/30'
              }`}
          >
            {hora}
          </button>
        )
      })}
    </div>
  )
}
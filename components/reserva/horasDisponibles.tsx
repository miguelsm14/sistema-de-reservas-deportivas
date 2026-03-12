'use client'

interface HorasDisponiblesProps {
  horaSeleccionada: string | null
  onHoraSelect: (hora: string) => void
}

const HORAS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00'
]

export function HorasDisponibles({ horaSeleccionada, onHoraSelect }: HorasDisponiblesProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-display font-semibold">Elige una hora</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {HORAS.map((hora) => (
          <button
            key={hora}
            onClick={() => onHoraSelect(hora)}
            className={`rounded-xl border py-2 px-3 text-sm font-medium transition-all duration-200
              ${horaSeleccionada === hora
                ? 'border-primary bg-primary/5 text-primary'
                : 'hover:border-foreground/30'
              }`}
          >
            {hora}
          </button>
        ))}
      </div>
    </section>
  )
}
'use client'
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { es } from "date-fns/locale"

interface CalendarioProps {
  fecha: Date | undefined
  onFechaSelect: (fecha: Date | undefined) => void
}

export function Calendario({ fecha, onFechaSelect }: CalendarioProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Elige una fecha</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          selected={fecha}
          onSelect={onFechaSelect}
          disabled={{ before: new Date() }}
          locale={es}
        />
      </CardContent>

      {fecha && (
        <p className="text-sm text-center pb-4 text-muted-foreground">
          {fecha.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      )}
    </Card>
  )
}
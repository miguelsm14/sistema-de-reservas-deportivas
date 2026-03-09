'use client'
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface ProfileFormProps {
  uid: string
  initialNombre: string
  initialApellido: string
  initialTelefono: string
  email: string
}

export function ProfileForm({ uid, initialNombre, initialApellido, email, initialTelefono }: ProfileFormProps) {
  const [nombre, setNombre] = useState(initialNombre ?? "")
  const [apellido, setApellido] = useState(initialApellido ?? "")
  const [telefono, setTelefono] = useState(initialTelefono ?? "")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSave = async () => {
    setLoading(true)
    setMessage(null)

    const supabase = createClient()

    const { error } = await supabase
      .from("Usuarios")
      .update({ nombre, apellido, telefono })
      .eq("uid", uid)

    if (error) {
      setMessage({ type: 'error', text: 'Error al guardar los cambios.' })
    } else {
      setMessage({ type: 'success', text: 'Cambios guardados correctamente.' })
    }

    setLoading(false)
  }

  const handleCancel = () => {
    setNombre(initialNombre ?? "")
    setApellido(initialApellido ?? "")
    setTelefono(initialTelefono ?? "")
    setMessage(null)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Nombre</label>
        <Input
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Apellidos</label>
        <Input
          placeholder="Tus apellidos"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Teléfono</label>
        <Input
          placeholder="Tu teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input placeholder="Tu email" value={email} disabled />
      </div>

      {message && (
        <p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
          {message.text}
        </p>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" onClick={handleCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </div>
  )
}
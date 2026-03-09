'use client'
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export function PasswdRecover() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleChange = async () => {
    //PASO 1: Primero verifica que las contraseñas sean coincidentes y despues que sean mayaor a 6 caracteres
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas nuevas no coinciden.' })
      return
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres.' })
      return
    }

    setLoading(true)
    setMessage(null)

    const supabase = createClient()

    //PASO 2: Verifica la contraseña actual que sea correcta
    const { data: { user } } = await supabase.auth.getUser()

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user?.email ?? "",
      password: currentPassword
    })

    if (signInError) {
      setMessage({ type: 'error', text: 'La contraseña actual no es correcta.' })
      setLoading(false)
      return
    }

    //PASO 3: Si la actual es correcta, actualiza a la nueva
    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      setMessage({ type: 'error', text: 'Error al cambiar la contraseña.' })
    } else {
      setMessage({ type: 'success', text: 'Contraseña cambiada correctamente.' })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }

    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Contraseña actual</label>
        <Input
          type="password"
          placeholder="Tu contraseña actual"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Nueva contraseña</label>
        <Input
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Repite la nueva contraseña</label>
        <Input
          type="password"
          placeholder="Repite la nueva contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {message && (
        <p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
          {message.text}
        </p>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button
          variant="outline"
          onClick={() => {
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
            setMessage(null)
          }}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button onClick={handleChange} disabled={loading}>
          {loading ? 'Cambiando...' : 'Cambiar contraseña'}
        </Button>
      </div>
    </div>
  )
}
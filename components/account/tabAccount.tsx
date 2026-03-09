'use client'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileForm } from "./profileForm"
import { PasswdRecover } from "./passwdRecover"

interface AccountTabsProps {
  uid: string
  usuario: {
    nombre: string
    apellido: string
    email: string
    telefono: string
  }
}

export function AccountTabs({ uid, usuario }: AccountTabsProps) {
    //Simpre string, que solo puede vale perfil y seguridad, por defecto empieza por perfil.
  const [activeTab, setActiveTab] = useState<'perfil' | 'seguridad'>('perfil')

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* SIDEBAR */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Cuenta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div
            onClick={() => setActiveTab('perfil')}
            className={`p-2 rounded-md cursor-pointer transition-colors
              ${activeTab === 'perfil' ? 'bg-muted' : 'hover:bg-muted/50'}`}
          >
            Perfil
          </div>
          <div
            onClick={() => setActiveTab('seguridad')}
            className={`p-2 rounded-md cursor-pointer transition-colors
              ${activeTab === 'seguridad' ? 'bg-muted' : 'hover:bg-muted/50'}`}
          >
            Seguridad
          </div>
        </CardContent>
      </Card>

      {/* MAIN CONTENT */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>{activeTab === 'perfil' ? 'Perfil' : 'Seguridad'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">

          {activeTab === 'perfil' && (
            <>
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium">
                    {usuario.nombre && usuario.apellido
                      ? `${usuario.nombre} ${usuario.apellido}`
                      : "Usuario registrado"}
                  </p>
                  <p className="text-sm text-muted-foreground">{usuario.email}</p>
                </div>
              </div>
              <ProfileForm
                key={uid}
                uid={uid}
                initialNombre={usuario.nombre}
                initialApellido={usuario.apellido}
                initialTelefono={usuario.telefono}
                email={usuario.email}
              />
            </>
          )}

          {activeTab === 'seguridad' && <PasswdRecover />}

        </CardContent>
      </Card>

    </div>
  )
}
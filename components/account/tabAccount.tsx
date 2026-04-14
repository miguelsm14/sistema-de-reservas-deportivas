'use client'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileForm } from "./profileForm"
import { PasswdRecover } from "./passwdRecover"
import { User, ShieldCheck } from "lucide-react"

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
    <div className="w-full flex flex-col md:flex-row min-h-[400px]">

      {/* SIDEBAR TABS */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border/40 p-6 space-y-2 bg-muted/10">
        <h3 className="text-sm font-bold text-muted-foreground tracking-wider uppercase mb-4 ml-2">Ajustes</h3>
        <div
          onClick={() => setActiveTab('perfil')}
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 font-medium
            ${activeTab === 'perfil' ? 'bg-primary/10 text-primary shadow-sm' : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'}`}
        >
          <User className="w-4 h-4" /> Perfil y Datos
        </div>
        <div
          onClick={() => setActiveTab('seguridad')}
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 font-medium
            ${activeTab === 'seguridad' ? 'bg-primary/10 text-primary shadow-sm' : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'}`}
        >
          <ShieldCheck className="w-4 h-4" /> Seguridad
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 md:p-10 bg-card">

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

            {activeTab === 'seguridad' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <PasswdRecover />
              </div>
            )}

      </div>

    </div>
  )
}
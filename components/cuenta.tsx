import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export async function Cuenta() {


  return (
    <div className="min-h-screen w-full flex justify-center bg-background p-6">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SIDEBAR */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Cuenta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 rounded-md bg-muted">Perfil</div>
            <div className="p-2 rounded-md hover:bg-muted/50 cursor-pointer">Seguridad</div>
            <div className="p-2 rounded-md hover:bg-muted/50 cursor-pointer">Facturación</div>
          </CardContent>
        </Card>

        {/* MAIN CONTENT */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* USER INFO */}
            <div className="flex items-center gap-4">

              <div>
                <p className="font-medium">Miguel Sánchez</p>
                <p className="text-sm text-muted-foreground">miguel@email.com</p>
              </div>
            </div>

            {/* FORM */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre</label>
                <Input placeholder="Tu nombre" defaultValue="Miguel" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Apellidos</label>
                <Input placeholder="Tus apellidos" defaultValue="Sánchez" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input placeholder="Tu email" defaultValue="miguel@email.com" disabled />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar cambios</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

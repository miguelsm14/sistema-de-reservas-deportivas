import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                ¡Gracias por registrarse!
              </CardTitle>
              <CardDescription>Revisa el email de confirmación</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Se ha registrado correctamente. Por favor revise el email de confirmación
                antes de iniciar sesion.
              </p>
              <br></br>
              <Link href={"/auth/login"}>Inicia Sesión aquí</Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  //Esto es para limpiar el formulario cada vez que entres en el formulario
  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
      setError(null);
      setSuccessMessage(null);
      setIsLoading(false);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      
      const urlParams = new URLSearchParams(window.location.search);
      const nextUrl = urlParams.get("next") || "/";
      window.location.href = nextUrl;
    } catch (error: unknown) {
      setError("Credenciales incorrectas o error de red.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      
      setSuccessMessage("Te hemos enviado las instrucciones al correo.");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error al enviar el correo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Link
        href="/"
        className="self-start flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors bg-muted/50 hover:bg-muted py-2 px-3 rounded-md"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al inicio
      </Link>
      
      {isForgotPassword ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Recuperar Contraseña</CardTitle>
            <CardDescription>
              Escribe tu correo electrónico para restablecer tu contraseña.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {successMessage ? (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-green-600 font-medium">{successMessage}</p>
                <Button variant="outline" className="w-full" onClick={() => setIsForgotPassword(false)}>
                  Volver a iniciar sesión
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email-forgot">Email</Label>
                    <Input
                      id="email-forgot"
                      type="email"
                      placeholder="email@ejemplo.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Enviar correo de recuperación"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full" 
                    onClick={() => {
                        setIsForgotPassword(false);
                        setError(null);
                        setSuccessMessage(null);
                    }}
                  >
                    Volver
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>
              Escribe tu correo para iniciar sesión en tu cuenta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@ejemplo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setError(null);
                      }}
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-muted-foreground hover:text-primary"
                    >
                      ¿Has olvidado tu contraseña?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Iniciando Sesión..." : "Iniciar Sesión"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="/auth/sign-up"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Regístrate
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

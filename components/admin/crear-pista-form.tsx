"use client";

import { useState } from "react";
import { addPistaAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CrearPistaForm() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    try {
      await addPistaAction(formData);
      setSuccess("¡Instalación añadida correctamente!");
      e.currentTarget.reset(); // Limpia el formulario
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 border p-6 rounded-lg bg-card">
      <h2 className="text-xl font-semibold mb-4 text-card-foreground">Añadir nueva instalación</h2>
      
      <div className="grid gap-2">
        <Label htmlFor="nombre">Nombre de la Pista</Label>
        <Input id="nombre" name="nombre" placeholder="Ej. Pista de Tenis 1" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="deporte">Deporte</Label>
        <Input id="deporte" name="deporte" placeholder="Ej. Tenis, Pádel, Baloncesto" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="precio">Precio por hora (€)</Label>
        <Input id="precio" name="precio" type="number" step="0.5" placeholder="Ej. 12.5" required />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-500">{success}</p>}

      <Button type="submit" disabled={isPending} className="mt-2 text-white">
        {isPending ? "Añadiendo..." : "Añadir Pista"}
      </Button>
    </form>
  );
}

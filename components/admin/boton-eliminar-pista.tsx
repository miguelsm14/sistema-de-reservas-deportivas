"use client";

import { useTransition } from "react";
import { deletePistaAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function BotonEliminarPista({ id, nombre }: { id: string; nombre: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    // Confirmación nativa simple
    if (!window.confirm(`¿Estás seguro de que deseas eliminar permanentemente la pista "${nombre}"?`)) {
      return;
    }

    startTransition(async () => {
      try {
        await deletePistaAction(id);
        toast.success(`La instalación "${nombre}" ha sido eliminada.`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error("Hubo un problema al intentar eliminar la instalación.");
      }
    });
  };

  return (
    <Button 
      variant="destructive" 
      size="icon" 
      onClick={handleDelete} 
      disabled={isPending}
      title="Eliminar pista"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

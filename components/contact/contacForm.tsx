"use client"
import { useState } from "react";
import { Send, Bug, MessageSquare, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  { value: "bug", label: "Reportar un error", icon: Bug },
  { value: "mejora", label: "Sugerencia de mejora", icon: MessageSquare },
  { value: "instalacion", label: "Actualizar pista / instalación", icon: MapPin },
  { value: "otro", label: "Otro", icon: MessageCircle },
] as const;

type Category = (typeof categories)[number]["value"];

const placeholders: Record<Category, string> = {
  bug: "Describe el error que has encontrado, los pasos para reproducirlo y en qué dispositivo ocurre...",
  mejora: "¿Qué funcionalidad te gustaría que mejorásemos o añadiésemos?",
  instalacion: "¿Qué instalación necesita actualización? Incluye nombre y ciudad si es posible...",
  otro: "Cuéntanos lo que necesites...",
};

export function ContactForm() {
  const [category, setCategory] = useState<Category>("bug");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      //toast({ title: "Rellena todos los campos", variant: "destructive" });
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      //toast({title: "¡Mensaje enviado!",description: "Te responderemos lo antes posible.",});
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Lado Izquierdo -> Formulario */}
          <div className="lg:col-span-3">
            <p className="text-sm font-medium text-primary tracking-wider uppercase mb-2">
              Formulario
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              Envíanos un mensaje
            </h2>

            {/* Selector de categoria */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = category === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                />
                <Input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                />
              </div>
              <Input
                placeholder={placeholders[category]}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={2000}
                className="min-h-[180px] resize-none"
              />
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto text-base font-semibold px-10"
                disabled={sending}
              >
                {sending ? "Enviando..." : "Enviar mensaje"}
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Lado derecho -> Consejitos */}
          <div className="lg:col-span-2">
            <div className="spotlight-card rounded-2xl p-8 sticky top-24">
              <h3 className="font-bold text-lg mb-4">
                💡 Consejos para tu mensaje
              </h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <span><strong className="text-foreground">Errores:</strong> Incluye los pasos exactos para reproducirlo y el dispositivo que usas.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <span><strong className="text-foreground">Mejoras:</strong> Explica qué problema resolvería la mejora que propones.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">3</span>
                  <span><strong className="text-foreground">Instalaciones:</strong> Indica nombre, ciudad y qué datos hay que actualizar.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
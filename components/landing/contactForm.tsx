'use client'

import { useState } from "react";
import { Send, Bug, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFadeUp } from "../ui/fadeUp";

//Array de objetos inmutable
const categories = [
    { value: "bug", label: "Reportar un error", icon: Bug },
    { value: "mejora", label: "Sugerencia de mejora", icon: MessageSquare },
    { value: "instalacion", label: "Actualizar pista / instalación", icon: MapPin,},
] as const;

//Diccionario (Mapa clave-valor)
const placeholders: Record<Category, string> = {
    bug: "Describe el error que has encontrado...",
    mejora: "¿Qué te gustaría mejorar?",
    instalacion: "¿Qué instalación necesita actualización?"
}

type Category = (typeof categories)[number]["value"];

export function ContactForm() {
    const ref = useFadeUp();
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
        // Simulate send
        setTimeout(() => {
            setSending(false);
            //toast({ title: "¡Mensaje enviado!", description: "Te responderemos lo antes posible." });
            setName("");
            setEmail("");
            setMessage("");
        }, 1200);
    };

    return (
        <section ref={ref} id="contacto" className="py-20 lg:py-28 bg-secondary/30">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-10">
                    <p className="text-sm font-medium text-primary tracking-wider uppercase">
                        Contacto
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
                        ¿Algo que contarnos?
                    </h2>
                    <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                        Reporta errores, sugiere mejoras o pídenos que actualicemos la info
                        de una instalación.
                    </p>
                </div>

                {/* Category selector */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const active = category === cat.value;
                        return (
                            <button
                                key={cat.value}
                                type="button"
                                onClick={() => setCategory(cat.value)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${active
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
                        maxLength={1000}
                        className="min-h-[140px] resize-none"
                    />
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full text-base font-semibold"
                        disabled={sending}
                    >
                        {sending ? "Enviando..." : "Enviar mensaje"}
                        <Send className="ml-2 w-4 h-4" />
                    </Button>
                </form>
            </div>
        </section>
    );
};
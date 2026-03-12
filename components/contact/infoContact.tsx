import { Mail, Clock, MessageCircle } from "lucide-react"

const infoCards = [
    {
        icon: Mail,
        title: "Email",
        description: "Respuesta en menos de 24h",
        value: "correoejemplo@gmail.com",
    },
    {
        icon: Clock,
        title: "Horario de soporte",
        description: "Atención personalizada",
        value: "Lun-Vie · 9:00–20:00",
    },
    {
        icon: MessageCircle,
        title: "Redes sociales",
        description: "Síguenos y escríbenos",
        value: "@nombreApp",
    },
];

export function InfoContact() {
    return (
        <section className="py-12 border-y border-border">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="grid sm:grid-cols-3 gap-6">
                    {infoCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.title}
                                className="spotlight-card rounded-2xl p-6 text-center group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-bold">{card.title}</h3>
                                <p className="text-muted-foreground text-sm mt-1">
                                    {card.description}
                                </p>
                                <p className="text-primary text-sm font-medium mt-2">
                                    {card.value}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
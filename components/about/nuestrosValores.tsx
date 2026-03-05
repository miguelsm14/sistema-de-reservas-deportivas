import { Heart, Target, Users, Zap } from "lucide-react";

export function Valores() {

    const panel = [
        {
            icon: Target,
            title: "Nuestra mision",
            description: "Democratizar el acceso al deporte eliminando las barreras de reserva.Queremos que jugar sea tan fácil como abrir una app."
        },
        {
            icon: Users,
            title: "Comunidad primero",
            description: "Construimos para jugadores reales. Cada decisión de producto nace del feedback de nuestra comunidad.",
        },
        {
            icon: Zap,
            title: "Velocidad",
            description: "Reservar una pista debería llevar segundos, no minutos. Obsesionados con eliminar fricción.",
        },
        {
            icon: Heart,
            title: "Pasión por el deporte",
            description: "Somos deportistas antes que desarrolladores. Entendemos lo que necesitas porque lo vivimos.",
        }
    ];

    return (
        <section className="py-20 lg:py-28 bg-secondary/30">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-14">
                    <p className="text-sm font-medium text-primary tracking-wider uppercase">
                        Lo que nos mueve
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
                        Nuestros valores
                    </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                    {panel.map((v) => {
                        const Icon = v.icon;
                        return (
                            <div
                                key={v.title}
                                className="spotlight-card rounded-2xl p-8 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {v.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
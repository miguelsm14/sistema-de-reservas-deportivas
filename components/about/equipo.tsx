import { Car, Dumbbell } from "lucide-react";

export function Equipo(){
    const team = [
        {
            icon: Car,
            title: "Miguel Sánchez Maraver",
            role: "Cofundador",
            description: "",
        },
        {
            icon: Dumbbell,
            title: "Juan Francisco Márquez Arias",
            role: "Cofundador",
            description: "",
        }
    ]

    return (
        <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-primary tracking-wider uppercase">
              El equipo
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
              Las personas detras de (Nombre)
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {team.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="spotlight-card rounded-2xl p-8 text-center group"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">{v.title}</h3>
                  <p className="text-primary text-sm font-medium mt-1">
                    {v.role}
                  </p>
                  <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
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
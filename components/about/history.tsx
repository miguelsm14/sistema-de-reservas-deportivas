export function Historia() {
    return (
        <section className="py-20 lg:py-28">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <p className="text-sm font-medium text-primary tracking-wider uppercase mb-3 text-center">
                    Nuestra historia
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">
                    De la frustración a la solución
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg text-center">
                    <p>
                        Todo empezó un martes a las 19:00. Cuatro amigos querían jugar al
                        pádel. Llamaron a las instalaciones de su pueblo. Nadie respondió, hasta la tercera llamada.
                        Despues de un rato, puedieron "reservar" una pista de padel.
                        Cuando llegaron, las dos pistas estaban ocupadas.
                        No había confirmación, no había registro, no habíaforma de demostrar esa reserva.
                        Ese día no jugaron.
                    </p>
                    <p>
                        Y nos hicimos una pregunta:{" "}
                        <span className="text-foreground font-medium">
                            ¿cómo es posible que reservar una pista en pleno 2026
                            siga funcionando igual como hace 20 años?
                        </span>
                    </p>
                    <p>
                        Así nació la idea de una plataforma diseñada desde cero para
                        conectar jugadores con instalaciones deportivas de forma
                        instantánea. Sin esperas, sin llamadas, sin complicaciones.
                    </p>

                    <div className="border-l-2 border-primary pl-6 py-2 mt-8">
                        <p className="text-foreground italic text-lg">
                            "Queremos que la parte más difícil de jugar sea elegir con quién
                            vas a jugar, no dónde."
                        </p>
                        <p className="text-primary text-sm mt-2 font-medium">
                            — Miguel Sánchez, Fundador
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
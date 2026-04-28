import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f4f7f1]">
      <section
        className="relative min-h-[78vh] overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(10,25,18,.88), rgba(10,25,18,.55)), url('https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1800&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto flex min-h-[78vh] max-w-7xl items-center px-6 py-16">
          <div className="max-w-2xl text-white">
            <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em]">
              Bunker 19 · Golf Social Club
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Reserva tu bahía.
              <br />
              Vive el golf diferente.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/85">
              Golf, drinks, comida y ambiente premium en un solo lugar.
              Perfecto para amigos, parejas, grupos y noches especiales.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/reserve"
                className="rounded-2xl bg-[#1f5c3f] px-7 py-4 text-base font-black text-white shadow-xl transition hover:scale-[1.02]"
              >
                Reservar ahora
              </Link>

              <a
                href="#experiencia"
                className="rounded-2xl border border-white/25 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Ver experiencia
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="experiencia" className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            ["⛳", "Golf indoor", "Simuladores para jugar, competir y pasarla bien."],
            ["🍻", "Drinks & comida", "Acompaña tu reserva con bebidas y platillos."],
            ["👥", "Ideal para grupos", "Perfecto para amigos, citas, eventos y convivios."],
            ["🌙", "Ambiente premium", "Un spot diferente para salir de la rutina."],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              className="rounded-[28px] border border-[#1f5c3f]/10 bg-white p-6 shadow-[0_16px_40px_rgba(21,32,24,0.08)]"
            >
              <div className="text-4xl">{icon}</div>
              <h3 className="mt-4 text-xl font-black text-[#1f5c3f]">{title}</h3>
              <p className="mt-2 text-sm text-[#66766b]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 md:grid-cols-2">
        <div className="rounded-[32px] bg-[#1f5c3f] p-8 text-white shadow-xl">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">
            Promo sugerida
          </div>
          <h2 className="mt-4 text-3xl font-black">
            Reserva entre semana y arma tu plan completo.
          </h2>
          <p className="mt-3 text-white/80">
            Bahía + drinks + comida. Ideal para venir después del trabajo o ver deportes.
          </p>
          <Link
            href="/reserve"
            className="mt-6 inline-flex rounded-2xl bg-white px-6 py-3 font-black text-[#1f5c3f]"
          >
            Ver disponibilidad
          </Link>
        </div>

        <div
          className="min-h-[320px] rounded-[32px] shadow-xl"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.35)), url('https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=1400&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </section>
    </main>
  );
}
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f4f4ef] text-[#0f2117]">
      <section
        className="relative overflow-hidden rounded-b-[36px]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(5,15,10,.95), rgba(8,25,17,.78), rgba(8,25,17,.35)), url('https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?q=80&w=1800&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto min-h-[760px] max-w-7xl px-6 py-10">
          <nav className="flex items-center justify-between">
            <div className="text-white">
              <div className="text-3xl font-black tracking-[0.18em]">
                BUNKER <span className="text-[#3ea45f]">19</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-white/70">
                Golf Social Club
              </div>
            </div>

            <div className="hidden items-center gap-8 text-sm font-bold uppercase text-white md:flex">
              <a href="#experiencia">¿Cómo funciona?</a>
              <a href="#mundial">Eventos</a>
              <a href="#promos">Promos</a>
              <Link
                href="/reserve"
                className="rounded-lg bg-[#1f7a3f] px-6 py-4 shadow-lg"
              >
                Reservar ahora
              </Link>
            </div>
          </nav>

          <div className="grid min-h-[640px] items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="text-white">
              <div className="mb-5 inline-flex rounded-xl bg-[#1f7a3f]/80 px-4 py-3 text-sm font-black uppercase tracking-wide shadow-lg">
                Golf · Drinks · Experiencia
              </div>

              <h1 className="text-6xl font-black leading-[0.95] tracking-tight md:text-7xl">
                Reserva tu
                <br />
                bahía en
                <br />
                <span className="text-[#2fa84f]">Bunker 19</span>
              </h1>

              <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/85">
                Más que golf. Es competencia, amigos, comida, drinks y noches
                inolvidables en un ambiente premium.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/reserve"
                  className="rounded-xl bg-[#18813d] px-8 py-4 text-base font-black text-white shadow-xl transition hover:scale-[1.02]"
                >
                  Reservar ahora →
                </Link>

                <a
                  href="#disponibilidad"
                  className="rounded-xl border border-white/25 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Ver disponibilidad
                </a>
              </div>

              <div className="mt-14 grid gap-4 sm:grid-cols-4">
                {[
                  ["⛳", "Simuladores profesionales"],
                  ["🍔", "Comida & drinks premium"],
                  ["👥", "Ideal para grupos"],
                  ["⭐", "Ambiente premium"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl">
                      {icon}
                    </div>
                    <div className="text-xs font-black uppercase leading-tight text-white/90">
                      {text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative min-h-[520px] overflow-hidden rounded-[34px] border border-white/10 bg-black/20 shadow-2xl backdrop-blur">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.55)), url('https://images.unsplash.com/photo-1592919505780-303950717480?q=80&w=1400&auto=format&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/45 p-5 text-white backdrop-blur-md">
                  <div className="text-xs font-black uppercase tracking-[0.22em] text-white/60">
                    Experiencia indoor
                  </div>
                  <div className="mt-2 text-2xl font-black">
                    Juega, compite y disfruta
                  </div>
                  <div className="mt-1 text-sm text-white/75">
                    Bahías listas para tu grupo, con ambiente de bar deportivo.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experiencia" className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            ["⛳", "Simuladores profesionales", "Tecnología para una experiencia real."],
            ["🍸", "Drinks & comida premium", "Disfruta bebidas, platillos y buen ambiente."],
            ["👥", "Ideal para grupos", "Cumpleaños, eventos, reuniones o salida diferente."],
            ["☆", "Ambiente premium", "Música, pantallas, buena vibra y golf."],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              className="rounded-[28px] border border-[#1f5c3f]/10 bg-white p-8 text-center shadow-[0_14px_40px_rgba(21,32,24,0.08)]"
            >
              <div className="text-5xl text-[#1f5c3f]">{icon}</div>
              <h3 className="mt-5 text-xl font-black uppercase leading-tight text-[#103820]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5d6f63]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="mundial" className="mx-auto max-w-7xl px-6 pb-8">
        <div
          className="grid overflow-hidden rounded-[30px] bg-[#08140d] shadow-2xl lg:grid-cols-[.9fr_1.3fr]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(3,12,8,.95), rgba(3,12,8,.75)), url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1800&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-8 text-white md:p-12">
            <div className="inline-flex rounded-xl bg-[#1f7a3f]/70 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
              Se acerca lo mejor del fútbol
            </div>

            <h2 className="mt-6 text-4xl font-black uppercase leading-tight md:text-5xl">
              Vive el mundial
              <br />
              en <span className="text-[#2fa84f]">Bunker 19</span>
            </h2>

            <p className="mt-5 max-w-lg text-white/80">
              Pantallas, ambiente, comida, drinks y bahías para armar el plan
              completo antes, durante o después del partido.
            </p>

            <Link
              href="/reserve"
              className="mt-7 inline-flex rounded-xl bg-[#1f7a3f] px-7 py-4 font-black text-white"
            >
              Reservar para evento →
            </Link>
          </div>

          <div className="min-h-[320px] bg-black/10" />
        </div>
      </section>

      <section id="promos" className="mx-auto grid max-w-7xl gap-6 px-6 pb-10 lg:grid-cols-[.9fr_1.8fr]">
        <div className="rounded-[30px] bg-[#07150d] p-8 text-white shadow-2xl">
          <div className="text-xs font-black uppercase tracking-[0.24em] text-white/50">
            Entre semana es mejor
          </div>

          <h2 className="mt-6 text-3xl font-black uppercase">
            Reserva y obtén
            <br />
            <span className="text-[#2fa84f]">shots de cortesía</span>
          </h2>

          <p className="mt-5 text-sm text-white/75">
            De lunes a jueves en reservaciones seleccionadas.
          </p>

          <div className="mt-8 flex h-24 w-24 items-center justify-center rounded-full border border-[#2fa84f]/40 bg-[#2fa84f]/10 text-3xl">
            🎁
          </div>
        </div>

        <div
          id="disponibilidad"
          className="grid overflow-hidden rounded-[30px] bg-[#08140d] shadow-2xl md:grid-cols-[.9fr_1.1fr]"
        >
          <div
            className="min-h-[320px]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.45)), url('https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?q=80&w=1200&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="p-8 text-white md:p-10">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#2fa84f]">
              ¿Listo para jugar?
            </div>

            <h2 className="mt-4 text-4xl font-black uppercase">
              Revisa disponibilidad
            </h2>

            <p className="mt-4 max-w-md text-white/75">
              Elige fecha, hora, número de personas y encuentra tu bahía.
            </p>

            <Link
              href="/reserve"
              className="mt-8 inline-flex rounded-xl bg-[#1f7a3f] px-10 py-4 text-lg font-black text-white shadow-xl"
            >
              Reservar ahora →
            </Link>

            <div className="mt-8 grid gap-4 text-xs font-black uppercase text-white/80 sm:grid-cols-3">
              <div>🛡 Confirmación inmediata</div>
              <div>📅 Reserva fácil</div>
              <div>🔁 Cambios rápidos</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
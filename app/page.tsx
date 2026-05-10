import Link from "next/link";

export default function HomePage() {
  const whatsappMessage = encodeURIComponent(
    "Hola, quiero información para reservar una bahía en Bunker 19."
  );

  return (
    <main className="min-h-screen bg-[#f4f4ef] text-[#102318]">
      <section
        className="relative overflow-hidden rounded-b-[36px] bg-black"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,.84), rgba(0,0,0,.58), rgba(0,0,0,.35)), url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1800&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-12">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-white">
              <div className="text-3xl font-black tracking-[0.18em]">
                BUNKER <span className="text-[#38a45b]">19</span>
              </div>

              <div className="text-xs font-bold uppercase tracking-[0.35em] text-white/65">
                Golf Social Club
              </div>
            </Link>

            <div className="hidden items-center gap-6 text-xs font-black uppercase tracking-wide text-white md:flex">
              <a href="#experiencia">Experiencia</a>
              <a href="#como-reservar">Cómo reservar</a>
              <a href="#eventos">Eventos</a>

              <Link
                href="/reserve"
                className="rounded-xl bg-[#17833d] px-6 py-4 shadow-xl transition hover:scale-[1.03] hover:bg-[#1f9a4b]"
              >
                Reservar ahora
              </Link>
            </div>
          </nav>

          <div className="grid min-h-[650px] items-center gap-10 py-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="text-white">
              <div className="mb-5 inline-flex rounded-xl bg-[#1f7a3f]/80 px-4 py-3 text-sm font-black uppercase tracking-wide shadow-lg">
                Golf · Drinks · Experiencia
              </div>

              <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl">
                Reserva tu
                <br />
                bahía en
                <br />
                <span className="text-[#2fa84f]">Bunker 19</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
                Más que golf. Es competencia, amigos, comida, drinks y noches
                inolvidables en un ambiente premium.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/reserve"
                  className="rounded-xl bg-[#16813d] px-8 py-4 text-base font-black uppercase text-white shadow-xl transition hover:scale-[1.03] hover:bg-[#1f9a4b]"
                >
                  Reservar ahora →
                </Link>

                <a
                  href={`https://wa.me/5216560000000?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/25 bg-[#25D366] px-8 py-4 text-base font-bold uppercase text-white shadow-xl transition hover:scale-[1.03] hover:bg-[#20ba5a]"
                >
                  WhatsApp
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
              <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur-md">
                <div
                  className="aspect-[4/5] rounded-[26px] border border-white/10 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.45)), url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1400&auto=format&fit=crop')",
                  }}
                />

                <div className="absolute bottom-10 left-10 right-10 rounded-2xl border border-white/10 bg-black/50 p-5 text-white backdrop-blur-md">
                  <div className="text-xs font-black uppercase tracking-[0.22em] text-white/60">
                    Golf Simulator Experience
                  </div>
                  <div className="mt-2 text-2xl font-black">
                    Vive la experiencia Bunker 19
                  </div>
                  <div className="mt-1 text-sm text-white/75">
                    Simuladores profesionales, drinks premium y ambiente exclusivo.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experiencia" className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            ["⛳", "Simuladores profesionales", "Tecnología para una experiencia real."],
            ["🍸", "Drinks & comida premium", "Bebidas, platillos y buena vibra."],
            ["👥", "Ideal para grupos", "Cumpleaños, eventos y reuniones."],
            ["☆", "Ambiente premium", "Música, pantallas, deportes y golf."],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              className="rounded-[28px] border border-[#1f5c3f]/10 bg-white p-8 text-center shadow-[0_14px_40px_rgba(21,32,24,0.08)] transition hover:-translate-y-1 hover:shadow-2xl"
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

      <section id="como-reservar" className="mx-auto max-w-7xl px-6 pb-12">
        <div className="rounded-[34px] bg-white p-7 shadow-[0_18px_50px_rgba(21,32,24,0.10)] md:p-10">
          <div className="text-center">
            <div className="text-sm font-black uppercase tracking-[0.25em] text-[#1f7a3f]">
              Cómo reservar
            </div>
            <h2 className="mt-3 text-4xl font-black uppercase text-[#103820] md:text-5xl">
              Fácil, rápido y premium
            </h2>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {[
              ["1", "Elige fecha y hora", "Selecciona cuándo quieres jugar y por cuánto tiempo."],
              ["2", "Escoge tu bahía", "Revisa disponibilidad y elige entre estándar o VIP."],
              ["3", "Confirma tu reserva", "Completa tus datos y asegura tu experiencia."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-[28px] border border-[#1f5c3f]/10 bg-[#f4f4ef] p-7"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#17833d] text-2xl font-black text-white">
                  {number}
                </div>
                <h3 className="mt-6 text-2xl font-black uppercase text-[#103820]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5d6f63]">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/reserve"
              className="inline-flex rounded-xl bg-[#17833d] px-9 py-4 font-black uppercase text-white shadow-xl transition hover:scale-[1.03] hover:bg-[#1f9a4b]"
            >
              Empezar reserva →
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#07150d] px-6 py-8 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm md:grid-cols-3">
          <div>
            <div className="text-2xl font-black">
              BUNKER <span className="text-[#2fa84f]">19</span>
            </div>
            <p className="mt-2 text-white/60">Golf Social Club</p>
          </div>

          <a
            href="https://www.instagram.com/bunker19.jrz/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-white/10 p-4 transition hover:bg-white/10"
          >
            Instagram
            <div className="mt-1 font-black">@bunker19.jrz</div>
          </a>

          <a
            href="https://share.google/fpFQOtDvWLaYod2mv"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-white/10 p-4 transition hover:bg-white/10"
          >
            Ubicación
            <div className="mt-1 font-black">Ver en Google Maps</div>
          </a>
        </div>
      </footer>

      <a
        href={`https://wa.me/5216560000000?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-5 z-50 hidden items-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-black uppercase text-white shadow-[0_20px_45px_rgba(37,211,102,0.45)] transition hover:scale-105 hover:bg-[#20ba5a] md:flex"
      >
        WhatsApp
      </a>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white/95 p-4 shadow-2xl backdrop-blur md:hidden">
        <Link
          href="/reserve"
          className="flex w-full items-center justify-center rounded-2xl bg-[#17833d] px-6 py-4 text-sm font-black uppercase text-white shadow-xl"
        >
          Reservar ahora →
        </Link>
      </div>
    </main>
  );
}
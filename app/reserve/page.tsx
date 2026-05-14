import Image from "next/image";
import Link from "next/link";

export default function ReservePage() {
  return (
    <main className="min-h-screen bg-[#eef3ee]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#07150d]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1592919505780-303950717480?q=80&w=2070&auto=format&fit=crop"
            alt="Golf Simulator"
            fill
            className="object-cover opacity-40"
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-7xl items-center px-6 py-16">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-black uppercase leading-none tracking-tight text-white md:text-7xl">
              Reserva tu
              <br />
              experiencia
            </h1>

            <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/90">
              Simuladores profesionales, ambiente premium, comida, drinks y la
              mejor experiencia indoor de golf.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#reserva"
                className="rounded-full bg-[#38a45b] px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:scale-105 hover:bg-[#2f8c4d]"
              >
                Reservar ahora
              </Link>

              <a
                href="https://wa.me/5216561101644"
                target="_blank"
                className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white backdrop-blur transition hover:bg-white/20"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div
        id="reserva"
        className="mx-auto grid max-w-7xl gap-6 px-6 py-8 xl:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="space-y-6">
          <section className="rounded-[32px] bg-white p-6 shadow-[0_16px_40px_rgba(21,32,24,0.08)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#eaf6e8] p-3">
                🏆
              </div>

              <div>
                <h2 className="text-4xl font-black uppercase tracking-tight text-[#123524]">
                  Datos de la reserva
                </h2>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <input
                placeholder="Nombre completo"
                className="rounded-2xl border border-[#d9e5db] bg-[#f7faf7] px-5 py-4 text-lg outline-none transition focus:border-[#38a45b]"
              />

              <input
                placeholder="Teléfono"
                className="rounded-2xl border border-[#d9e5db] bg-[#f7faf7] px-5 py-4 text-lg outline-none transition focus:border-[#38a45b]"
              />

              <input
                placeholder="Correo"
                className="rounded-2xl border border-[#d9e5db] bg-[#f7faf7] px-5 py-4 text-lg outline-none transition focus:border-[#38a45b]"
              />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <input
                type="date"
                className="rounded-2xl border border-[#d9e5db] bg-[#f7faf7] px-5 py-4 text-lg outline-none transition focus:border-[#38a45b]"
              />

              <select className="rounded-2xl border border-[#d9e5db] bg-[#f7faf7] px-5 py-4 text-lg outline-none transition focus:border-[#38a45b]">
                <option>18:00</option>
                <option>19:00</option>
                <option>20:00</option>
              </select>

              <select className="rounded-2xl border border-[#d9e5db] bg-[#f7faf7] px-5 py-4 text-lg outline-none transition focus:border-[#38a45b]">
                <option>2 horas</option>
                <option>3 horas</option>
                <option>4 horas</option>
              </select>

              <select className="rounded-2xl border border-[#d9e5db] bg-[#f7faf7] px-5 py-4 text-lg outline-none transition focus:border-[#38a45b]">
                <option>2 personas</option>
                <option>4 personas</option>
                <option>6 personas</option>
              </select>
            </div>

            <div className="mt-8">
              <button className="w-full rounded-2xl bg-[#123524] px-8 py-5 text-xl font-black uppercase tracking-[0.2em] text-white transition hover:bg-[#1b4b33]">
                Continuar reserva
              </button>
            </div>
          </section>
        </div>

        {/* RESUMEN */}
        <aside className="space-y-6">
          <section className="rounded-[32px] bg-white p-6 shadow-[0_16px_40px_rgba(21,32,24,0.08)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#eaf6e8] p-3">
                🛡️
              </div>

              <h2 className="text-4xl font-black uppercase tracking-tight text-[#123524]">
                Resumen
              </h2>
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex items-center justify-between border-b border-[#edf1ed] pb-4">
                <span className="text-lg text-[#6c7b70]">Cliente</span>
                <span className="font-bold text-[#123524]">--</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#edf1ed] pb-4">
                <span className="text-lg text-[#6c7b70]">Fecha</span>
                <span className="font-bold text-[#123524]">
                  2026-05-14
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#edf1ed] pb-4">
                <span className="text-lg text-[#6c7b70]">Hora</span>
                <span className="font-bold text-[#123524]">18:00</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#edf1ed] pb-4">
                <span className="text-lg text-[#6c7b70]">Duración</span>
                <span className="font-bold text-[#123524]">2 horas</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#edf1ed] pb-4">
                <span className="text-lg text-[#6c7b70]">Bahía</span>
                <span className="font-bold text-[#123524]">B19 VIP</span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-xl font-black uppercase text-[#123524]">
                  Total
                </span>

                <span className="text-4xl font-black text-[#38a45b]">
                  $1,200
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* PARTNERS */}
      <section className="bg-[#07150d] py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#38a45b] backdrop-blur">
              Empresas aliadas
            </div>

            <h2 className="mt-5 text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
              Partners & Sponsors
            </h2>

            <p className="mt-4 text-base text-white/60">
              Empresas que forman parte de la experiencia Bunker 19.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="group rounded-[32px] border border-white/10 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-[#38a45b]/40 hover:shadow-[0_20px_50px_rgba(31,154,75,0.18)]">
              <div className="flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-black p-4">
                <img
                  src="/partners/ermex.png"
                  alt="ERMEX"
                  className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="group rounded-[32px] border border-white/10 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-[#38a45b]/40 hover:shadow-[0_20px_50px_rgba(31,154,75,0.18)]">
              <div className="flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-white p-4">
                <img
                  src="/partners/venue16.jpg"
                  alt="Venue 16"
                  className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="group rounded-[32px] border border-white/10 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-[#38a45b]/40 hover:shadow-[0_20px_50px_rgba(31,154,75,0.18)]">
              <div className="flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-white p-4">
                <img
                  src="/partners/mano-obra.jpeg"
                  alt="Mano de Obra e Ingeniería"
                  className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
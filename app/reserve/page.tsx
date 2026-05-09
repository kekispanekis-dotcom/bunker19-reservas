import Link from "next/link";

const bays = [
  { code: "B1", name: "Bay 1", status: "Disponible", tag: "Clásica" },
  { code: "B2", name: "Bay 2", status: "Disponible", tag: "Clásica" },
  { code: "B3", name: "Bay 3", status: "Disponible", tag: "Clásica" },
  { code: "B4", name: "Bay 4", status: "Disponible", tag: "Clásica" },
  { code: "B19", name: "Bunker 19 VIP", status: "Premium", tag: "VIP" },
];

const times = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export default function ReservePage() {
  return (
    <main className="min-h-screen bg-[#f4f4ef] text-[#102318]">
      <section
        className="relative overflow-hidden bg-black"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,.88), rgba(0,0,0,.45)), url('https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1800&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-8">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-white">
              <div className="text-3xl font-black tracking-[0.18em]">
                BUNKER <span className="text-[#38a45b]">19</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-white/60">
                Golf Social Club
              </div>
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-wide text-white backdrop-blur transition hover:bg-white/20"
            >
              Inicio
            </Link>
          </nav>

          <div className="grid min-h-[560px] items-center gap-10 py-14 lg:grid-cols-[1fr_.9fr]">
            <div className="text-white">
              <div className="mb-5 inline-flex rounded-xl bg-[#1f7a3f]/80 px-4 py-3 text-sm font-black uppercase tracking-wide shadow-lg">
                Reserva premium
              </div>

              <h1 className="text-6xl font-black uppercase leading-[0.92] tracking-tight md:text-7xl">
                Elige tu
                <br />
                bahía y
                <br />
                <span className="text-[#38a45b]">juega hoy</span>
              </h1>

              <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/85">
                Reserva tu experiencia en Bunker 19. Golf, drinks, comida y
                ambiente premium para tu grupo.
              </p>

              <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
                {[
                  ["⛳", "5 Bahías"],
                  ["🍸", "Drinks & Food"],
                  ["⭐", "Experiencia VIP"],
                ].map(([icon, text]) => (
                  <div
                    key={text}
                    className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur"
                  >
                    <div className="text-3xl">{icon}</div>
                    <div className="mt-3 text-sm font-black uppercase">
                      {text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[34px] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
              <div className="rounded-[26px] bg-white p-6 text-[#102318] shadow-2xl">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-[#1f7a3f]">
                  Nueva reserva
                </div>

                <h2 className="mt-3 text-3xl font-black uppercase">
                  Datos de reserva
                </h2>

                <div className="mt-6 grid gap-4">
                  <input
                    className="rounded-2xl border border-black/10 bg-[#f4f4ef] px-5 py-4 font-semibold outline-none focus:border-[#1f7a3f]"
                    placeholder="Nombre del cliente"
                  />

                  <input
                    className="rounded-2xl border border-black/10 bg-[#f4f4ef] px-5 py-4 font-semibold outline-none focus:border-[#1f7a3f]"
                    placeholder="Teléfono / WhatsApp"
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="date"
                      className="rounded-2xl border border-black/10 bg-[#f4f4ef] px-5 py-4 font-semibold outline-none focus:border-[#1f7a3f]"
                    />

                    <select className="rounded-2xl border border-black/10 bg-[#f4f4ef] px-5 py-4 font-semibold outline-none focus:border-[#1f7a3f]">
                      <option>1 hora</option>
                      <option>2 horas</option>
                      <option>3 horas</option>
                    </select>
                  </div>

                  <select className="rounded-2xl border border-black/10 bg-[#f4f4ef] px-5 py-4 font-semibold outline-none focus:border-[#1f7a3f]">
                    <option>2 personas</option>
                    <option>3 personas</option>
                    <option>4 personas</option>
                    <option>5 personas</option>
                    <option>6 personas</option>
                  </select>

                  <button className="mt-2 rounded-2xl bg-[#17833d] px-6 py-5 text-lg font-black uppercase text-white shadow-xl transition hover:scale-[1.02] hover:bg-[#1f9a4b]">
                    Buscar disponibilidad →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.25em] text-[#1f7a3f]">
              Disponibilidad
            </div>
            <h2 className="mt-2 text-4xl font-black uppercase">
              Selecciona tu bahía
            </h2>
          </div>

          <div className="rounded-2xl bg-white px-5 py-3 text-sm font-bold shadow">
            Verde: disponible · VIP: experiencia premium
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-5">
          {bays.map((bay) => (
            <div
              key={bay.code}
              className="group rounded-[28px] border border-[#1f5c3f]/10 bg-white p-6 shadow-[0_14px_40px_rgba(21,32,24,0.08)] transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-[#102318] px-4 py-3 text-2xl font-black text-white">
                  {bay.code}
                </div>

                <div className="rounded-full bg-[#e7f4ea] px-3 py-1 text-xs font-black uppercase text-[#17833d]">
                  {bay.tag}
                </div>
              </div>

              <h3 className="mt-6 text-2xl font-black uppercase">
                {bay.name}
              </h3>

              <p className="mt-2 text-sm font-bold text-[#5d6f63]">
                {bay.status}
              </p>

              <button className="mt-6 w-full rounded-2xl bg-[#17833d] px-4 py-4 text-sm font-black uppercase text-white transition group-hover:bg-[#1f9a4b]">
                Elegir bahía
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="rounded-[32px] bg-[#07150d] p-6 text-white shadow-2xl md:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">
                Horarios sugeridos
              </div>
              <h2 className="mt-2 text-3xl font-black uppercase">
                Hoy en Bunker 19
              </h2>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-4 md:grid-cols-7">
            {times.map((time) => (
              <button
                key={time}
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-5 text-lg font-black backdrop-blur transition hover:scale-[1.03] hover:bg-[#17833d]"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
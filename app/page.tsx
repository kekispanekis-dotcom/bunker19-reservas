import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f4f4ef]">
      <section className="relative mx-auto max-w-[1400px] overflow-hidden">
        <Image
          src="/landing-bunker19.png"
          alt="Bunker 19 Reservas"
          width={1400}
          height={2100}
          priority
          className="h-auto w-full"
        />

        {/* Botón hero */}
        <Link
          href="/reserve"
          className="absolute left-[3.2%] top-[26.6%] flex h-[3.3%] w-[17.5%] items-center justify-center rounded-xl bg-[#0f7838] text-[1.05vw] font-black uppercase text-white shadow-[0_12px_30px_rgba(0,0,0,.35)] transition hover:scale-[1.03] hover:bg-[#159447]"
        >
          Reservar ahora →
        </Link>

        {/* Ver disponibilidad */}
        <Link
          href="/reserve"
          className="absolute left-[23.5%] top-[26.9%] flex h-[3%] w-[18%] items-center justify-center rounded-xl border border-white/20 bg-black/25 text-[.9vw] font-black uppercase text-white backdrop-blur-md transition hover:scale-[1.03] hover:bg-white/15"
        >
          📅 Ver disponibilidad
        </Link>

        {/* Mundial */}
        <Link
          href="/reserve"
          className="absolute left-[23.5%] top-[70.1%] flex h-[3.3%] w-[23%] items-center justify-center rounded-xl bg-[#0f7838] text-[.95vw] font-black uppercase text-white shadow-[0_12px_30px_rgba(0,0,0,.35)] transition hover:scale-[1.03] hover:bg-[#159447]"
        >
          Ver horarios y reservar 📅
        </Link>

        {/* Promo shots */}
        <Link
          href="/reserve"
          className="absolute left-[4%] top-[84.2%] flex h-[4.1%] w-[25%] items-center justify-center rounded-xl border border-[#2fa84f]/40 bg-[#06140c]/70 text-[.95vw] font-black uppercase text-white backdrop-blur-md transition hover:scale-[1.03] hover:bg-[#0f7838]"
        >
          Reservar promo
        </Link>

        {/* Botón final */}
        <Link
          href="/reserve"
          className="absolute left-[61%] top-[86.3%] flex h-[4.4%] w-[25.5%] items-center justify-center rounded-xl bg-[#0f7838] text-[1.1vw] font-black uppercase text-white shadow-[0_12px_30px_rgba(0,0,0,.35)] transition hover:scale-[1.03] hover:bg-[#159447]"
        >
          Reservar ahora →
        </Link>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/bunker19.jrz/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[39%] top-[96.3%] flex h-[2.5%] w-[20%] items-center justify-center rounded-xl text-[.9vw] font-bold text-white transition hover:scale-[1.03] hover:bg-white/10"
        >
          @bunker19.jrz
        </a>

        {/* Google Maps */}
        <a
          href="https://share.google/fpFQOtDvWLaYod2mv"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[69%] top-[96.1%] flex h-[2.8%] w-[28%] items-center justify-center rounded-xl text-[.85vw] font-bold text-white transition hover:scale-[1.03] hover:bg-white/10"
        >
          Ver ubicación
        </a>
      </section>
    </main>
  );
}
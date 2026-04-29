import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f4f4ef]">
      <section className="relative mx-auto max-w-[1400px]">
        <Image
          src="/landing-bunker19.png"
          alt="Bunker 19 Reservas"
          width={1400}
          height={2100}
          priority
          className="h-auto w-full"
        />

        {/* Botón Reservar ahora del hero */}
        <Link
          href="/reserve"
          className="absolute left-[3.2%] top-[26.8%] h-[3.1%] w-[17%] rounded-xl"
          aria-label="Reservar ahora"
        />

        {/* Botón Ver disponibilidad */}
        <Link
          href="/reserve"
          className="absolute left-[23.5%] top-[27.3%] h-[2.7%] w-[17%] rounded-xl"
          aria-label="Ver disponibilidad"
        />

        {/* Botón Mundial */}
        <Link
          href="/reserve"
          className="absolute left-[23.5%] top-[70.1%] h-[3.2%] w-[22%] rounded-xl"
          aria-label="Reservar para mundial"
        />

        {/* Botón final reservar */}
        <Link
          href="/reserve"
          className="absolute left-[61%] top-[86.4%] h-[4.2%] w-[25%] rounded-xl"
          aria-label="Reservar ahora"
        />
      </section>
    </main>
  );
}
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Bunker 19</h1>

      <p className="text-gray-600">
        Reserva tu bahía de golf de forma rápida y sencilla
      </p>

      <Link
        href="/reserve"
        className="bg-[#1f5c3f] text-white px-6 py-3 rounded-xl font-bold"
      >
        Reservar ahora
      </Link>
    </main>
  );
}
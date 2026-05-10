"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Users,
  Clock3,
  MapPin,
  Star,
  ShieldCheck,
  Trophy,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

type AvailableBay = {
  code: "B1" | "B2" | "B3" | "B4" | "B19";
  name: string;
  type: "standard" | "vip";
  capacity: number;
  price: number;
};

const timeSlots = [
  "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00",
];

const bayImages: Record<string, string> = {
  B1: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1200&auto=format&fit=crop",
  B2: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?q=80&w=1200&auto=format&fit=crop",
  B3: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1200&auto=format&fit=crop",
  B4: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=1200&auto=format&fit=crop",
  B19: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1200&auto=format&fit=crop",
};

function getBayAccent(type: "standard" | "vip") {
  if (type === "vip") {
    return {
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      border: "border-amber-300",
      glow: "shadow-[0_22px_65px_rgba(217,119,6,0.22)]",
      label: "VIP",
    };
  }

  return {
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    border: "border-emerald-200",
    glow: "shadow-[0_22px_65px_rgba(22,163,74,0.14)]",
    label: "STANDARD",
  };
}

export default function ReservePage() {
  const whatsappNumber = "5216561101644";

  const [date, setDate] = useState(() => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  });

  const [startTime, setStartTime] = useState("18:00");
  const [durationHours, setDurationHours] = useState("2");
  const [guestCount, setGuestCount] = useState("4");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [availableBays, setAvailableBays] = useState<AvailableBay[]>([]);
  const [selectedBay, setSelectedBay] = useState<AvailableBay | null>(null);

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const [createdReservation, setCreatedReservation] = useState<null | {
    code: string;
    totalAmount: number;
    bay: string;
    customer: string;
    status: string;
  }>(null);

  const totalPreview = useMemo(() => {
    if (!selectedBay) return 0;
    return selectedBay.price * Number(durationHours || 0);
  }, [selectedBay, durationHours]);

  const whatsappMessage = encodeURIComponent(
    createdReservation
      ? `Hola, tengo una reservación en Bunker 19. Código: ${createdReservation.code}. Cliente: ${createdReservation.customer}. Bahía: ${createdReservation.bay}. Fecha: ${date}. Hora: ${startTime}.`
      : "Hola, quiero información para reservar una bahía en Bunker 19."
  );

  async function checkAvailability() {
    setMessage("");
    setCreatedReservation(null);
    setSelectedBay(null);

    const res = await fetch("/api/public/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        startTime,
        durationHours: Number(durationHours),
        guestCount: Number(guestCount),
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      setMessage(result.error || "No se pudo consultar disponibilidad.");
      setAvailableBays([]);
      return;
    }

    setAvailableBays(result.bays || []);

    if (result.bays?.length) {
      setMessage(`Se encontraron ${result.bays.length} bahías disponibles.`);
    } else {
      setMessage("No hay disponibilidad para ese horario.");
    }
  }

  async function createReservation() {
    if (!selectedBay) {
      alert("Selecciona una bahía.");
      return;
    }

    if (!fullName.trim()) {
      alert("Escribe el nombre del cliente.");
      return;
    }

    setSaving(true);

    const res = await fetch("/api/public/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        phone,
        email,
        bayId:
          selectedBay.code === "B1"
            ? 1
            : selectedBay.code === "B2"
            ? 2
            : selectedBay.code === "B3"
            ? 3
            : selectedBay.code === "B4"
            ? 4
            : 5,
        date,
        startTime,
        durationHours: Number(durationHours),
        guestCount: Number(guestCount),
        totalAmount: selectedBay.price * Number(durationHours),
      }),
    });

    const result = await res.json();

    setSaving(false);

    if (!res.ok) {
      alert(result.error || "No se pudo crear la reservación.");
      return;
    }

    setCreatedReservation({
      code: result.reservation.code,
      totalAmount: result.reservation.totalAmount,
      bay: result.reservation.bay,
      customer: result.reservation.customer,
      status: result.reservation.status,
    });

    setMessage("Reservación creada correctamente.");

    setFullName("");
    setPhone("");
    setEmail("");

    await checkAvailability();
  }

  return (
    <main className="min-h-screen bg-[#f4f4ef] text-[#102318]">
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,.90), rgba(0,0,0,.60), rgba(0,0,0,.30)), url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1800&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-3xl text-white">
            <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] backdrop-blur">
              Bunker 19 · Reservaciones
            </div>

            <h1 className="mt-6 text-5xl font-black uppercase leading-[0.92] tracking-tight md:text-7xl">
              Reserva tu
              <br />
              experiencia
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
              Simuladores profesionales, ambiente premium, comida, drinks y la
              mejor experiencia indoor de golf.
            </p>

            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {[
                ["5", "Bahías"],
                ["B19", "VIP"],
                ["100%", "Indoor"],
              ].map(([number, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur"
                >
                  <div className="text-3xl font-black">{number}</div>
                  <div className="text-xs font-black uppercase tracking-wide text-white/70">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="rounded-[32px] bg-white p-6 shadow-[0_16px_40px_rgba(21,32,24,0.08)]">
            <div className="flex items-center gap-3">
              <Trophy className="h-7 w-7 text-[#17833d]" />
              <h2 className="text-3xl font-black uppercase text-[#103820]">
                Datos de la reserva
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nombre completo"
                className="rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition focus:border-[#17833d]"
              />

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Teléfono"
                className="rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition focus:border-[#17833d]"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo"
                className="rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition focus:border-[#17833d]"
              />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-4">
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition focus:border-[#17833d]"
                />

                <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#17833d]" />
              </div>

              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition focus:border-[#17833d]"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>

              <select
                value={durationHours}
                onChange={(e) => setDurationHours(e.target.value)}
                className="rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition focus:border-[#17833d]"
              >
                <option value="1">1 hora</option>
                <option value="2">2 horas</option>
                <option value="3">3 horas</option>
                <option value="4">4 horas</option>
              </select>

              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition focus:border-[#17833d]"
              >
                {["2", "3", "4", "5", "6", "8", "10"].map((qty) => (
                  <option key={qty} value={qty}>
                    {qty} personas
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={checkAvailability}
              className="mt-6 rounded-2xl bg-[#17833d] px-8 py-4 text-sm font-black uppercase text-white shadow-xl transition hover:scale-[1.02] hover:bg-[#1f9a4b]"
            >
              Ver disponibilidad →
            </button>
          </section>

          {message ? (
            <div className="rounded-2xl border border-[#17833d]/10 bg-white p-5 text-sm font-semibold text-[#48604f] shadow">
              {message}
            </div>
          ) : null}

          <section className="space-y-5">
            {availableBays.map((bay) => {
              const isSelected = selectedBay?.code === bay.code;
              const accent = getBayAccent(bay.type);
              const image = bayImages[bay.code] || bayImages.B1;

              return (
                <button
                  key={bay.code}
                  type="button"
                  onClick={() => setSelectedBay(bay)}
                  className={`group relative w-full overflow-hidden rounded-[32px] border bg-white p-0 text-left transition ${
                    isSelected
                      ? `${accent.border} ${accent.glow}`
                      : "border-black/5 shadow-[0_14px_35px_rgba(21,32,24,0.06)] hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(21,32,24,0.10)]"
                  }`}
                >
                  <div className="grid md:grid-cols-[260px_1fr_auto]">
                    <div
                      className="min-h-[210px] bg-cover bg-center"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.45)), url('${image}')`,
                      }}
                    >
                      <div className="flex h-full items-end p-5">
                        <div className="rounded-2xl bg-black/55 px-4 py-3 text-white backdrop-blur">
                          <div className="text-xs font-black uppercase tracking-[0.18em] text-white/65">
                            Bahía
                          </div>
                          <div className="text-4xl font-black">{bay.code}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <div
                          className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.18em] ${accent.badge}`}
                        >
                          {accent.label}
                        </div>

                        {isSelected ? (
                          <div className="rounded-full bg-[#17833d] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white">
                            Seleccionada
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-3 text-2xl font-black text-[#243328]">
                        {bay.name}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#eef7eb] px-4 py-2 text-sm font-semibold text-[#17833d]">
                          <Users className="h-4 w-4" />
                          {bay.capacity} personas
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f5f2] px-4 py-2 text-sm font-semibold text-[#48604f]">
                          <Clock3 className="h-4 w-4 text-[#17833d]" />
                          Reserva por hora
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f5f2] px-4 py-2 text-sm font-semibold text-[#48604f]">
                          <MapPin className="h-4 w-4 text-[#17833d]" />
                          Bunker 19
                        </div>
                      </div>
                    </div>

                    <div className="p-6 md:min-w-[220px]">
                      <div className="rounded-[28px] bg-[#f7f7f4] p-5 text-left md:text-right">
                        <div className="text-xs font-black uppercase tracking-[0.18em] text-[#7a887e]">
                          Tarifa
                        </div>

                        <div className="mt-1 text-5xl font-black text-[#103820]">
                          ${bay.price}
                        </div>

                        <div className="text-sm text-[#728076]">por hora</div>

                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#17833d]">
                          <Star className="h-4 w-4" />
                          {bay.type === "vip"
                            ? "Experiencia premium"
                            : "Ideal para grupos"}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </section>
        </div>

        <aside className="space-y-6">
          <section className="sticky top-6 rounded-[32px] bg-white p-6 shadow-[0_20px_55px_rgba(21,32,24,0.12)]">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-[#17833d]" />
              <h2 className="text-3xl font-black uppercase text-[#103820]">
                Resumen
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {[
                ["Cliente", fullName || "--"],
                ["Fecha", date],
                ["Hora", startTime],
                ["Duración", `${durationHours} h`],
                ["Personas", guestCount],
                ["Bahía", selectedBay?.code || "--"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-black/5 pb-3"
                >
                  <span className="text-sm text-[#728076]">{label}</span>
                  <span className="font-black text-[#103820]">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[28px] bg-[#eef7eb] p-5">
              <div className="text-sm font-semibold text-[#728076]">
                Total estimado
              </div>

              <div className="mt-1 text-5xl font-black text-[#17833d]">
                ${totalPreview}
              </div>
            </div>

            <button
              onClick={createReservation}
              disabled={!selectedBay || saving}
              className="mt-6 w-full rounded-2xl bg-[#17833d] px-7 py-5 text-sm font-black uppercase text-white shadow-xl transition hover:scale-[1.02] hover:bg-[#1f9a4b] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? "Guardando..." : "Confirmar reservación"}
            </button>
          </section>

          {createdReservation ? (
            <section className="rounded-[32px] border border-[#17833d]/10 bg-white p-6 shadow-[0_16px_40px_rgba(21,32,24,0.08)]">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-[#17833d]" />
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-[#17833d]">
                    Reservación creada
                  </div>
                  <div className="mt-1 text-3xl font-black text-[#103820]">
                    {createdReservation.code}
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#728076]">Cliente</span>
                  <span className="font-black">
                    {createdReservation.customer}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#728076]">Bahía</span>
                  <span className="font-black">{createdReservation.bay}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#728076]">Estatus</span>
                  <span className="font-black">{createdReservation.status}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#728076]">Total</span>
                  <span className="font-black">
                    ${createdReservation.totalAmount}
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-black uppercase text-white shadow-xl transition hover:scale-[1.02] hover:bg-[#20ba5a]"
              >
                <MessageCircle className="h-5 w-5" />
                Enviar por WhatsApp
              </a>
            </section>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
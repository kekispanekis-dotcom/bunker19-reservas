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
  QrCode,
} from "lucide-react";

type AvailableBay = {
  code: "B1" | "B2" | "B3" | "B4" | "B19";
  name: string;
  type: "standard" | "vip";
  capacity: number;
  price: number;
};

const whatsappNumber = "5216561101644";

const timeSlots = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

const bayImages: Record<string, string> = {
  B1: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1200&auto=format&fit=crop",
  B2: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?q=80&w=1200&auto=format&fit=crop",
  B3: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1200&auto=format&fit=crop",
  B4: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=1200&auto=format&fit=crop",
  B19: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1200&auto=format&fit=crop",
};

const bayMap = [
  { code: "B1", label: "Bay 1" },
  { code: "B2", label: "Bay 2" },
  { code: "B3", label: "Bay 3" },
  { code: "B4", label: "Bay 4" },
  { code: "B19", label: "Bunker 19 VIP" },
] as const;

const fakeOccupancy: Record<string, string[]> = {
  B1: ["17:00", "18:00"],
  B2: ["14:00", "15:00", "19:00"],
  B3: ["12:00", "13:00"],
  B4: ["20:00"],
  B19: ["18:00", "19:00", "20:00"],
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

  const availableCodes = useMemo(
    () => new Set(availableBays.map((bay) => bay.code)),
    [availableBays]
  );

  const selectedSlotRange = useMemo(() => {
    const startIndex = timeSlots.indexOf(startTime);
    const duration = Number(durationHours || 1);

    if (startIndex < 0) return new Set<string>();

    return new Set(timeSlots.slice(startIndex, startIndex + duration));
  }, [startTime, durationHours]);

  const qrText = createdReservation
    ? `BUNKER 19 | Reserva: ${createdReservation.code} | Cliente: ${createdReservation.customer} | Bahía: ${createdReservation.bay}`
    : "BUNKER 19";

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    qrText
  )}`;

  const whatsappMessage = encodeURIComponent(
    createdReservation
      ? `Hola, tengo una reservación en Bunker 19.%0ACódigo: ${createdReservation.code}`
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

  function selectBayFromMap(code: AvailableBay["code"]) {
    const bay = availableBays.find((item) => item.code === code);

    if (!bay) {
      if (availableBays.length === 0) {
        setMessage("Primero consulta disponibilidad.");
      } else {
        setMessage("Esa bahía no está disponible.");
      }
      return;
    }

    setSelectedBay(bay);
    setMessage(`Seleccionaste ${bay.name}.`);
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
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nombre completo" className="rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition focus:border-[#17833d]" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Teléfono" className="rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition focus:border-[#17833d]" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" className="rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition focus:border-[#17833d]" />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-4">
              <div className="relative">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition focus:border-[#17833d]" />
                <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#17833d]" />
              </div>

              <select value={startTime} onChange={(e) => setStartTime(e.target.value)} className="rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition focus:border-[#17833d]">
                {timeSlots.map((slot) => (
                  <option key={slot}>{slot}</option>
                ))}
              </select>

              <select value={durationHours} onChange={(e) => setDurationHours(e.target.value)} className="rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition focus:border-[#17833d]">
                <option value="1">1 hora</option>
                <option value="2">2 horas</option>
                <option value="3">3 horas</option>
                <option value="4">4 horas</option>
              </select>

              <select value={guestCount} onChange={(e) => setGuestCount(e.target.value)} className="rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition focus:border-[#17833d]">
                {["2", "3", "4", "5", "6", "8", "10"].map((qty) => (
                  <option key={qty}>{qty} personas</option>
                ))}
              </select>
            </div>

            <section className="mt-6 rounded-[28px] border border-black/5 bg-[#07150d] p-5 text-white">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.22em] text-white/45">
                    Scheduler visual
                  </div>

                  <h3 className="mt-1 text-2xl font-black uppercase">
                    Horario seleccionado
                  </h3>
                </div>

                <div className="rounded-full bg-[#17833d] px-4 py-2 text-xs font-black uppercase">
                  {startTime} · {durationHours} h
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                {timeSlots.map((slot) => {
                  const isSelectedSlot = selectedSlotRange.has(slot);
                  const isStart = slot === startTime;

                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setStartTime(slot);
                        setAvailableBays([]);
                        setSelectedBay(null);
                        setCreatedReservation(null);
                      }}
                      className={`rounded-2xl border px-3 py-4 text-left transition hover:-translate-y-1 ${
                        isSelectedSlot
                          ? "border-[#38a45b] bg-[#17833d]"
                          : "border-white/10 bg-white/10 hover:bg-white/15"
                      }`}
                    >
                      <div className="text-lg font-black">{slot}</div>

                      <div className="mt-1 text-[10px] font-black uppercase tracking-wide text-white/60">
                        {isStart ? "Inicio" : isSelectedSlot ? "Activo" : "Libre"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <button onClick={checkAvailability} className="mt-6 rounded-2xl bg-[#17833d] px-8 py-4 text-sm font-black uppercase text-white shadow-xl transition hover:scale-[1.02] hover:bg-[#1f9a4b]">
              Ver disponibilidad →
            </button>
          </section>

          <section className="rounded-[32px] bg-white p-6 shadow-[0_16px_40px_rgba(21,32,24,0.08)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.22em] text-[#17833d]">
                  Disponibilidad visual
                </div>

                <h2 className="mt-1 text-3xl font-black uppercase text-[#103820]">
                  Horarios por bahía
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-black uppercase">
                <div className="rounded-full bg-[#17833d] px-3 py-2 text-white">
                  Libre
                </div>

                <div className="rounded-full bg-[#d92d20] px-3 py-2 text-white">
                  Ocupado
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {bayMap.map((bay) => {
                const occupied = fakeOccupancy[bay.code] || [];

                return (
                  <div
                    key={bay.code}
                    className="rounded-[28px] border border-black/5 bg-[#f7f7f4] p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-3xl font-black text-[#103820]">
                          {bay.code}
                        </div>

                        <div className="text-xs font-black uppercase tracking-[0.18em] text-[#728076]">
                          {bay.label}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          selectBayFromMap(bay.code as AvailableBay["code"])
                        }
                        className="rounded-full bg-[#17833d] px-4 py-2 text-xs font-black uppercase text-white transition hover:bg-[#1f9a4b]"
                      >
                        Seleccionar
                      </button>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                      {timeSlots.map((slot) => {
                        const occupiedSlot = occupied.includes(slot);

                        return (
                          <div
                            key={slot}
                            className={`rounded-2xl px-3 py-4 text-center text-sm font-black uppercase transition ${
                              occupiedSlot
                                ? "bg-[#d92d20] text-white"
                                : "bg-[#17833d] text-white"
                            }`}
                          >
                            {slot}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {message ? (
            <div className="rounded-2xl border border-[#17833d]/10 bg-white p-5 text-sm font-semibold text-[#48604f] shadow">
              {message}
            </div>
          ) : null}
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
                <div key={label} className="flex items-center justify-between border-b border-black/5 pb-3">
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
            <section className="overflow-hidden rounded-[32px] border border-[#17833d]/10 bg-white shadow-[0_16px_40px_rgba(21,32,24,0.08)]">
              <div className="bg-[#07150d] p-6 text-white">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-[#38a45b]" />

                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/60">
                      Ticket de reservación
                    </div>

                    <div className="mt-1 text-3xl font-black">
                      {createdReservation.code}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-5 md:grid-cols-[1fr_150px]">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[#728076]">Cliente</span>
                      <span className="font-black">{createdReservation.customer}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#728076]">Bahía</span>
                      <span className="font-black">{createdReservation.bay}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#728076]">Total</span>
                      <span className="font-black">${createdReservation.totalAmount}</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-white p-3 text-center">
                    <img
                      src={qrUrl}
                      alt="QR de reservación"
                      className="mx-auto h-32 w-32"
                    />

                    <div className="mt-2 flex items-center justify-center gap-1 text-xs font-black uppercase text-[#17833d]">
                      <QrCode className="h-3 w-3" />
                      QR Reserva
                    </div>
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
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
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
  Sparkles,
  Flame,
} from "lucide-react";

type AvailableBay = {
  code: "B1" | "B2" | "B3" | "B4" | "B19";
  name: string;
  type: "standard" | "vip";
  capacity: number;
  price: number;
};

type ScheduleBay = {
  code: string;
  occupied: string[];
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

function getBayAccent(type: "standard" | "vip") {
  if (type === "vip") {
    return {
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      border: "border-amber-300",
      glow: "shadow-[0_25px_70px_rgba(217,119,6,0.28)]",
      label: "VIP",
      button: "bg-amber-500 hover:bg-amber-600",
    };
  }

  return {
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    border: "border-emerald-200",
    glow: "shadow-[0_25px_70px_rgba(22,163,74,0.18)]",
    label: "STANDARD",
    button: "bg-[#17833d] hover:bg-[#1f9a4b]",
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
  const [scheduleData, setScheduleData] = useState<ScheduleBay[]>([]);
  const [selectedBay, setSelectedBay] = useState<AvailableBay | null>(null);

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

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

  const qrText = createdReservation
  ? `https://bunker19-admin.vercel.app/admin/checkin?code=${createdReservation.code}`
  : "BUNKER 19";

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    qrText
  )}`;

  const whatsappMessage = encodeURIComponent(
    createdReservation
      ? `Hola, tengo una reservación en Bunker 19.%0ACódigo: ${createdReservation.code}`
      : "Hola, quiero información para reservar una bahía en Bunker 19."
  );

  async function loadSchedule() {
    try {
      const res = await fetch("/api/public/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
        }),
      });

      const result = await res.json();

      if (!res.ok) return;

      setScheduleData(result.schedule || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function checkAvailability() {
    setLoadingAvailability(true);
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

    setLoadingAvailability(false);

    if (!res.ok) {
      setMessage(result.error || "No se pudo consultar disponibilidad.");
      setAvailableBays([]);
      await loadSchedule();
      return;
    }

    setAvailableBays(result.bays || []);

    if (result.bays?.length) {
      setMessage(`Se encontraron ${result.bays.length} bahías disponibles.`);
    } else {
      setMessage("No hay disponibilidad para ese horario.");
    }

    await loadSchedule();
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

    await loadSchedule();
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
            "linear-gradient(90deg, rgba(0,0,0,.92), rgba(0,0,0,.60), rgba(0,0,0,.25)), url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1800&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,164,91,.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] backdrop-blur">
              <Sparkles className="h-4 w-4 text-[#38a45b]" />
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
          <section className="rounded-[32px] bg-white p-6 shadow-[0_16px_40px_rgba(21,32,24,0.08)] transition hover:shadow-[0_22px_55px_rgba(21,32,24,0.12)]">
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
                className="rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition duration-300 focus:scale-[1.01] focus:border-[#17833d]"
              />

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Teléfono"
                className="rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition duration-300 focus:scale-[1.01] focus:border-[#17833d]"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo"
                className="rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition duration-300 focus:scale-[1.01] focus:border-[#17833d]"
              />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-4">
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setAvailableBays([]);
                    setScheduleData([]);
                    setSelectedBay(null);
                    setCreatedReservation(null);
                  }}
                  className="w-full rounded-2xl border border-black/10 bg-[#f7f7f4] px-5 py-4 font-semibold outline-none transition duration-300 focus:border-[#17833d]"
                />

                <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#17833d]" />
              </div>

              <div className="md:col-span-3">
  <div className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#728076]">
    Selecciona horario
  </div>

  <div className="flex gap-2 overflow-x-auto rounded-2xl border border-black/10 bg-[#f7f7f4] p-2">
    {timeSlots.map((slot) => {
      const active = startTime === slot;

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
          className={`min-w-[86px] rounded-xl px-4 py-3 text-sm font-black transition duration-300 ${
            active
              ? "bg-[#17833d] text-white shadow-[0_12px_28px_rgba(31,154,75,0.28)]"
              : "bg-white text-[#48604f] hover:bg-[#eaf6e8] hover:text-[#17833d]"
          }`}
        >
          {slot}
        </button>
      );
    })}
  </div>
</div>

              <div>
  <div className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#728076]">
    Duración
  </div>

  <div className="flex gap-2 overflow-x-auto rounded-2xl border border-black/10 bg-[#f7f7f4] p-2">
    {["1", "2", "3", "4"].map((hours) => {
      const active = durationHours === hours;

      return (
        <button
          key={hours}
          type="button"
          onClick={() => {
            setDurationHours(hours);
            setAvailableBays([]);
            setSelectedBay(null);
            setCreatedReservation(null);
          }}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-black transition duration-300 ${
            active
              ? "bg-[#17833d] text-white shadow-[0_12px_28px_rgba(31,154,75,0.28)]"
              : "bg-white text-[#48604f] hover:bg-[#eaf6e8] hover:text-[#17833d]"
          }`}
        >
          {hours}h
        </button>
      );
    })}
  </div>
</div>
              <div>
  <div className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#728076]">
    Personas
  </div>

  <div className="flex gap-2 overflow-x-auto rounded-2xl border border-black/10 bg-[#f7f7f4] p-2">
    {["2", "4", "6", "8", "10"].map((qty) => {
      const active = guestCount === qty;

      return (
        <button
          key={qty}
          type="button"
          onClick={() => {
            setGuestCount(qty);
            setAvailableBays([]);
            setSelectedBay(null);
            setCreatedReservation(null);
          }}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-black transition duration-300 ${
            active
              ? "bg-[#17833d] text-white shadow-[0_12px_28px_rgba(31,154,75,0.28)]"
              : "bg-white text-[#48604f] hover:bg-[#eaf6e8] hover:text-[#17833d]"
          }`}
        >
          {qty}
        </button>
      );
    })}
  </div>
</div>
            </div>

            <button
              onClick={checkAvailability}
              className="mt-6 rounded-2xl bg-[#17833d] px-8 py-4 text-sm font-black uppercase text-white shadow-[0_18px_40px_rgba(31,154,75,0.25)] transition duration-300 hover:scale-[1.03] hover:bg-[#1f9a4b]"
            >
              {loadingAvailability
                ? "Buscando disponibilidad..."
                : "Ver disponibilidad →"}
            </button>
          </section>

          <section className="rounded-[32px] bg-[#07150d] p-6 text-white shadow-[0_20px_55px_rgba(21,32,24,0.14)]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/45">
                  Plano visual
                </div>

                <h2 className="mt-2 text-3xl font-black uppercase">
                  Selecciona tu bahía
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-black uppercase">
                <div className="rounded-full bg-[#17833d] px-3 py-2 text-white">
                  Disponible
                </div>

                <div className="rounded-full bg-white/15 px-3 py-2 text-white/70">
                  No disponible
                </div>

                <div className="rounded-full bg-amber-500 px-3 py-2 text-white">
                  VIP
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-4">
              <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
                <div className="grid gap-4 sm:grid-cols-2">
                  {bayMap.slice(0, 4).map((bay) => {
                    const isAvailable = availableCodes.has(bay.code);
                    const isSelected = selectedBay?.code === bay.code;

                    return (
                      <button
                        key={bay.code}
                        type="button"
                        onClick={() =>
                          selectBayFromMap(bay.code as AvailableBay["code"])
                        }
                        className={`min-h-[120px] rounded-[24px] border p-5 text-left transition-all duration-300 ${
                          isSelected
                            ? "scale-[1.03] border-[#38a45b] bg-[#17833d] shadow-[0_20px_45px_rgba(31,154,75,0.35)]"
                            : isAvailable
                            ? "border-white/10 bg-white/10 hover:-translate-y-1 hover:bg-[#17833d]"
                            : "border-white/5 bg-white/5 opacity-55"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-4xl font-black">{bay.code}</div>

                          <div
                            className={`rounded-full px-3 py-1 text-xs font-black uppercase ${
                              isAvailable
                                ? "bg-[#38a45b] text-white"
                                : "bg-white/10 text-white/55"
                            }`}
                          >
                            {isAvailable ? "Libre" : "No disponible"}
                          </div>
                        </div>

                        <div className="mt-4 text-sm font-bold uppercase tracking-wide text-white/65">
                          {bay.label}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => selectBayFromMap("B19")}
                  className={`min-h-[260px] rounded-[28px] border p-6 text-left transition-all duration-300 ${
                    selectedBay?.code === "B19"
                      ? "scale-[1.03] border-amber-300 bg-amber-500 shadow-[0_25px_60px_rgba(217,119,6,0.35)]"
                      : availableCodes.has("B19")
                      ? "border-amber-300/30 bg-amber-500/20 hover:-translate-y-1 hover:bg-amber-500"
                      : "border-white/5 bg-white/5 opacity-55"
                  }`}
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-black/25 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white/75">
                    <Flame className="h-4 w-4" />
                    VIP Lounge
                  </div>

                  <div className="mt-6 text-6xl font-black">B19</div>

                  <div className="mt-3 text-xl font-black uppercase">
                    Bunker 19 VIP
                  </div>

                  <div className="mt-8 rounded-2xl bg-black/20 p-4 text-sm font-bold text-white/80">
                    Experiencia premium para grupos, eventos y reservaciones
                    especiales.
                  </div>
                </button>
              </div>
            </div>
          </section>

          

          {message ? (
            <div className="rounded-2xl border border-[#17833d]/10 bg-white p-5 text-sm font-semibold text-[#48604f] shadow">
              {message}
            </div>
          ) : null}

          {loadingAvailability ? (
            <div className="grid gap-5">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="h-[230px] animate-pulse rounded-[32px] bg-white"
                />
              ))}
            </div>
          ) : null}

          <section className="space-y-5">
            {availableBays.map((bay, index) => {
              const isSelected = selectedBay?.code === bay.code;
              const accent = getBayAccent(bay.type);
              const image = bayImages[bay.code] || bayImages.B1;

              return (
                <button
                  key={bay.code}
                  type="button"
                  onClick={() => setSelectedBay(bay)}
                  className={`group relative w-full overflow-hidden rounded-[32px] border bg-white p-0 text-left transition-all duration-300 ${
                    isSelected
                      ? `${accent.border} ${accent.glow} scale-[1.01]`
                      : "border-black/5 shadow-[0_14px_35px_rgba(21,32,24,0.06)] hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(21,32,24,0.14)]"
                  }`}
                >
                  <div className="absolute right-5 top-5 z-20 flex gap-2">
                    {index === 0 && (
                      <div className="rounded-full bg-[#17833d] px-3 py-2 text-xs font-black uppercase text-white shadow-xl">
                        Most Popular
                      </div>
                    )}

                    {bay.type === "vip" && (
                      <div className="rounded-full bg-amber-500 px-3 py-2 text-xs font-black uppercase text-white shadow-xl">
                        VIP Experience
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-[260px_1fr_auto]">
                    <div
                      className="relative min-h-[230px] overflow-hidden bg-cover bg-center transition duration-500 group-hover:scale-[1.03]"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.45)), url('${image}')`,
                      }}
                    >
                      <div className="relative flex h-full items-end p-5">
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
                          <div className="rounded-full bg-[#17833d] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg">
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
                      <div className="rounded-[28px] bg-[#f7f7f4] p-5 text-left transition duration-300 group-hover:bg-[#eef7eb] md:text-right">
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
          <section className="rounded-[32px] bg-white p-6 shadow-[0_20px_55px_rgba(21,32,24,0.12)] transition hover:shadow-[0_28px_65px_rgba(21,32,24,0.16)]">
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
              className="mt-6 w-full rounded-2xl bg-[#17833d] px-7 py-5 text-sm font-black uppercase text-white shadow-[0_20px_45px_rgba(31,154,75,0.25)] transition duration-300 hover:scale-[1.02] hover:bg-[#1f9a4b] disabled:cursor-not-allowed disabled:opacity-40"
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

                      <span className="font-black">
                        {createdReservation.customer}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#728076]">Bahía</span>

                      <span className="font-black">
                        {createdReservation.bay}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#728076]">Total</span>

                      <span className="font-black">
                        ${createdReservation.totalAmount}
                      </span>
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
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-black uppercase text-white shadow-xl transition duration-300 hover:scale-[1.02] hover:bg-[#20ba5a]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Enviar por WhatsApp
                </a>
              </div>
            </section>
          ) : null}
        </aside>
      </div>
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
        <div className="flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-white p-4">
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
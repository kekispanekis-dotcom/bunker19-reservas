import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date } = body;

    if (!date) {
      return NextResponse.json(
        { error: "Fecha requerida" },
        { status: 400 }
      );
    }

    const selectedDate = new Date(date);
    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + 1);

    const reservations = await prisma.reservation.findMany({
      where: {
        reservationDate: {
          gte: selectedDate,
          lt: nextDate,
        },
      },
      include: {
        bay: true,
      },
    });

    const schedule = [
      { code: "B1", occupied: [] as string[] },
      { code: "B2", occupied: [] as string[] },
      { code: "B3", occupied: [] as string[] },
      { code: "B4", occupied: [] as string[] },
      { code: "B19", occupied: [] as string[] },
    ];

    for (const reservation of reservations) {
      const startIndex = timeSlots.indexOf(reservation.startTime);

      if (startIndex === -1) continue;

      for (let i = 0; i < reservation.durationHours; i++) {
        const slot = timeSlots[startIndex + i];

        if (!slot) continue;

        const baySchedule = schedule.find(
          (item) => item.code === reservation.bay.code
        );

        if (baySchedule) {
          baySchedule.occupied.push(slot);
        }
      }
    }

    return NextResponse.json({
      date,
      schedule,
    });
  } catch (error) {
    console.error("Schedule error:", error);

    return NextResponse.json(
      { error: "Error obteniendo horarios" },
      { status: 500 }
    );
  }
}
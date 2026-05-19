import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

function generateCode() {
  return "RES-" + Math.floor(100000 + Math.random() * 900000);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const date = new Date(body.date + "T00:00:00");

    let customer = null;

    if (body.email) {
      customer = await prisma.customer.findFirst({
        where: {
          email: body.email,
        },
      });
    }

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          fullName: body.fullName,
          phone: body.phone || null,
          email: body.email || null,
        },
      });
    }

    const reservation = await prisma.reservation.create({
      data: {
        reservationCode: generateCode(),
        customerId: customer.id,
        bayId: body.bayId,
        reservationDate: date,
        startTime: body.startTime,
        durationHours: body.durationHours,
        guestCount: body.guestCount,
        reservationType: "reserve_only",
        reservationStatus: "confirmed",
        paymentStatus: "unpaid",
        totalAmount: body.totalAmount,
      },
      include: {
        bay: true,
        customer: true,
      },
    });

    return NextResponse.json({
      ok: true,
      reservation: {
        id: reservation.id,
        code: reservation.reservationCode,
        totalAmount: reservation.totalAmount,
        bay: reservation.bay.code,
        bayName: reservation.bay.name,
        customer: reservation.customer.fullName,
        phone: reservation.customer.phone,
        email: reservation.customer.email,
        date: body.date,
        startTime: reservation.startTime,
        durationHours: reservation.durationHours,
        guestCount: reservation.guestCount,
        status: reservation.reservationStatus,
        paymentStatus: reservation.paymentStatus,
      },
    });
  } catch (error) {
    console.error("CREATE RESERVATION ERROR:", error);

    return NextResponse.json(
      { error: "No se pudo crear la reservación." },
      { status: 400 }
    );
  }
}
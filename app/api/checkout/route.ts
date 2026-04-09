import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia' as any, // Usamos la última versión tipada o compatible
});

export async function POST(req: Request) {
  try {
    const { pista, precio, fecha, hora } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Reserva - Pista ${pista}`,
              description: `Fecha: ${fecha} | Hora: ${hora} - ${parseInt(hora) + 1}:00`,
            },
            unit_amount: Math.round(Number(precio) * 100), // Stripe maneja las cifras en céntimos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Redirige usando el domino base
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/reserva/pago-completado?session_id={CHECKOUT_SESSION_ID}&pista=${encodeURIComponent(pista)}&fecha=${encodeURIComponent(fecha)}&hora=${encodeURIComponent(hora)}&precio=${precio}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/reserva/exito?pista=${encodeURIComponent(pista)}&fecha=${encodeURIComponent(fecha)}&hora=${encodeURIComponent(hora)}&precio=${precio}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Error al crear sesión en Stripe:", error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

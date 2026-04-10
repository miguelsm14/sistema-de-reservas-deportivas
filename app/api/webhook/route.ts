import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia' as any,
});

// Inicializamos Resend solo si existe la clave, o la creamos vacía para evitar fallos de compilación
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string
  );
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error(`Error en firma de webhook: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Manejar el evento de pago completado
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const { userId, userEmail, pistaId, pistaNombre, fecha, hora, precio } = session.metadata || {};

    if (!userId || !pistaId) {
      console.error("Faltan metadatos esenciales en la sesión de Stripe.");
      return NextResponse.json({ error: "Metadata faltante" }, { status: 400 });
    }

    try {
      // 1. Insertamos la reserva en la base de datos de manera segura
      const { error: dbError } = await supabase
        .from('Reservas')
        .insert({
          id_usuario: userId,
          id_pista: pistaId,
          fecha: fecha,
          hora: hora,
        });

      if (dbError) {
        console.error("Error al insertar reserva en base de datos:", dbError);
        //  capturamos el fallo
      } else {
        console.log(`Reserva en bd completada: Pista ${pistaId} para el ${fecha} a las ${hora}`);
      }

      // 2. Enviamos el email
      if (userEmail) {
        const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        
        const { error: emailError } = await resend.emails.send({
          from: "SGR Pagos <onboarding@resend.dev>", 
          to: userEmail,
          subject: `Comprobante de Pago Confirmado - Reserva Pista ${pistaNombre}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                <div style="text-align: center; border-bottom: 2px solid #10b981; padding-bottom: 20px;">
                    <h1 style="color: #10b981; margin-bottom: 5px;">Pago y Reserva Confirmados</h1>
                    <p style="color: #666; margin-top: 0;">Gracias por confiar en nuestro servicio</p>
                </div>
                
                <div style="padding: 30px 20px;">
                    <p>Hola,</p>
                    <p>Hemos procesado tu pago correctamente. <b>Tu pista ya se encuentra reservada.</b></p>
                    
                    <div style="background-color: #f8fafc; border-left: 4px solid #10b981; padding: 20px; border-radius: 4px; margin: 25px 0;">
                        <h3 style="margin-top: 0; color: #1e293b;">Detalles de la Reserva</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Instalación:</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold;">${pistaNombre}</td></tr>
                            <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Fecha:</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold;">${fechaFormateada}</td></tr>
                            <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Horario:</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold;">${hora} - ${parseInt(hora) + 1}:00</td></tr>
                            <tr><td style="padding: 12px 0 0 0; color: #64748b;">Abonado vía Stripe:</td><td style="padding: 12px 0 0 0; text-align: right; font-size: 1.25rem; font-weight: bold; color: #10b981;">${precio}€</td></tr>
                        </table>
                    </div>
                </div>
            </div>
          `,
        });

        if (emailError) {
          console.error("Error al enviar email en Resend:", emailError);
        } else {
          console.log(`Email enviado con éxito a ${userEmail}`);
        }
      }

    } catch (e) {
      console.error("Error procesando los actions del webhook:", e);
      return NextResponse.json({ error: 'Error procesando acciones del webhook' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

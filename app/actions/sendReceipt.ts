"use server"

import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReceipt(pista: string, precio: string, fecha: string, hora: string) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user || !user.email) {
            console.error("No se encontró el email del usuario logueado en sendReceipt");
            return { error: "No se encontró el email del usuario" };
        }
        
        // Convertimos un poquito la fecha para que se vea normal
        const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

        const { error: emailError } = await resend.emails.send({
            from: "SGR Pagos <onboarding@resend.dev>", // Cambiar a dominio verificado en produccion
            to: user.email,
            subject: `Comprobante de Pago - Reserva Pista ${pista}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <div style="text-align: center; border-bottom: 2px solid #10b981; padding-bottom: 20px;">
                        <h1 style="color: #10b981; margin-bottom: 5px;">Pago Confirmado</h1>
                        <p style="color: #666; margin-top: 0;">Gracias por confiar en nuestro servicio</p>
                    </div>
                    
                    <div style="padding: 30px 20px;">
                        <p>Hola,</p>
                        <p>Hemos procesado correctamente tu pago y tu reserva está completamente garantizada a través de Stripe.</p>
                        
                        <div style="background-color: #f8fafc; border-left: 4px solid #10b981; padding: 20px; border-radius: 4px; margin: 25px 0;">
                            <h3 style="margin-top: 0; color: #1e293b;">Detalles del Recibo</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Instalación:</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold;">${pista}</td></tr>
                                <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Fecha:</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold;">${fechaFormateada}</td></tr>
                                <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Horario:</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold;">${hora} - ${parseInt(hora) + 1}:00</td></tr>
                                <tr><td style="padding: 12px 0 0 0; color: #64748b;">Total abonado:</td><td style="padding: 12px 0 0 0; text-align: right; font-size: 1.25rem; font-weight: bold; color: #10b981;">${precio}€</td></tr>
                            </table>
                        </div>
                        
                        <p style="color: #666; font-size: 0.9em; text-align: center; margin-top: 40px;">
                            Este es un recibo automático generado por tu plataforma deportiva. 
                        </p>
                    </div>
                </div>
            `,
        });

        if (emailError) {
            console.error("Error de Resend al enviar recibo:", emailError);
            return { error: emailError.message };
        }

        return { success: true };
    } catch (e: any) {
        console.error("Fallo general al enviar recibo:", e);
        return { error: e.message };
    }
}

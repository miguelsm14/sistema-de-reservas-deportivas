"use server";

import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: {
  name: string;
  email: string;
  category: string;
  message: string;
}) {
  const { name, email, category, message } = formData;

  if (!name.trim() || !email.trim() || !message.trim() || !category.trim()) {
    return { error: "Faltan campos obligatorios" };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("Mensajes").insert({
    nombre: name,
    email,
    categoria: category,
    mensaje: message,
  });

  if (error) {
    console.error("Error insertando mensaje en Supabase:", error);
    return { error: "Hubo un problema al guardar el mensaje. Inténtalo de nuevo." };
  }

  try {
    const { error: emailError } = await resend.emails.send({
      from: "SGR Contacto <onboarding@resend.dev>", // Cambia este dominio si verificaste uno en Resend
      to: "miguelsanchezmaraver@gmail.com",
      subject: `Nuevo Mensaje SGR - ${category}`,
      html: `
        <h2>Nuevo mensaje de contacto recibido</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Categoría:</strong> ${category}</p>
        <h3>Mensaje:</h3>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (emailError) {
      console.error("Error enviando el email:", emailError);
      // No devolvemos error al cliente porque en Supabase sí se guardó, pero idealmente avisamos.
    }
  } catch (emailException) {
    console.error("Excepción al enviar email:", emailException);
  }

  return { success: true };
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(req: Request) {
  try {
    const { name, email, phone, score, tierTitle, tierSubtitle, tierDescription, tierEmoji, answers } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Nombre y correo son requeridos" }, { status: 400 });
    }
    
    // 1. Guardar en Firebase Firestore de forma asíncrona pero sin detener el proceso en caso de error
    try {
      await addDoc(collection(db, "test_responses"), {
        name,
        email,
        phone: phone || null,
        score,
        tierTitle,
        tierSubtitle,
        answers: answers || [],
        createdAt: serverTimestamp()
      });
      console.log("Firebase: Registro guardado exitosamente");
    } catch (firebaseErr) {
      console.error("Firebase Error: No se pudo guardar el documento:", firebaseErr);
    }
    
    // 1.5 Enviar a Systeme.io
    try {
      if (process.env.SYSTEME_API_KEY) {
        const fields = [{ slug: "first_name", value: name }];
        if (phone) fields.push({ slug: "phone_number", value: phone });

        await fetch("https://api.systeme.io/api/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": process.env.SYSTEME_API_KEY,
          },
          body: JSON.stringify({
            email,
            locale: "es",
            fields
          })
        });
        console.log("Systeme.io: Lead enviado exitosamente");
      }
    } catch (systemeErr) {
      console.error("Systeme.io Error:", systemeErr);
    }

    // 2. Configuración dinámica por variables de entorno para envío de correos
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.titan.email",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.TITAN_USER, 
        pass: process.env.TITAN_PASS, 
      },
    });

    await transporter.verify();

    // 3. Enviar el correo al USUARIO que hizo el test
    const mailOptionsToUser = {
      from: `"Gladys Garcia Coach" <${process.env.TITAN_USER}>`,
      to: email,
      subject: `¡Aquí tienes tu diagnóstico, ${name}! ${tierEmoji}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #5D6D8F; text-align: center;">Tu resultado del test</h1>
          
          <div style="background-color: #F9F9F9; padding: 20px; border-radius: 12px; margin-top: 20px;">
            <p style="font-size: 16px;">Hola <strong>${name}</strong>,</p>
            <p style="font-size: 16px;">Gracias por tomarte el tiempo de completar el test sobre tu etapa como coach.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <span style="font-size: 50px;">${tierEmoji}</span>
              <h2 style="color: #5D6D8F; margin-bottom: 5px;">${tierTitle}</h2>
              <p style="color: #EEAE91; font-weight: bold; font-style: italic; margin-top: 0;">${tierSubtitle}</p>
            </div>
            
            <div style="background-color: #EEF2DC; padding: 15px; border-radius: 8px;">
              <p style="line-height: 1.6;">${tierDescription.replace(/\n/g, '<br>')}</p>
            </div>
            
            <p style="text-align: center; margin-top: 30px; font-weight: bold;">Puntaje obtenido: ${score} / 48</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #777; font-size: 12px;">© ${new Date().getFullYear()} Gladys Garcia Coach. Todos los derechos reservados.</p>
          </div>
        </div>
      `,
    };

    // 4. Enviar el correo ADMINISTRATIVO a Gladys con las respuestas detalladas
    const answersHtmlString = answers && Array.isArray(answers) 
      ? answers.map((ans: any, i: number) => `
          <div style="margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
            <p style="margin: 0 0 5px; font-weight: bold; font-size: 14px; color: #5D6D8F;">${i + 1}. ${ans.question}</p>
            <p style="margin: 0 0 5px; font-size: 14px; color: #333;">R: ${ans.answer}</p>
            <p style="margin: 0; font-size: 12px; color: #EEAE91;">Puntos asignados: ${ans.points}</p>
          </div>
        `).join('')
      : "<p>No se enviaron respuestas detalladas.</p>";

    const phoneStr = phone ? phone : "No proporcionado";

    const mailOptionsToAdmin = {
      from: `"Test Gladys Coach" <${process.env.TITAN_USER}>`,
      to: process.env.TITAN_USER, // Se auto-envía a Gladys
      replyTo: email, // Para que Gladys pueda darle a 'Responder' y le llegue al usuario
      subject: `🔥 Nuevo Lead: ${name} (Puntaje: ${score} - ${tierTitle})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #333; background-color: #f4f6f8; padding: 20px;">
          <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h1 style="color: #5D6D8F; font-size: 22px; margin-top: 0; border-bottom: 2px solid #E9CCDB; padding-bottom: 10px;">Nuevo prospecto desde el Test</h1>
            
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 16px; color: #EEAE91; margin-bottom: 10px;">Datos de contacto:</h2>
              <ul style="list-style: none; padding: 0; margin: 0; font-size: 15px;">
                <li style="margin-bottom: 8px;">👤 <strong>Nombre:</strong> ${name}</li>
                <li style="margin-bottom: 8px;">✉️ <strong>Correo:</strong> <a href="mailto:${email}" style="color: #5D6D8F;">${email}</a></li>
                <li style="margin-bottom: 8px;">📱 <strong>Teléfono/WhatsApp:</strong> ${phoneStr}</li>
              </ul>
            </div>

            <div style="margin-bottom: 30px; background-color: #EEF2DC; padding: 15px; border-radius: 8px; border-left: 5px solid #5D6D8F;">
              <h2 style="font-size: 16px; color: #5D6D8F; margin-top: 0; margin-bottom: 5px;">Diagnóstico Obtenido:</h2>
              <p style="margin: 0; font-size: 15px; font-weight: bold;">${tierEmoji} ${tierTitle} (${score} puntos)</p>
            </div>

            <div>
              <h2 style="font-size: 18px; color: #5D6D8F; border-bottom: 1px solid #E9CCDB; padding-bottom: 8px;">Respuestas detalladas:</h2>
              <div style="margin-top: 15px;">
                ${answersHtmlString}
              </div>
            </div>
          </div>
        </div>
      `,
    };

    // Ejecutar ambos envíos en paralelo
    await Promise.all([
      transporter.sendMail(mailOptionsToUser),
      transporter.sendMail(mailOptionsToAdmin)
    ]);

    return NextResponse.json({ success: true, message: "Correos enviados exitosamente" });
  } catch (error) {
    console.error("Error enviando el correo:", error);
    return NextResponse.json(
      { error: "No se pudo enviar el correo", details: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
}

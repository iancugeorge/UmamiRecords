import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Log that API was called
  console.log('=== Contact API Called ===');
  console.log('Resend API Key present:', !!process.env.RESEND_API_KEY);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, phone, email, contactMethod, services, message } = req.body;

  console.log('Form data received:', { name, contactMethod, services: services?.length });

  if (!name || !contactMethod || !message || !services || services.length === 0) {
    return res.status(400).json({ message: "Toate câmpurile obligatorii trebuie completate." });
  }
  if (contactMethod === "Email" && !email) {
    return res.status(400).json({ message: "Adresa de email este necesară." });
  }

  try {
    const serviceText = services.join(", ");
    const phoneText = phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : "";
    const emailText = email ? `<p><strong>Email:</strong> ${email}</p>` : "";

    console.log('Attempting to send email via Resend...');

    const data = await resend.emails.send({
      from: 'Umami Records <contact@umamirecords.ro>',
      to: 'contact@umamirecords.ro',
      replyTo: email || undefined,
      subject: `CERERE SERVICII DE LA ${name}`,
      html: `<h3>CERERE SERVICII</h3>
             <p><strong>Nume:</strong> ${name}</p>
             <p><strong>Metodă preferată de contact:</strong> ${contactMethod}</p>
             ${phoneText}
             ${emailText}
             <p><strong>Servicii dorite:</strong> ${serviceText}</p>
             <p><strong>Mesaj:</strong> ${message}</p>`,
    });

    console.log('✅ Resend response:', data);

    return res.status(200).json({ 
      message: "Mesaj trimis cu succes! 🚀",
      emailId: data.id // This will help you track in Resend
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    console.error("Error details:", {
      message: error.message,
      name: error.name,
      statusCode: error.statusCode
    });
    
    return res.status(500).json({ 
      message: "Eroare la trimiterea emailului.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
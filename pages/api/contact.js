import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Destructure email along with other fields
  const { name, phone, email, contactMethod, services, message } = req.body;

  // Basic validation. You might want to add: if contactMethod === "Email" and no email provided, return an error.
  if (!name || !contactMethod || !message || services.length === 0) {
    return res.status(400).json({ message: "Toate câmpurile obligatorii trebuie completate." });
  }
  if (contactMethod === "Email" && !email) {
    return res.status(400).json({ message: "Adresa de email este necesară." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const serviceText = services.join(", ");
    const phoneText = phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : "<p><strong>Telefon:</strong> Nu a fost furnizat.</p>";
    const emailText = email ? `<p><strong>Email:</strong> ${email}</p>` : "";

    const mailOptions = {
      from: `CERERE SERVICII - ${name} <${process.env.EMAIL_USER}>`,
      to: "contact@umamirecords.ro",
      subject: `CERERE SERVICII DE LA ${name}`,
      html: `<h3>CERERE SERVICII</h3>
             <p><strong>Nume:</strong> ${name}</p>
             <p><strong>Metodă preferată de contact:</strong> ${contactMethod}</p>
             ${phoneText}
             ${emailText}
             <p><strong>Servicii dorite:</strong> ${serviceText}</p>
             <p><strong>Mesaj:</strong> ${message}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Mesaj trimis cu succes! 🚀" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Eroare la trimiterea emailului." });
  }
}

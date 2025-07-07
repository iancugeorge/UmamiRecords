import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Loader2, CheckCircle } from "lucide-react";
import Head from "next/head";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    contactMethod: "",
    services: [],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const servicesList = [
    "Înregistrare",
    "Mix & Master",
    "Beaturi (Exclusive & Custom)",
    "Producție Video",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceSelection = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Cum te cheamă?";
    if (!formData.message.trim()) tempErrors.message = "Spune-ne mai multe despre proiectul tău!";
    if (!formData.contactMethod) tempErrors.contactMethod = "Cum vrei să te contactăm?";
    if (formData.services.length === 0) tempErrors.services = "Alege cel puțin un serviciu.";

    if (["WhatsApp", "Apel Telefonic", "SMS"].includes(formData.contactMethod) && !formData.phone.trim()) {
      tempErrors.phone = "Introdu numărul tău de telefon.";
    } else if (formData.contactMethod === "Email" && !formData.email.trim()) {
      tempErrors.email = "Adresa de email este necesară.";
    }

    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validate();
    if (Object.keys(tempErrors).length === 0) {
      setLoading(true);
      setServerMessage("");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        setLoading(false);

        if (response.ok) {
          setSubmitted(true);
          setServerMessage("Mesajul tău a fost trimis cu succes! 🚀 Te contactăm în curând.");
          setFormData({ name: "", phone: "", email: "", contactMethod: "", services: [], message: "" });
        } else {
          setServerMessage(result.message || "Ceva n-a mers bine. Încearcă din nou.");
        }
      } catch (error) {
        setLoading(false);
        setServerMessage("Eroare de conexiune. Verifică internetul și încearcă din nou.");
      }
    } else {
      setErrors(tempErrors);
    }
  };

  return (
    <>
    <Head>
    <title>Contactează Umami Records | Studio de Înregistrări în Ploiești</title>
      <meta name="description" content="Ai nevoie de înregistrări vocale, mix & master sau producție video? Scrie-ne pe WhatsApp sau completează formularul pentru detalii. Hai să facem magie în studio!" />
      <meta name="keywords" content="contact studio muzical Ploiești, rezervare sesiune înregistrări, studio hip-hop trap Ploiești" />
      <meta property="og:title" content="Contactează Umami Records | Studio de Înregistrări în Ploiești" />
      <meta property="og:description" content="Hai să facem magia să prindă viață! Scrie-ne pe WhatsApp pentru a începe." />
      <meta property="og:image" content="/images/contact.jpg" />
    </Head>
      <div className="min-h-screen bg-black p-8 text-white flex flex-col items-center">
      {/* 🔥 HERO SECTION */}
      <motion.div 
        className="text-center max-w-4xl mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl font-extrabold mb-4 glitch-text text-yellow-400 uppercase">
          Contactează-ne
        </h2>
        <h1 className="text-sm text-gray-400 mt-2 h1-style">
        Nu-ți lăsa ideea să moară pe telefon – Hai să o înregistrăm!
        </h1>
        <p className="text-lg text-gray-300 mt-10">
        Când ești gata să te auzi în boxele tuturor... apasă 'Trimite'
        </p>
      </motion.div>

      {/* 🔥 PRIMARY WHATSAPP CTA */}
      <motion.a 
        href="https://wa.me/+40720382803" 
        className="flex items-center gap-3 px-6 py-4 bg-yellow-400 text-black font-bold rounded-full text-lg shadow-md hover:bg-yellow-500 transition-all mb-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={24} /> Scrie-ne pe WhatsApp
      </motion.a>

      {/* 🔥 CONTACT FORM */}
      {submitted ? (
        <motion.p className="text-center text-xl text-yellow-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {serverMessage}
        </motion.p>
      ) : (
        <motion.form
  onSubmit={handleSubmit}
  className="max-w-lg mx-auto flex flex-col gap-4"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  {/* 🔥 Name Input */}
  <div>
    <label htmlFor="name">Numele tău:</label>
    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="contact-input" />
    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
  </div>

  {/* 🔥 Contact Method Dropdown */}
  <div>
    <label htmlFor="contactMethod">Cum vrei să te contactăm?</label>
    <select id="contactMethod" name="contactMethod" value={formData.contactMethod} onChange={handleChange} className="contact-input">
      <option value="">Selectează...</option>
      <option value="WhatsApp">WhatsApp</option>
      <option value="Apel Telefonic">Apel Telefonic</option>
      <option value="SMS">SMS</option>
      <option value="Email">Email</option>
    </select>
    {errors.contactMethod && <p className="text-red-500 text-sm">{errors.contactMethod}</p>}
  </div>

  {/* 🔥 Conditionally Render Contact Fields */}
  {formData.contactMethod && (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }}>
      {["WhatsApp", "Apel Telefonic", "SMS"].includes(formData.contactMethod) && (
        <div>
          <label htmlFor="phone">Număr de telefon:</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="contact-input" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
      )}

      {formData.contactMethod === "Email" && (
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="contact-input" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
      )}
    </motion.div>
  )}

  {/* 🔥 Services Selection */}
  <div>
    <label>Ce servicii te interesează?</label>
    <div className="flex flex-col gap-2">
      {servicesList.map((service) => (
        <button type="button" key={service} onClick={() => handleServiceSelection(service)} className={`service-option ${formData.services.includes(service) ? "selected" : ""}`}>
          {service}
        </button>
      ))}
    </div>
    {errors.services && <p className="text-red-500 text-sm">{errors.services}</p>}
  </div>

  {/* 🔥 Message Input */}
  <div>
    <label htmlFor="message">Mesaj:</label>
    <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="contact-input contact-textarea" placeholder="ex: Vreau să înregistrez un single. Sunt liber weekendul viitor." />
    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
  </div>

  {/* 🔥 Submit Button */}
  <button type="submit" className="mt-4 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition">
    {loading ? <Loader2 className="animate-spin" /> : "Trimite cererea"}
  </button>
</motion.form>

      )}
      
    </div>
    </>
  );
}

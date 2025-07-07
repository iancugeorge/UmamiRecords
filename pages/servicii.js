import { motion } from 'framer-motion';
import { Mic, SlidersHorizontal, Music, Video } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

const services = [
  { 
    title: "Înregistrare", 
    subtitle: "Vocea ta, capturată perfect.",
    description: "Folosim echipament de studio de calitate pentru a surprinde fiecare nuanță a vocii tale. Îți oferim ghidare pe tot parcursul sesiunii, astfel încât să obții cea mai bună interpretare posibilă. Înregistrarea include și ajustări minime pentru a suna bine încă din start.",
    price: "75 RON / oră",
    icon: Mic, 
    cta: "Rezervă sesiunea", 
    link: "/contact"  // ✅ Contact remains as is
  },
  { 
    title: "Mix & Master", 
    subtitle: "Fiecare detaliu sonor, echilibrat perfect.",
    description: "Mixăm și masterizăm piesele astfel încât să sune puternic, clar și profesionist pe orice sistem audio. În plus, înregistrarea este inclusă și poți lua oricâte duble vrei până ești mulțumit de rezultat.",
    price: "200 RON / proiect (include înregistrare nelimitată)",
    icon: SlidersHorizontal, 
    cta: "Ascultă mixurile", 
    link: "/muzica?tab=Mix%20%26%20Master"  // ✅ Directs to "Mix & Master"
  },
  { 
    title: "Beaturi Exclusive", 
    subtitle: "Alege vibe-ul tău sau creează unul unic.",
    description: "Îți oferim beaturi gata făcute sau compuse de la zero, adaptate stilului tău. Indiferent dacă ai nevoie de un instrumental trap, drill, r&b sau ceva experimental, găsim sau creăm sound-ul perfect pentru tine.",
    price: "50 RON / beat (existent)\n150+ RON / custom",
    icon: Music, 
    cta: "Ascultă beaturile", 
    link: "/muzica?tab=Beaturi"  // ✅ Directs to "Beaturi"
  },
  { 
    title: "Producție Video", 
    subtitle: "Transformă muzica ta într-o poveste vizuală.",
    description: "Clipurile tale trebuie să arate la fel de bine pe cât sună piesele. Facem visualizere, promo clips sau chiar videoclipuri mai complexe.",
    price: "50-150 RON / visualizer\nVideoclip: preț discutat per proiect",
    icon: Video, 
    cta: "Vezi exemple", 
    link: "/muzica?tab=Muzica"  // ✅ Directs to "Videoclipuri"
  }
];

export default function Services() {
  return (
    <>
    <Head>
      <title>Servicii Umami Records | Înregistrări, Mix & Master, Beaturi și Producție Video</title>
      <meta name="description" content="Descoperă serviciile Umami Records: înregistrări vocale de calitate, mix & master profesional, beaturi personalizate și videoclipuri creative. Contactează-ne pentru detalii!" />
      <meta name="keywords" content="înregistrări vocale Ploiești, mix & master profesional, beat-uri personalizate, videoclipuri muzicale Ploiești, studio de creație muzicală" />
      <meta property="og:title" content="Servicii Umami Records | Înregistrări, Mix & Master, Beaturi și Producție Video" />
      <meta property="og:description" content="Înregistrări de calitate, mix & master profesionist și videoclipuri creative. Umami Records - locul unde sound-ul tău prinde viață!" />
      <meta property="og:image" content="/images/umami-studio.jpg" />
    </Head>
    <section className="relative min-h-screen py-16 px-6 text-white overflow-hidden">
      {/* Glitchy Animated Title */}
      <motion.div 
        className="text-center max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-5xl font-extrabold mb-4 glitch-text text-yellow-400 uppercase">
          Gustă savoarea muzicii
        </h2>
        <h1 className='text-sm text-gray-400 bg-black rounded-full mt-2 h1-style'>
        De la idee la hit – Înregistrări, Mixaj și Masterizare în Ploiești
        </h1>
        <p className="text-lg bg-yellow-400 text-black px-4 py-1 rounded-full font-bold mt-5">
          Crezi că ai sound-ul potrivit? Noi ne asigurăm că e auzit așa cum trebuie.
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 relative z-10"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2 }}
      >
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            className="relative bg-black border border-yellow-400 rounded-lg p-5 shadow-lg transform hover:scale-105 hover:border-magenta transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center mb-3">
              <service.icon size={42} className="text-yellow-400 mr-3" />
              <div>
                <h2 className="text-xl font-bold text-white">{service.title}</h2>
                <p className="text-gray-400 text-sm">{service.subtitle}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">{service.description}</p>
            <p className="text-yellow-400 font-bold">{service.price}</p>
            <div className="mt-6">
              <Link href={service.link} passHref>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="cta-primary"
                >
                  {service.cta}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

     {/* Bottom Section - How It Works */}
<div className="w-full bg-black py-12 mt-10 border-t border-yellow-400">
  <div className="max-w-4xl mx-auto px-6 text-center">
    
    {/* Step-by-Step Explanation */}
    <p className="text-lg text-gray-300 font-medium leading-relaxed">
      <strong className="text-yellow-400">Cum funcționează?</strong> Alegi serviciul, ne dai un mesaj și stabilim rapid detaliile pe WhatsApp.
    </p>

    {/* Pricing Disclaimer */}
    <div className="mt-6 py-4 px-6 rounded-lg border border-yellow-700">
      <p className="text-gray-400 text-sm font-semibold">
        <span className="text-yellow-400">Prețurile sunt orientative.</span> Pot varia în funcție de complexitate și cerințe speciale.
      </p>
      <p className="text-white mt-2">
        Dacă ai nevoie de ceva custom, scrie-ne și găsim soluția potrivită!
      </p>
    </div>
  </div>
</div>
    </section>
    </>
  );
}
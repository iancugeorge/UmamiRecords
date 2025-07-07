import Image from "next/image";
import { motion } from "framer-motion";
import { Music, AudioLines, Sparkles, Settings, MapPin, TrendingUp } from "lucide-react";
import Link from "next/link";
import Head from "next/head";

export default function About() {
  return (
    <>
    <Head>
      <title>Despre Umami Records | Studio de Înregistrări în Ploiești pentru Sound-uri Autentice</title>
      <meta name="description" content="Umami Records este un studio de înregistrări unde artiștii se simt liberi să creeze. Oferim un spațiu relaxat pentru sound-uri originale, fără compromisuri. Află povestea noastră!" />
      <meta name="keywords" content="studio de înregistrări Ploiești, studio hip-hop Ploiești, muzică independentă, sound autentic, creație muzicală" />
      <meta property="og:title" content="Despre Umami Records | Studio de Înregistrări în Ploiești pentru Sound-uri Autentice" />
      <meta property="og:description" content="Umami Records - un studio pentru sound-uri originale și vibe-uri reale. Află povestea noastră!" />
      <meta property="og:image" content="/images/studio.jpg" />
    </Head>
    <section className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-20 text-white">
      
      {/* Hero Section */}
      <motion.div
        className="max-w-4xl text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl sm:text-6xl font-extrabold mb-6 uppercase glitch-text text-yellow-400">
          Cine suntem noi?
        </h2>

        <h1 className="text-sm text-gray-400 mt-2 h1-style">
  Umami Records – Studio de înregistrări pentru artiști autentici în Ploiești
</h1>

        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mt-5">
          Muzica nu e doar sunet. E emoție, textură, gust. Sunetul tău are un vibe unic. Noi îl facem memorabil.
        </p>
      </motion.div>

      {/* Studio Image Section */}
      <motion.div
        className="relative w-full max-w-2xl my-12 border-2 border-yellow-400 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative w-full max-w-4xl aspect-video mx-auto rounded-md overflow-hidden border-2 border-yellow-400">
  <Image
    src="/studio.png"
    alt="Umami Records Studio"
    fill
    className="object-cover"
    loading="lazy"
  />
</div>

        {/* <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-4 py-1 rounded-md text-sm">
          Asta e zona unde magia prinde viață.
        </div> */}
      </motion.div>

      {/* De unde a pornit Umami? */}
      <motion.div
        className="max-w-3xl text-center md:text-left flex flex-col md:flex-row items-center gap-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Text Section */}
        <div className="md:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 uppercase glitch-text text-yellow-400">
            De unde a pornit Umami?
          </h2>
          <p className="text-lg text-gray-300">
            Umami Records a început simplu – o cameră mică, un microfon, și o dorință de a crea sunet autentic. 
          </p>
          <p className="text-lg text-gray-300 mt-4">
            Nu ne-am dorit un studio care să copieze trenduri. Am vrut un spațiu unde artiștii să se simtă liberi să-și exprime stilul, fără presiune, fără compromisuri.
          </p>
        </div>

        {/* Animated Glitch Visual */}
        <motion.div
  className="glitch-text mt-12"
  data-text="Sunet ce are gust."
>
  Sunet ce are gust.
</motion.div>
     </motion.div>

      {/* Why Umami? */}
      <motion.div
        className="max-w-3xl text-center mt-12"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 uppercase glitch-text text-yellow-400">
          De ce Umami Records?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Music size={32} className="text-yellow-400" />
            <p>Creativitatea e pe primul loc.</p>
          </div>
          <div className="flex items-center gap-3">
            <AudioLines size={32} className="text-yellow-400" />
            <p>Sunet exact cum l-ai auzit în cap.</p>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles size={32} className="text-yellow-400" />
            <p>Vibe autentic, fără clișee comerciale.</p>
          </div>
          <div className="flex items-center gap-3">
            <Settings size={32} className="text-yellow-400" />
            <p>Proces de lucru flexibil, axat pe artist.</p>
          </div>
        </div>
      </motion.div>


{/* Ce urmează? (Future Plans Section) */}
<motion.div
  className="max-w-3xl text-center mt-12 px-4"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.8 }}
>
  <h2 className="text-3xl sm:text-4xl font-bold mb-6 uppercase glitch-text text-yellow-400">
    Ce urmează?
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6">
    
    {/* Box 1 */}
    <div className="p-6 border-2 border-yellow-400 rounded-lg text-center shadow-md hover:scale-105 transition-transform duration-300">
      <div className="flex justify-center mb-3">
        <TrendingUp size={42} className="text-yellow-400" />
      </div>
      <p className="text-lg font-medium leading-relaxed">
        Mai multă muzică, mai mult sunet real.
      </p>
    </div>

    {/* Box 2 */}
    <div className="p-6 border-2 border-yellow-400 rounded-lg text-center shadow-md hover:scale-105 transition-transform duration-300">
      <div className="flex justify-center mb-3">
        <MapPin size={42} className="text-yellow-400" />
      </div>
      <p className="text-lg font-medium leading-relaxed">
        Extinderea comunității de artiști locali din Ploiești.
      </p>
    </div>

    {/* Box 3 */}
    <div className="p-6 border-2 border-yellow-400 rounded-lg text-center shadow-md hover:scale-105 transition-transform duration-300">
      <div className="flex justify-center mb-3">
        <Music size={42} className="text-yellow-400" />
      </div>
      <p className="text-lg font-medium leading-relaxed">
        Colaborări fresh și sound nou.
      </p>
    </div>

  </div>
</motion.div>



      {/* CTA Section */}
      <motion.div className="text-center mt-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}>
        <h3 className="text-2xl font-bold mb-4 uppercase">Vino să ne cunoști</h3>
        <Link href="/contact">
          <motion.button className="px-8 py-4 text-lg sm:text-xl font-extrabold uppercase rounded-full bg-[#ff0077] text-black shadow-lg transition-transform duration-300 hover:bg-yellow-400 hover:scale-105">
            Hai în studio
          </motion.button>
        </Link>
      </motion.div>
    </section>
    </>
  );
}

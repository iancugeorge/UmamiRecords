import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect,useState } from 'react';

export default function Hero() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollIndicator(true),0); // 2.5 seconds delay
    return () => clearTimeout(timer); // Clean up
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight, // Scrolls exactly one screen down - 60px for better visibility
      behavior: 'smooth',
    });
  };
  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      
    {/* Background Video */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
      loading="lazy"
    >
      <source src="/videos/hero-bg-min.webm" type="video/webm" />
      <source src="/videos/hero-bg-min.mp4" type="video/mp4" />
    </video>
  
    {/* Hero Content */}
    <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center">
      
      
      {/* Logo - Larger than tagline */}
   
  <Image
    src="/logo.webp"
    alt="Umami Records Logo"
    width={600}
    height={120}
    className="mb-10" // Increased margin for better spacing
    priority={true} // Load logo first
  />



<motion.h2
  className="text-5xl sm:text-7xl font-extrabold text-yellow-400 uppercase tracking-wide glitch-text mb-12 " // Increased margin for better balance
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
>
  Sunetul tău. Fără limite.
</motion.h2>



{/* CTA Buttons */}
<motion.div
   // More margin to separate from tagline
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
  >
    <Link href="/contact">
      <p className="cta-primary">
        Rezervă o sesiune
      </p>
    </Link>
  </motion.div>
  <div className='mt-4'></div> {/* Added margin-top for spacing */}
  <h1 className="text-sm text-magenta mt-2">
    Studio de înregistrări în Ploiești – Mixaj, Masterizare, Beaturi Personalizate și Producție Video
  </h1>


      </div>
      <div className='mt-5'></div> {/* Added margin-top for spacing */}
      <div className='mt-5'></div> {/* Added margin-top for spacing */}
      <div className='mt-5'></div> {/* Added margin-top for spacing */}
      
      {showScrollIndicator && (
  <motion.div
    className=" cursor-pointer text-yellow-400 animate-bounce"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    onClick={handleScrollDown}
  >
    <p className="text-lg text-center">Explorează mai jos ↓</p>
  </motion.div>
)}
  </section>
  );
}

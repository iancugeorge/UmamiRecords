import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";

// Example testimonials (replace with real ones)
const testimonials = [
  {
    name: "Haiduc",
    feedback: "Umami Records mi-a transformat piesa! Sunet clar, vibe real. Revin cu siguranță!",
    image: "/albert.jpg",
  },
  {
    name: "Paula Both",
    feedback: "Super experiență! M-am simțit liberă să creez exact ce mi-am dorit.",
    image: "/paula.jpg",
  },
  {
    name: "EDO",
    feedback: "Cel mai relaxat studio în care am fost! Nimic forțat, totul natural.",
    image: "/edo.jpg",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 10000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-16 px-6 text-center bg-black">
      {/* Section Title */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 uppercase tracking-wide glitch-text mb-12">
        Ce spun artiștii?
      </h2>

      {/* Testimonial Slider */}
        <div className="relative max-w-3xl mx-auto overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
          key={current}
          className="relative bg-black border-2 border-yellow-400 p-6 rounded-lg text-white shadow-lg max-w-lg mx-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
            >
          <FaQuoteLeft className="text-4xl text-yellow-400 mb-4" />
          <p className="text-lg font-light italic text-gray-300">
            "{testimonials[current].feedback}"
          </p>
          <div className="mt-4 flex flex-col items-center">
            <Image
              src={testimonials[current].image}
              alt={testimonials[current].name}
              width={56}
              height={56}
              className="rounded-full border-2 border-yellow-400"
              priority
            />
            <p className="mt-2 text-yellow-400 font-bold text-xl">
              {testimonials[current].name}
            </p>
          </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Manual Controls */}
      <div className="flex justify-center space-x-4 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full ${index === current ? "bg-yellow-400" : "bg-gray-600"} transition-all`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

// Testimonials array (images removed, new testimonials added)
const testimonials = [
  {
    name: "Haiduc",
    feedback: "Umami Records mi-a transformat piesa! Sunet clar, vibe real. Revin cu siguranță!",
  },
  {
    name: "Simake",
    feedback: "Cu ajutorul lor visul meu a devenit realitate.",
  },
  {
    name: "Luci ng",
    feedback: "Atmosfera relaxantă, dar și profesionistă, iar sunetul de calitate. Recomand cu drag!",
  },
  {
    name: "Edo",
    feedback: "Doi băieți simpli — nici nu m-aș fi gândit c-o să ajungă motorul rachetei mele. Sper, tare de tot, să ies cu ei din magnetosferă. Un lucru, oricum, e sigur: picioarele deja nu-mi mai ating pământul atunci când vă compun… Așa că tot ce mai urmează e să plutesc spre soare, precum un balon. Iar când voi ajunge acolo, să știți că voi fi un star. Pinky Promise!",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-16 px-6 text-center bg-black">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 uppercase tracking-wide glitch-text mb-12">
        Ce spun artiștii?
      </h2>

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
            <p className="mt-4 text-yellow-400 font-bold text-xl">
              {testimonials[current].name}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

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

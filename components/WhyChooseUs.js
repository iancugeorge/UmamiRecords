import { motion } from "framer-motion";
import { FaHeadphones, FaMicrophone, FaMusic, FaClock } from "react-icons/fa";

// Balanced text for Why Choose Us section
const reasons = [
  { 
    icon: <FaHeadphones />, 
    title: "Sunetul tău, dar mai puternic.", 
    description: "Nu forțăm un sunet comercial. Ne asigurăm că piesa ta păstrează vibe-ul și emoția originală, dar cu un mixaj clar și echilibrat."
  },
  { 
    icon: <FaMicrophone />, 
    title: "Un loc unde creezi fără presiune.", 
    description: "Nu trebuie să fii „perfect” din prima. Îți oferim un mediu relaxat unde poți experimenta, repeta și înregistra fără stres."
  },
  { 
    icon: <FaMusic />, 
    title: "Autenticitate, nu reguli impuse.", 
    description: "Nu urmăm trenduri doar de dragul algoritmilor. Ne pasă de vibe-ul tău și ne asigurăm că muzica ta sună sincer, nu forțat."
  },
  { 
    icon: <FaClock />, 
    title: "Proces flexibil, fără rigiditate.", 
    description: "Ne adaptăm la stilul tău de lucru. Vrei să tragi totul dintr-o bucată? Sau preferi să experimentezi? Alegerea e a ta."
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full py-16 px-6 text-center bg-black">
      {/* Section Title */}
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-yellow-400 uppercase tracking-wide glitch-text mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        De ce să ne alegi?
      </motion.h2>

      {/* Grid for Desktop, Stacked for Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="group p-6 bg-black border-2 border-yellow-400 rounded-lg shadow-lg flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:bg-yellow-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Icon (Turns Magenta on Hover) */}
            <div className="text-5xl text-yellow-400 group-hover:text-[#ff0077] transition-colors duration-300 mb-4">
              {reason.icon}
            </div>

            {/* Title (Turns Magenta on Hover) */}
            <h3 className="text-2xl font-bold text-yellow-400 group-hover:text-[#ff0077] transition-colors duration-300 mb-2 why-title">
              {reason.title}
            </h3>

            {/* Description (Remains White) */}
            <p className="text-sm text-gray-300 transition-colors duration-300 why-description">
              {reason.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import Link from "next/link";

export default function StyledButton({ href, text }) {
  return (
    <Link href={href} passHref>
      <motion.button
        initial={{ boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.5)" }}
        animate={{
          boxShadow: [
            "0px 0px 10px rgba(255, 215, 0, 0.6)",
            "0px 0px 20px rgba(255, 215, 0, 0.8)",
            "0px 0px 10px rgba(255, 215, 0, 0.6)",
          ],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.5,
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: [
            "0px 0px 15px rgba(255, 215, 0, 0.9)",
            "0px 0px 25px rgba(255, 215, 0, 1)",
            "0px 0px 15px rgba(255, 215, 0, 0.9)",
          ],
          transition: { duration: 0.15, repeat: 2, repeatType: "reverse" },
        }}
        whileTap={{ scale: 0.95 }}
        className="relative px-8 py-4 text-lg font-bold uppercase bg-yellow-400 text-black rounded-full shadow-lg transition-all hover:bg-yellow-500"
      >
        {text}
      </motion.button>
    </Link>
  );
}

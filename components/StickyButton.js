import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function StickyButton() {
  const router = useRouter();
  const hiddenPages = ['/', '/contact']; // Pages where the button should NOT appear

  if (hiddenPages.includes(router.pathname)) {
    return null; // Don't render the button on these pages
  }

  return (
    <motion.div 
      className="fixed bottom-4 right-4 z-50 sm:hidden" // Moved to bottom-right for better UX
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href="/contact">
        <button className="px-4 py-2 text-sm font-bold uppercase rounded-full 
                           bg-yellow-400 text-black shadow-lg 
                           transform hover:scale-105 transition-all duration-300">
          🎤 Rezerva
        </button>
      </Link>
    </motion.div>
  );
}

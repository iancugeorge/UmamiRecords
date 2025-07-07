// pages/_app.js
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '../components/Layout';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import StickyButton from '@/components/StickyButton';
import '@/styles/noise.css';
import { useRef, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
import { Oswald, Montserrat } from "next/font/google";

const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

// Define variants for dramatic page transitions
const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    y: direction * 0.5, // Keep vertical movement but reduce for smoothness
    scale: 1, // Remove scaling distortion
    filter: 'blur(5px)', // Add subtle blur for glitch effect
  }),
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)', // Remove blur smoothly
  },
  exit: (direction) => ({
    opacity: 0,
    y: -direction * 0.5,
    scale: 1,
    filter: 'blur(5px)', // Reintroduce blur on exit
  }),
};

const pageTransition = {
  duration: 0.5, // Slightly faster for snappier feel
  ease: [0.7, 0, 0.36, 1], // Adjusted cubic bezier easing for fluidity
};

function MyApp({ Component, pageProps, router }) {
  const routes = ["/", "/muzica", "/despre", "/contact", "/servicii"];
  const prevRouteRef = useRef(router.route);

  const currentIndex = routes.indexOf(router.route);
  const prevIndex = routes.indexOf(prevRouteRef.current);
  const direction = currentIndex >= prevIndex ? 1000 : -1000;

  useEffect(() => {
    prevRouteRef.current = router.route;

    // Optimized Lazy Load Background Image
    requestAnimationFrame(() => {
      const lazyBg = document.querySelector('.noise-overlay');
      if (lazyBg) {
        lazyBg.style.backgroundImage = "url('/BG2A3.webp')";
      }
    });
  }, [router.route]);

  return (
    <main className={`${inter.variable} ${oswald.variable} ${montserrat.variable} font-sans`}>
      <Layout>
        <div className="animated-bg" />
        <div className="noise-overlay" />
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
        <StickyButton />
      </Layout>
    </main>
  );
}

export default MyApp;

import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

function MobileMenuPortal({ children }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  return createPortal(children, document.body);
}

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // New state for scroll detection

  const toggleMenu = () => setIsOpen(!isOpen);

  // Prevent background scrolling when the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Scroll detection logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) =>
    router.pathname === path
      ? "text-yellow-400 glitch-active font-extrabold"
      : "text-white font-extrabold";

  return (
    <main className="content-padding">
    <header className={`fixed top-0 left-0 w-full z-50 p-4 flex items-center justify-between transition-all header-blur duration-300 
      ${scrolled ? 'bg-trasparent' : 'bg-black'}`}>

      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          
            <Image 
              src="/logo.webp" 
              alt="Umami Records Logo" 
              width={140} 
              height={50} 
              className="cursor-pointer drop-shadow-lg"
              priority = {true}
            />
          
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6 text-lg uppercase font-bold tracking-wide">
        <Link href="/" className={`relative group ${isActive("/")}`}>Acasă</Link>
        <Link href="/muzica?tab=Muzica" className={`relative group ${isActive("/muzica")}`}>Muzică</Link>
        <Link href="/servicii" className={`relative group ${isActive("/servicii")}`}>Servicii</Link>
        <Link href="/despre" className={`relative group ${isActive("/despre")}`}>Despre</Link>
        <Link href="/contact" className={`relative group ${isActive("/contact")}`}>Contact</Link>
      </nav>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden">
        <motion.button 
          onClick={toggleMenu} 
          aria-label="Toggle Menu"
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </motion.button>
      </div>

      {/* Mobile Full-Screen Navigation Menu via Portal */}
      {isOpen && (
        <MobileMenuPortal>
          <motion.nav 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 bg-black bg-opacity-100 flex flex-col items-center justify-center space-y-8 uppercase tracking-wider z-[100] overflow-hidden"
          >
            <button 
              onClick={toggleMenu} 
              className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 transition-all"
              aria-label="Close Menu"
            >
              <FiX size={30} />
            </button>
            
            <Link href="/" className={`${isActive("/")} text-5xl`} onClick={() => setIsOpen(false)}>Acasă</Link>
            <Link href="/muzica?tab=Muzica" className={`${isActive("/muzica")} text-5xl`} onClick={() => setIsOpen(false)}>Muzică</Link>
            <Link href="/servicii" className={`${isActive("/servicii")} text-5xl`} onClick={() => setIsOpen(false)}>Servicii</Link>
            <Link href="/despre" className={`${isActive("/despre")} text-5xl`} onClick={() => setIsOpen(false)}>Despre</Link>
            <Link href="/contact" className={`${isActive("/contact")} text-5xl`} onClick={() => setIsOpen(false)}>Contact</Link>
          </motion.nav>
        </MobileMenuPortal>
      )}
    </header>
    </main>
  );
}

import Link from "next/link";
import { FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-black py-10 px-6 text-center border-t-2 border-yellow-400">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="/logo.png"
          alt="Umami Records"
          className="w-24 h-auto filter drop-shadow-lg hover:drop-shadow-[0px_0px_15px_#ff0077] transition-all duration-300"
        />
      </div>

      {/* Navigation Links */}
<div className="flex flex-wrap justify-center items-center gap-4 text-gray-300 text-sm uppercase font-bold tracking-wide">
  <Link href="/">
    <span className="hover:text-yellow-400 transition-all duration-300 glitch-hover">
      Acasă
    </span>
  </Link>
  <Link href="/servicii">
    <span className="hover:text-yellow-400 transition-all duration-300 glitch-hover">
      Servicii
    </span>
  </Link>
  <Link href="/muzica">
    <span className="hover:text-yellow-400 transition-all duration-300 glitch-hover">
      Muzică
    </span>
  </Link>
  <Link href="/despre">
    <span className="hover:text-yellow-400 transition-all duration-300 glitch-hover">
      Despre
    </span>
  </Link>
  <Link href="/contact">
    <span className="hover:text-yellow-400 transition-all duration-300 glitch-hover">
      Contact
    </span>
  </Link>
</div>


      {/* Social Media Links */}
        <div className="flex justify-center space-x-6 text-2xl mt-6">
          <a href="https://instagram.com/umami.records" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-[#ff0077] transition-colors duration-300">
            <FaInstagram />
          </a>
          <a href="https://youtube.com/umami.records" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-[#ff0077] transition-colors duration-300">
            <FaYoutube />
          </a>
          <a href="mailto:contact@umamirecords.ro" className="text-yellow-400 hover:text-[#ff0077] transition-colors duration-300">
            <FaEnvelope />
          </a>
        </div>

        {/* Copyright & Legal */}
      <p className="text-gray-500 text-xs mt-6">
        © {new Date().getFullYear()} Umami Records. Toate drepturile rezervate.
      </p>
    </footer>
  );
}

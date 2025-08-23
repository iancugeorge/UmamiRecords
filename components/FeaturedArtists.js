import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaSpotify,
  FaYoutube,
  FaTimes,
  FaSoundcloud,
} from "react-icons/fa";
import { SiTidal } from "react-icons/si";

/* ---------------- Portal ---------------- */
function ModalPortal({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);
  if (!mounted) return null;
  return createPortal(children, document.getElementById("modal-root"));
}

/* ---------------- Data ---------------- */
const artists = [
  {
    name: "EDO",
    image: "/edo.jpg",
    genre: "Hip-Hop Alternativ",
    instagram: "https://instagram.com/edoardolazar",
    youtube: "https://www.youtube.com/@edoardolazar",
  },
  {
    name: "Simake",
    image: "/simake.jpg",
    genre: "Hip-Hop / Gangsta Rap",
    instagram: "https://www.instagram.com/simak3_/",
    youtube: "https://www.youtube.com/@plmrecordsoficial",
  },
  {
    name: "Haiduc",
    image: "/albert.jpg",
    genre: "Hip-Hop / Gangsta Rap",
    instagram: "https://www.instagram.com/wshaiduc",
    youtube: "https://www.youtube.com/@wshaiduc",
    soundcloud: "https://soundcloud.com/albert-haidu",
    spotify: "https://open.spotify.com/artist/0VBjcmVXPWhCilv1pr6yUQ",
    tidal: "https://tidal.com/browse/artist/47380740",
  },
];

/* Build a compact list of socials to render in one loop */
const getSocials = (a) =>
  [
    a.instagram && { href: a.instagram, label: "Instagram", Icon: FaInstagram },
    a.spotify && { href: a.spotify, label: "Spotify", Icon: FaSpotify },
    a.youtube && { href: a.youtube, label: "YouTube", Icon: FaYoutube },
    a.soundcloud && { href: a.soundcloud, label: "SoundCloud", Icon: FaSoundcloud },
    a.tidal && { href: a.tidal, label: "Tidal", Icon: SiTidal },
  ].filter(Boolean);

export default function FeaturedArtists() {
  const [selectedArtist, setSelectedArtist] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedArtist ? "hidden" : "";
  }, [selectedArtist]);

  return (
    <section className="relative w-full py-16 px-6 text-center">
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-yellow-400 uppercase tracking-wide glitch-text mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Artiști Recomandați
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {artists.map((artist, index) => (
          <motion.div
            key={index}
            className="relative bg-black rounded-lg shadow-lg overflow-hidden border-2 border-yellow-400 cursor-pointer group"
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedArtist(artist)}
          >
            {/* Image */}
            <div className="relative w-full aspect-square">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Top-right socials (always visible on mobile, reveal on hover desktop) */}
              <div className="absolute top-3 right-3 flex gap-2 z-10">
                {getSocials(artist).map(({ href, label, Icon }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-black/70 text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              {/* Subtle gradient for readability */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            {/* Info bar */}
            <div className="absolute bottom-0 left-0 w-full p-4 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-white">{artist.name}</h3>
                  <p className="text-xs sm:text-sm text-yellow-400">{artist.genre}</p>
                </div>
                {/* Small "Detalii" indicator to hint interactivity */}
                <span className="hidden sm:inline-block text-xs text-gray-300 bg-black/60 border border-yellow-400 px-2 py-1 rounded-md">
                  Click pentru detalii
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedArtist && (
        <ModalPortal>
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full max-w-md bg-black rounded-lg border-2 border-yellow-400 p-6 mx-2 text-white text-center">
              <button
                className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 text-3xl"
                onClick={() => setSelectedArtist(null)}
                aria-label="Închide"
              >
                <FaTimes />
              </button>

              <Image
                src={selectedArtist.image}
                alt={selectedArtist.name}
                width={200}
                height={200}
                className="block mx-auto mb-4 rounded"
              />

              <h3 className="text-2xl font-bold mb-1">{selectedArtist.name}</h3>
              <p className="text-yellow-400 mb-4">{selectedArtist.genre}</p>

              <div className="flex justify-center flex-wrap gap-5 text-2xl">
                {getSocials(selectedArtist).map(({ href, label, Icon }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </ModalPortal>
      )}
    </section>
  );
}

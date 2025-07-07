import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaInstagram, FaSpotify, FaYoutube, FaTimes } from "react-icons/fa";


function ModalPortal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wait until component is mounted to access the DOM
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null; // Render nothing on SSR or if not mounted

  // The actual portal
  return createPortal(children, document.getElementById("modal-root"));
}

// Example artist data
const artists = [
  { 
    name: "Simake", 
    image: "/simake.jpg", 
    genre: "Hip-Hop / Gangsta Rap", 
    instagram: "https://www.instagram.com/simak3_/",
    youtube: "https://www.youtube.com/@plmrecordsoficial",
  },
  { 
    name: "EDO", 
    image: "/edo.jpg", 
    genre: "Hip-Hop Alternativ", 
    instagram: "https://instagram.com/edoardolazar",
    youtube: "https://www.youtube.com/@edoardolazar",
  },
];

/**
 * 2) Main component that shows the grid and the modal.
 */
export default function FeaturedArtists() {
  const [selectedArtist, setSelectedArtist] = useState(null);

  // Lock background scroll when the modal is open
  useEffect(() => {
    if (selectedArtist) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedArtist]);

  return (
    <section className="relative w-full py-16 px-6 text-center">
      {/* Section Title */}
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-yellow-400 uppercase tracking-wide glitch-text mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Artiști Recomandați
      </motion.h2>

      {/* Artists Grid Layout */}
      <div className="flex flex-wrap justify-center gap-8">

        {artists.map((artist, index) => (
          <motion.div
  key={index}
  className="relative bg-black rounded-lg shadow-lg overflow-hidden border-2 border-yellow-400 cursor-pointer w-full max-w-xs mx-auto"
  whileHover={{ scale: 1.05 }}
  onClick={() => setSelectedArtist(artist)}
>

           <div className="relative w-full aspect-square">
  <Image
    src={artist.image}
    alt={artist.name}
    fill
    className="object-cover rounded-t-lg"
  />
</div>

            <div className="absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-70 text-white">
              <h3 className="text-lg font-bold">{artist.name}</h3>
              <p className="text-sm text-yellow-400">{artist.genre}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal: only render if an artist is selected */}
      {selectedArtist && (
        <ModalPortal>
          {/* This element is now outside any transforms, pinned to viewport */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full max-w-md bg-black rounded-lg border-2 border-yellow-400 p-6 mx-2 text-white text-center">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 text-3xl"
                onClick={() => setSelectedArtist(null)}
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
              <p className="text-yellow-400 mb-3">{selectedArtist.genre}</p>

              {/* Social Media Links */}
              <div className="flex justify-center space-x-6 text-2xl">
                {selectedArtist.instagram && (
                  <a
                    href={selectedArtist.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <FaInstagram />
                  </a>
                )}
                {selectedArtist.spotify && (
                  <a
                    href={selectedArtist.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <FaSpotify />
                  </a>
                )}
                {selectedArtist.youtube && (
                  <a
                    href={selectedArtist.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <FaYoutube />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </ModalPortal>
      )}
    </section>
  );
}

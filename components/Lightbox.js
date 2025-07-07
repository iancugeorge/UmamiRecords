import { useEffect } from "react";
import { motion } from "framer-motion";
import LightboxPortal from "./LightboxPortal";

export default function Lightbox({ src, onClose }) {
  // Detect YouTube ID or full URL
  const getYouTubeEmbedURL = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&controls=1` : null;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const embedUrl = getYouTubeEmbedURL(src);

  return (
    <LightboxPortal>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-5xl mx-4 aspect-video"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {embedUrl ? (
            <iframe
              src={embedUrl}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-md border-4 border-yellow-400 shadow-2xl"
              loading="lazy"
            />
          ) : (
            <p className="text-white">Video URL invalid sau neacceptat.</p>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-3xl hover:text-yellow-400 transition-colors"
          >
            &times;
          </button>
        </motion.div>
      </motion.div>
    </LightboxPortal>
  );
}

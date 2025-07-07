import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function LightboxPortal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null; // Avoid rendering on server or pre-mount
  return createPortal(children, document.getElementById("lightbox-root"));
}

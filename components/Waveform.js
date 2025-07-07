// Waveform.js
import { useEffect, useRef } from "react";

export default function Waveform({ src, onWSReady, startTime = 0, autoPlay = false }) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const isCreated = useRef(false);

  useEffect(() => {
    if (!waveformRef.current) return;
    if (isCreated.current) return; // Prevent duplicate creation

    async function createWaveSurfer() {
      const module = await import("wavesurfer.js");
      const WaveSurfer = module.default || module;

      if (!WaveSurfer?.create) {
        console.error("WaveSurfer.create is not available:", module);
        return;
      }

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#ff0077",
        progressColor: "#FFD700",
        barWidth: 3,
        cursorWidth: 0,
        responsive: true,
        height: 80,
      });

      if (src) {
        wavesurferRef.current.load(src);
      } else {
        console.error("No source provided for Waveform.");
      }

      wavesurferRef.current.on("ready", () => {
        // Resume playback position if applicable using seekTo.
        if (typeof startTime === "number" && startTime > 0) {
          const duration = wavesurferRef.current.getDuration();
          if (duration > 0) {
            const fraction = startTime / duration;
            wavesurferRef.current.seekTo(fraction);
          }
        }
        if (autoPlay) {
          wavesurferRef.current.play();
        }
      });

      if (onWSReady) {
        onWSReady(wavesurferRef.current);
      }

      isCreated.current = true;
    }

    createWaveSurfer();

    return () => {
      if (wavesurferRef.current) {
        const destroyResult = wavesurferRef.current.destroy();
        if (destroyResult && typeof destroyResult.catch === "function") {
          destroyResult.catch(error => {
            if (error.name !== "AbortError") {
              console.error("Error during wavesurfer destroy:", error);
            }
            // Else: safely ignore the AbortError.
          });
        }
        wavesurferRef.current = null;
      }
      isCreated.current = false;
    };
  }, [src, startTime, autoPlay]);

  return <div ref={waveformRef} className="w-full h-20" />;
}

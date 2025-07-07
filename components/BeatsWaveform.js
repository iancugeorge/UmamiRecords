// BeatWaveform.js
import { useEffect, useRef, useState } from "react";


export default function BeatWaveform({ src }) {
  const containerRef = useRef(null);
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function createWaveSurfer() {
      const module = await import("wavesurfer.js");
      const WaveSurfer = module.default || module;

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#E6007E", // Brand magenta
        progressColor: "#FFD700", // Brand yellow
        barWidth: 2,
        cursorWidth: 1,
        responsive: true,
        height: 60,
      });

      wavesurferRef.current.load(src);

      wavesurferRef.current.on("ready", () => {
        setIsReady(true);
      });
      wavesurferRef.current.on("play", () => {
        setIsPlaying(true);
      });
      wavesurferRef.current.on("pause", () => {
        setIsPlaying(false);
      });
    }

    if (waveformRef.current && !wavesurferRef.current) {
      createWaveSurfer();
    }

    return () => {
        if (wavesurferRef.current) {
            const ws = wavesurferRef.current;
            wavesurferRef.current = null;
            ws.destroy(); // no .catch() needed
          }
    };
  }, [src]);

  const togglePlay = () => {
    if (!wavesurferRef.current || !isReady) return;
    // If we're about to play this track
    if (!isPlaying) {
      // Pause any currently playing instance if it's not this one
      if (window.currentWaveSurfer && window.currentWaveSurfer !== wavesurferRef.current) {
        window.currentWaveSurfer.pause();
      }
      // Set this instance as the global current one
      window.currentWaveSurfer = wavesurferRef.current;
      wavesurferRef.current.play();
      setIsPlaying(true);
    } else {
      // Pause this instance
      wavesurferRef.current.pause();
      // If it's the global instance, clear it
      if (window.currentWaveSurfer === wavesurferRef.current) {
        window.currentWaveSurfer = null;
      }
      setIsPlaying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="beat-waveform"
      style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}
    >
      <div ref={waveformRef} className="w-full" style={{ width: "100%" }} />
      <button
        onClick={togglePlay}
        className="mt-2 flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-bold rounded-full hover:bg-[#ff0077] transition-all"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}

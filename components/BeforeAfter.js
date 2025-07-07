// BeforeAfter.js (snippet)
import {useState, useRef, useCallback} from "react";
import dynamic from "next/dynamic";
import {FaToggleOn, FaToggleOff} from "react-icons/fa";
import {Play, Pause} from "lucide-react";

// Dynamically load Waveform
const Waveform = dynamic(() => import ("@/components/Waveform"), {ssr: false});

export default function BeforeAfter({track}) {
    const [isMastered, setIsMastered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isWaveReady, setIsWaveReady] = useState(false);
    const [resumeTime, setResumeTime] = useState(0);
    const [resumePlaying, setResumePlaying] = useState(false);
    const waveSurferRef = useRef(null);

    const handleWSReady = useCallback((waveSurferInstance) => {
        waveSurferRef.current = waveSurferInstance;
        waveSurferInstance.on("ready", () => {
            setIsWaveReady(true);
        });
        waveSurferInstance.on("play", () => setIsPlaying(true));
        waveSurferInstance.on("pause", () => setIsPlaying(false));
        waveSurferInstance.on("finish", () => setIsPlaying(false));
    }, []);

    const toggleMastered = () => {
        if (waveSurferRef.current) {
            const currentTime = waveSurferRef
                .current
                .getCurrentTime();
            setResumeTime(currentTime);
            setResumePlaying(isPlaying);
            waveSurferRef
                .current
                .stop();
        }
        setIsWaveReady(false);
        setIsPlaying(false);
        setIsMastered((prev) => !prev);
    };

    const togglePlay = () => {
        if (!waveSurferRef.current || !isWaveReady) 
            return;
        
        // If we're about to play this track
        if (!isPlaying) {
            // Pause any currently playing instance if it's not this one
            if (window.currentWaveSurfer && window.currentWaveSurfer !== waveSurferRef.current) {
                window
                    .currentWaveSurfer
                    .pause();
            }
            // Set this instance as the global current one
            window.currentWaveSurfer = waveSurferRef.current;
            waveSurferRef
                .current
                .play();
            setIsPlaying(true);
        } else {
            // Pause this instance
            waveSurferRef
                .current
                .pause();
            // If it's the global instance, clear it
            if (window.currentWaveSurfer === waveSurferRef.current) {
                window.currentWaveSurfer = null;
            }
            setIsPlaying(false);
        }
    };

    return (
        <div className="relative p-6 bg-black rounded-lg text-center shadow-lg">

            <p className="text-xl font-bold text-yellow-400 mb-4">
                {
                    isMastered
                        ? "Masterizat "
                        : "Nemasterizat "
                }
                - {track.title}
            </p>

            <Waveform
                key={isMastered
                    ? "mastered"
                    : "raw"}
                src={isMastered
                    ? track.masteredSrc
                    : track.rawSrc}
                onWSReady={handleWSReady}
                startTime={resumeTime}
                autoPlay={resumePlaying}/>

            <button
                className="mt-4 flex items-center gap-3 px-6 py-2 bg-yellow-400 text-black font-bold rounded-full hover:bg-[#ff0077] transition-all"
                onClick={toggleMastered}>
                {
                    isMastered
                        ? <FaToggleOn size={24}/>
                        : <FaToggleOff size={24}/>
                }
                {
                    isMastered
                        ? "Inapoi"
                        : "Scimba pe masterizat"
                }
            </button>

            <button
                className="mt-4 flex items-center gap-3 px-6 py-2 bg-yellow-400 text-black font-bold rounded-full hover:bg-[#ff0077] transition-all"
                onClick={togglePlay}>
                {
                    isPlaying
                        ? <Pause size={24}/>
                        : <Play size={24}/>
                }
                {
                    isPlaying
                        ? "Pause"
                        : "Play"
                }
            </button>
        </div>
    );
}

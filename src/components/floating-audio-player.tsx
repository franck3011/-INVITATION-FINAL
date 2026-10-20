import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";

interface Props {
  musicUrl: string;
}

export function FloatingAudioPlayer({ musicUrl }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Autoplay when mounted (which happens after envelope opens)
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          // Autoplay blocked by browser until user gesture
          console.log("Autoplay prevented:", err);
          setIsPlaying(false);
        });
    }

    const unlock = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.muted = false;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };
    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });
    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [musicUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setIsLoaded(true)}
        style={{
          position: "fixed",
          top: -9999,
          left: -9999,
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1, duration: 0.8, type: "spring" }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      >
        <button
          onClick={togglePlay}
          className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-white/20 text-accent hover:scale-105 transition-transform"
        >
          {isPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-accent/40"
            />
          ) : null}

          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-1" />
          )}

          {/* Ripple effect */}
          {isPlaying && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 rounded-full bg-accent/20 pointer-events-none"
            />
          )}
        </button>

        <motion.button
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: isPlaying ? "auto" : 0, opacity: isPlaying ? 1 : 0 }}
          className="overflow-hidden bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/20 text-accent flex items-center justify-center"
          style={{ height: "48px" }}
          onClick={toggleMute}
        >
          <div className="px-4 flex items-center">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </div>
        </motion.button>
      </motion.div>
    </>
  );
}

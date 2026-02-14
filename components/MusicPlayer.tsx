import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3; 

    const attemptPlay = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          // Remove global listeners once playing succeeds
          document.removeEventListener('click', attemptPlay);
          document.removeEventListener('keydown', attemptPlay);
          document.removeEventListener('touchstart', attemptPlay);
        })
        .catch((e) => {
          console.log("Autoplay prevented, waiting for interaction");
          setIsPlaying(false);
        });
    };

    // Try to play immediately (works if user has interacted with domain before or browser allows)
    attemptPlay();

    // Fallback: Play on first user interaction
    document.addEventListener('click', attemptPlay);
    document.addEventListener('keydown', attemptPlay);
    document.addEventListener('touchstart', attemptPlay);

    return () => {
      document.removeEventListener('click', attemptPlay);
      document.removeEventListener('keydown', attemptPlay);
      document.removeEventListener('touchstart', attemptPlay);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Using a royalty-free calming instrumental track
  const audioSrc = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"; 

  return (
    <div className="flex items-center gap-2">
      <audio ref={audioRef} src={audioSrc} loop />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={togglePlay}
        className="p-2 rounded-full backdrop-blur-md border transition-all bg-white/10 text-white border-white/20 hover:bg-white/20"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={toggleMute}
        className="p-2 rounded-full backdrop-blur-md border transition-all bg-white/10 text-white border-white/20 hover:bg-white/20"
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </motion.button>
    </div>
  );
};
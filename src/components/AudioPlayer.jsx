import { useEffect, useRef, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { C } from '../config';

const AUDIO_SRC = encodeURI('/music/Vamos bien- Majo y Dan (video oficial).mp3');

const AudioPlayer = forwardRef(({ autoPlay = false, showControl = true }, ref) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fallbackCleanupRef = useRef(null);

  const removeFallbackListeners = useCallback(() => {
    if (fallbackCleanupRef.current) {
      fallbackCleanupRef.current();
      fallbackCleanupRef.current = null;
    }
  }, []);

  const playAudio = useCallback(() => {
    if (!audioRef.current) return;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          removeFallbackListeners();
        })
        .catch(() => {
          // Autoplay blocked by browser policy, will wait for next interaction
        });
    }
  }, [removeFallbackListeners]);

  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, pauseAudio, playAudio]);

  useImperativeHandle(ref, () => ({
    playAudio,
    pauseAudio,
    togglePlay,
  }), [playAudio, pauseAudio, togglePlay]);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    // Fallback interaction handler (using touchend, click, pointerup; NOT touchstart)
    const handleFallbackInteraction = () => {
      if (!audioRef.current) return;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          removeFallback();
        })
        .catch(() => {
          // Keep listeners active until an interaction actually succeeds
        });
    };

    const removeFallback = () => {
      document.removeEventListener('click', handleFallbackInteraction);
      document.removeEventListener('touchend', handleFallbackInteraction);
      document.removeEventListener('pointerup', handleFallbackInteraction);
    };

    fallbackCleanupRef.current = removeFallback;

    document.addEventListener('click', handleFallbackInteraction);
    document.addEventListener('touchend', handleFallbackInteraction);
    document.addEventListener('pointerup', handleFallbackInteraction);

    if (autoPlay) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          removeFallback();
        })
        .catch(() => {
          // Normal on mobile browsers - user interaction will trigger playback
        });
    }

    return () => {
      removeFallback();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [autoPlay]);

  return (
    <AnimatePresence>
      {showControl && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          className="fixed bottom-5 right-5 z-40 p-3 rounded-full shadow-lg border backdrop-blur-sm transition-colors flex items-center justify-center cursor-pointer"
          style={{
            background: 'rgba(251, 247, 240, 0.9)',
            borderColor: C.gold,
            color: C.wine,
          }}
        >
          {isPlaying ? (
            <Volume2 size={22} strokeWidth={2} />
          ) : (
            <VolumeX size={22} strokeWidth={2} />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;

import { useEffect } from 'react';

const AudioPlayer = () => {
  useEffect(() => {
    const audio = new Audio('/music/Rondalla Cristiana de Monterrey - Tiempo de Nuestro Amor (mp3cut.net).m4a');
    audio.loop = true; // Set to loop continuously
    const play = () => {
      audio.play().catch(() => {
        // Auto-play may be blocked by the browser until user interaction
        const listener = () => {
          audio.play().removeEventListener('click', listener);
        };
        document.addEventListener('click', listener, { once: true });
      });
    };
    // Wait for the component to be mounted and then play
    setTimeout(play, 500);
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
};

export default AudioPlayer;
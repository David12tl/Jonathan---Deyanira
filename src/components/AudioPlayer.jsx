import { useEffect } from 'react';

const AudioPlayer = ({ autoPlay = false }) => {
  useEffect(() => {
    const audio = new Audio(`/music/Vamos bien- Majo y Dan (video oficial).mp3`);
    
    // Handle play after user interaction (required by browsers)
    const handleUserInteraction = () => {
      audio.play().catch(() => {
        // If still blocked, we can try again on next interaction
      });
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
    
    // Add listeners once (required by browsers for autoplay)
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    // If autoPlay is enabled, try to play after a short delay
    if (autoPlay) {
      const tryPlay = () => {
        audio.play().catch(() => {
          // Browser blocked autoplay - user interaction required
        });
      };
      const interval = setInterval(() => {
        if (document.visibilityState === 'visible') {
          tryPlay();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [autoPlay]);

  return null;
};

export default AudioPlayer;
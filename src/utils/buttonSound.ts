export const playButtonHoverSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
};

export const addHoverSound = (element: HTMLElement | null) => {
  if (!element) return;
  
  const handleMouseEnter = () => {
    try {
      playButtonHoverSound();
    } catch (error) {
      console.debug('Audio not available');
    }
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  
  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
  };
};

import { useEffect, RefObject } from 'react';
import { addHoverSound } from '@/utils/buttonSound';

export const useButtonSound = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const cleanup = addHoverSound(ref.current);
    return () => {
      cleanup?.();
    };
  }, [ref]);
};

export const useButtonSounds = (refs: RefObject<HTMLElement>[]) => {
  useEffect(() => {
    const cleanups = refs.map(ref => addHoverSound(ref.current));
    return () => {
      cleanups.forEach(cleanup => cleanup?.());
    };
  }, [refs]);
};

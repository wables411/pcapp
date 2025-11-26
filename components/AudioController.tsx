'use client';

import { useEffect, useState, useRef } from 'react';
import { Howl } from 'howler';

interface AudioControllerProps {
  src: string;
  loop?: boolean;
  volume?: number;
}

export function AudioController({ src, loop = true, volume = 0.3 }: AudioControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (!hasInteracted) return;

    const sound = new Howl({
      src: [src],
      loop,
      volume,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
    });

    soundRef.current = sound;

    return () => {
      sound.unload();
    };
  }, [src, loop, volume, hasInteracted]);

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      if (soundRef.current) {
        soundRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (!soundRef.current) {
      handleInteraction();
      return;
    }

    if (isMuted) {
      soundRef.current.unmute();
      setIsMuted(false);
    } else {
      soundRef.current.mute();
      setIsMuted(true);
    }
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      handleInteraction();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <button
      onClick={toggleMute}
      className="fixed top-4 left-4 z-50 w-12 h-12 bg-oil-gray border border-oil-white/20 flex items-center justify-center hover:bg-oil-white hover:text-oil-black transition-colors"
      aria-label={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  );
}


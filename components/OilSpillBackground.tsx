'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Blob {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function OilSpillBackground() {
  const [blobs, setBlobs] = useState<Blob[]>([]);

  useEffect(() => {
    // Generate 5-8 oil blobs
    const newBlobs: Blob[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 200 + Math.random() * 300,
      duration: 20 + Math.random() * 30,
      delay: Math.random() * 5,
    }));
    setBlobs(newBlobs);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className="absolute rounded-full opacity-10"
          style={{
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            background: 'radial-gradient(circle, #222 0%, #000 100%)',
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { TokenGrid } from './TokenGrid';

interface Accomplishment {
  id: number;
  title: string;
  url: string;
  type: 'vote' | 'collection' | 'website' | 'audio' | 'tokens';
  audioSrc?: string;
  collectionSlug?: string;
  image?: string;
}

const accomplishments: Accomplishment[] = [
  { id: 1, title: 'Nouns DAO Vote 3', url: 'https://nouns.build/dao/ethereum/0x0c12aba58fc88f1267fa772012495b47aaf31cab/vote/3', type: 'vote' },
  { id: 2, title: 'Nouns DAO Vote 9', url: 'https://nouns.build/dao/ethereum/0x0c12aba58fc88f1267fa772012495b47aaf31cab/vote/9', type: 'vote' },
  { id: 3, title: 'Nouns DAO Vote 16', url: 'https://nouns.build/dao/ethereum/0x0c12aba58fc88f1267fa772012495b47aaf31cab/vote/16', type: 'vote' },
  { id: 4, title: 'Nouns DAO Vote 12', url: 'https://nouns.build/dao/ethereum/0x0c12aba58fc88f1267fa772012495b47aaf31cab/vote/12', type: 'vote' },
  { id: 5, title: 'Nouns DAO Vote 4', url: 'https://nouns.build/dao/ethereum/0x0c12aba58fc88f1267fa772012495b47aaf31cab/vote/4', type: 'vote' },
  { id: 6, title: 'PC Tape Vol 1', url: 'https://opensea.io/collection/pc-tape-vol-1', type: 'collection', collectionSlug: 'pc-tape-vol-1' },
  { id: 7, title: 'Petty Fest 2: Too Petty', url: 'https://opensea.io/collection/petty-fest-2-too-petty', type: 'collection', collectionSlug: 'petty-fest-2-too-petty' },
  { id: 8, title: 'lawb.xyz', url: 'https://lawb.xyz', type: 'website' },
  { id: 9, title: 'Frequent Flyers (Scatter)', url: 'https://www.scatter.art/collection/frequent-flyers', type: 'collection', collectionSlug: 'frequent-flyers' },
  { id: 10, title: 'Scoop', url: 'https://opensea.io/fr/collection/scoop', type: 'audio', collectionSlug: 'scoop', audioSrc: '/audio/scoop-preview.mp3' },
  { id: 11, title: 'Altered V2', url: 'https://opensea.io/collection/altered-v2', type: 'audio', collectionSlug: 'altered-v2', audioSrc: '/audio/altered-preview.mp3' },
  { id: 12, title: 'Proof of Attendance 3', url: 'https://opensea.io/collection/proof-of-attendance-3', type: 'tokens', collectionSlug: 'proof-of-attendance-3' },
  { id: 13, title: 'PC69', url: 'https://opensea.io/collection/pc69', type: 'tokens', collectionSlug: 'pc69' },
];

function AudioPreview({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    const howl = new Howl({
      src: [src],
      volume: 0.5,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
    });
    setSound(howl);

    return () => {
      howl.unload();
    };
  }, [src]);

  const togglePlay = () => {
    if (!sound) return;
    if (isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }
  };

  return (
    <button
      onClick={togglePlay}
      className="absolute top-2 right-2 w-10 h-10 bg-oil-black/80 border border-oil-white/20 flex items-center justify-center hover:bg-oil-white hover:text-oil-black transition-colors z-10"
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {isPlaying ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}

export function AccomplishmentsGrid() {
  return (
    <div className="w-full max-w-7xl mx-auto p-8 space-y-12">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">Accomplishments</h2>

      <div className="space-y-16">
        {accomplishments.map((item) => {
          if (item.type === 'tokens' && item.collectionSlug) {
            return (
              <div key={item.id} className="space-y-4">
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <TokenGrid collectionSlug={item.collectionSlug} />
              </div>
            );
          }

          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-oil-white/20 bg-oil-gray/30 hover:bg-oil-gray/50 transition-colors group relative"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl md:text-2xl font-bold font-mono">{item.title}</h3>
                  <svg
                    className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
              {item.audioSrc && (
                <AudioPreview src={item.audioSrc} />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}


'use client';

import { OilSpillBackground } from '@/components/OilSpillBackground';
import { WalletConnect } from '@/components/WalletConnect';
import { AudioController } from '@/components/AudioController';
import { NounsAuctionLive } from '@/components/NounsAuctionLive';
import Link from 'next/link';

export default function AuctionPage() {
  return (
    <main className="relative min-h-screen">
      <OilSpillBackground />
      <WalletConnect />
      <AudioController src="/audio/oil-drip-ambience.mp3" />

      <div className="relative z-10 pt-24 pb-20 px-4">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-2 border border-oil-white/20 text-oil-white font-mono text-sm hover:bg-oil-white hover:text-oil-black transition-colors"
          >
            ← Home
          </Link>
        </div>
        <NounsAuctionLive />
      </div>
    </main>
  );
}


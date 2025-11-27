'use client';

export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { OilSpillBackground } from '@/components/OilSpillBackground';
import { WalletConnect } from '@/components/WalletConnect';
import { AudioController } from '@/components/AudioController';
import Link from 'next/link';

const InteractiveModel = dynamic(() => import('@/components/InteractiveModel').then(mod => ({ default: mod.InteractiveModel })), {
  ssr: false,
  loading: () => <div className="w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-oil-white/40">Loading 3D model...</div>
});

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <OilSpillBackground />
      <WalletConnect />
      <AudioController src="/audio/oil-drip-ambience.mp3" />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.h1
          className="text-[12vw] md:text-[18vw] font-bold text-center leading-none"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 2,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
        >
          All You&apos;ve Gotta Do Is Show Up
        </motion.h1>
      </section>

      {/* 3D Model Section */}
      <section className="relative z-10 py-20 px-4">
        <InteractiveModel />
      </section>

      {/* Navigation */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/auction"
              className="block px-8 py-4 bg-oil-white text-oil-black font-mono text-lg font-bold hover:bg-oil-gray hover:text-oil-white transition-colors mb-4"
            >
              Live Auction
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/gallery"
              className="block px-8 py-4 border-2 border-oil-white text-oil-white font-mono text-lg font-bold hover:bg-oil-white hover:text-oil-black transition-colors"
            >
              Accomplishments
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}


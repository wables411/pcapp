'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Token {
  token_id: string;
  name: string;
  image_url?: string;
  image_preview_url?: string;
  permalink: string;
}

interface TokenGridProps {
  collectionSlug: string;
}

export function TokenGrid({ collectionSlug }: TokenGridProps) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/opensea/${collectionSlug}`);
        if (!response.ok) throw new Error('Failed to fetch tokens');
        const data = await response.json();
        setTokens(data.nfts || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tokens');
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [collectionSlug]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-oil-white/60">Loading tokens...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-oil-white/60">No tokens found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tokens.map((token) => (
        <a
          key={token.token_id}
          href={token.permalink || `https://opensea.io/assets/base/${collectionSlug}/${token.token_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block border border-oil-white/20 bg-oil-gray/30 hover:bg-oil-gray/50 transition-colors group"
        >
          <div className="aspect-square relative overflow-hidden bg-oil-black">
            {token.image_url || token.image_preview_url ? (
              <Image
                src={token.image_url || token.image_preview_url || ''}
                alt={token.name || `Token #${token.token_id}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-oil-white/40">
                No Image
              </div>
            )}
          </div>
          <div className="p-3">
            <p className="text-sm font-mono text-oil-white truncate">
              {token.name || `#${token.token_id}`}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}


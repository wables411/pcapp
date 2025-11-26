const ROOT_URL = process.env.NEXT_PUBLIC_URL 
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
  || (process.env.NETLIFY ? `https://${process.env.NETLIFY_URL}` : null)
  || 'https://your-domain.netlify.app';

export const minikitConfig = {
  accountAssociation: {
    header: '',
    payload: '',
    signature: '',
  },
  miniapp: {
    version: '1',
    name: 'Portion Club SubDAO',
    subtitle: 'All You\'ve Gotta Do Is Show Up',
    description: 'Portion Club SubDAO on Base - Live NFT auctions, interactive 3D models, and accomplishments gallery.',
    screenshotUrls: [
      `${ROOT_URL}/screenshot-portrait.png`,
    ],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: '#000000',
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: 'social',
    tags: ['dao', 'nft', 'base', 'auction', 'portion-club'],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: 'All You\'ve Gotta Do Is Show Up',
    ogTitle: 'Portion Club SubDAO | Base',
    ogDescription: 'Portion Club SubDAO on Base - Live NFT auctions, interactive 3D models, and accomplishments gallery.',
    ogImageUrl: `${ROOT_URL}/og.png`,
  },
} as const;


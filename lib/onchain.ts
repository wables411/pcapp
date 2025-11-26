import { base, baseSepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';

export const config = getDefaultConfig({
  appName: 'Portion Club SubDAO',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'default',
  chains: [base, baseSepolia],
  ssr: true,
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_MAINNET_RPC || 'https://mainnet.base.org'),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC || 'https://sepolia.base.org'),
  },
});

// Nouns Protocol contract address on Base
export const NOUNS_AUCTION_HOUSE = '0xd0dda8e6b354c5f12787aaca936b711c831745ba' as const;


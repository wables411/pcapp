import { base, baseSepolia } from 'wagmi/chains'

export const config = {
  chains: [base, baseSepolia],
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '',
  alchemyApiKey: import.meta.env.VITE_ALCHEMY_API_KEY || '',
  useTestnet: import.meta.env.VITE_USE_TESTNET === 'true',
  contracts: {
    auctionHouse: import.meta.env.VITE_AUCTION_HOUSE_ADDRESS || '0xd0dda8e6b354c5f12787aaca936b711c831745ba',
    nounsToken: import.meta.env.VITE_NOUNS_TOKEN_ADDRESS || '0xd0dda8e6b354c5f12787aaca936b711c831745ba',
    governor: import.meta.env.VITE_GOVERNOR_ADDRESS || '0xd0dda8e6b354c5f12787aaca936b711c831745ba',
    lawbToken: import.meta.env.VITE_LAWB_TOKEN_ADDRESS || '0xea6c49afbfcbb51a77b8d7f1f6c3a381b627edff',
    baseToken: import.meta.env.VITE_BASE_TOKEN_ADDRESS || '0xdcc199c1b19cea6115af0c000539e93df2291d26',
    nftCollection: import.meta.env.VITE_NFT_COLLECTION_ADDRESS || '0xafff7fb83b1270f65e214b30a643bba98887e0df',
  },
}

export const getChain = () => {
  return config.useTestnet ? baseSepolia : base
}


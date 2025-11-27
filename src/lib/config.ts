import { base, baseSepolia } from 'wagmi/chains'

export const config = {
  chains: [base, baseSepolia],
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '',
  alchemyApiKey: import.meta.env.VITE_ALCHEMY_API_KEY || '',
  useTestnet: import.meta.env.VITE_USE_TESTNET === 'true',
  contracts: {
    auctionHouse: import.meta.env.VITE_AUCTION_HOUSE_ADDRESS || '0x32c13e8aea51d806a2e7cbee03792527981fc109',
    daoToken: import.meta.env.VITE_DAO_TOKEN_ADDRESS || '0xd0dda8e6b354c5f12787aaca936b711c831745ba',
    governor: import.meta.env.VITE_GOVERNOR_ADDRESS || '0x0ef3151bba12d7ec3bcc220fb82fcb8009a51f28',
    treasury: import.meta.env.VITE_TREASURY_ADDRESS || '0xc946a8e7f101d888f65c6d313ea78a37473c5906',
    lawbstersNft: import.meta.env.VITE_LAWBSTERS_NFT_CONTRACT || '0x0ef7ba09c38624b8e9cc4985790a2f5dbfc1dc42',
    alteredToken: import.meta.env.VITE_ALTERED_TOKEN_ADDRESS || '0xea6c49afbfcbb51a77b8d7f1f6c3a381b627edff',
    pettyfest2Token: import.meta.env.VITE_PETTYFEST2_TOKEN_ADDRESS || '0xdcc199c1b19cea6115af0c000539e93df2291d26',
    scoopNftCollection: import.meta.env.VITE_SCOOP_NFT_COLLECTION_ADDRESS || '0xafff7fb83b1270f65e214b30a643bba98887e0df',
    frequentFlyersCollection: import.meta.env.VITE_FREQUENTFLYERS_COLLECTION_ADDRESS || '0xf6F260643F5f666C0828CEF6B016f9cbA3718D4C',
    // Legacy aliases for backward compatibility
    nounsToken: import.meta.env.VITE_DAO_TOKEN_ADDRESS || '0xd0dda8e6b354c5f12787aaca936b711c831745ba',
    lawbToken: import.meta.env.VITE_ALTERED_TOKEN_ADDRESS || '0xea6c49afbfcbb51a77b8d7f1f6c3a381b627edff',
    baseToken: import.meta.env.VITE_PETTYFEST2_TOKEN_ADDRESS || '0xdcc199c1b19cea6115af0c000539e93df2291d26',
    nftCollection: import.meta.env.VITE_SCOOP_NFT_COLLECTION_ADDRESS || '0xafff7fb83b1270f65e214b30a643bba98887e0df',
  },
}

export const getChain = () => {
  return config.useTestnet ? baseSepolia : base
}


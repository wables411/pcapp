# Portion Club DAO Home

A production-ready Base Mini App for the Portion Club DAO, featuring onchain governance, NFT auctions, and a beautiful cypherpunk aesthetic.

## Features

- 🎨 **Cypherpunk Design**: Pure black background with neon green (#00ff41) accents
- 🖼️ **3D Visualizations**: React Three Fiber powered 3D scenes with interactive elements
- 💰 **Live Auctions**: Real-time bidding interface for Nouns-style auctions
- 🎨 **NFT Gallery**: Onchain NFT fetching with 3D previews
- 🗳️ **Governance**: Full proposal creation and voting system with IPFS integration
- 📱 **Mobile-First**: Responsive design with bottom navigation bar
- 🔗 **Wallet Integration**: WalletConnect v2, MetaMask, and Coinbase Wallet support

## Tech Stack

- **Framework**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS v3 + @tailwindcss/typography
- **Web3**: OnchainKit + wagmi + RainbowKit
- **3D**: React Three Fiber + @react-three/drei
- **Animations**: Framer Motion
- **Notifications**: Sonner
- **IPFS**: nft.storage

## Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- WalletConnect Project ID ([get one here](https://cloud.walletconnect.com))
- Alchemy API Key ([get one here](https://www.alchemy.com))
- NFT.Storage API Key ([get one here](https://nft.storage))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portion-club-subdao
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Fill in your environment variables:
```env
VITE_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
VITE_ALCHEMY_API_KEY=your_alchemy_api_key
VITE_NFT_STORAGE_KEY=your_nft_storage_key
VITE_USE_TESTNET=false
VITE_AUCTION_HOUSE_ADDRESS=0xd0dda8e6b354c5f12787aaca936b711c831745ba
VITE_NOUNS_TOKEN_ADDRESS=0xd0dda8e6b354c5f12787aaca936b711c831745ba
VITE_GOVERNOR_ADDRESS=0xd0dda8e6b354c5f12787aaca936b711c831745ba
VITE_LAWB_TOKEN_ADDRESS=0xea6c49afbfcbb51a77b8d7f1f6c3a381b627edff
VITE_BASE_TOKEN_ADDRESS=0xdcc199c1b19cea6115af0c000539e93df2291d26
VITE_NFT_COLLECTION_ADDRESS=0xafff7fb83b1270f65e214b30a643bba98887e0df
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Netlify (Recommended)

1. **Via GitHub (Automatic)**:
   - Push your code to GitHub
   - Connect your repository to Netlify
   - Add the following environment variables in Netlify dashboard:
     - `VITE_WALLET_CONNECT_PROJECT_ID`
     - `VITE_ALCHEMY_API_KEY`
     - `VITE_NFT_STORAGE_KEY`
     - `VITE_USE_TESTNET`
     - All contract addresses
   - Deploy! The GitHub Actions workflow will auto-deploy on push to `main`

2. **Via Netlify CLI**:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Manual Build

```bash
npm run build
```

The `dist` folder contains the production build ready to deploy to any static hosting service.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── 3d/             # React Three Fiber 3D components
│   ├── ErrorFallback.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── LoadingSkeleton.tsx
│   ├── MobileNav.tsx
│   └── MintButton.tsx
├── pages/              # Main tab pages
│   ├── BiddingTab.tsx
│   ├── GalleryTab.tsx
│   ├── ShowcasingTab.tsx
│   └── GovernanceTab.tsx
├── lib/                # Utilities and config
│   ├── config.ts
│   └── ipfs.ts
├── abi/                # Contract ABIs
│   ├── NounsAuctionHouse.json
│   ├── NounsToken.json
│   ├── NounsDAO.json
│   ├── ERC721.json
│   └── ERC20.json
├── App.tsx
├── main.tsx
└── index.css
```

## Contract Addresses

All contract addresses are configurable via environment variables. Default addresses are set for the Portion Club DAO on Base Mainnet.

## Features in Detail

### Bidding Tab
- Real-time auction data from Nouns-style auction house
- Live countdown timer
- Bid placement with minimum bid validation
- Auction history display

### Gallery Tab
- Onchain NFT fetching (no API dependencies)
- 3D interactive previews
- Infinite scroll with lazy loading
- Mint new NFTs directly from the interface

### Showcasing Tab
- Beautiful cards for featured projects
- Token information display
- Direct links to OpenSea and external sites
- 3D hover effects

### Governance Tab
- List all proposals (active and past)
- Create new proposals with IPFS upload
- Vote on proposals (For/Against/Abstain)
- 3D spinning vote counters
- Quorum requirements display

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```js
colors: {
  neon: {
    green: '#00ff41',  // Change this
    'green-glow': '#00ff4133',
  },
}
```

### Fonts
Fonts are loaded in `index.html`. Change the Google Fonts import to use different fonts.

### 3D Scenes
Modify components in `src/components/3d/` to customize 3D elements.

## Troubleshooting

### Wallet Connection Issues
- Ensure your WalletConnect Project ID is correct
- Check that you're on the correct network (Base Mainnet or Base Sepolia)

### Build Errors
- Make sure all environment variables are set
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

### 3D Rendering Issues
- Ensure your browser supports WebGL
- Check browser console for errors

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

---

**Built on Base** 🟦


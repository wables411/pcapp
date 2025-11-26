# Portion Club SubDAO

A production-ready Next.js 15 application for Portion Club SubDAO on Base, featuring live NFT auctions, interactive 3D models, and an accomplishments gallery.

## Features

- **Base Chain Integration**: Full support for Base mainnet (8453) and Sepolia (84532) with automatic network switching
- **Wallet Connection**: OnchainKit + RainbowKit with black/white styling
- **Live Auction**: Real-time bidding on Portion Club DAO NFTs using Nouns Protocol contracts
- **Interactive 3D**: React Three Fiber model viewer with orbit controls
- **Accomplishments Gallery**: Dynamic grid showcasing DAO votes, collections, and projects
- **Ambient Audio**: Dark oil-drip ambience with Howler.js
- **Oil-Spill Aesthetic**: Pure black/white theme with animated liquid blobs

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3.4+
- **Web3**: OnchainKit, wagmi, viem
- **3D**: React Three Fiber, Three.js
- **Animation**: Framer Motion
- **Audio**: Howler.js
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- WalletConnect Project ID (get from [cloud.walletconnect.com](https://cloud.walletconnect.com))
- Coinbase Developer Platform API Key (optional, for OnchainKit)

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

3. Create a `.env.local` file from `.env.example`:
```bash
cp .env.example .env.local
```

4. Fill in your environment variables:
```env
NEXT_PUBLIC_BASE_MAINNET_RPC=https://mainnet.base.org
NEXT_PUBLIC_BASE_SEPOLIA_RPC=https://sepolia.base.org
NEXT_PUBLIC_OPENSEA_API_KEY=your_opensea_api_key_optional
NEXT_PUBLIC_CDP_API_KEY=your_cdp_api_key_optional
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portion-club-subdao/
├── app/
│   ├── api/
│   │   └── opensea/
│   │       └── [slug]/
│   │           └── route.ts      # OpenSea API proxy
│   ├── auction/
│   │   └── page.tsx               # Live auction page
│   ├── gallery/
│   │   └── page.tsx               # Accomplishments gallery
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── providers.tsx              # Web3 providers
│   └── globals.css                # Global styles
├── components/
│   ├── AccomplishmentsGrid.tsx    # Gallery grid component
│   ├── AudioController.tsx        # Ambient audio controls
│   ├── InteractiveModel.tsx       # 3D model viewer
│   ├── NounsAuctionLive.tsx       # Live auction component
│   ├── OilSpillBackground.tsx     # Animated background
│   ├── TokenGrid.tsx              # Token grid for collections
│   └── WalletConnect.tsx           # Wallet connection UI
├── lib/
│   └── onchain.ts                 # Web3 configuration
├── public/
│   ├── audio/                     # Audio files
│   └── models/                    # 3D model files
├── netlify.toml                   # Netlify configuration
└── package.json
```

## Deployment to Netlify

### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

### Option 2: Deploy via Git

1. Push your code to GitHub/GitLab/Bitbucket

2. Connect your repository to Netlify:
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select your Git provider and repository

3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `20`

4. Add environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_BASE_MAINNET_RPC`
   - `NEXT_PUBLIC_BASE_SEPOLIA_RPC`
   - `NEXT_PUBLIC_OPENSEA_API_KEY` (optional)
   - `NEXT_PUBLIC_CDP_API_KEY` (optional)
   - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`

5. Deploy!

### Option 3: Deploy via Netlify Drop

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `.next` folder to [Netlify Drop](https://app.netlify.com/drop)

## Configuration

### Base Chain RPC URLs

Default RPC URLs are provided, but you can use custom endpoints for better performance:
- Alchemy: `https://base-mainnet.g.alchemy.com/v2/YOUR_API_KEY`
- Infura: `https://base-mainnet.infura.io/v3/YOUR_API_KEY`

### OpenSea API

The OpenSea API key is optional but recommended for higher rate limits. Get one at [opensea.io](https://opensea.io).

### WalletConnect Project ID

Required for wallet connections. Get one at [cloud.walletconnect.com](https://cloud.walletconnect.com).

## Customization

### Adding Audio Files

Place audio files in `/public/audio/`:
- `oil-drip-ambience.mp3` - Main ambient audio (placeholder included)
- `scoop-preview.mp3` - Scoop collection preview (placeholder included)
- `altered-preview.mp3` - Altered V2 collection preview (placeholder included)

**Note**: Placeholder silent audio files are included. Replace them with actual audio files for production.

### Adding 3D Models

Place GLB models in `/public/models/`:
- `oil-portions.glb` - Main 3D model (placeholder box geometry currently used)

**Note**: The app currently uses a placeholder 3D box. Replace `oil-portions.glb` with your actual GLB model file. The model will automatically load via `@react-three/drei`'s `useGLTF` hook if you update the `InteractiveModel` component.

### Styling

Customize colors in `tailwind.config.ts`:
```typescript
colors: {
  oil: {
    black: '#000000',
    dark: '#111111',
    gray: '#222222',
    white: '#FFFFFF',
  },
}
```

## Contract Addresses

- **Nouns Auction House (Base)**: `0xd0dda8e6b354c5f12787aaca936b711c831745ba`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.


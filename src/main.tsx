import React from 'react'
import ReactDOM from 'react-dom/client'
import { createConfig, WagmiProvider, http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { OnchainKitProvider } from '@coinbase/onchainkit'
import { base, baseSepolia } from 'wagmi/chains'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'
import '@rainbow-me/rainbowkit/styles.css'
import './index.css'
import App from './App'
import { config, getChain } from './lib/config'

const queryClient = new QueryClient()

const { wallets } = getDefaultWallets({
  appName: 'Portion Club DAO',
  projectId: config.walletConnectProjectId,
})

const wagmiConfig = createConfig({
  chains: [getChain()],
  connectors: [
    ...wallets.map((wallet) => wallet.connector),
    injected(),
    coinbaseWallet({ appName: 'Portion Club DAO' }),
    walletConnect({ projectId: config.walletConnectProjectId }),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <OnchainKitProvider
            apiKey={config.alchemyApiKey}
            chain={getChain()}
          >
            <App />
          </OnchainKitProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)


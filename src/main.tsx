import React from 'react'
import ReactDOM from 'react-dom/client'
import { createConfig, WagmiProvider, http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { base, baseSepolia } from 'wagmi/chains'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'
import '@rainbow-me/rainbowkit/styles.css'
import './index.css'
import App from './App'
import { config, getChain } from './lib/config'

const queryClient = new QueryClient()

const { connectors } = getDefaultWallets({
  appName: 'Portion Club DAO',
  projectId: config.walletConnectProjectId,
})

const wagmiConfig = createConfig({
  chains: [getChain()],
  connectors: [
    ...connectors,
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
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)


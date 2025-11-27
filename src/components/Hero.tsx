import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance } from 'wagmi'
import { formatEther } from 'viem'
import Hero3D from './3d/Hero3D'

function Hero() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })

  return (
    <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-heading font-black mb-4 neon-text">
          PORTION CLUB DAO
        </h1>
        <p className="text-xl md:text-2xl font-body mb-8 text-neon-green/80">
          Onchain Governance • Base Network
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <ConnectButton />
          
          {isConnected && address && (
            <div className="mt-4 p-4 neon-border rounded-lg bg-black/50 backdrop-blur-sm">
              <p className="text-sm font-body mb-2">
                <span className="text-gray-400">Address:</span>{' '}
                <span className="text-neon-green font-mono">{address.slice(0, 6)}...{address.slice(-4)}</span>
              </p>
              {balance && (
                <p className="text-sm font-body">
                  <span className="text-gray-400">Balance:</span>{' '}
                  <span className="text-neon-green font-mono">
                    {parseFloat(formatEther(balance.value)).toFixed(4)} ETH
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero


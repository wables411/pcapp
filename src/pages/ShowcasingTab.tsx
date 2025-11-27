import { useState } from 'react'
import { useReadContract } from 'wagmi'
import { formatEther, formatUnits } from 'viem'
import { motion } from 'framer-motion'
import { config } from '@/lib/config'
import ERC20ABI from '@/abi/ERC20.json'

function ShowcasingTab() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const { data: lawbSupply } = useReadContract({
    address: config.contracts.lawbToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'totalSupply',
  })

  const { data: baseSupply } = useReadContract({
    address: config.contracts.baseToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'totalSupply',
  })

  const cards = [
    {
      id: 1,
      title: 'lawb.xyz',
      type: 'website',
      url: 'https://lawb.xyz',
      iframe: true,
    },
    {
      id: 2,
      title: '$LAWB Token',
      type: 'token',
      address: config.contracts.lawbToken,
      supply: lawbSupply,
      opensea: `https://opensea.io/assets/base/${config.contracts.lawbToken}`,
    },
    {
      id: 3,
      title: 'Base Token',
      type: 'token',
      address: config.contracts.baseToken,
      supply: baseSupply,
      opensea: `https://opensea.io/assets/base/${config.contracts.baseToken}`,
    },
    {
      id: 4,
      title: 'NFT Collection',
      type: 'collection',
      address: config.contracts.nftCollection,
      opensea: `https://opensea.io/assets/base/${config.contracts.nftCollection}`,
    },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-heading font-bold neon-text mb-8">Showcase</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.02, rotateY: 2 }}
            onHoverStart={() => setActiveCard(card.id)}
            onHoverEnd={() => setActiveCard(null)}
            className="neon-border rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm ripple"
          >
            {card.type === 'website' && card.iframe ? (
              <div className="aspect-video">
                <iframe
                  src={card.url}
                  className="w-full h-full border-0"
                  title={card.title}
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-neon-green/20 to-black flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="text-3xl font-heading font-bold mb-4 neon-text">
                    {card.title}
                  </h3>
                  {card.type === 'token' && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400 font-body">
                        Total Supply
                      </p>
                      <p className="text-2xl font-mono text-neon-green">
                        {card.supply
                          ? formatUnits(card.supply, 18)
                          : 'Loading...'}
                      </p>
                    </div>
                  )}
                  {card.address && (
                    <p className="text-xs font-mono text-gray-500 mt-4 break-all">
                      {card.address}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="p-6 border-t border-neon-green/20">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-heading font-bold text-neon-green">
                  {card.title}
                </h4>
                <a
                  href={card.url || card.opensea}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neon-green text-black font-heading font-bold rounded-lg hover:neon-glow transition-all text-sm"
                >
                  View
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ShowcasingTab


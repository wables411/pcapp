import { useState, useEffect } from 'react'
import { useReadContract, useAccount } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { config } from '@/lib/config'
import NounsTokenABI from '@/abi/NounsToken.json'
import ERC721ABI from '@/abi/ERC721.json'
import NFTPreview3D from '@/components/3d/NFTPreview3D'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import MintButton from '@/components/MintButton'

interface NFT {
  tokenId: string
  imageUrl: string
  owner: string
}

function GalleryTab() {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const [page, setPage] = useState(0)
  const { address } = useAccount()

  const { data: totalSupply } = useReadContract({
    address: config.contracts.nounsToken as `0x${string}`,
    abi: NounsTokenABI,
    functionName: 'totalSupply',
  })

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!totalSupply) return

      setLoading(true)
      const tokenIds: string[] = []
      const total = Math.min(Number(totalSupply), 100) // Limit to 100 for performance

      for (let i = 0; i < total; i++) {
        tokenIds.push(i.toString())
      }

      const nftPromises = tokenIds.map(async (tokenId) => {
        try {
          // In a real implementation, you'd fetch tokenURI and resolve IPFS
          // For now, using a placeholder pattern
          const imageUrl = `https://api.zora.co/api/thumbnail/nouns/${tokenId}`
          
          return {
            tokenId,
            imageUrl,
            owner: '0x0000000000000000000000000000000000000000',
          }
        } catch (error) {
          console.error(`Error fetching NFT ${tokenId}:`, error)
          return null
        }
      })

      const results = await Promise.all(nftPromises)
      setNfts(results.filter((nft): nft is NFT => nft !== null))
      setLoading(false)
    }

    fetchNFTs()
  }, [totalSupply])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-heading font-bold neon-text">NFT Gallery</h2>
        <MintButton />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nfts.map((nft) => (
          <motion.div
            key={nft.tokenId}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="neon-border rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedNFT(nft)}
          >
            <div className="aspect-square relative">
              <img
                src={nft.imageUrl}
                alt={`Token #${nft.tokenId}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=NFT'
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2">
                <p className="text-xs font-mono text-neon-green">#{nft.tokenId}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedNFT && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedNFT(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="neon-border rounded-lg p-6 bg-black max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-square">
                  <Canvas>
                    <Suspense fallback={null}>
                      <NFTPreview3D
                        imageUrl={selectedNFT.imageUrl}
                        tokenId={selectedNFT.tokenId}
                      />
                    </Suspense>
                  </Canvas>
                </div>
                <div>
                  <h3 className="text-3xl font-heading font-bold mb-4 neon-text">
                    Token #{selectedNFT.tokenId}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 font-body mb-1">Owner</p>
                      <p className="font-mono text-neon-green break-all">
                        {selectedNFT.owner}
                      </p>
                    </div>
                    {address?.toLowerCase() === selectedNFT.owner.toLowerCase() && (
                      <button className="w-full px-4 py-2 bg-neon-green text-black font-heading font-bold rounded-lg hover:neon-glow transition-all">
                        Transfer
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedNFT(null)}
                className="absolute top-4 right-4 text-neon-green hover:text-white text-2xl"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GalleryTab


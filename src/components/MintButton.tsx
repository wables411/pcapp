import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { toast } from 'sonner'
import { config } from '@/lib/config'
import ERC721ABI from '@/abi/ERC721.json'

function MintButton() {
  const [minting, setMinting] = useState(false)
  const { address } = useAccount()
  const { writeContract, data: hash, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('NFT minted successfully!')
      setMinting(false)
    }
  }, [isSuccess])

  const handleMint = () => {
    if (!address) {
      toast.error('Please connect your wallet')
      return
    }

    setMinting(true)
    writeContract({
      address: config.contracts.nounsToken as `0x${string}`,
      abi: ERC721ABI,
      functionName: 'mint',
      args: [address],
    })
  }

  return (
    <button
      onClick={handleMint}
      disabled={isPending || isConfirming || minting || !address}
      className="px-6 py-3 bg-neon-green text-black font-heading font-bold rounded-lg hover:neon-glow glitch-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending || isConfirming || minting ? 'Minting...' : 'Mint NFT'}
    </button>
  )
}

export default MintButton


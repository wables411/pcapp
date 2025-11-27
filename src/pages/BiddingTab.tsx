import { useState, useEffect } from 'react'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatEther, parseEther } from 'viem'
import { toast } from 'sonner'
import { config } from '@/lib/config'
import NounsAuctionHouseABI from '@/abi/NounsAuctionHouse.json'
import LoadingSkeleton from '@/components/LoadingSkeleton'

function BiddingTab() {
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [bidAmount, setBidAmount] = useState<string>('')

  const { data: auction, refetch: refetchAuction } = useReadContract({
    address: config.contracts.auctionHouse as `0x${string}`,
    abi: NounsAuctionHouseABI,
    functionName: 'auction',
  })


  const { data: minBidIncrement } = useReadContract({
    address: config.contracts.auctionHouse as `0x${string}`,
    abi: NounsAuctionHouseABI,
    functionName: 'minBidIncrementPercentage',
  })

  const { writeContract, data: hash, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Bid placed successfully!')
      refetchAuction()
      setBidAmount('')
    }
  }, [isSuccess, refetchAuction])

  useEffect(() => {
    if (!auction || typeof auction !== 'object' || !('endTime' in auction)) return

    const updateTimer = () => {
      const now = Math.floor(Date.now() / 1000)
      const remaining = Number((auction as any).endTime) - now
      setTimeLeft(Math.max(0, remaining))
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [auction])

  const handleBid = () => {
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      toast.error('Please enter a valid bid amount')
      return
    }

    const currentBid = auction && typeof auction === 'object' && 'amount' in auction && auction.amount ? parseFloat(formatEther(auction.amount as bigint)) : 0
    const minBid = currentBid * (1 + (minBidIncrement ? Number(minBidIncrement) / 100 : 0.05))

    if (parseFloat(bidAmount) < minBid) {
      toast.error(`Minimum bid is ${minBid.toFixed(4)} ETH`)
      return
    }

    writeContract({
      address: config.contracts.auctionHouse as `0x${string}`,
      abi: NounsAuctionHouseABI,
      functionName: 'createBid',
      value: parseEther(bidAmount),
    })
  }

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (days > 0) return `${days}d ${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`
    if (minutes > 0) return `${minutes}m ${secs}s`
    return `${secs}s`
  }

  if (!auction || typeof auction !== 'object') {
    return <LoadingSkeleton />
  }

  const auctionData = auction as any
  const currentBid = auctionData.amount ? parseFloat(formatEther(auctionData.amount)) : 0
  const minBid = currentBid * (1 + (minBidIncrement ? Number(minBidIncrement) / 100 : 0.05))

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-heading font-bold neon-text mb-8">Live Auction</h2>

      <div className="neon-border rounded-lg p-6 bg-black/50 backdrop-blur-sm">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-400 font-body mb-1">Token ID</p>
              <p className="text-2xl font-heading font-bold text-neon-green">
                #{(auctionData.nounId as bigint)?.toString() || '0'}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-400 font-body mb-1">Current Bid</p>
              <p className="text-3xl font-heading font-bold text-neon-green">
                {currentBid.toFixed(4)} ETH
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-400 font-body mb-1">Time Remaining</p>
              <p className="text-2xl font-heading font-bold text-neon-green">
                {formatTime(timeLeft)}
              </p>
            </div>

            {auctionData.bidder && auctionData.bidder !== '0x0000000000000000000000000000000000000000' && (
              <div className="mb-4">
                <p className="text-sm text-gray-400 font-body mb-1">Bidder</p>
                <p className="text-sm font-mono text-neon-green break-all">
                  {auctionData.bidder}
                </p>
              </div>
            )}
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-sm font-body mb-2 text-gray-400">
                Your Bid (ETH)
              </label>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={minBid.toFixed(4)}
                min={minBid}
                step="0.001"
                className="w-full px-4 py-3 bg-black border border-neon-green/50 rounded-lg text-neon-green font-mono focus:outline-none focus:neon-glow"
              />
              <p className="text-xs text-gray-500 mt-1 font-body">
                Minimum: {minBid.toFixed(4)} ETH
              </p>
            </div>

            <button
              onClick={handleBid}
              disabled={isPending || isConfirming || !bidAmount}
              className="w-full px-6 py-4 bg-neon-green text-black font-heading font-bold rounded-lg hover:neon-glow glitch-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending || isConfirming ? 'Processing...' : 'Place Bid'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-heading font-bold mb-4">Recent Auctions</h3>
        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="neon-border rounded p-4 bg-black/30 backdrop-blur-sm"
            >
              <div className="flex justify-between items-center">
                <span className="font-body text-neon-green">Token #{i + 1}</span>
                <span className="font-mono text-gray-400">Settled</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BiddingTab


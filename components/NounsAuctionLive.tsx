'use client';

import { useEffect, useState } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { NOUNS_AUCTION_HOUSE } from '@/lib/onchain';

// Simplified ABI for Nouns Auction House
const AUCTION_HOUSE_ABI = [
  {
    inputs: [],
    name: 'auction',
    outputs: [
      { name: 'nounId', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
      { name: 'startTime', type: 'uint256' },
      { name: 'endTime', type: 'uint256' },
      { name: 'bidder', type: 'address' },
      { name: 'settled', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'createBid',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;

export function NounsAuctionLive() {
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const { data: auction, refetch } = useReadContract({
    address: NOUNS_AUCTION_HOUSE,
    abi: AUCTION_HOUSE_ABI,
    functionName: 'auction',
  });

  const { writeContract, data: hash, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      refetch();
      setBidAmount('');
    }
  }, [isConfirmed, refetch]);

  useEffect(() => {
    if (!auction || !auction.endTime) return;

    const updateTimeLeft = () => {
      const now = Math.floor(Date.now() / 1000);
      const end = Number(auction.endTime);
      const remaining = Math.max(0, end - now);
      setTimeLeft(remaining);
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [auction]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const handleBid = async () => {
    if (!bidAmount || !writeContract) return;

    try {
      await writeContract({
        address: NOUNS_AUCTION_HOUSE,
        abi: AUCTION_HOUSE_ABI,
        functionName: 'createBid',
        value: parseEther(bidAmount),
      });
    } catch (error) {
      console.error('Bid failed:', error);
    }
  };

  const currentBid = auction ? formatEther(auction.amount as bigint) : '0';
  const minBid = auction ? formatEther((auction.amount as bigint) + parseEther('0.01')) : '0';

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-8">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">Live Auction</h2>

      {auction ? (
        <div className="space-y-6">
          <div className="border border-oil-white/20 p-6 bg-oil-gray/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-oil-white/60 mb-2">Noun ID</p>
                <p className="text-2xl font-bold">#{auction.nounId?.toString() || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-oil-white/60 mb-2">Current Bid</p>
                <p className="text-2xl font-bold">{currentBid} ETH</p>
              </div>
              <div>
                <p className="text-sm text-oil-white/60 mb-2">Time Remaining</p>
                <p className="text-2xl font-bold">
                  {timeLeft !== null ? formatTime(timeLeft) : 'Loading...'}
                </p>
              </div>
              <div>
                <p className="text-sm text-oil-white/60 mb-2">Minimum Bid</p>
                <p className="text-2xl font-bold">{minBid} ETH</p>
              </div>
            </div>
          </div>

          <div className="border border-oil-white/20 p-6 bg-oil-gray/30">
            <h3 className="text-xl font-bold mb-4">Place Bid</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="number"
                step="0.01"
                min={minBid}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={`Min: ${minBid} ETH`}
                className="flex-1 px-4 py-3 bg-oil-black border border-oil-white/20 text-oil-white font-mono focus:outline-none focus:border-oil-white"
              />
              <button
                onClick={handleBid}
                disabled={!bidAmount || parseFloat(bidAmount) < parseFloat(minBid) || isPending || isConfirming}
                className="px-8 py-3 bg-oil-white text-oil-black font-mono font-bold hover:bg-oil-gray hover:text-oil-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Confirming...' : isConfirming ? 'Processing...' : 'Place Bid'}
              </button>
            </div>
            {isConfirmed && (
              <p className="mt-4 text-green-400 text-sm">Bid placed successfully!</p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-oil-white/60">Loading auction data...</p>
        </div>
      )}
    </div>
  );
}


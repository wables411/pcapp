import { useState, useEffect } from 'react'
import { useReadContract, useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { formatEther } from 'viem'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { config } from '@/lib/config'
import NounsDAOABI from '@/abi/NounsDAO.json'
import Proposal3D from '@/components/3d/Proposal3D'
import { uploadProposalToIPFS } from '@/lib/ipfs'
import LoadingSkeleton from '@/components/LoadingSkeleton'

interface Proposal {
  id: number
  title: string
  description: string
  proposer: string
  forVotes: bigint
  againstVotes: bigint
  abstainVotes: bigint
  status: string
  endBlock: bigint
}

function GovernanceTab() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [proposalTitle, setProposalTitle] = useState('')
  const [proposalDescription, setProposalDescription] = useState('')
  const { address } = useAccount()

  const { data: proposalCount } = useReadContract({
    address: config.contracts.governor as `0x${string}`,
    abi: NounsDAOABI,
    functionName: 'proposalCount',
  })

  const { data: quorumVotes } = useReadContract({
    address: config.contracts.governor as `0x${string}`,
    abi: NounsDAOABI,
    functionName: 'quorumVotes',
  })

  const { writeContract, data: hash, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    const fetchProposals = async () => {
      if (!proposalCount) return

      setLoading(true)
      const proposalList: Proposal[] = []

      for (let i = Number(proposalCount); i > 0 && i > Number(proposalCount) - 20; i--) {
        try {
          const proposal = await fetch(`/api/proposal/${i}`).catch(() => null)
          // In real implementation, fetch from contract
          proposalList.push({
            id: i,
            title: `Proposal #${i}`,
            description: 'Proposal description...',
            proposer: '0x0000000000000000000000000000000000000000',
            forVotes: BigInt(0),
            againstVotes: BigInt(0),
            abstainVotes: BigInt(0),
            status: 'Active',
            endBlock: BigInt(0),
          })
        } catch (error) {
          console.error(`Error fetching proposal ${i}:`, error)
        }
      }

      setProposals(proposalList)
      setLoading(false)
    }

    fetchProposals()
  }, [proposalCount])

  const handleCreateProposal = async () => {
    if (!proposalTitle || !proposalDescription) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      toast.loading('Uploading to IPFS...')
      const ipfsHash = await uploadProposalToIPFS(proposalTitle, proposalDescription)

      writeContract({
        address: config.contracts.governor as `0x${string}`,
        abi: NounsDAOABI,
        functionName: 'propose',
        args: [
          [], // targets
          [], // values
          [], // signatures
          [], // calldatas
          ipfsHash, // description
        ],
      })
    } catch (error: any) {
      toast.error(error.message || 'Failed to create proposal')
    }
  }

  const handleVote = (proposalId: number, support: 0 | 1 | 2) => {
    writeContract({
      address: config.contracts.governor as `0x${string}`,
      abi: NounsDAOABI,
      functionName: 'castVote',
      args: [BigInt(proposalId), support],
    })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Transaction successful!')
      setShowCreateModal(false)
      setProposalTitle('')
      setProposalDescription('')
    }
  }, [isSuccess])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-heading font-bold neon-text">Governance</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-neon-green text-black font-heading font-bold rounded-lg hover:neon-glow glitch-hover transition-all"
        >
          Create Proposal
        </button>
      </div>

      {quorumVotes && (
        <div className="neon-border rounded-lg p-4 bg-black/50 backdrop-blur-sm mb-6">
          <p className="text-sm text-gray-400 font-body">
            Quorum Required: <span className="text-neon-green font-mono">{formatEther(quorumVotes)} votes</span>
          </p>
        </div>
      )}

      <div className="space-y-4">
        {proposals.map((proposal) => (
          <motion.div
            key={proposal.id}
            whileHover={{ scale: 1.01 }}
            className="neon-border rounded-lg p-6 bg-black/50 backdrop-blur-sm"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-heading font-bold mb-2 neon-text">
                  {proposal.title}
                </h3>
                <p className="text-sm text-gray-400 font-body mb-4">
                  {proposal.description}
                </p>
                <div className="flex gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 font-body">Proposer</p>
                    <p className="text-xs font-mono text-neon-green break-all">
                      {proposal.proposer.slice(0, 6)}...{proposal.proposer.slice(-4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-body">Status</p>
                    <p className="text-sm font-body text-neon-green">{proposal.status}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="h-48 mb-4">
                  <Canvas>
                    <Suspense fallback={null}>
                      <Proposal3D
                        forVotes={Number(proposal.forVotes)}
                        againstVotes={Number(proposal.againstVotes)}
                        abstainVotes={Number(proposal.abstainVotes)}
                      />
                    </Suspense>
                  </Canvas>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-body">For</span>
                    <span className="text-neon-green font-mono">{formatEther(proposal.forVotes)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-body">Against</span>
                    <span className="text-red-400 font-mono">{formatEther(proposal.againstVotes)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-body">Abstain</span>
                    <span className="text-yellow-400 font-mono">{formatEther(proposal.abstainVotes)}</span>
                  </div>
                </div>

                {address && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVote(proposal.id, 1)}
                      disabled={isPending || isConfirming}
                      className="flex-1 px-3 py-2 bg-neon-green text-black font-body font-bold rounded text-sm hover:neon-glow transition-all disabled:opacity-50"
                    >
                      For
                    </button>
                    <button
                      onClick={() => handleVote(proposal.id, 0)}
                      disabled={isPending || isConfirming}
                      className="flex-1 px-3 py-2 bg-red-500 text-white font-body font-bold rounded text-sm hover:opacity-80 transition-all disabled:opacity-50"
                    >
                      Against
                    </button>
                    <button
                      onClick={() => handleVote(proposal.id, 2)}
                      disabled={isPending || isConfirming}
                      className="flex-1 px-3 py-2 bg-yellow-500 text-black font-body font-bold rounded text-sm hover:opacity-80 transition-all disabled:opacity-50"
                    >
                      Abstain
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="neon-border rounded-lg p-6 bg-black max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-heading font-bold mb-4 neon-text">
                Create Proposal
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-body mb-2 text-gray-400">
                    Title
                  </label>
                  <input
                    type="text"
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-neon-green/50 rounded-lg text-neon-green font-body focus:outline-none focus:neon-glow"
                    placeholder="Proposal title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-body mb-2 text-gray-400">
                    Description (Markdown supported)
                  </label>
                  <textarea
                    value={proposalDescription}
                    onChange={(e) => setProposalDescription(e.target.value)}
                    rows={10}
                    className="w-full px-4 py-3 bg-black border border-neon-green/50 rounded-lg text-neon-green font-body focus:outline-none focus:neon-glow"
                    placeholder="Describe your proposal..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleCreateProposal}
                    disabled={isPending || isConfirming || !proposalTitle || !proposalDescription}
                    className="flex-1 px-6 py-3 bg-neon-green text-black font-heading font-bold rounded-lg hover:neon-glow transition-all disabled:opacity-50"
                  >
                    {isPending || isConfirming ? 'Creating...' : 'Create Proposal'}
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 border border-neon-green text-neon-green font-heading font-bold rounded-lg hover:bg-neon-green/10 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GovernanceTab


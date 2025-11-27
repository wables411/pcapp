import { NFTStorage } from 'nft.storage'

const NFT_STORAGE_KEY = import.meta.env.VITE_NFT_STORAGE_KEY || ''

export const uploadToIPFS = async (data: { name: string; description: string; properties?: any }) => {
  if (!NFT_STORAGE_KEY) {
    throw new Error('NFT Storage key not configured')
  }

  const client = new NFTStorage({ token: NFT_STORAGE_KEY })
  
  const metadata = {
    name: data.name,
    description: data.description,
    properties: data.properties || {},
  }

  const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  const file = new File([blob], 'metadata.json', { type: 'application/json' })

  const cid = await client.storeBlob(file)
  return `ipfs://${cid}`
}

export const uploadProposalToIPFS = async (title: string, description: string, actions?: any[]) => {
  return uploadToIPFS({
    name: title,
    description,
    properties: {
      type: 'proposal',
      actions: actions || [],
      timestamp: Date.now(),
    },
  })
}


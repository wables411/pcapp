const NFT_STORAGE_KEY = import.meta.env.VITE_NFT_STORAGE_KEY || ''

export const uploadToIPFS = async (data: { name: string; description: string; properties?: any }) => {
  if (!NFT_STORAGE_KEY) {
    throw new Error('NFT Storage key not configured')
  }

  const metadata = {
    name: data.name,
    description: data.description,
    properties: data.properties || {},
  }

  const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  const file = new File([blob], 'metadata.json', { type: 'application/json' })

  // Use NFT.Storage API directly via fetch (browser-compatible, no native deps)
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('https://api.nft.storage/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NFT_STORAGE_KEY}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Failed to upload to IPFS')
  }

  const result = await response.json()
  return `ipfs://${result.value.cid}`
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


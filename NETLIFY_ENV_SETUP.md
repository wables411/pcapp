# Netlify Environment Variables Setup

## Required Environment Variables

Set these EXACT variables in Netlify Dashboard:

**Site settings → Environment variables → Add variable**

### Wallet & Chain Configuration
```
VITE_WALLET_CONNECT_PROJECT_ID=0bd3db52203c2e873641003e905a390a
VITE_ALCHEMY_API_KEY=hxD69DALVw-Hr0FLVHY7P
VITE_NFT_STORAGE_KEY=7aeb3991.db54af9a0f7b44deb94a160c1a918154
VITE_USE_TESTNET=false
```

### Contract Addresses (Base Mainnet)
```
VITE_AUCTION_HOUSE_ADDRESS=0x32c13e8aea51d806a2e7cbee03792527981fc109
VITE_DAO_TOKEN_ADDRESS=0xd0dda8e6b354c5f12787aaca936b711c831745ba
VITE_GOVERNOR_ADDRESS=0x0ef3151bba12d7ec3bcc220fb82fcb8009a51f28
VITE_TREASURY_ADDRESS=0xc946a8e7f101d888f65c6d313ea78a37473c5906
VITE_LAWBSTERS_NFT_CONTRACT=0x0ef7ba09c38624b8e9cc4985790a2f5dbfc1dc42
VITE_ALTERED_TOKEN_ADDRESS=0xea6c49afbfcbb51a77b8d7f1f6c3a381b627edff
VITE_PETTYFEST2_TOKEN_ADDRESS=0xdcc199c1b19cea6115af0c000539e93df2291d26
VITE_SCOOP_NFT_COLLECTION_ADDRESS=0xafff7fb83b1270f65e214b30a643bba98887e0df
VITE_FREQUENTFLYERS_COLLECTION_ADDRESS=0xf6F260643F5f666C0828CEF6B016f9cbA3718D4C
```

## Quick Setup Steps

1. Go to https://app.netlify.com
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add variable** for each variable above
5. Copy the exact key and value from above
6. Set scope to **All scopes** (or Production only if preferred)
7. Click **Save**
8. Trigger a new deploy

## Why This Fixes the Secret Scanner Issue

Netlify's secret scanner flags `VITE_*` variables when they're referenced in code but not set in the dashboard. Once all variables are properly configured in Netlify's environment variables, the scanner will recognize them as intentionally configured values and the build will pass.


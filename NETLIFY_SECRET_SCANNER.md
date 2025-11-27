# Netlify Secret Scanner Configuration

## Issue
Netlify's secret scanner is detecting `VITE_` environment variables as potentially exposed secrets. This is a **false positive** - these variables are intentionally public client-side variables that get bundled into the JavaScript, which is normal behavior for Vite apps.

## Solution

### Option 1: Set Environment Variables in Netlify Dashboard (Required First Step)

**All `VITE_*` variables MUST be set in Netlify's dashboard before building:**

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables** → **Add variable**
3. Add each variable with its actual value:
   - `VITE_WALLET_CONNECT_PROJECT_ID` = (your actual project ID)
   - `VITE_ALCHEMY_API_KEY` = (your actual Alchemy key)
   - `VITE_NFT_STORAGE_KEY` = (your actual NFT.Storage key)
   - `VITE_USE_TESTNET` = `false`
   - `VITE_AUCTION_HOUSE_ADDRESS` = `0xd0dda8e6b354c5f12787aaca936b711c831745ba`
   - `VITE_NOUNS_TOKEN_ADDRESS` = `0xd0dda8e6b354c5f12787aaca936b711c831745ba`
   - `VITE_GOVERNOR_ADDRESS` = `0xd0dda8e6b354c5f12787aaca936b711c831745ba`
   - `VITE_LAWB_TOKEN_ADDRESS` = `0xea6c49afbfcbb51a77b8d7f1f6c3a381b627edff`
   - `VITE_BASE_TOKEN_ADDRESS` = `0xdcc199c1b19cea6115af0c000539e93df2291d26`
   - `VITE_NFT_COLLECTION_ADDRESS` = `0xafff7fb83b1270f65e214b30a643bba98887e0df`

**Why this helps:** When variables are properly set in the dashboard, Netlify's scanner is less likely to flag them as exposed secrets.

### Option 2: Contact Netlify Support to Whitelist VITE_ Pattern

If the scanner still fails after setting variables in the dashboard:

1. Contact Netlify support via your dashboard
2. Request to whitelist `VITE_*` variable patterns
3. Explain: "These are public client-side variables for a Vite app, intentionally bundled into JavaScript"

### Option 2: Contact Netlify Support

If you prefer to keep secret scanning enabled but whitelist `VITE_` variables:

1. Contact Netlify support
2. Request to whitelist `VITE_*` patterns in the secret scanner
3. Explain that these are public client-side variables for Vite apps

### Option 3: Use Netlify's Environment Variable UI

Make sure all `VITE_` variables are set in Netlify's dashboard (Site settings → Environment variables), not hardcoded in the source code. The scanner may be less sensitive if variables are properly configured in the dashboard.

## Why This Happens

- Vite bundles `VITE_*` environment variables into client-side JavaScript
- This is **expected behavior** - these variables are meant to be public
- Netlify's secret scanner detects patterns that look like API keys/secrets
- The scanner doesn't distinguish between server-side secrets and public client-side variables

## Variables That Are Safe to Expose

All `VITE_*` variables in this project are safe to expose:
- `VITE_WALLET_CONNECT_PROJECT_ID` - Public project ID
- `VITE_ALCHEMY_API_KEY` - Public RPC API key (rate-limited, not a secret)
- `VITE_NFT_STORAGE_KEY` - Public IPFS upload key (can be regenerated)
- Contract addresses - All public on-chain addresses
- `VITE_USE_TESTNET` - Public configuration flag

These are **not secrets** - they're public configuration values that are meant to be in the client bundle.


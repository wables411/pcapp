# Netlify Secret Scanner Configuration

## Issue
Netlify's secret scanner is detecting `VITE_` environment variables as potentially exposed secrets. This is a **false positive** - these variables are intentionally public client-side variables that get bundled into the JavaScript, which is normal behavior for Vite apps.

## Solution

### Option 1: Disable Secret Scanning (Recommended for Vite apps)

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Build & deploy** → **Environment**
3. Add this environment variable:
   - **Key**: `NETLIFY_SECRET_SCANNER_SKIP`
   - **Value**: `true`
   - **Scope**: All scopes

This will disable the secret scanner for your builds.

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


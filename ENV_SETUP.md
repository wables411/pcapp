# Environment Variables Setup Guide

## Quick Setup Checklist

### ✅ Step 1: Local Development
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your real values (NEVER commit this file!)
```

### ✅ Step 2: Netlify Dashboard Setup

1. **Go to Netlify Dashboard:**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Select your site (or create a new one)

2. **Navigate to Environment Variables:**
   - Site settings → **Environment variables** → **Add variable**

3. **Add these variables:**
   ```
   VITE_WALLET_CONNECT_PROJECT_ID = your_actual_project_id
   VITE_ALCHEMY_API_KEY = your_actual_alchemy_key
   VITE_NFT_STORAGE_KEY = your_actual_nft_storage_key
   VITE_USE_TESTNET = false
   VITE_AUCTION_HOUSE_ADDRESS = 0xd0dda8e6b354c5f12787aaca936b711c831745ba
   VITE_NOUNS_TOKEN_ADDRESS = 0xd0dda8e6b354c5f12787aaca936b711c831745ba
   VITE_GOVERNOR_ADDRESS = 0xd0dda8e6b354c5f12787aaca936b711c831745ba
   VITE_LAWB_TOKEN_ADDRESS = 0xea6c49afbfcbb51a77b8d7f1f6c3a381b627edff
   VITE_BASE_TOKEN_ADDRESS = 0xdcc199c1b19cea6115af0c000539e93df2291d26
   VITE_NFT_COLLECTION_ADDRESS = 0xafff7fb83b1270f65e214b30a643bba98887e0df
   ```

4. **Set Scope:**
   - Choose **"All scopes"** for all variables (or set production-only for sensitive ones)

### ✅ Step 3: GitHub Secrets Setup

1. **Go to GitHub Repository:**
   - Visit your repo on GitHub
   - Click **Settings** → **Secrets and variables** → **Actions**

2. **Add Repository Secrets:**
   Click **New repository secret** for each:

   **Required for Build:**
   - `VITE_WALLET_CONNECT_PROJECT_ID` → Your WalletConnect Project ID
   - `VITE_ALCHEMY_API_KEY` → Your Alchemy API Key
   - `VITE_NFT_STORAGE_KEY` → Your NFT.Storage API Key

   **Required for Deployment:**
   - `NETLIFY_AUTH_TOKEN` → Get from Netlify (see below)
   - `NETLIFY_SITE_ID` → Get from Netlify (see below)

3. **Get Netlify Credentials:**

   **NETLIFY_AUTH_TOKEN:**
   - Go to [app.netlify.com/user/applications](https://app.netlify.com/user/applications)
   - Click **New access token**
   - Give it a name (e.g., "GitHub Actions")
   - Copy the token (you'll only see it once!)
   - Paste into GitHub Secret `NETLIFY_AUTH_TOKEN`

   **NETLIFY_SITE_ID:**
   - Go to your site in Netlify
   - Site settings → **General** → **Site details**
   - Copy the **Site ID**
   - Paste into GitHub Secret `NETLIFY_SITE_ID`

## 🔐 Security Best Practices

### Why This Setup is Safe:

1. **Netlify Dashboard:**
   - Variables are encrypted at rest
   - Only accessible to authorized team members
   - Automatically injected during build
   - Can set different values per environment

2. **GitHub Secrets:**
   - Encrypted and only accessible to GitHub Actions
   - Never exposed in logs or output
   - Can be restricted to specific environments
   - Audit trail of who accessed them

3. **Local `.env`:**
   - Gitignored (never committed)
   - Only on your local machine
   - Use for development only

### ⚠️ Important Notes:

- **VITE_ prefix means client-exposed:** These variables are bundled into your client-side code and visible in the browser. Only use non-sensitive public keys.
- **Never commit `.env` files** - Already in `.gitignore`
- **Rotate keys regularly** - Especially if shared or exposed
- **Use different keys for dev/prod** - Never use production keys locally

## 🧪 Testing Your Setup

### Test Local:
```bash
npm run dev
# Check browser console - should see your WalletConnect project ID in network requests
```

### Test Netlify:
1. Push to GitHub
2. Check GitHub Actions workflow runs successfully
3. Check Netlify deploy logs for environment variables
4. Visit deployed site and test wallet connection

## 🔄 Updating Variables

### Update in Netlify:
1. Go to Site settings → Environment variables
2. Click the variable name
3. Update value
4. Redeploy (or wait for next deploy)

### Update in GitHub:
1. Go to Settings → Secrets and variables → Actions
2. Click the secret name
3. Click **Update**
4. Enter new value
5. Save

## 🆘 Troubleshooting

### Variables not working in Netlify?
- ✅ Check variable names match exactly (case-sensitive)
- ✅ Ensure scope is set correctly
- ✅ Redeploy after adding variables
- ✅ Check build logs for errors

### GitHub Actions failing?
- ✅ Verify all secrets are set in GitHub
- ✅ Check secret names match workflow file exactly
- ✅ Ensure NETLIFY_AUTH_TOKEN has correct permissions
- ✅ Check workflow logs for specific errors

### Local development issues?
- ✅ Ensure `.env` file exists in project root
- ✅ Check variable names start with `VITE_`
- ✅ Restart dev server after changing `.env`
- ✅ Verify `.env` is not committed to git

## 📚 Additional Resources

- [Netlify Environment Variables Docs](https://docs.netlify.com/environment-variables/overview/)
- [GitHub Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)


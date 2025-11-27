# How to Fix Netlify Build Cache Issue

## Option 1: Trigger a New Deploy (Easiest)
1. Go to your Netlify dashboard
2. Click on **Deploys** tab
3. Click **Trigger deploy** → **Deploy site**
4. This will create a fresh build with the latest code

## Option 2: Clear Cache via Netlify CLI
If you have Netlify CLI installed:
```bash
netlify cache:clean
```

## Option 3: Manual Cache Clear (If Available)
1. Go to **Site settings** → **Build & deploy**
2. Look for **Build settings** section
3. Scroll down to find **Clear cache and retry deploy** button
4. Or look in **Deploys** tab for a "Clear cache" option on a specific deploy

## Option 4: Check for Build Command Override
The build might be using a cached command from dashboard settings:

1. Go to **Site settings** → **Build & deploy** → **Build settings**
2. Check if there's a **Build command** field that's overriding `netlify.toml`
3. If there is, either:
   - Delete it (let `netlify.toml` control it)
   - Or update it to: `npm ci && npm run build`

## Option 5: Force Cache Clear via Environment Variable
Add a dummy environment variable to force a cache clear:
1. Go to **Site settings** → **Environment variables**
2. Add a temporary variable like `CACHE_BUST=1`
3. Save and trigger a new deploy
4. Remove it after the build succeeds

## Current Configuration
Your `netlify.toml` has:
```toml
[build]
  command = "npm ci && npm run build"
```

Your `.npmrc` has:
```
ignore-scripts=true
```

This should skip all native module builds including `ffi-napi`.

## Verify the Fix Worked
After deploying, check the build logs. You should see:
- `npm ci` running without trying to compile `ffi-napi`
- Build completing successfully
- No `ffi-napi` compilation errors


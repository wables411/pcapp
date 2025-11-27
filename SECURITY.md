# Environment Variables Security Guide

## 🚨 CRITICAL: Never Commit Secrets

**NEVER** commit `.env` files or any files containing real API keys, private keys, or secrets to Git.

## ✅ Safe Practices

### 1. Local Development

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in your real values in `.env`** (this file is gitignored)

3. **Never commit `.env`** - it's already in `.gitignore`

### 2. Netlify Deployment

#### Option A: Netlify Dashboard (Recommended)

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add each variable:
   - Click **Add variable**
   - Enter variable name (e.g., `VITE_WALLET_CONNECT_PROJECT_ID`)
   - Enter the value
   - Select scope (All scopes, or specific deploy contexts)
   - Click **Save**

**Advantages:**
- ✅ Encrypted at rest
- ✅ Only accessible to authorized team members
- ✅ Can set different values for production/preview
- ✅ No risk of accidental exposure

#### Option B: Netlify CLI (For automation)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Set variables (one at a time)
netlify env:set VITE_WALLET_CONNECT_PROJECT_ID "your_value_here"

# Or set from file (be careful!)
netlify env:import .env.production
```

### 3. GitHub Secrets (For CI/CD)

GitHub Secrets are used by GitHub Actions workflows:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret:
   - Name: `VITE_WALLET_CONNECT_PROJECT_ID`
   - Value: Your actual value
   - Click **Add secret**

**Required GitHub Secrets for this project:**
- `VITE_WALLET_CONNECT_PROJECT_ID`
- `VITE_ALCHEMY_API_KEY`
- `VITE_NFT_STORAGE_KEY`
- `NETLIFY_AUTH_TOKEN` (from Netlify dashboard → User settings → Applications)
- `NETLIFY_SITE_ID` (from Netlify site settings → General → Site details)

### 4. Environment Variable Scopes

#### Netlify Scopes:
- **All scopes**: Available to all deploys
- **Production**: Only production deploys
- **Branch deploys**: Only branch previews
- **Deploy previews**: Only PR previews

#### GitHub Secrets:
- **Repository secrets**: Available to all workflows in the repo
- **Environment secrets**: Can be restricted to specific environments
- **Organization secrets**: Shared across org repos

## 🔒 Security Best Practices

### ✅ DO:
- Use `.env.example` as a template (no real values)
- Keep `.env` in `.gitignore`
- Use Netlify dashboard for production secrets
- Use GitHub Secrets for CI/CD
- Rotate keys regularly
- Use different keys for dev/staging/production
- Limit access to secrets (principle of least privilege)
- Use environment-specific values when possible

### ❌ DON'T:
- Commit `.env` files
- Share secrets in Slack/Discord/email
- Hardcode secrets in source code
- Use production keys in development
- Commit secrets in git history (use `git-secrets` if needed)
- Store secrets in client-side code (they're exposed in the bundle)

## 🛡️ Vite-Specific Notes

Since this project uses Vite, note that:

1. **Only `VITE_*` variables are exposed to the client**
   - These are bundled into the client-side code
   - Anyone can see them in the browser
   - Only use public/non-sensitive values with `VITE_` prefix

2. **Server-side secrets should NEVER use `VITE_` prefix**
   - If you add server-side functionality later, use different variable names
   - Keep server secrets on the server only

## 🔄 Rotating Secrets

If a secret is compromised:

1. **Immediately revoke/regenerate** the key in the service dashboard
2. **Update** the value in Netlify/GitHub
3. **Redeploy** the application
4. **Review** git history for any accidental commits (use `git-secrets`)

## 📋 Checklist

Before deploying:

- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` exists with placeholder values
- [ ] All required variables are set in Netlify
- [ ] All required secrets are set in GitHub
- [ ] No secrets are hardcoded in source code
- [ ] Different keys used for dev/prod
- [ ] Team members know not to commit secrets

## 🆘 If You Accidentally Committed Secrets

1. **Immediately revoke** the exposed secrets
2. **Remove from git history:**
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env" \
     --prune-empty --tag-name-filter cat -- --all
   ```
3. **Force push** (coordinate with team first!)
4. **Regenerate** all exposed secrets
5. **Update** all services with new values

## 📚 Additional Resources

- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [GitHub Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)


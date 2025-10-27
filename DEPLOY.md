# 🚀 Quick Deploy to Railway - Full-Stack Monorepo

This app deploys as a **single service** - the backend serves the React frontend!

## Option 1: Automated Script (Recommended)

```bash
cd /Users/braydonviragh/Documents/sites/MedicalUI

# First, login to Railway (this will open a browser)
npx @railway/cli login

# Then run the deployment script
./deploy-railway.sh
```

## Option 2: Manual CLI Deployment

```bash
cd /Users/braydonviragh/Documents/sites/MedicalUI

# Login to Railway
npx @railway/cli login

# Initialize Railway project
npx @railway/cli init

# Deploy the app
npx @railway/cli up

# Generate public URL
npx @railway/cli domain
```

## Option 3: Railway Web Dashboard

1. Go to https://railway.app/new
2. Deploy from GitHub: `braydonviragh/react-js-medical-ui`
3. Railway will auto-detect the configuration
4. Click "Deploy"
5. Once deployed, generate a domain in the settings

## What Gets Deployed

✅ **Single Service** with:
- React frontend (served at `/`)
- Express API (at `/api/*`)
- Health check (at `/health`)

No CORS issues, no environment variables needed! 🎉

---

**Full Documentation**: See `RAILWAY_DEPLOYMENT_GUIDE.md` for detailed instructions.


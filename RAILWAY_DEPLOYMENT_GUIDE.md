# Railway Deployment Guide - Medical UI Full-Stack App

## 🎯 Overview

This Medical UI application is configured as a **full-stack monorepo** that deploys as a **single service** on Railway. The Express backend serves the React frontend, eliminating CORS issues and simplifying deployment.

## 📦 Architecture

```
Single Railway Service
├── Express Backend (Node.js)
│   ├── API Routes (/api/*)
│   ├── Health Check (/health)
│   └── Serves React Build (static files)
└── React Frontend (built to static files)
    └── Served by Express
```

## 🚀 Quick Deploy Methods

### Method 1: Automated CLI Script (Recommended)

```bash
cd /Users/braydonviragh/Documents/sites/MedicalUI

# Login to Railway (opens browser)
npx @railway/cli login

# Run deployment script
./deploy-railway.sh
```

### Method 2: Manual CLI Commands

```bash
cd /Users/braydonviragh/Documents/sites/MedicalUI

# 1. Login
npx @railway/cli login

# 2. Initialize project
npx @railway/cli init
# Choose: Create new project → Enter project name

# 3. Deploy
npx @railway/cli up

# 4. Generate domain
npx @railway/cli domain
```

### Method 3: Railway Web Dashboard (No CLI Required)

1. Visit https://railway.app/new
2. Click **"Deploy from GitHub repo"**
3. Select: `braydonviragh/react-js-medical-ui`
4. Click **"Deploy Now"**
5. Wait for build to complete
6. Go to **Settings → Networking → Generate Domain**

## 🔧 How It Works

### Build Process
1. Railway installs root dependencies (`package.json`)
2. Installs backend dependencies (`medical-backend/`)
3. Installs frontend dependencies (`medical-frontend/`)
4. **Builds React app** to `medical-frontend/build/`
5. Starts Express server with `NODE_ENV=production`

### Runtime Behavior
- Express serves static files from `medical-frontend/build/`
- API requests to `/api/*` are handled by Express routes
- All other requests serve the React `index.html` (for React Router)
- No CORS needed (same origin)

## 📋 Configuration Files

### Root Level
- **`package.json`** - Orchestrates monorepo build/deploy
- **`railway.toml`** - Railway service configuration
- **`nixpacks.toml`** - Build configuration

### Backend
- **`medical-backend/server.js`** - Updated to serve React build in production

### Frontend
- **`medical-frontend/src/services/api.js`** - Uses relative URLs in production

## 🔍 Verification

After deployment, verify everything works:

```bash
# Check health
curl https://your-app.railway.app/health

# Check API
curl https://your-app.railway.app/api/medications

# Visit frontend
open https://your-app.railway.app
```

## 📊 Environment Variables

### Required: None! 
Everything is configured automatically. 🎉

### Optional (if needed):
| Variable | Default | Description |
|----------|---------|-------------|
| NODE_ENV | production | Set by Railway automatically |
| PORT | (Railway sets) | Server port |

## 🛠️ Local Development

The app still supports separate frontend/backend development:

```bash
# Terminal 1: Start backend
cd medical-backend
npm install
npm run dev

# Terminal 2: Start frontend
cd medical-frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`  
Backend runs on `http://localhost:5000`

## 🔄 Continuous Deployment

Railway automatically redeploys when you push to GitHub:

```bash
# Make your changes
git add .
git commit -m "Your changes"
git push origin master
```

Railway will:
1. Detect the push
2. Rebuild the app
3. Deploy automatically
4. Zero downtime deployment

## 📈 Monitoring & Logs

```bash
# View real-time logs
npx @railway/cli logs

# Open Railway dashboard
npx @railway/cli open

# Check deployment status
npx @railway/cli status
```

Or visit: https://railway.app/dashboard

## 🆘 Troubleshooting

### Build Fails

**Check logs:**
```bash
npx @railway/cli logs
```

**Common issues:**
- Missing dependencies in `package.json`
- Frontend build errors
- Node version mismatch

**Solution:** Review logs, fix issues, commit and push

### App Doesn't Load

**Check:**
1. Visit `/health` endpoint - should return JSON
2. Check if build completed successfully
3. Review logs for runtime errors

### API Calls Fail

**In production:**
- API should be at `/api/*` (relative URL)
- No CORS needed (same origin)

**In development:**
- Ensure backend is running on port 5000
- Frontend should proxy to `http://localhost:5000`

### Railway CLI Issues

```bash
# Logout and login again
npx @railway/cli logout
npx @railway/cli login

# Unlink and relink project
npx @railway/cli unlink
npx @railway/cli link
```

## 🎨 Custom Domain (Optional)

1. Go to Railway Dashboard
2. Select your service
3. Settings → Networking → Custom Domain
4. Add your domain
5. Update DNS records as instructed

## 💰 Cost Optimization

This monorepo setup is cost-effective:
- ✅ **Single service** (not two separate services)
- ✅ Uses Railway's free tier efficiently
- ✅ No separate API server needed
- ✅ Static files served efficiently

## 📚 Additional Resources

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Repo: https://github.com/braydonviragh/react-js-medical-ui

## 🔐 Security Notes

- Backend validates all API requests
- Frontend served with proper headers
- Health check endpoint for monitoring
- Environment variables encrypted by Railway

## ✅ Deployment Checklist

Before deploying:
- [x] Git repository up to date
- [x] All changes committed and pushed
- [x] Railway CLI installed
- [x] Railway account created
- [x] Configuration files in place

After deploying:
- [ ] Health check works
- [ ] Frontend loads
- [ ] API calls work
- [ ] Check logs for errors

---

## 🎉 Summary

Your Medical UI app is configured for seamless Railway deployment:
- Single command deployment
- No environment variables needed
- Auto-deploys on git push
- Production-ready configuration

**Ready to deploy? Run:**
```bash
cd /Users/braydonviragh/Documents/sites/MedicalUI && npx @railway/cli login && ./deploy-railway.sh
```

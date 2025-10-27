# Railway Deployment Guide - Medical UI Project

This guide provides two methods to deploy your Medical UI application to Railway.

## 🎯 Prerequisites

- Railway account (https://railway.app)
- GitHub repository (already set up ✅)
- Railway CLI installed (already set up ✅)

## 📋 Method 1: Deploy via Railway CLI (Recommended)

### Step 1: Login to Railway

Open a new terminal and run:

```bash
cd /Users/braydonviragh/Documents/sites/MedicalUI
npx @railway/cli login
```

This will open a browser window for authentication.

### Step 2: Deploy Backend Service

```bash
cd medical-backend
npx @railway/cli init
# When prompted:
# - Create a new project: "medical-ui"
# - Service name: "backend"

npx @railway/cli up
npx @railway/cli domain
# Copy the domain URL - you'll need it for the frontend
```

### Step 3: Deploy Frontend Service

```bash
cd ../medical-frontend
npx @railway/cli init
# When prompted:
# - Link to existing project: "medical-ui"
# - Service name: "frontend"

# Set the backend URL (replace YOUR_BACKEND_URL with the URL from Step 2)
npx @railway/cli variables set REACT_APP_API_URL=https://YOUR_BACKEND_URL

npx @railway/cli up
npx @railway/cli domain
```

### Step 4: Update CORS Settings

After deployment, you'll need to update the backend to accept requests from the frontend domain.

1. Go to Railway dashboard: https://railway.app/dashboard
2. Select your backend service
3. Add environment variable:
   - Name: `ALLOWED_ORIGINS`
   - Value: `https://YOUR_FRONTEND_URL`

## 🌐 Method 2: Deploy via Railway Web Interface

This method uses Railway's GitHub integration (easier but less control).

### Step 1: Create New Project

1. Visit https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select your repository: `braydonviragh/react-js-medical-ui`
4. Click "Deploy Now"

### Step 2: Add Backend Service

1. In your project dashboard, click "+ New"
2. Select "GitHub Repo"
3. Choose your `react-js-medical-ui` repository
4. Configure the service:
   - **Name**: `medical-ui-backend`
   - **Root Directory**: `medical-backend`
   - **Start Command**: `npm start`
   - **Build Command**: Leave empty (not needed)
5. Click "Deploy"

### Step 3: Generate Backend Domain

1. Click on the backend service
2. Go to "Settings" tab
3. Under "Networking", click "Generate Domain"
4. Copy the generated domain URL

### Step 4: Add Frontend Service

1. In your project dashboard, click "+ New"
2. Select "GitHub Repo"
3. Choose your `react-js-medical-ui` repository
4. Configure the service:
   - **Name**: `medical-ui-frontend`
   - **Root Directory**: `medical-frontend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Add environment variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://YOUR_BACKEND_DOMAIN` (from Step 3)
6. Click "Deploy"

### Step 5: Generate Frontend Domain

1. Click on the frontend service
2. Go to "Settings" tab
3. Under "Networking", click "Generate Domain"
4. Copy the generated domain URL

## 🔧 Environment Variables Summary

### Backend Service
| Variable | Value | Description |
|----------|-------|-------------|
| PORT | (auto-set by Railway) | Server port |
| ALLOWED_ORIGINS | Frontend URL | CORS configuration |

### Frontend Service
| Variable | Value | Description |
|----------|-------|-------------|
| REACT_APP_API_URL | Backend URL | API endpoint |

## 📝 Post-Deployment Checklist

- [ ] Backend health check works: `https://YOUR_BACKEND_URL/health`
- [ ] Frontend loads successfully
- [ ] API calls from frontend to backend work
- [ ] CORS is configured correctly
- [ ] Both services auto-deploy on git push

## 🚀 Quick Deploy Script

For faster deployment, you can use the included script:

```bash
cd /Users/braydonviragh/Documents/sites/MedicalUI
./deploy-railway.sh
```

## 🔄 Updating Your Deployment

After making changes:

```bash
git add .
git commit -m "Your commit message"
git push origin master
```

Railway will automatically redeploy your services!

## 📚 Useful Railway CLI Commands

```bash
# View logs
railway logs

# Open in browser
railway open

# Check service status
railway status

# List all services
railway list

# Set environment variable
railway variables set KEY=value

# Link to a different project
railway link

# Unlink from project
railway unlink
```

## 🆘 Troubleshooting

### Issue: "Unauthorized" error
**Solution**: Run `npx @railway/cli login` again

### Issue: Frontend can't reach backend
**Solution**: 
1. Check REACT_APP_API_URL is set correctly
2. Verify CORS is configured on backend
3. Ensure backend domain is correct

### Issue: Build fails
**Solution**: 
1. Check logs: `railway logs`
2. Verify package.json scripts are correct
3. Ensure all dependencies are in package.json (not just package-lock.json)

### Issue: Application crashes after deploy
**Solution**:
1. Check if PORT environment variable is being used
2. Review logs for errors
3. Verify start command is correct

## 📞 Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/braydonviragh/react-js-medical-ui/issues

---

**Note**: All configuration files have been created and committed to your repository:
- `railway.toml` - Main Railway configuration
- `medical-backend/railway.json` - Backend service config
- `medical-frontend/railway.json` - Frontend service config
- `nixpacks-backend.toml` - Backend build configuration
- `nixpacks-frontend.toml` - Frontend build configuration


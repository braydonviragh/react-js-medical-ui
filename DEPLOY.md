# 🚀 Quick Deploy to Railway

## Option 1: Automated Script (After Login)

```bash
cd /Users/braydonviragh/Documents/sites/MedicalUI

# First, login to Railway (this will open a browser)
npx @railway/cli login

# Then run the deployment script
./deploy-railway.sh
```

## Option 2: Manual Step-by-Step

### Backend Deployment

```bash
cd /Users/braydonviragh/Documents/sites/MedicalUI/medical-backend
npx @railway/cli login  # If not already logged in
npx @railway/cli init   # Create "medical-ui" project
npx @railway/cli up     # Deploy
npx @railway/cli domain # Generate domain - SAVE THIS URL!
```

### Frontend Deployment

```bash
cd /Users/braydonviragh/Documents/sites/MedicalUI/medical-frontend
npx @railway/cli init   # Link to "medical-ui" project
npx @railway/cli variables set REACT_APP_API_URL=https://YOUR_BACKEND_URL
npx @railway/cli up     # Deploy
npx @railway/cli domain # Generate domain
```

### Final Step: Configure Backend CORS

In Railway dashboard, add to backend service:
```
ALLOWED_ORIGINS=https://YOUR_FRONTEND_URL
```

## Option 3: Railway Web Dashboard (Easiest)

1. Go to https://railway.app/new
2. Deploy from GitHub: `braydonviragh/react-js-medical-ui`
3. Add two services:
   - Backend: Root = `medical-backend`, Start = `npm start`
   - Frontend: Root = `medical-frontend`, Start = `npm start`
4. Set environment variables as described in RAILWAY_DEPLOYMENT_GUIDE.md

---

**Full Documentation**: See `RAILWAY_DEPLOYMENT_GUIDE.md` for detailed instructions and troubleshooting.


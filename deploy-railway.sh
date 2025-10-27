#!/bin/bash

# Railway Deployment Script for Medical UI Project
# This script deploys both frontend and backend to Railway

set -e

echo "🚂 Medical UI - Railway Deployment Script"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Railway CLI is available
if ! command -v npx &> /dev/null; then
    echo "❌ npx is not installed. Please install Node.js first."
    exit 1
fi

echo -e "${BLUE}Step 1: Committing Railway configuration files...${NC}"
git add .
git commit -m "Add Railway deployment configuration" || echo "No changes to commit"
git push origin master

echo ""
echo -e "${BLUE}Step 2: Creating Railway project for Backend...${NC}"
cd medical-backend
npx @railway/cli init --name medical-ui-backend

echo ""
echo -e "${BLUE}Step 3: Deploying Backend...${NC}"
npx @railway/cli up

echo ""
echo -e "${BLUE}Step 4: Getting Backend URL...${NC}"
BACKEND_URL=$(npx @railway/cli domain)
echo "Backend URL: $BACKEND_URL"

echo ""
echo -e "${BLUE}Step 5: Creating Railway project for Frontend...${NC}"
cd ../medical-frontend
npx @railway/cli init --name medical-ui-frontend

echo ""
echo -e "${BLUE}Step 6: Setting Backend URL environment variable...${NC}"
npx @railway/cli variables set REACT_APP_API_URL="https://$BACKEND_URL"

echo ""
echo -e "${BLUE}Step 7: Deploying Frontend...${NC}"
npx @railway/cli up

echo ""
echo -e "${BLUE}Step 8: Getting Frontend URL...${NC}"
FRONTEND_URL=$(npx @railway/cli domain)

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "Backend URL:  ${BLUE}https://$BACKEND_URL${NC}"
echo -e "Frontend URL: ${BLUE}https://$FRONTEND_URL${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Visit your Railway dashboard: https://railway.app/dashboard"
echo "2. Configure any additional environment variables if needed"
echo "3. Set up custom domains (optional)"
echo ""

